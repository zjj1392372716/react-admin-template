import React from 'react';
import BaseTable from '../../components/BaseTable/BaseTable';
import { Card, Button, Modal } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';


/**
 * 学生信息管理
 */
export default class CourseMs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: 'add', // 添加弹框确定按钮事件类型
      isDealDataList: false, // 是否需要处理返回的数据列表
      roomList: {},
      teacherlist: {},
      lessonList: {}
    };
  }

  params = {
    columns: []
  }


  componentWillMount() {
    this.fetchData(1);
  }

  fetchData (page) {
    let arr = [];
    // 获取必要信息
    let getAllRooms = api.Room.getAllRooms({})

    let getAllTeacher = api.Teacher.getAllTeacher({})

    // 获取全部的节次
    let getAllLessons = api.Lessons.getAllLessons({})
    
    arr.push(getAllRooms);
    arr.push(getAllTeacher);
    arr.push(getAllLessons);
    // 获取课程信息
    Promise.all(arr).then((res) => {
      console.log(res);
      let isAllOk = true;
      for(let i = 0; i < res.length; i++) {
        if(res[i].status !== 1) {
          isAllOk = false;
        }
      }

      if(isAllOk) {
        // TODO: 解析数据，设为state
        let roomList = res[0].data.data;
        let teacherlist = res[1].data.data;
        let lesslist = res[2].data.data;

        this.setState({
          roomList: Utils.obj2(roomList, "roomId", "roomNum"),
          teacherlist: Utils.obj2(teacherlist, "tId", "tName"),
          lessonList: Utils.obj2(lesslist, "lessonId", "remark")
        })
        

      }
    })
    api.Timetable.getCourseList({
      page: page
    }).then((res) => {
      if(res.status === 1) {
        // 处理数据
        let list = res.data.data;
        let page = res.data.page;
        let pageSize = res.data.pageSize;
        let totalpages = res.data.totalpages;
        let totals = res.data.totals;
        list.forEach((item, index) => {
          item.courseName = item.course.courseName;
          item.courseNum = item.course.courseNum;
          item.courseProperty = item.course.courseProperty;
          item.courseSort = item.course.courseSort;
          item.createTime = item.course.createTime;
          item.examType = item.course.examType;
          item.studyType = item.course.studyType;
          item.tId = item.course.tId;
          item.weeklyTimes = item.course.weeklyTimes;
        })
        let resultResData = {
          data: {
            data: list,
            page: page,
            pageSize: pageSize,
            totalpages: totalpages,
            totals: totals
          }
        }
        this.setState({
          resdata: resultResData
        })
      }
    })
  }

  // 页码跳转
  handlerPager(page) {
    console.log('我拿到page后，开始请求新的数据', page);
    this.fetchData(page);
  }

  // modal 提交
  handleSub = (r) => {
    let type = this.state.opType;
    if(type === 'add') {
      
      api.Room.addRoom(r).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '添加成功');
          this.fetchData();
        } else {
          Utils.openNotification('error', '添加失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
        this.baseTableRef.resetSelect();
      })
    } else if (type === 'edit') {
      console.log(r);
      r.roomId = this.baseTableRef.state.selectedItem.roomId;
      api.Room.updateRoom(r).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '修改成功');
          this.fetchData();
        } else {
          Utils.openNotification('error', '修改失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
        this.baseTableRef.resetSelect();
        this.setState({
          selectedItem: null
        })
      })
    }
  }

  // 管理员操作
  handleOperator(type) {
    if(type === 'add') {
      this.setState({
        selectedItem: null
      })
      window.location.href = '/#/admin/courseAdd';
    } else if (type === 'delete') {
      let item = this.baseTableRef.state.selectedItem;
      if (!item) {
        Modal.info({
            title: '信息',
            content: '请先选择一行数据'
        })
        return;
      }
      this.setState({
        opType: 'delete',
        selectedItem: item
      })
      console.log(item);
      this.deleteCourse(item.courseId);
      // this.baseModalRef.showModal();
    } else if (type === 'detail') {
      window.location.href = '/#/admin/courseInfo';
    
    }
  }

  deleteCourse(id) {
    api.Timetable.findByCourse({
      id: id
    }).then((res) => {
      if(res.status === 1) {
        let arr = [];
        let arr1 = [];
        let list = res.data.data;
        let promiseArr = [];

        list.forEach((item, index) => {
          arr.push(item.cId);
          arr1.push(item.lessonId)
          let promise  = api.Lessons.updateSelect({
            id: item.lessonId
          })
          promiseArr.push(promise)
        })



        // 执行删除操作
        console.log(arr, arr1);
        let lessonsStr = arr.join("-");
        api.Course.deleteCourse({
          id: id,
          lessons: lessonsStr
        }).then((res) =>{
          if(res.status === 1) {
            
            // 重置节次
            Promise.all(promiseArr).then((res) => {
              let isAllOk = true;
              for(let i = 0; i < res.length; i++) {
                if(res[i].status !== 1) {
                  isAllOk = false;
                }
              }
              if(isAllOk) {
                Utils.openNotification('success', '删除成功');
                this.fetchData(1);
              }
            })
            
          } else {
            Utils.openNotification('error', '删除失败');
          }
          this.baseTableRef.resetSelect();
          this.setState({
            selectedItem: null
          })
        })
      }
    })
  }


  render () {
    this.params.columns = [
      {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        align: 'center'
      },
      {
        title: '课程名称',
        dataIndex:'courseName',
        align: 'center'
      },
      {
        title: '课程编号',
        dataIndex:'courseNum',
        align: 'center'
      },
      {
        title: '任课老师',
        dataIndex:'tId',
        align: 'center',
        render: (text, record, index) => {
          return this.state.teacherlist[text]
        }
      },
      {
        title: '创建时间',
        dataIndex:'createTime',
        align: 'center'
      },
      {
        title: '课程属性',
        dataIndex:'courseProperty',
        align: 'center'
      },
      {
        title: '课程分类',
        dataIndex:'courseSort',
        align: 'center'
      },
      {
        title: '考试类型',
        dataIndex:'examType',
        align: 'center'
      },
      {
        title: '修读方式',
        dataIndex:'studyType',
        align: 'center'
      },
      {
        title: '开课时间',
        dataIndex:'weeklyTimes',
        align: 'center'
      },
      {
        title: '限选人数',
        dataIndex:'maxNum',
        align: 'center'
      },
      {
        title: '节次',
        dataIndex:'lessonId',
        align: 'center',
        render: (text, record, index) => {
          return this.state.lessonList[text]
        }
      },
      {
        title: '教室',
        dataIndex:'roomId',
        align: 'center',
        render: (text, record, index) => {
          return this.state.roomList[text]
        }
      },
    ]
    return (
      <div>
        <Card style={{marginTop:10}} title="管理员操作">
          <Button className="magR20" type="primary" onClick={this.handleOperator.bind(this, 'add')}>添加课程</Button>
          <Button className="magR20" type="danger" onClick={this.handleOperator.bind(this, 'delete')}>删除课程</Button>
          <Button className="magR20" type="primary" onClick={this.handleOperator.bind(this, 'detail')}>查看课表</Button>
        </Card>
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="cId"
          columnConfig={this.params.columns} 
          resData={this.state.resdata}
          handleChangePage={this.handlerPager.bind(this)}
        ></BaseTable>
        <BaseModal
          ref={(inst) => this.baseModalRef = inst}
          title="添加教室"
          modalFormMList={this.modalFormMList}
          handleSub={this.handleSub}
          formData={this.state.selectedItem}
        />
      </div>
    )
  }
}
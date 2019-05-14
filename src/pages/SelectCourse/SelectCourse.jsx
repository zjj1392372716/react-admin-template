import React from 'react';
import { Card, Button, Form, Modal,Table} from 'antd';
import api from '../../http/api';
import BaseTable from '../../components/BaseTable/BaseTable';
import Utils from '../../utils/utils';
import { redBright } from 'ansi-colors';
import { tuple } from 'antd/lib/_util/type';
const FormItem = Form.Item;

/**
 * 学生选课
 */
export default class SelectCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: 'add', // 添加弹框确定按钮事件类型
      isDealDataList: false, // 是否需要处理返回的数据列表
      roomList: {},
      lessonList: {},
      visible: false,
      detailList: [
      ] // 课表详情

    };
  }


  params = {
    columns: []
  }


  // 页码跳转
  handlerPager(page) {
    console.log('我拿到page后，开始请求新的数据', page);
    this.fetchData(page);
  }
  

  componentWillMount() {
    this.fetchOtherData();
    this.fetchData(1);
  }

  fetchOtherData() {
    let arr = [];
    // 获取必要信息
    let getAllRooms = api.Room.getAllRooms({})
    // 获取全部的节次
    let getAllLessons = api.Lessons.getAllLessons({})
    
    arr.push(getAllRooms);
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
        let roomList = res[0].data.data;
        let lesslist = res[1].data.data;

        this.setState({
          roomList: Utils.obj2(roomList, "roomId", "roomNum"),
          lessonList: Utils.obj2(lesslist, "lessonId", "remark")
        })
      }
    })
  }

  fetchData (page) {
    api.Course.getCourseList({
      page: page
    }).then((res) => {
      if(res.status === 1) {
        let list = res.data.data;
        let page = res.data.page;
        let pageSize = res.data.pageSize;
        let totalpages = res.data.totalpages;
        let totals = res.data.totals;
        list.forEach((item, index) => {
          item.tName = item.teacher.tName
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

  /**
   * 操作
   */
  handleOperator() {
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
      this.startSelectCourse(item.courseId);
  }

  startSelectCourse(courseId) {
    let username = window.sessionStorage.getItem("USERNAME");
    api.StudentInfo.getStudentOneByNum({
      num: username
    }).then((res) => {
      if(res.status === 1) {
        api.Sc.addSC({
          courseId: courseId,
          sId: res.data.sId
        }).then((res) => {
          if(res.status === 1) {
            Utils.openNotification('success', '选课成功');
            this.baseTableRef.resetSelect();
            this.setState({
              selectedItem: null
            })
          } else {
            Utils.openNotification('error', res.msg);
            this.baseTableRef.resetSelect();
            this.setState({
              selectedItem: null
            })
          }
        })
      } else {
        Utils.openNotification('error', res.msg);
        this.baseTableRef.resetSelect();
        this.setState({
          selectedItem: null
        })
      }

      
    })
  }

  timetableInfo(row) {
    // 查看某一个课程的课表
    api.Timetable.findByCourse({
      id: row.courseId 
    }).then((res) => {
      if(res.status === 1) {
        this.setState({
          detailList: res.data.data,
          visible: true
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
        dataIndex:'tName',
        align: 'center'
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
        title: '操作',
        align: 'center',
        key: '',
        render: (text, record) => (
          <Button type="primary" onClick={this.timetableInfo.bind(this, record)}>查看课表</Button>
        ),
      },
    ]
    
    const timetableColumn = [
      {
        title: '教室',
        dataIndex: 'roomId',
        render: text => this.state.roomList[text]
      },
      {
        title: '限选人数',
        dataIndex: 'maxNum',
      },
      {
        title: '节次',
        dataIndex: 'lessonId',
        render: text => this.state.lessonList[text]
      },
    ]
    return (
      <div>
        
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="courseId"
          columnConfig={this.params.columns} 
          resData={this.state.resdata}
          handleChangePage={this.handlerPager.bind(this)}
        ></BaseTable>

        <Card style={{marginTop:10}}>
          <Button className="magR20" type="primary" style={{float: "right"}} onClick={this.handleOperator.bind(this)}>提交</Button>
        </Card>

        <Modal
          title="课表详情"
          visible={this.state.visible}
          maskClosable={false}
          onCancel={() => this.setState({visible: false})}
          onOk={() => this.setState({visible: false})}
        >
          <Table columns={timetableColumn} dataSource={this.state.detailList} 
          pagination={false}/>
        </Modal>
      </div>
    )
  }
}

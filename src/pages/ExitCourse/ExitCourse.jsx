import React from 'react';
import { Card, Button, Modal} from 'antd';
import api from '../../http/api';
import BaseTable from '../../components/BaseTable/BaseTable';
import Utils from '../../utils/utils';

/**
 * 学生选课
 */
export default class ExitCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: 'add', // 添加弹框确定按钮事件类型
      isDealDataList: false, // 是否需要处理返回的数据列表
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
    this.fetchData(1);
  }

  fetchData (page) {
    let username = window.sessionStorage.getItem("USERNAME");
    api.StudentInfo.getStudentOneByNum({
      num: username
    }).then((res) => {
      if(res.status === 1) {
        api.Sc.getScList({
          page: page,
          sId: res.data.sId
        }).then((res) => {
          if(res.status === 1) {
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
      this.startSelectCourse(item.scId);
  }

  startSelectCourse(scId) {
    api.Sc.deleteSc({
      id: scId
    }).then((res) => {
      if(res.status === 1) {
        Utils.openNotification('success', '退课成功');
        this.baseTableRef.resetSelect();
        this.setState({
          selectedItem: null
        })
        this.fetchData(1);
      } else {
        Utils.openNotification('error', res.msg);
        this.baseTableRef.resetSelect();
        this.setState({
          selectedItem: null
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
      
    ]
    
    return (
      <div>
        <Card title="已选课程"></Card>
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="courseId"
          columnConfig={this.params.columns} 
          resData={this.state.resdata}
          handleChangePage={this.handlerPager.bind(this)}
        ></BaseTable>

        <Card style={{marginTop:10}}>
          <Button 
          className="magR20" 
          type="primary" 
          style={{float: "right"}} 
          onClick={this.handleOperator.bind(this)}>退课</Button>
        </Card>
      </div>
    )
  }
}

import React from 'react';
import { Card, Button, Table, Modal } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';




/**
 * 我的任课
 */
export default class MyCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      roomList: {},
      lessonList: {},
      visible: false,
      detailList: [
      ] // 课表详情
    };
  }

  componentWillMount() {
    this.fetchOtherData();
    this.fetchData();
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

  fetchData() {
    let num = window.sessionStorage.getItem("USERNAME");
    api.Teacher.getTeracherOneByNum({
      num: num
    }).then((res) => {
      if(res.status === 1) {
        api.Course.getCourseListByTid({
          tId: res.data.tId
        }).then((res) => {
          this.setState({
            datalist: res.data.data
          })
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
    const columns = [
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
        title: '查看课表',
        dataIndex:'timetable',
        align: 'center',
        render: (text, record) => {
          return (
            <Button type="default" onClick={this.timetableInfo.bind(this, record)}>查看课表</Button>
          )
        }
      }
    ];

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
        <Card style={{marginTop:10}} title="我的任课">
          <Table 
          dataSource={this.state.datalist} 
          columns={columns} 
          pagination={false}/>
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



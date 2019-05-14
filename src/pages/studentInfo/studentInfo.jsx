import React from 'react';
import { Card, Button, Form } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
export default class RoleMs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sName: '',
      sNum: '',
      sAge: '',
      className:'',
      startTime: '',
      state: ''
    };
  }



  

  componentWillMount() {
    this.fetchData();
  }

  fetchData () {
    // 获取个人信息
    let num = window.sessionStorage.getItem("USERNAME");
    api.StudentInfo.getStudentOneByNum({
      num: num
    }).then((res) => {
      if(res.status === 1) {
        let data = res.data;
        this.setState({
          sName: data.sName,
          sNum: data.sNum,
          sAge: data.sAge,
          className: data.classN.className,
          startTime: data.startTime,
          state: data.isDelete  === 0 ? "正常" : "注销"
        })
      }
    })
  }


  render () {
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 6}
    };

    
    return (
      <div>
        <Card style={{marginTop:10}} title="我的信息">
          <Form className="login-form">
            <FormItem label="姓名" {...formItemLayout}>
              {this.state.sName}
            </FormItem>
            <FormItem label="学号" {...formItemLayout}>
            {this.state.sNum}
            </FormItem>
            <FormItem label="班级" {...formItemLayout}>
            {this.state.className} 班
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
            {this.state.sAge}
            </FormItem>
            <FormItem label="入学时间" {...formItemLayout}>
            {this.state.startTime}
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
            {this.state.state}
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

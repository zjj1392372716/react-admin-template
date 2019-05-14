import React from 'react';
import { Card, Button, Form } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';
const FormItem = Form.Item;



/**
 * 教师信息
 */
export default class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tName: '',
      tNum: '',
      tPhone: '',
      tMajor:'',
      tPreCourse: '',
      startTime: '',
      state: '',
      selectedItem: null
    };
  }


  // 弹框数据
  modalFormMList = [
    {
      type:'INPUT',
      label:'联系方式',
      field:'tPhone',
      placeholder:'请输入联系方式'
    },
    {
      type:'INPUT',
      label:'主修专业',
      field:'tMajor',
      placeholder:'请输入主修专业'
    },
    {
      type:'INPUT',
      label:'曾任课程',
      field:'tPreCourse',
      placeholder:'请输入曾任课程（可以填多个）'
    },
  ]
  handleSub = (r) => {
    console.log(r);
    api.Teacher.updateTeacherInfo({
      tNum: window.sessionStorage.getItem("USERNAME"),
      tPhone: r.tPhone,
      tMajor: r.tMajor,
      tPreCourse: r.tPreCourse
    }).then((res) => {
      if(res.status === 1) {
        Utils.openNotification('success', '修改成功');
        this.fetchData();
      } else {
        Utils.openNotification('success', '修改失败');
      }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
    })
  }

  handleOperator(){
    this.setState({
      selectedItem: {
        tPhone: this.state.tPhone,
        tMajor: this.state.tMajor,
        tPreCourse: this.state.tPreCourse
      }
    })
    this.baseModalRef.showModal();
  }
  

  componentWillMount() {
    this.fetchData();
  }

  fetchData () {
    // 获取个人信息
    let num = window.sessionStorage.getItem("USERNAME");
    api.Teacher.getTeracherOneByNum({
      num: num
    }).then((res) => {
      if(res.status === 1) {
        let data = res.data;
        this.setState({
          tName: data.tName,
          tNum: data.tNum,
          tPhone: data.tPhone,
          tMajor:data.tMajor,
          tPreCourse: data.tPreCourse,
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
              {this.state.tName}
            </FormItem>
            <FormItem label="教工编号" {...formItemLayout}>
            {this.state.tNum}
            </FormItem>
            <FormItem label="联系方式" {...formItemLayout}>
            {this.state.tPhone} 
            </FormItem>
            <FormItem label="主修专业" {...formItemLayout}>
            {this.state.tMajor}
            </FormItem>
            <FormItem label="曾任课程" {...formItemLayout}>
            {this.state.tPreCourse}
            </FormItem>
            <FormItem label="入职时间" {...formItemLayout}>
            {this.state.startTime}
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
            {this.state.state}
            </FormItem>
          </Form>
          <Button type="primary" style={{float: "right"}} onClick={this.handleOperator.bind(this)}>修改我的信息</Button>
        </Card>
        <BaseModal
          ref={(inst) => this.baseModalRef = inst}
          title="修改信息"
          modalFormMList={this.modalFormMList}
          handleSub={this.handleSub}
          formData={this.state.selectedItem}
        />
        
      </div>
    )
  }
}



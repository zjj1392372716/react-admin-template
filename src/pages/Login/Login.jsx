import React from 'react';
import './Login.less';
import {Form, Input, Button} from 'antd'
// import api from '../../http/api';
// import Utils from '../../utils/utils';
import proConfig from '../../config/proj.config.js';
const FormItem = Form.Item;

// 登陆页面
export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      errorMsg: false
    };
  }

  goLogin = (val) => {
    window.location.href = '/#/admin/home';
  }

  render () {
    return (
      <div className="login-page">
        <div className="login-header">
          <div className="logo">
            {proConfig.systemName}
          </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word"></div>
            <div className="login-box">
              {/* 错误提示区域 */}
              <div className="error-msg-wrap">
                <div
                  className={this.state.errorMsg?"show":""}>
                  {this.state.errorMsg}
                </div>
              </div>
              {/* 错误提示区域 */}
              <div className="title">{proConfig.projectName}</div>
              <LoginForm ref="login" loginSubmit={this.goLogin} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 登陆表单
class LoginForm extends React.Component {

  //登陆
  loginSubmit = (e) => {
    e && e.preventDefault();
    let _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        var formValue = _this.props.form.getFieldsValue(); // 获取表单数据
        _this.props.loginSubmit({
          username: formValue.username,
          password: formValue.password
        })
      }
    })
  }
  // 校验用户名
  checkUsername = (rule, value, callback) => {
    if(!value) {
      callback('请输入用户名!');
    } else {
      callback();
    }
  }

  // 校验密码
  checkPassword = (rule, value, callback) => {
    if (!value) {
        callback('请输入密码!');
    } else {
        callback();
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {
            getFieldDecorator('username', {
              initialValue: '',
              rules: [
                {validator: this.checkUsername}
              ]
            })(
              <Input placeholder="请输入用户名"></Input>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  validator: this.checkPassword
                }
              ]
            })(
              <Input placeholder="请输入密码" />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
              登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}


LoginForm = Form.create({})(LoginForm);
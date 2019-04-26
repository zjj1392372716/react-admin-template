import axios from 'axios';
import {
  post
} from './http';

// import formDatapost from './formdata'; // 文件上传使用

import config from '../config/httpConfig.js';

const api = (function () {
  // ====================== 第三方接口 ========================
  // 天气获取
  // 默认获取天津的天气
  const getWeather = function () {
    let url = config.thirdPartyHost.weather + '/weather/city/101030100'
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  // ====================== 第三方接口 ========================



  // ====================== 管理员登陆 ========================
  // 管理员操作
  const Admin = {
    // 管理员登陆
    login(data){
      let url = '/admin/login'
      return post(url, data)
    }
  }

  // ====================== 管理员登陆 ========================

  return {
    getWeather,
    Admin
  }
})()

export default api

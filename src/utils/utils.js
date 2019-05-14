import React from 'react';
import { notification } from 'antd';
import { Select } from 'antd'
import menuConfig from '../config/menuConfig'
const Option = Select.Option;

let Utils = {};

/**
 * 右侧弹出提示
 * @param type  提示类型
 * @param duration 延时
 * @param message 标题
 */
Utils.openNotification = (type, message, duration) => {

  notification.config({
    placement: 'bottomRight'
  })

  notification[type]({
    message: message || '操作成功',
    description: '',
    duration: duration || 2.5
  });
}

/**
 * 时间戳转换
 * @param date 时间戳
 */
Utils.formatDate = function (date) {
  if (!date) return ''
  let date_format = new Date(date)
  let year = date_format.getFullYear()
  let month = date_format.getMonth() + 1
  if (month < 10) month = '0' + month
  let mydate = date_format.getDate()
  if (mydate < 10) mydate = '0' + mydate
  let hours = date_format.getHours()
  if (hours < 10) hours = '0' + hours
  let minutes = date_format.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  let seconds = date_format.getSeconds()
  if (seconds < 10) seconds = '0' + seconds
  let time = `${year}-${month}-${mydate}  ${hours}:${minutes}:${seconds}`
  return time
}

/**
 * 时间戳转换
 * @param date 时间戳
 */
Utils.formatDate1 = function (date) {
  date = parseInt(date);
  if (!date) return ''
  let date_format = new Date(date)
  let year = date_format.getFullYear()
  let month = date_format.getMonth() + 1
  if (month < 10) month = '0' + month
  let mydate = date_format.getDate()
  if (mydate < 10) mydate = '0' + mydate

  let time = `${year}/${month}/${mydate}`
  return time
}

/**
 * 生成option列表
 */
Utils.getOptionList = function (data) {
  if(!data) {
    return [];
  }
  let options = [];
  data.forEach((item, index) => {
    options.push(<Option value={item.id} key={index}>{item.name}</Option>)
  })
  return options;
}

// 处理分类标签
Utils.obj2 = (list, key, value) => {
  let resultObj = {};
  list.forEach((item, index) => {
    let key1 = item[key];
    let val = item[value];
    resultObj[key1] = val;
  })
  return resultObj;
}


// 处理分类标签
Utils.obj4 = (list) => {
    let resultObj = {};
    list.forEach((item, index) => {
        let key = item.scienceSortId;
        let val = item.labelName;
        resultObj[key] = val;
    })
    return resultObj;
}



// 获取菜单配置
Utils.getMenuInfo = (str) => {
  let temp = [];
  for(let i = 0; i < menuConfig.length; i++ ){
    temp = [];
    let item = menuConfig[i]
    if(item.children){
       let map = item.children;
       let isfind = false;
       for(let j = 0; j < map.length; j++) {
         if(map[j].key === str) {
           isfind = true;
           temp.push(map[j])
           break;
         }
       }

      if(isfind) {

        temp.push(item)
        return temp;
      }

    } else {
      if(item.key === str) {
        temp.push(item)
        break;
      }
    }
  }

  return temp;
}

Utils.dealMomentTime = (date_format) => {
  let year = date_format.getFullYear()
  let month = date_format.getMonth() + 1
  if (month < 10) month = '0' + month
  let mydate = date_format.getDate()
  if (mydate < 10) mydate = '0' + mydate
  let time = `${year}-${month}-${mydate}`
  return time
} 



export default Utils;

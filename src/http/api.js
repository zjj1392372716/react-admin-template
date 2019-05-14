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


  // ====================== 角色管理 ========================
  // 角色管理
  const Role = {
    // 获取角色列表
    getRoleList(data){
      let url = '/role/getRoleList'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 添加角色
    addRole(data){
      let url = '/role/addRole'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新角色
    updateRole(data){
      let url = '/role/updateRole'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新角色状态
    updateRoleState(data) {
      let url = '/role/updateRoleState'
      let needToken = true;
      return post(url, data, needToken)
    }
  }

  // ====================== 角色管理 ========================


  // ====================== 班级管理 ========================
  // 班级管理
  const MyClass = {
    // 获取班级列表
    getClassList(data) {
      let url = '/class/getClassList'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 添加班级
    addClass(data) {
      let url = '/class/addClass'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 获取某一个班级
    getClassOne(data) {
      let url = '/class/getClassOne'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新班级信息
    updateClass(data) {
      let url = '/class/updateClass'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新状态
    updateClassState(data) {
      let url = '/class/updateClassState'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 班级管理 ========================


  // ====================== 学生信息管理 ========================
  // 学生信息管理
  const StudentInfo = {
    // 获取学生列表
    getStudentList(data) {
      let url = '/student/getStudentList'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 添加学生信息
    addStudent(data) {
      let url = '/student/addStudent'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 获取某一个学生信息
    getStudentOne(data) {
      let url = '/student/getStudentOne'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新学生信息
    updateStudent(data) {
      let url = '/student/updateStudent'
      let needToken = true;
      return post(url, data, needToken)
    },
    // 更新状态
    updateStudentState(data) {
      let url = '/student/updateStudentState'
      let needToken = true;
      return post(url, data, needToken)
    },
    getStudentOneByNum(data) {
      let url = '/student/getStudentOneByNum'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 学生信息管理 ========================
  


  // ====================== 教室管理 ========================
  // 管理员操作
  const Room = {
    getRoomList(data) {
      let url = '/room/getRoomList'
      let needToken = true;
      return post(url, data, needToken)
    },
    addRoom(data) {
      let url = '/room/addRoom'
      let needToken = true;
      return post(url, data, needToken)
    },
    getRoomOne(data) {
      let url = '/room/getRoomOne'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateRoom(data) {
      let url = '/room/updateRoom'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateRoomState(data) {
      let url = '/room/updateRoomState'
      let needToken = true;
      return post(url, data, needToken)
    },
    getAllRooms(data) {
      let url = '/room/getAllRooms'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 教室管理 ========================


  // ====================== 教师管理 ========================
  // 管理员操作
  const Teacher = {
    getTeacherList(data) {
      let url = '/teacher/getTeacherList'
      let needToken = true;
      return post(url, data, needToken)
    },
    addTeacher(data) {
      let url = '/teacher/addTeacher'
      let needToken = true;
      return post(url, data, needToken)
    },
    getTeracherOne(data) {
      let url = '/teacher/getTeracherOne'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateTeacher(data) {
      let url = '/teacher/updateTeacher'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateTeacherState(data) {
      let url = '/teacher/updateTeacherState'
      let needToken = true;
      return post(url, data, needToken)
    },
    getAllTeacher(data) {
      let url = '/teacher/getAllTeacher'
      let needToken = true;
      return post(url, data, needToken)
    },
    getTeracherOneByNum(data) {
      let url = '/teacher/getTeracherOneByNum'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateTeacherInfo(data) {
      let url = '/teacher/updateTeacherInfo'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 教师管理 ========================


  // ====================== 课程管理 ========================

  const Course = {
    addCourse(data){
      let url = '/course/addCourse'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateTeacher(data) {
      let url = '/course/updateTeacher'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseByNum(data)  {
      let url = '/course/getCourseByNum'
      let needToken = true;
      return post(url, data, needToken)
    },
    deleteCourse(data) {
      let url = '/course/deleteCourse'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseList(data) {
      let url = '/course/getCourseList'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseListByTid(data) {
      let url = '/course/getCourseListByTid'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 课程管理 ========================


  // ====================== 节次管理 ========================
  const Lessons = {
    getLessonsList(data){
      let url = '/lessons/getLessonsList'
      let needToken = true;
      return post(url, data, needToken)
    },
    getAllLessons(data) {
      let url = '/lessons/getAllLessons'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateSelect(data) {
      let url = '/lessons/updateSelect'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 节次管理 ========================


   // ====================== 课表管理 ========================
   const Timetable = {
    addTimetable(data){
      let url = '/timetable/addTimetable'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseList(data) {
      let url = '/timetable/getCourseList'
      let needToken = true;
      return post(url, data, needToken)
    },
    findByCourse(data) {
      let url = '/timetable/findByCourse'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseList1(data) {
      let url = '/timetable/getCourseList1'
      let needToken = true;
      return post(url, data, needToken)
    },
    getCourseList2(data) {
      let url = '/timetable/getCourseList2'
      let needToken = true;
      return post(url, data, needToken)
    }
    
  }
  // ====================== 课表管理 ========================


  // ====================== 选课管理 ========================
  const Sc = {
    addSC(data) {
      let url = '/sc/addSC'
      let needToken = true;
      return post(url, data, needToken)
    },
    getScList(data) {
      let url = '/sc/getScList'
      let needToken = true;
      return post(url, data, needToken)
    },
    deleteSc(data) {
      let url = '/sc/deleteSc'
      let needToken = true;
      return post(url, data, needToken)
    },
    getSelectStu(data) {
      let url = '/sc/getSelectStu'
      let needToken = true;
      return post(url, data, needToken)
    }
  }
  // ====================== 选课管理 ========================

  const Score = {
    getScoreList(data) {
      let url = '/score/getScoreList'
      let needToken = true;
      return post(url, data, needToken)
    },
    updateScore(data) {
      let url = '/score/updateScore'
      let needToken = true;
      return post(url, data, needToken)
    },
    getScoreStu(data) {
      let url = '/score/getScoreStu'
      let needToken = true;
      return post(url, data, needToken)
    }
  }


  return {
    Room,
    getWeather,
    Admin,
    Role,
    MyClass,
    StudentInfo,
    Teacher,
    Course,
    Lessons,
    Timetable,
    Sc,
    Score
  }
})()

export default api

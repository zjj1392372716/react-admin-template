import React from 'react'
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from './App.js';
import Login from './pages/Login/Login';                                    // 登陆
import Admin from './admin.jsx';                                            // 外部容器
import Home from './pages/Home/Home.jsx';                                   // 首页
import RoleMs from './pages/RoleMs/RoleMs.jsx';                             // 角色管理
import ClassMs from './pages/classMs/classMs.jsx';                          // 班级管理
import studentInfoMs from './pages/StudentInfoMs/StudentInfoMs.jsx';        // 学生信息管理
import RoomMs from './pages/roomMs/roomMs.jsx';                             // 教室管理
import TeacherMs from './pages/teacherMs/teacherMs.jsx';                    // 教师管理
import AdminLogin from './pages/adminLogin/adminLogin.jsx';                 // 管理员登陆
import CourseMs from './pages/courseMs/courseMs.jsx';                       // 课程管理
import CourseAdd from './pages/courseAdd/courseAdd.jsx';                    // 课程添加
import CourseInfo from './pages/courseInfo/courseInfo.jsx';                 // 课程表详情
import MyInfo from './pages/studentInfo/studentInfo.jsx';                   // 学生个人信息
import SelectCourse from './pages/SelectCourse/SelectCourse.jsx';           // 学生选课
import ExitCourse from './pages/ExitCourse/ExitCourse.jsx';                 // 学生退课
import mytimeable from './pages/mytimeable/mytimeable.jsx';                 // 学生课表
import TeacherInfo from './pages/MyInfo/MyInfo.jsx';                        // 教师信息
import Mycourse from './pages/Mycourse/Mycourse.jsx';                       // 我的任课
import myStudent from './pages/myStudent/myStudent.jsx';                    // 我的学生
import inResult from './pages/inResult/inResult.jsx';                       // 成绩录入

import myScore from './pages/myScore/myScore.jsx';                          // 我的成绩
export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/admin" render={() =>
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home}></Route>
                  <Route path="/admin/role" component={RoleMs}></Route>
                  <Route path="/admin/class" component={ClassMs}></Route>
                  <Route path="/admin/studentInfo" component={studentInfoMs}></Route>
                  <Route path="/admin/room" component={RoomMs}></Route>
                  <Route path="/admin/teacher" component={TeacherMs}></Route>
                  <Route path="/admin/courseMs" component={CourseMs}></Route>
                  <Route path="/admin/courseAdd" component={CourseAdd}></Route>
                  <Route path="/admin/courseInfo" component={CourseInfo}></Route>
                  <Route path="/admin/myInfo" component={MyInfo}></Route>
                  <Route path="/admin/SelectCourse" component={SelectCourse}></Route>
                  <Route path="/admin/exitCourse" component={ExitCourse}></Route>
                  <Route path="/admin/mytimeable" component={mytimeable}></Route>
                  <Route path="/admin/teacherInfo" component={TeacherInfo}></Route>
                  <Route path="/admin/mycourse" component={Mycourse}></Route>
                  <Route path="/admin/myStudent" component={myStudent}></Route>
                  <Route path="/admin/inResult" component={inResult}></Route>
                  
                  <Route path="/admin/myScore" component={myScore}></Route>
                  <Redirect to="/admin/home" />
                </Switch>
              </Admin>
            } />
            
            <Route path="/adminLog" component={AdminLogin} />
            <Route path="/" component={Login} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

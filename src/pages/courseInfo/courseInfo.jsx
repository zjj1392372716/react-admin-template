import React from "react";
import "./courseInfo.css";
import { Card } from "antd";
import api from "../../http/api";
import Timetables from "./Timetable.js";
// 登陆页面
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  fetchData() {
    api.Timetable.getCourseList1({}).then(res => {
      console.log(res);
      if (res.status === 1) {
        let list = res.data.data;
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
        });

        let courseList = this.initTimetable(list);
        var week =
          window.innerWidth > 360
            ? ["周一", "周二", "周三", "周四", "周五"]
            : ["一", "二", "三", "四", "五"];
        var day = new Date().getDay();
        var courseType = [
          [{ index: "1", name: "8:20" }, 1],
          [{ index: "2", name: "10:00" }, 1],
          [{ index: "3", name: "10:20" }, 1],
          [{ index: "4", name: "12:00" }, 1],
          [{ index: "5", name: "13:50" }, 1],
          [{ index: "6", name: "15:40" }, 1],
          [{ index: "7", name: "16:00" }, 1],
          [{ index: "8", name: "17:40" }, 1],
          [{ index: "9", name: "18:30" }, 1],
          [{ index: "10", name: "20:00" }, 1],
          [{ index: "11", name: "20:10" }, 1],
          [{ index: "12", name: "21:40" }, 1]
        ];
        // 实例化(初始化课表)
        var Timetable = new Timetables({
          el: "#coursesTable",
          timetables: courseList,
          week: week,
          timetableType: courseType,
          highlightWeek: day,
          styles: {
            Gheight: 50
          }
        });
      } else {
      }
    });
  }

  initTimetable(list) {

    var courseList = [
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', ''],
    ];
    list.forEach((item, index) => {
      let x = item.weekNum -1 ;
      let y = item.indexNum;
      let temp = [];
      temp.push(y * 2 - 1);
      temp.push(y * 2 - 2);
      console.log(temp[0], temp[1]);
      courseList[x][temp[0]] = item.courseName + "\n"+ item.courseNum + "\n" + item.remark +"\n"+ item.courseProperty +"\n"+ item.weeklyTimes;
      courseList[x][temp[1]] = item.courseName + "\n"+ item.courseNum + "\n" + item.remark +"\n"+ item.courseProperty +"\n"+ item.weeklyTimes;
    });
    return courseList;
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="wrapper">
        <Card title="课表详情">
          <div id="coursesTable" />
        </Card>
      </div>
    );
  }
}

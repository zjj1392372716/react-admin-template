import React from "react";
import BaseTable from "../../components/BaseTable/BaseTable";
import { Card, Button, Modal } from "antd";
import api from "../../http/api";
import Utils from "../../utils/utils";
import BaseModal from "../../components/BaseModal/index.jsx";
/**
 * 学生信息管理
 */
export default class MyStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: "add", // 添加弹框确定按钮事件类型
      isDealDataList: false // 是否需要处理返回的数据列表
    };
  }

  params = {
    columns: []
  };

  componentWillMount() {
    this.fetchData(1);
  }

  fetchData(page) {
    let num = window.sessionStorage.getItem("USERNAME");
    api.Teacher.getTeracherOneByNum({
      num: num
    }).then(res => {
      if (res.status === 1) {
        api.Sc.getSelectStu({
          page: page,
          tId: res.data.tId
        }).then(res => {
          if (res.status === 1) {
            let list = res.data.data;
            let page = res.data.page;
            let pageSize = res.data.pageSize;
            let totalpages = res.data.totalpages;
            let totals = res.data.totals;
            list.forEach((item, index) => {
              item.courseName = item.course.courseName;
            });
            let resultResData = {
              data: {
                data: list,
                page: page,
                pageSize: pageSize,
                totalpages: totalpages,
                totals: totals
              }
            };
            this.setState({
              resdata: resultResData
            });
          }
        }); 
      }
    });
  }

  // 页码跳转
  handlerPager(page) {
    console.log("我拿到page后，开始请求新的数据", page);
    this.fetchData(page);
  }

  // modal 提交
  handleSub = r => {};

  // 管理员操作
  handleOperator(type) {}

  render() {
    this.params.columns = [
      {
        title: "序号",
        render: (text, record, index) => `${index + 1}`,
        align: "center"
      },
      {
        title: "学生姓名",
        dataIndex: "sName",
        align: "center"
      },
      {
        title: "学号",
        dataIndex: "sNum",
        align: "center"
      },
      {
        title: "所选课程",
        dataIndex: "courseName",
        align: "center"
      }
    ];
    return (
      <div>
        <Card title="我的学生">
          <BaseTable
            ref={v => (this.baseTableRef = v)}
            rowKey="tId"
            columnConfig={this.params.columns}
            resData={this.state.resdata}
            handleChangePage={this.handlerPager.bind(this)}
          />
        </Card>
      </div>
    );
  }
}

import React from "react";
import BaseTable from "../../components/BaseTable/BaseTable";
import { Card, Button, Modal } from "antd";
import api from "../../http/api";
import Utils from "../../utils/utils";
import BaseModal from "../../components/BaseModal/index.jsx";
/**
 * 学生信息管理
 */
export default class InResult extends React.Component {
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
        api.Score.getScoreList({
          page: page,
          tId: res.data.tId
        }).then(res => {
          if (res.status === 1) {
            let list = res.data.data;
            let page = res.data.page;
            let pageSize = res.data.pageSize;
            let totalpages = res.data.totalpages;
            let totals = res.data.totals;
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

  // 弹框数据
  modalFormMList = [
    {
      type:'INPUT',
      label:'成绩',
      field:'score',
      placeholder:'请输入该学生的成绩'
    }
  ]

  // modal 提交
  handleSub = r => {
    console.log(r);
    api.Score.updateScore({
      gId: this.state.selectedItem.gId,
      score: r.score
    }).then((res) => {
      if(res.status === 1) {
        Utils.openNotification('success', '录入成功');
        this.fetchData(1);
      } else {
        Utils.openNotification('error', '录入失败');
      }
      this.baseModalRef.resetForm();
      this.baseModalRef.hideModal();
    })

  };

  // 管理员操作
  handleOperator(type) {
    if(type === 'edit') {
      let item = this.baseTableRef.state.selectedItem;
      if (!item) {
        Modal.info({
            title: '信息',
            content: '请先选择一行数据'
        })
        return;
      }
      this.setState({
        opType: 'edit',
        selectedItem: item
      })
      console.log(item);

      this.baseModalRef.showModal();
    }
  }

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
      },
      {
        title: "成绩",
        dataIndex: "score",
        align: "center"
      }
    ];
    return (
      <div>
        <Card title="学生成绩">
        <Button 
        style={{marginBottom: 15}}
        className="magR20" 
        type="primary" 
        onClick={this.handleOperator.bind(this, 'edit')}>录入成绩</Button>
          <BaseTable
            ref={v => (this.baseTableRef = v)}
            rowKey="tId"
            columnConfig={this.params.columns}
            resData={this.state.resdata}
            handleChangePage={this.handlerPager.bind(this)}
          />
        </Card>

        <BaseModal
          ref={(inst) => this.baseModalRef = inst}
          title="添加角色"
          modalFormMList={this.modalFormMList}
          handleSub={this.handleSub}
          formData={this.state.selectedItem}
        />
      </div>
    );
  }
}

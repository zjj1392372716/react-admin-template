import React from 'react';
import BaseTable from '../../components/BaseTable/BaseTable';
import { Card, Button, Modal } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';
/**
 * 学生信息管理
 */
export default class StudentInfoMs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: 'add', // 添加弹框确定按钮事件类型
      isDealDataList: false // 是否需要处理返回的数据列表
    };
  }

  params = {
    columns: []
  }

  // 弹框数据
  modalFormMList =  []

  componentWillMount() {
    this.getClasses();
    this.fetchData(1);
  }

  // 获取班级列表
  getClasses() {
    // 获取所有班级列表
    api.MyClass.getClassList({
      page: 1
    }).then((res) => {
      if(res.status  === 1) {
        let list = res.data.data;
        let resultlist = [];
        list.forEach((item, index) => {
          let obj = {};
          let key = item.classId;
          let val = item.className;
          obj.id= key;
          obj.name = val;
          resultlist.push(obj);
        })
        console.log(resultlist);
        this.modalFormMList = [
          {
            type:'INPUT',
            label:'姓名',
            field:'sName',
            placeholder:'请输入学生姓名'
          },
          {
            type:'INPUT',
            label:'学号',
            field:'sNum',
            placeholder:'请输入学号'
          },
          {
            type:'INPUT',
            label:'年龄',
            field:'sAge',
            placeholder:'请输入年龄'
          },
          {
            type: 'TIME',
            label: '入学时间',
            field: 'startTime',
            placeholder: '请输入开始时间',
            format: 'YYYY-MM-DD'
          },
          {
            type: 'SELECT',
            label:'班级',
            field:'classId',
            placeholder: '请选择班级',
            defaultData: resultlist
          }
        ]
      }
    })
  }

  fetchData (page) {
    api.StudentInfo.getStudentList({
      page: page
    }).then((res) => {
      if(res.status === 1) {
        // 处理数据
        let list = res.data.data;
        let page = res.data.page;
        let pageSize = res.data.pageSize;
        let totalpages = res.data.totalpages;
        let totals = res.data.totals;
        list.forEach((item, index) => {
          item.className = item.classN.className;
        })
        let resultResData = {
          data: {
            data: list,
            page: page,
            pageSize: pageSize,
            totalpages: totalpages,
            totals: totals
          }
        }
        this.setState({
          resdata: resultResData
        })
      }
    })
  }

  // 页码跳转
  handlerPager(page) {
    console.log('我拿到page后，开始请求新的数据', page);
    this.fetchData(page);
  }

  // modal 提交
  handleSub = (r) => {
    
    let type = this.state.opType;
    if(type === 'add') {
      r.startTime = Utils.dealMomentTime(new Date(r.startTime._d));
      api.StudentInfo.addStudent(r).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '添加成功');
          this.fetchData(1);
        } else {
          Utils.openNotification('error', '添加失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
        this.baseTableRef.resetSelect();
      })
    } else if (type === 'edit') {
      console.log(r);
      api.StudentInfo.updateStudent({
        sId: this.state.selectedItem.sId,
        sName: r.sName,
        sAge: r.sAge,
        classId: r.classId,
        startTime: Utils.dealMomentTime(new Date(r.startTime._d)),
        sNum: r.sNum
      }).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '修改成功');
          this.fetchData(1);
        } else {
          Utils.openNotification('error', '修改失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
        this.baseTableRef.resetSelect();
        this.setState({
          selectedItem: null
        })
      })
    }
  }

  // 管理员操作
  handleOperator(type) {
    if(type === 'add') {
      this.setState({
        opType: 'add',
        selectedItem: null
      })

      this.baseModalRef.showModal();
    } else if (type === 'edit') {
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
      this.baseModalRef.showModal();
    } else if (type === 'changeState') {
      let item = this.baseTableRef.state.selectedItem;
      if (!item) {
        Modal.info({
            title: '信息',
            content: '请先选择一行数据'
        })
        return;
      }
      let _this = this;
      api.StudentInfo.updateStudentState({
        sId: item.sId,
        isDelete: item.isDelete === 1 ? 0 : 1
      }).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '修改成功');
          _this.fetchData(1);
        } else {
          Utils.openNotification('error', '修改失败');
        }
        this.baseTableRef.resetSelect();
        _this.setState({
          selectedItem: null
        })
      })
    }
  }


  render () {
    this.params.columns = [
      {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        align: 'center'
      },
      {
        title: '学号',
        dataIndex:'sNum',
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex:'sName',
        align: 'center'
      },
      {
        title: '年龄',
        dataIndex:'sAge',
        align: 'center'
      },
      {
        title: '入学时间',
        dataIndex:'startTime',
        align: 'center'
      },
      {
        title: '班级',
        dataIndex:'className',
        align: 'center'
      },
      {
        title: '创建时间',
        dataIndex:'createTime',
        align: 'center',
        render: (text) => {
          return Utils.formatDate(parseInt(text));
        }
      },
      {
        title: '是否有效',
        dataIndex:'isDelete',
        align: 'center',
        render: (text, record, index) => {
          return text === 0 ? '有效' : '冻结'
        }
      }
    ]
    return (
      <div>
        <Card style={{marginTop:10}} title="管理员操作">
          <Button className="magR20" type="primary" onClick={this.handleOperator.bind(this, 'add')}>添加学生</Button>
          <Button className="magR20" type="default" onClick={this.handleOperator.bind(this, 'edit')}>修改学生信息</Button>
          <Button className="magR20" type="danger" onClick={this.handleOperator.bind(this, 'changeState')}>更改状态</Button>
        </Card>
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="sId"
          columnConfig={this.params.columns} 
          resData={this.state.resdata}
          handleChangePage={this.handlerPager.bind(this)}
        ></BaseTable>
        <BaseModal
          ref={(inst) => this.baseModalRef = inst}
          title="添加角色"
          modalFormMList={this.modalFormMList}
          handleSub={this.handleSub}
          formData={this.state.selectedItem}
        />
      </div>
    )
  }
}
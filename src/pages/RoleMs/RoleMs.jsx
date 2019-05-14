import React from 'react';
import BaseTable from '../../components/BaseTable/BaseTable';
import { Card, Button, Modal } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';
export default class RoleMs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      opType: 'add' // 添加弹框确定按钮事件类型
    };
  }

  params = {
    columns: []
  }

  // 弹框数据
  modalFormMList = [
    {
      type:'INPUT',
      label:'角色名称',
      field:'roleName',
      placeholder:'请输入角色名'
    },
    {
      type: 'SELECT',
      label:'等级',
      field:'weight',
      placeholder: '请选择等级',
      defaultData: [
        {
          id: 10,
          name: 'A - 教师'
        },
        {
          id: 100,
          name: 'B - 学生'
        },
        {
          id: 1000,
          name: 'C - 普通'
        }  
      ]
    },
  ]

  componentWillMount() {
    this.fetchData(1);
  }

  fetchData (page) {
    api.Role.getRoleList({
      page: page
    }).then((res) => {
      if(res.status === 1) {
        console.log(res);
        this.setState({
          resdata: res
        })
      }
    })
  }

  // 页码跳转
  handlerPager(page) {
    console.log('我拿到page后，开始请求新的数据', page);
  }

  // modal 提交
  handleSub = (r) => {
    console.log(r);
    let type = this.state.opType;
    if(type === 'add') {
      api.Role.addRole(r).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '添加成功');
          this.fetchData();
        } else {
          Utils.openNotification('error', '添加失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
      })
    } else if (type === 'edit') {
      api.Role.updateRole({
        roleId: this.state.selectedItem.roleId,
        roleName: r.roleName,
        weight: r.weight
      }).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '修改成功');
          this.fetchData();
        } else {
          Utils.openNotification('error', '修改失败');
        }
        this.baseModalRef.resetForm();
        this.baseModalRef.hideModal();
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
      api.Role.updateRoleState({
        roleId: item.roleId,
        isDelete: item.isDelete === 1 ? 0 : 1
      }).then((res) => {
        if(res.status === 1) {
          Utils.openNotification('success', '修改成功');
          _this.fetchData();
        } else {
          Utils.openNotification('error', '修改失败');
        }
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
        title: '角色名',
        dataIndex:'roleName',
        align: 'center'
      },
      {
        title: '权重',
        dataIndex:'weight',
        align: 'CENTER'
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
          <Button className="magR20" type="primary" onClick={this.handleOperator.bind(this, 'add')}>添加角色</Button>
          <Button className="magR20" type="default" onClick={this.handleOperator.bind(this, 'edit')}>修改角色</Button>
          <Button className="magR20" type="danger" onClick={this.handleOperator.bind(this, 'changeState')}>修改角色状态</Button>
        </Card>
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="roleId"
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
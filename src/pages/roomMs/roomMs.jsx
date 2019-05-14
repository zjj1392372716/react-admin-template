import React from 'react';
import BaseTable from '../../components/BaseTable/BaseTable';
import { Card, Button, Modal } from 'antd';
import api from '../../http/api';
import Utils from '../../utils/utils';
import BaseModal from '../../components/BaseModal/index.jsx';
/**
 * 学生信息管理
 */
export default class RoomMs extends React.Component {
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
  modalFormMList = [{
    type:'INPUT',
    label:'教室门牌号',
    field:'roomNum',
    placeholder:'请输入教室门牌号'
  },{
    type:'INPUT',
    label:'容纳人数',
    field:'peopleNum',
    placeholder:'请输入所能容纳人数'
  },{
    type: 'SELECT',
    label:'是否有多媒体',
    field:'isMedia',
    placeholder: '是否有多媒体',
    defaultData: [
      {
        id: 1,
        name: '是'
      },
      {
        id: 0,
        name: '否'
      }  
    ]
  }]


  componentWillMount() {
    this.fetchData(1);
  }

  fetchData (page) {
    api.Room.getRoomList({
      page: page
    }).then((res) => {
      if(res.status === 1) {
        this.setState({
          resdata: res
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
      
      api.Room.addRoom(r).then((res) => {
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
      r.roomId = this.baseTableRef.state.selectedItem.roomId;
      api.Room.updateRoom(r).then((res) => {
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
      api.Room.updateRoomState({
        roomId: item.roomId,
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
        title: '教师门牌号',
        dataIndex:'roomNum',
        align: 'center'
      },
      {
        title: '容纳人数',
        dataIndex:'peopleNum',
        align: 'center'
      },
      {
        title: '是否有多媒体',
        dataIndex:'isMedia',
        align: 'center',
        render: (text, record, index) => {
          return text === 0 ? '有' : '无'
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
          <Button className="magR20" type="primary" onClick={this.handleOperator.bind(this, 'add')}>添加教室</Button>
          <Button className="magR20" type="default" onClick={this.handleOperator.bind(this, 'edit')}>修改教室信息</Button>
          <Button className="magR20" type="danger" onClick={this.handleOperator.bind(this, 'changeState')}>更改教室状态</Button>
        </Card>
        <BaseTable 
          ref={(v) => this.baseTableRef = v}
          rowKey="roomId"
          columnConfig={this.params.columns} 
          resData={this.state.resdata}
          handleChangePage={this.handlerPager.bind(this)}
        ></BaseTable>
        <BaseModal
          ref={(inst) => this.baseModalRef = inst}
          title="添加教室"
          modalFormMList={this.modalFormMList}
          handleSub={this.handleSub}
          formData={this.state.selectedItem}
        />
      </div>
    )
  }
}
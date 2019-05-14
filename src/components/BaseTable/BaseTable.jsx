import React from 'react';
import { Table } from 'antd';
import './BaseTable.less';
/**
 * @desc 公共表格组件
 * @use  <BaseTable/>
 * @props columnConfig 表格列字段配置
 * @props resData 响应数据
 * @props handleChangePage 换页方法
 * @props rowKey   ID主键作为唯一key
 */
export default class BaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: null, // 选中某一项
      selectedItem: null, 
      pagination: {}, // 分页配置对象
    };
  }

  params = {
    page: 1 // 页码
  }

  resetSelect () {
    this.setState({
      selectedRowKeys: null, // 选中某一项
      selectedItem: null, 
    })
  }
  // 换页
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.params.page = parseInt(pager.current)
    // 调用传入的函数
    this.props.handleChangePage(this.params.page);
  }
  
  componentWillReceiveProps(nextProps){
    // 获取最新传入的数据
    let self = this;
    setTimeout(function(){
        let pagination = { ...self.state.pagination };
        pagination.total = self.props.resData.data.totalpages * 10
        pagination.pageSize=self.props.resData.data.pageSize;
        pagination.showTotal =()=>{
            return `共${self.props.resData.data.totals}条`
        };
        self.setState({
            pagination
        })
    },0)
  }

  // 勾选某一行
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }


  

  render () {
    let that = this
    // 勾选项
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys, // 设置选中项
      selections: true,
      onChange: function (selectedRowKeys, selectedRows) {
        let selectKey = `[${selectedRowKeys}]`;
        that.setState({
          selectedRowKeys: selectKey,
          selectedItem: selectedRows[0]
        })
      }
    }


    return (
      <div className="table-wrapper">
        <Table
          rowKey={(record) => record[this.props.rowKey]}
          bordered
          columns={this.props.columnConfig}
          dataSource={this.props.resData ? this.props.resData.data.data || [] : []}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          onRow={(record, index) => {
            return {
              onClick: () => {
                this.onRowClick(record, index);
              }
            };
          }}
        />
      </div>
    )
  }
}
import React from 'react';
import { Modal} from 'antd'
import PropTypes from 'prop-types'
import BaseForm from '../BaseForm/index.jsx';
/**
 * @desc 基础弹框组建
 * @props title 标题（必传）
 * @props width 宽度（选填）
 * @props modalFormMList form 结构 （必传）
 * @props formData form 数据  
 */
class BaseModal extends React.Component {

  state = {
    isVisible: false, // 是否显示
  }

  // 获取填写信息
  handleSubmit = () => {
    const result =this.baseFormRefs.getFieldFormData()
    this.props.handleSub(result);
  }

  resetForm = () => {
    this.baseFormRefs.resetFieldForm();
  }

  // 展示modal
  showModal = () => {
    this.setState({
      isVisible: true
    })
  }

  // 隐藏modal
  hideModal = () => {
    this.setState({
      isVisible: false
    })
  }


  render () {
    return (
      <Modal
        title={this.props.title}
        visible={this.state.isVisible}
        onOk={this.handleSubmit}
        width={this.props.width ? this.props.width : 700}
        onCancel={ () => {
            // 清空
            // 调用子组件的方法
            this.resetForm();
            this.setState({
                isVisible:false
            })
        }}
      >
          <BaseForm
            wrappedComponentRef={(inst) => this.baseFormRefs = inst}
            formList={this.props.modalFormMList}
            formData={this.props.formData}
           />
      </Modal>
    )
  }
}

BaseModal.propTypes = {
  title: PropTypes.string, //标题
  width: PropTypes.number, // 宽度
  modalFormMList: PropTypes.array, // 模态框表单规则
  formData: PropTypes.object // 表单的数据
}

export default BaseModal;

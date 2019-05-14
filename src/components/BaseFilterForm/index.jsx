import React from 'react';
import { Input, Select, Form, Button, DatePicker} from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;
class BaseFilterForm extends React.Component {

  // 表单提交
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  }
  // 表单重置
  reset = () => {
    this.props.form.resetFields();
  }

  // 初始化表单
  initFilterForm = () => {
    const {getFieldDecorator} = this.props.form
    const formList = this.props.formList; // 传入的结构化数据
    const formItemList = []; // 结果数组
    let idIndex = 0;
    let keyIndex = 0;
    if( formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label || '' // 标题
        let field = item.field; // 域值
        let initialValue = item.initialValue || ''; // 初始化值
        let placeholder = item.placeholder; // 提示信息
        let width = item.width || 150 // 宽度


        /**
        * 文本输入框
        */
        if (item.type === 'INPUT') {
          const INPUT = (
            <FormItem key={keyIndex++}>
              {
                getFieldDecorator(field, {
                  initialValue: initialValue
                })(
                  <Input placeholder={placeholder} type="text" style={{width: width}} />
                )
              }
            </FormItem>
          )
          formItemList.push(INPUT);
        } else if (item.type === 'SELECT') {
          /**
          *  下拉框
          *  @item.list 选项列表
          */
          const SELECT = (
            <FormItem key={keyIndex++}>
              {
                getFieldDecorator(field)(
                  <Select
                    placeholder = {placeholder}
                    style = {{ width: width }}
                  >
                  {
                    Utils.getOptionList(item.list)
                  }
                  </Select>
                )
              }
            </FormItem>
          )
          formItemList.push(SELECT);
        } else if (item.type === 'TIMESLOT') {
          /**
          *  时间段
          *  @item.list 选项列表
          */

          // 开始时间
          const BEGIN_TIME = (
            <FormItem label={label}>
              {
                getFieldDecorator('begin_time' + (idIndex++))(
                  <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
          )
          formItemList.push(BEGIN_TIME)
          // 结束时间
          const END_TIME = (
            <FormItem label="~" colon={false}>
              {
                getFieldDecorator('end_time' + (idIndex++))(
                  <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
          )
          formItemList.push(END_TIME)
        }
      })
    }
    return formItemList
  }

  render () {
    return (
      <div>
        <Form layout="inline">
          { this.initFilterForm() }
          <FormItem>
            <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
            <Button onClick={this.reset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(BaseFilterForm);

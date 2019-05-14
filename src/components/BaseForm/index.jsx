import React from 'react';
import { Input, Form, Select, DatePicker} from 'antd'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
class BaseForm extends React.Component {

  // 获取表单的值
  getFieldFormData = () => {
    const data =  this.props.form.getFieldsValue();
    return data;
  }

  // 重置表单
  resetFieldForm = () => {
    this.props.form.resetFields()
  }

  renderOption = (list) => {
      // let items = []
      // for(var i in list) {
      //     var obj = {};
      //     obj.key = i
      //     obj.value = list[i]
      //     items.push(obj)
      // }
      //
      // const children = items.map((item, index) => {
      //     return <Option key={item.key} value={item.key}>{item.value}</Option>
      // })
      // console.log(children)


      const children = [];
      for (let i = 10; i < 36; i++) {
          children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      }
      return children
  }

  

  // 初始化表单
  initForm = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList; // [1] 传入的结构化数据
    const formData = this.props.formData; // [2] form 的数据， 可不传
    const type = this.props.type          // [3] 操作类型
    const formItemList = [];              // 结果数组
    // 左右布局
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    let keyIndex = 0;
    if( formList && formList.length > 0) {
      // 遍历我们传入的form结构
      formList.forEach((item, index) => {

        let label = item.label || '' // 标题
        let field = item.field; // 域值
        let placeholder = item.placeholder; // 提示信息
        let width = item.width // 宽度
        // [1] INPUT
        if(item.type === 'INPUT') {
          const INPUT = (
            <FormItem key={keyIndex++} className="width100" label={label} {...formItemLayout}>
            {
              formData && type === 'detail' ? formData[field] :
              getFieldDecorator(field,{
                  initialValue:  formData ?  formData[field] ? formData[field] : '' : ''
              })(
                width ? <Input type="text" style={{width: width}}  placeholder={placeholder} /> :
                  <Input type="text"  placeholder={placeholder} />
              )
            }
          </FormItem>
          )

          formItemList.push(INPUT);
        } else if (item.type === 'TAG_SELECT') {
          // [2] TAG_SELECT
            const TAG_SELECT = (
                <FormItem key={keyIndex++} className="width100" label={label} {...formItemLayout}>
                    {
                        formData && type === 'detail' ? formData[field] :
                            getFieldDecorator(field,{
                                initialValue:  formData ?  formData[field] ? formData[field] : [] : []
                            })(
                                width ?
                                    <Select mode="multiple" style={{width: width}} placeholder={placeholder}>
                                    {
                                        item.defaultData.map((v, index) => {
                                            return <Option key={index} value={v.id}>{v.name}</Option>
                                        })
                                    }
                                    </Select> :
                                    <Select mode="multiple" placeholder={placeholder}>
                                        {
                                            item.defaultData.map((v, index) => {
                                                return <Option key={index} value={v.id}>{v.name}</Option>
                                            })
                                        }
                                    </Select>
                            )
                    }
                </FormItem>
            )
            formItemList.push(TAG_SELECT);
        } else if (item.type === 'SELECT') {
          // [3] SELECT
          const SELECT = (
            <FormItem key={keyIndex++} label={label} {...formItemLayout}>
              {
                formData && type === 'detail' ? formData[field] :
                getFieldDecorator(field, {
                    initialValue:  formData ?  formData[field] ? formData[field] : '' : ''
                })(
                  width ? 
                  
                  <Select style={{width: width}} placeholder={placeholder}>
                    {
                      item.defaultData.map((v, index) => {
                        return <Option key={index} value={v.id}>{v.name}</Option>
                      })
                    }
                  </Select> : 
                  <Select placeholder={placeholder}>
                    {
                      item.defaultData.map((v, index) => {
                        return <Option key={index} value={v.id}>{v.name}</Option>
                      })
                    }
                  </Select>
                )
              }
            </FormItem>
          )
          formItemList.push(SELECT);
        }  else if (item.type === 'TIME') {
          // [4] TIME 时间选择器（单个）
          const TIME = (
            <FormItem key={keyIndex++} label={label} {...formItemLayout}>
              {
                formData && type === 'detail' ? formData[field] :
                getFieldDecorator(field, {
                    initialValue:  formData ?  formData[field] ? moment(formData[field], item.format) : null : null
                })(
                  width ? 
                  <DatePicker  style={{width: width}} format={item.format || 'YYYY-MM-DD HH:mm:ss'} placeholder={placeholder} /> : 
                  <DatePicker  format={item.format || 'YYYY-MM-DD HH:mm:ss'} placeholder={placeholder} />
                )
              }
            </FormItem>
          )
          formItemList.push(TIME);
        } else if (item.type === 'RANG_TIME') {
          // [5] RANG_TIME 时间范围选择器
          
        }
      })
      return formItemList
    }
  }

  render () {


    return (
      <div>
        <Form layout="horizontal">
          { this.initForm() }
        </Form>
      </div>
    )
  }
}

export default Form.create({})(BaseForm);

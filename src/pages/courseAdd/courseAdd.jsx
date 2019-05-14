import React from "react";
import BaseTable from '../../components/BaseTable/BaseTable';
import { Card, Steps, Button, message, Form, Input, Select } from "antd";
// import api from '../../http/api';
import Utils from '../../utils/utils';
import "./courseAdd.less";
import api from "../../http/api";
import './courseAdd.less';
const Step = Steps.Step;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 添加课程
 */
export default class CourseAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isThird: false,
      current: 0,
      courseNum: '', // 第一步添加后返回的课程编号
      resdata: null, // 响应数据
      selectedItem: null, // 选中的一行的数据
      timetables: ['1'], // 课表数量
      lessonsList: [],
      roomList: [],
      courseId: null  // 课程id
    };
  }
  componentWillMount(){
    this.getLessonsList();
    this.getRooms();
  }

  fetchData (page) {
    api.Teacher.getTeacherList({
      page:page
    }).then((res) => {
      if(res.status === 1) {
        this.setState({
          resdata: res
        })
      }
    })
  }

  getLessonsList() {
    let list = []
    // 获取lesson数据
    api.Lessons.getLessonsList({}).then((res) => {
      if(res.status === 1) {
        list = res.data.data;
      } else {
        list = []
      }
      this.setState({
        lessonsList: list 
      })
    })
  }

  // 获取全部的教室
  getRooms() {
    let list = []
    api.Room.getAllRooms({}).then((res) => {
      if(res.status === 1) {
        list = res.data.data;
      } else {
        list = []
      }
      this.setState({
        roomList: list 
      })
    })
  }

  // 页码跳转
  handlerPager(page) {
    console.log('我拿到page后，开始请求新的数据', page);
    this.fetchData(page);
  }

  next() {
    const current = this.state.current + 1;
    if(current === 2) {
      this.setState({ 
        current: current,
        isThird: true
      });
    } else {
      this.setState({ 
        current: current
      });
    }
    

  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  // 获取第一屏数据，存入数据
  getFirstData = () => {
    let valObj = this.formFirstRef.getFormData();
    console.log(valObj);
    api.Course.addCourse(valObj).then((res) => {
      if(res.status === 1) {
        Utils.openNotification('success', '添加成功');
        this.setState({
          courseNum: res.data.com // 课程编号
        })
        this.fetchData(1);
        this.next();
      } else {
        Utils.openNotification('error', '添加失败');
      }
    })
    
    
  }

  

  getSecondData = () => {
    let item = this.baseTableRef.state.selectedItem;
    this.setState({
      selectedItem: item
    })
    api.Course.getCourseByNum({
      courseNum: this.state.courseNum
    }).then((res) =>{
      if(res.status === 1) {
        this.setState({
          courseId: res.data.courseId
        })
      }
    })
    // 选择老师
    api.Course.updateTeacher({
      courseNum: this.state.courseNum,
      tId: item.tId
    }).then((res) => {
      if(res.status === 1) {
        Utils.openNotification('success', '添加成功');
        this.next();
      } else {
        Utils.openNotification('error', '添加失败');
      }
    })
  }

  getThirdData = () => {
    // 发起请求创建课表
    let timesables = this.state.timetables;
    let resultArr = [];
    for(let i = 0; i < timesables.length; i++) {
      let valObj = this['formThirdRef'+ i].getFormData()
      var promise = api.Timetable.addTimetable({
        roomId: valObj.roomId,
        lessonId: valObj.lessonId,
        maxNum: valObj.maxNum,
        courseId: this.state.courseId
      })
      resultArr.push(promise);
    }

    Promise.all(resultArr).then((res) => {
      console.log(res);
  
      let isAllok = true;
      for(let i = 0 ; i < res.length; i++) {
        if(res[i].status !== 1) {
          isAllok = false;
        }
      }

      if(isAllok) {
        Utils.openNotification('success', '创建成功');
        window.location.href = "/#/admin/courseMs"
      } else {
        Utils.openNotification('error', '创建失败');
        this.setState({
          timetables: []
        })
      }
    })
  }

  params = {
    columns: []
  }


  // 渲染第一步
  renderFirst  = () =>{
    return <FirstStepForm wrappedComponentRef={(inst) => this.formFirstRef = inst} />;
  }

  // 渲染第二步
  renderSecond = () => {
    this.params.columns = [
      {
        title: '序号',
        render:(text,record,index)=>`${index+1}`,
        align: 'center'
      },
      {
        title: '职工编号',
        dataIndex:'tNum',
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex:'tName',
        align: 'center'
      },
      {
        title: '联系方式',
        dataIndex:'tPhone',
        align: 'center'
      },
      {
        title: '主修专业',
        dataIndex:'tMajor',
        align: 'center'
      },
      {
        title: '曾认课程',
        dataIndex:'tPreCourse',
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
        title: '入职时间',
        dataIndex:'startTime',
        align: 'center'
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
    return  <BaseTable 
              ref={(v) => this.baseTableRef = v}
              rowKey="tId"
              columnConfig={this.params.columns} 
              resData={this.state.resdata}
              handleChangePage={this.handlerPager.bind(this)}
            ></BaseTable>
  }
  // 渲染第三步
  renderThird  = () =>{
    let timesable = this.state.timetables;
    return timesable.map((item, index) => {
      return <ThirdStepForm 
              lessonsList ={this.state.lessonsList} 
              roomList={this.state.roomList} 
              className="item-timetable" 
              key={index}  
              wrappedComponentRef={(inst) => this['formThirdRef'+index] = inst} />;
    })
  }

  addTab = () => {
    let list = this.state.timetables;
    list.push('1');
    this.setState({
      timetables: list
    })
  }

  removeTab = () => {
    let list = this.state.timetables;
    list.pop();
    this.setState({
      timetables: list
    })
  }

  render() {
    const { current } = this.state;

    const steps = [
      {
        title: "第一步：填写基本信息",
        content: this.renderFirst()
      },
      {
        title: "第二步：选择任课教师",
        content: this.renderSecond()
      },
      {
        title: "第三步：创建课表",
        content: this.renderThird()
      }
    ];
    return (
      <div>
        <Card style={{ marginTop: 10 }} title="创建一个课程">
          <div>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        </Card>
        {
          this.state.isThird  ?  
          <Card style={{ marginTop: 10 }}>
            <ButtonGroup>
              <Button type="primary" onClick={this.addTab}>添加</Button>
              <Button type="primary" onClick={this.removeTab}>移除</Button>
            </ButtonGroup>
          </Card> : null
        }
        <Card>
        <div>{steps[current].content}</div>
          <div className="steps-action">
            {current === 0 && (
              <Button type="primary" onClick={ this.getFirstData }>
                下一步
              </Button>
            )}
            {current === 1 && (
              <div>
                <Button  style={{ marginRight: 10 }} onClick={() => this.prev()}>
                  上一步
                </Button>
                <Button type="primary" onClick={ this.getSecondData }>
                  下一步
                </Button>
              </div>
            )}
            {current  === 2 && (
              <Button
                type="primary"
                onClick={ this.getThirdData }
              >
                完成
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

// 第一步表单
class FirstStepForm extends React.Component {
  //登陆
  getFormData (){
    return this.props.form.getFieldsValue();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // 左右布局
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    };
    return (
      <Form>
        <FormItem label="课程名称" {...formItemLayout}>
          {getFieldDecorator("courseName", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入课程名称" />)}
        </FormItem>
        <FormItem label="课程属性" {...formItemLayout}>
          {getFieldDecorator("courseProperty", {
            initialValue: ""
          })(
            <Input
              type="text"
              placeholder="请输入课程属性（如：限选/主修等）"
            />
          )}
        </FormItem>
        <FormItem label="课程分类" {...formItemLayout}>
          {getFieldDecorator("courseSort", {
            initialValue: ""
          })(
            <Input
              type="text"
              placeholder="请输入课程分类(如：专业课，基础理论课等)"
            />
          )}
        </FormItem>

        <FormItem label="考试类型" {...formItemLayout}>
          {getFieldDecorator("examType", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入考试类型" />)}
        </FormItem>

        <FormItem label="修读方式" {...formItemLayout}>
          {getFieldDecorator("studyType", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入修读方式" />)}
        </FormItem>
        <FormItem label="周次" {...formItemLayout}>
          {getFieldDecorator("weeklyTimes", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入周次" />)}
        </FormItem>
      </Form>
    );
  }
}

FirstStepForm = Form.create({})(FirstStepForm);


// 第三步表单
class ThirdStepForm extends React.Component {
  constructor (){
    super();
    this.state = {
      
    }
  }
  //登陆
  getFormData (){
    return this.props.form.getFieldsValue();
  };

  renderWeeks = () => {
    let list = this.props.lessonsList || [];
    return list.map((item, index) => {
      return <Option key={index} value={item.lessonId}>{item.remark}</Option>
    })

  }

  renderRooms = () => {
    let list = this.props.roomList || [];
    return list.map((item, index) => {
      return <Option key={index + 10} value={item.roomId}>{item.roomNum}</Option>
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // 左右布局
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    };

    return (
      <Form className="item-timetable">
        <FormItem label="节次" {...formItemLayout}>
          {getFieldDecorator("lessonId", {
            initialValue: ""
          })(
            <Select>
              {
                this.renderWeeks()
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="教室" {...formItemLayout}>
          {getFieldDecorator("roomId", {
            initialValue: ""
          })(
            <Select>
              {
                this.renderRooms()
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="限选人数" {...formItemLayout}>
          {getFieldDecorator("maxNum", {
            initialValue: ""
          })(
            <Input
              type="text"
              placeholder="请输入限选人数"
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

ThirdStepForm = Form.create({})(ThirdStepForm);

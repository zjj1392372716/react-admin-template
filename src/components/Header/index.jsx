import React, {Component} from 'react';
import './index.less';
import Api from '../../http/api';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MenuConfig from '../../config/menuConfig';
import { changeNavList } from '../../redux/actions/breadcrumbAction'
import { Breadcrumb } from 'antd';
function mapStateToProps(state) {
  return {
    list: state.breadcrumbReducer.nav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavList: bindActionCreators(changeNavList, dispatch)
  }
}


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: 'meils', // 用户名
      currentDateTime: '', // 系统时间
      wedu: '', // 温度
      shidu: '', // 湿度
      BreadcrumbList: [], // 面包屑导航列表
      con: 'ss'
    }
  }
  componentWillMount () {

    if(window.sessionStorage.getItem('USERNAME')) {
      this.setState({
        username: window.sessionStorage.getItem('USERNAME')
      })
    }
    // 实时系统时间
    // setInterval(() => {
    //   let currentDateTime = Utils.formatDate(new Date());
    //   this.setState({
    //     currentDateTime
    //   })
    // }, 1000)

    this.getCurrentWeather()
  }


  componentDidMount() {
      window.addEventListener('hashchange', function () {
          console.log('hash is change');
      })
  }


  // 获取路由
  getPath = () => {
    let path = this.props.location.pathname;
    let result = this.getNavBreadBypath(path);

    this.setState({
      con: result.join('/')
    })

  }

  // 通过路由动态生成面包屑导航
  getNavBreadBypath = (path) => {
    let result = [];
    for(let i = 0, len = MenuConfig.length; i < len; i ++) {
      if(MenuConfig[i].children) {
        let isFind = false;
        for(let j =0, len1 = MenuConfig[i].children.length; j < len1; j ++) {
          if(path === MenuConfig[i].children[j].key) {
            result.push(MenuConfig[i].children[j].title);
            isFind = true;
          }
        }
        if(isFind) {
          result.push(MenuConfig[i].title);
          return result;
        }

      } else {
        if(path === MenuConfig[i].key) {
          result.push(MenuConfig[i].title);
          return result;
        }
      }
    }
  }

  getCurrentWeather = () => {
    Api.getWeather().then((res) => {
      if(res.status === 200) {
        this.setState({
          wendu: res.data.wendu,
          shidu: res.data.shidu
        })
      }
    })
  }

  renderBreadCrumb() {
    let list = this.props.list
    return list.map((item, index) => {
      return (
        <Breadcrumb.Item key={index}>
          {item.name}
        </Breadcrumb.Item>
      )
    })
  }

  handleExit = () => {
    window.sessionStorage.clear();
    window.location.href = '/';
  }

  render () {
    return (
      <div className="m-header-wrapper">
        {this.props.children}
        <div className="m-header-top">
          <span className="m-header-userName">欢迎，{this.state.username}</span>
          <span className="m-header-exit" onClick={this.handleExit}>注销</span>
        </div>
        <div className="nav-bar">
          <div className="nav-bar-left">
            <Breadcrumb>
              {
                this.renderBreadCrumb()
              }
            </Breadcrumb>
          </div>
          <div className="nav-bar-right">
            <span className="m-header-bar-right-time">{this.state.currentDateTime}</span>
            <span className="m-header-bar-right-wendu">
              温度：
              {this.state.wendu}
              &#8451;
            </span>
            <span className="m-header-bar-right-shidu">
              湿度：
              {this.state.shidu}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


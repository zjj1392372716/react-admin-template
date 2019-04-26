import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './index.less';
import MenuConfig from '../../config/menuConfig';
import { NavLink } from 'react-router-dom';
import Utils from '../../utils/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeNavList } from '../../redux/actions/breadcrumbAction'
import proConfig from '../../config/proj.config.js';
const SubMenu = Menu.SubMenu;

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


class NavLeft extends Component {

  constructor () {
    super();
    this.state = {
      collapsed: false, // 是否展开
      openKeys: ['sub1'], // 展开的menu key
      menuTreeNode: null // 菜单节点树
    }

    this.rootSubmenuKeys = [];
  }

  componentWillMount() {
    // 记录key值
    this.rootSubmenuKeys = []
    MenuConfig.forEach((item, index) => {
      item.key = item.key + ""
      this.rootSubmenuKeys.push(item.key)
      if(index === 0) {
        this.setState({
          openKeys: [''+item.key+'']
        })
      }
    })

    // 渲染节点树
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      menuTreeNode
    })
  }

  handleClick(item) {
    let hash = item.key
    let list = Utils.getMenuInfo(hash);
    list = list.reverse();
    let nav = []
    let len = list.length;
    list.forEach((item, index) => {
      if(len === 2) {
        let obj = {};
        obj.link = list[1].key
        obj.name = item.title
        nav.push(obj)
      } else {
        let obj = {};
        obj.link = item.key
        obj.name = item.title
        nav.push(obj)
      }
    })
    this.props.changeNavList({
      list: nav
    })
  }


  // 渲染菜单
  renderMenu = (config) => {
    return config.map((item) => {
      if(item.children) {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.iconType} /><span>{item.title}</span></span>}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <NavLink to={item.key} onClick={()=>{
              this.handleClick.call(this, item)
            }}>
            <Icon type={item.iconType} />
            <span>{item.title}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  // 打开菜单
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  // 切换展开隐藏
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    return (
      <div className="navLeft-wrapper">
        <div className="logo_header">
          <img src={proConfig.logoUrl} alt="" />
          <span className="logo-title">{proConfig.leftNavTopTitle}</span>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLeft)

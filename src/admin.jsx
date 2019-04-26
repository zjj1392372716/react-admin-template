import React from 'react';
import { Icon, Layout} from 'antd';
import NavLeft from './components/NavLeft/index.jsx';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import './common/style/admin.less';

const {Sider} = Layout;

class Admin extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    return (
      <div>
      <Layout>
        <Sider
          width="240"
          className="nav-left"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <NavLeft></NavLeft>
        </Sider>
        <Layout className="mainCon">
          <Header style={{ background: '#fff', padding: 0 }} itemDate={this.props.list}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <div style={{margin: '24px 16px', padding: 0, background: '#f0f2f5',}}>
            {this.props.children}
          </div>
          <Footer></Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}


export default Admin

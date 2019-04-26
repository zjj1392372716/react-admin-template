import React from 'react'
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from './App.js';
import Login from './pages/Login/Login';                                    // 登陆
import Admin from './admin.jsx';                                            // 外部容器
import Home from './pages/Home/Home.jsx';                                   // 首页
export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/admin" render={() =>
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home}></Route>
                  <Redirect to="/admin/home" />
                </Switch>
              </Admin>
            } />
            <Route path="/" component={Login} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

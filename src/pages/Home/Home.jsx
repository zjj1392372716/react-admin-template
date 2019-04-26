import React from 'react';
import './Home.less';
import proConfig from '../../config/proj.config.js';

export default class Home extends React.Component {

  componentWillMount () {

  }

  render () {
    return (
      <div>
        <div className="home-wrap">
          {proConfig.homeInfo}
        </div>
      </div>
    )
  }
}

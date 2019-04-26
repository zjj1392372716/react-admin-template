import React from 'react'
import './index.less'
import proConfig from '../../config/proj.config.js';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
               {proConfig.footerInfo}
            </div>
        );
    }
}
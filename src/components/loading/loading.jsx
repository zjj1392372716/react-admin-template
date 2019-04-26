import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './loading.less';

export default class Loading extends Component {
    render() {
        let { tip } = this.props;
        console.log(tip);
        return (
            <div className="loading">
                <div className="loading-mask">
                    <div className="loading-outter">
                        <div className="loading-wrapper">
                          <img src="/assets/loading.svg" alt="" />
                        </div>
                        <div className="loading-content">{ tip }</div>
                    </div>
                </div>
            </div>
        );
    }
}

Loading.propTypes = {
    tip: PropTypes.string,
};

Loading.newInstance = function newNotificationInstance(properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Loading, props), div);
    return {
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};

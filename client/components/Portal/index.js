import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 当前组件可以不包含在app模块下
 */
class Portal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div className="cover">cover</div>,
      document.body,
    );
  }
}

export default Portal;

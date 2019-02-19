import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Portal from 'client/components/Portal';
import Routes from '../config/router';
import ErrorBoundary from '../components/ErrorBoundary';
import Test from '../components/Test';

export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <ErrorBoundary>
        <div key="app">
          <div>
            <Link to="/">首页</Link>
            <Link to="/product">产品页</Link>
          </div>
          <Test />
          <Routes key="router" />
        </div>
        <Portal />
      </ErrorBoundary>
    );
  }
}

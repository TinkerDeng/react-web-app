import React from 'react';
import { StaticRouter } from 'react-router-dom'; // 服务端渲染时的路由组件
import { Provider, useStaticRendering } from 'mobx-react';

import App from './views/app';

import { createStoreMap } from './store/store';

// 让mobx在服务端渲染的时候不会重复数据变化
useStaticRendering(true);

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
);
export { createStoreMap };

import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../views/home';
import Product from '../views/product';
import NotFound from '../views/notFound';

export default () => [
  <Route path="/" component={Home} exact key="first" />,
  <Route path="/product" component={Product} key="product" />,
  <Route path="*" component={NotFound} key="404" />,
];

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { BrowserRouter as Router } from 'react-router-dom';

import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/app';
import AppState from './store/app-state';

const root = document.getElementById('app');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={new AppState()}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    root,
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./views/app', () => {
    const NextApp = require('./views/app').default;// eslint-disable-line
    render(NextApp);
  });
}

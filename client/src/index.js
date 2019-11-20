import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddlware from 'redux-saga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import { fetchCurrentUserSuccess, fetchCurrentUserRequest } from './actions/users';
import { localeSet } from './actions/locale';
import { themeSet } from './actions/theme';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';

import * as _ from 'lodash';

import '../src/assets/less/index.less';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import rootSaga from './rootSaga';
import history from './history';

const sagaMiddlware = createSagaMiddlware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddlware, thunk)),
);

sagaMiddlware.run(rootSaga);

if (localStorage.photosalonJWT) {
  setAuthorizationHeader(localStorage.photosalonJWT);

  store.dispatch(fetchCurrentUserRequest());
} else {
  store.dispatch(fetchCurrentUserSuccess({}));
}

if (localStorage.alhubLang) {
  store.dispatch(localeSet(localStorage.alhubLang));
}

if (localStorage.alhubTheme) {
  store.dispatch(themeSet(localStorage.alhubTheme));
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

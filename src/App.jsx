import React from 'react';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MainTemplate from './templates/main/Main';

import './App.sass';

const store = createStore(
  combineReducers({
  }),
  applyMiddleware(
    thunk
  )
);

render(
  <Provider store={store}>
    <MainTemplate />
  </Provider>,
  document.getElementById('app')
);

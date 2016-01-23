import {registerComponent} from 'aframe';
import {component as TextComponent} from 'aframe-text-component';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import LoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import SketchScene from './components/SketchScene';
import editor from './reducers/editor';

registerComponent('text', TextComponent);

const reducer = combineReducers({
  editor
});
const createFinalStore = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  LoggerMiddleware()
)(createStore);
const store = createFinalStore(reducer);

const ReduxApp = () => (
  <Provider store={store}>
    <SketchScene/>
  </Provider>
);

ReactDOM.render(<ReduxApp/>, document.querySelector('.scene-container'));

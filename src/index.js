import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import batchReducer from './reducers/batchReducer';
import scopeReducer from './reducers/scopeReducer';
import todoReducer from './reducers/todoReducer';

import './index.css';

const rootReducer = combineReducers({
  batch: batchReducer,
  scope: scopeReducer,
  todo: todoReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

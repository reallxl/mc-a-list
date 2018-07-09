import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import todoReducer from './reducers/todoReducer';
import functionReducer from './reducers/functionReducer';

import './index.css';

const rootReducer = combineReducers({
  todo: todoReducer,
  func: functionReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

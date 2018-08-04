import { combineReducers } from 'redux';

import databaseReducer from './database';
import displayReducer from './display';

const rootReducer = combineReducers({
  database: databaseReducer,
  display: displayReducer,
});

export default rootReducer;

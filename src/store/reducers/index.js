import { combineReducers } from 'redux';

import databaseReducer from './database';
import displayReducer from './display';
import periodReducer from './period';

const rootReducer = combineReducers({
  database: databaseReducer,
  display: displayReducer,
  period: periodReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';

import editReducer from './edit';
import databaseReducer from './database';
import displayReducer from './display';

const rootReducer = combineReducers({
  edit: editReducer,
  database: databaseReducer,
  display: displayReducer,
});

export default rootReducer;

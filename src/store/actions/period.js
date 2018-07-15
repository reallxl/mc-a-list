import ACTION from '../actionTypes';
import * as display from './display';

//----------------------------------------------------------------------------------------------------
// setPeriodType
//----------------------------------------------------------------------------------------------------
export const setPeriodType = (periodType, date) => {
  return (dispatch, getState) => {
    dispatch(doSetPeriodType(periodType, date));
    dispatch(display.refreshTodos(getState().period.period.fromDate, getState().period.period.toDate, getState().database.todos));
  };
};
//----------------------------------------------------------------------------------------------------
// updatePeriod
//----------------------------------------------------------------------------------------------------
export const updatePeriod = (dir) => {
  return (dispatch, getState) => {
    dispatch(doUpdatePeriod(dir));
    dispatch(display.refreshTodos(getState().period.period.fromDate, getState().period.period.toDate, getState().database.todos));
  };
};

//****************************************************************************************************
// local functions
//****************************************************************************************************

const doSetPeriodType = (periodType, date) => {
  return {
    type: ACTION._SET_PERIOD_TYPE,
    periodType,
    date,
  };
};

const doUpdatePeriod = (dir) => {
  return {
    type: ACTION._SHIFT_PERIOD,
    dir,
  };
};

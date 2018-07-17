import ACTION from '../actionTypes';

//----------------------------------------------------------------------------------------------------
// setPeriodType
//----------------------------------------------------------------------------------------------------
export const setPeriodType = periodType => {
  return (dispatch, getState) => {
    dispatch(doSetPeriodType(periodType));
    dispatch(reloadTodos(getState().database.todos));
  };
};
//----------------------------------------------------------------------------------------------------
// setPeriod
//----------------------------------------------------------------------------------------------------
export const setPeriod = (periodType, fromDate, toDate) => {
  return (dispatch, getState) => {
    dispatch(doSetPeriod(periodType, fromDate, toDate));
    dispatch(reloadTodos(getState().database.todos));
  };
};
//----------------------------------------------------------------------------------------------------
// shiftPeriod
//----------------------------------------------------------------------------------------------------
export const shiftPeriod = dir => {
  return (dispatch, getState) => {
    dispatch(doShiftPeriod(dir));
    dispatch(reloadTodos(getState().database.todos));
  };
};
//----------------------------------------------------------------------------------------------------
// reloadTodos
//----------------------------------------------------------------------------------------------------
export const reloadTodos = todos => {
  return {
    type: ACTION._RELOAD,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// renderTod
//----------------------------------------------------------------------------------------------------
export const renderTodo = todo => {
  return {
    type: ACTION._RENDER,
    todo,
  };
};
//----------------------------------------------------------------------------------------------------
// reRenderTodo
//----------------------------------------------------------------------------------------------------
export const reRenderTodos = todos => {
  return {
    type: ACTION._RE_RENDER,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// hideTodos
//----------------------------------------------------------------------------------------------------
export const hideTodos = todos => {
  return {
    type: ACTION._HIDE,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// selectTodos
//----------------------------------------------------------------------------------------------------
export const selectTodos = (todos, selected) => {
  return {
    type: ACTION._SELECT,
    todos,
    selected,
  };
}
//----------------------------------------------------------------------------------------------------
// sortTodos
//----------------------------------------------------------------------------------------------------
export const sortTodos = sortingKey => {
  return {
    type: ACTION._SORT,
    sortingKey,
  };
};

//****************************************************************************************************
// local functions
//****************************************************************************************************

const doSetPeriodType = periodType => {
  return {
    type: ACTION._SET_PERIOD_TYPE,
    periodType,
  };
};

const doSetPeriod = (periodType, fromDate, toDate) => {
  return {
    type: ACTION._SET_PERIOD,
    periodType,
    fromDate,
    toDate,
  };
};

const doShiftPeriod = dir => {
  return {
    type: ACTION._SHIFT_PERIOD,
    dir,
  };
};

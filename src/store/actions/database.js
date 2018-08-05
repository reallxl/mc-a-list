import ACTION from '../actionTypes';
import * as display from './display';

//----------------------------------------------------------------------------------------------------
// addTodo
//----------------------------------------------------------------------------------------------------
export const addTodo = (content) => {
  return (dispatch, getState) => {
    dispatch(doAddTodo(content));

    const todo = getState().database.todos[getState().database.todos.length - 1];

    if (todo.content.date >= getState().display.period.fromDate && todo.content.date <= getState().display.period.toDate) {
      //--- put newly added todo onto screen immediately if it's within the period
      dispatch(display.renderTodo(todo));
    }
  };
};
//----------------------------------------------------------------------------------------------------
// updateTodos
//----------------------------------------------------------------------------------------------------
export const updateTodos = (ids, content) => {
  return (dispatch, getState) => {
    dispatch(doUpdateTodos(ids, content));

    const updatedTodos = getState().database.todos.filter(todo => ids.includes(todo.id));

    dispatch(display.reRenderTodos(updatedTodos));
  };
};
//----------------------------------------------------------------------------------------------------
// deleteTodos
//----------------------------------------------------------------------------------------------------
export const deleteTodos = (ids) => {
  return (dispatch, getState) => {
    dispatch(display.hideTodos(getState().database.todos.filter(todo => ids.includes(todo.id))));
    dispatch(doDeleteTodos(ids));
  };
};

//****************************************************************************************************
// local functions
//****************************************************************************************************

const doAddTodo = (content) => {
  return {
    type: ACTION._ADD,
    content,
  };
}

const doUpdateTodos = (ids, content) => {
  return {
    type: ACTION._UPDATE,
    ids,
    content,
  };
};

const doDeleteTodos = (ids) => {
  return {
    type: ACTION._DELETE,
    ids,
  };
};

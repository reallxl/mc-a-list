import ACTION from '../actionTypes';
import * as display from './display';

//----------------------------------------------------------------------------------------------------
// addTodo
//----------------------------------------------------------------------------------------------------
export const addTodo = (content) => {
  return (dispatch, getState) => {
    dispatch(doAddTodo(content));

    const todo = getState().database.todos[getState().database.todos.length - 1];

    if (todo.date >= getState().period.period.fromDate && todo.date <= getState().period.period.toDate) {
      //--- put newly added todo onto screen immediately if it's within the period
      dispatch(display.renderTodo(todo));
    }
  };
};
//----------------------------------------------------------------------------------------------------
// updateTodos
//----------------------------------------------------------------------------------------------------
export const updateTodos = (todos, content) => {
  return (dispatch, getState) => {
    dispatch(doUpdateTodos(todos, content));

    const updatedTodos = getState().database.todos.filter(todo => todos.find(testTodo => testTodo.id === todo.id));

    dispatch(display.reRenderTodos(updatedTodos));
  };
};
//----------------------------------------------------------------------------------------------------
// deleteTodos
//----------------------------------------------------------------------------------------------------
export const deleteTodos = (todos) => {
  return (dispatch, getState) => {
    dispatch(display.hideTodos(todos));
    dispatch(doDeleteTodos(todos));
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

const doUpdateTodos = (todos, content) => {
  return {
    type: ACTION._UPDATE,
    todos,
    content,
  };
};

const doDeleteTodos = (todos) => {
  return {
    type: ACTION._DELETE,
    todos,
  };
};

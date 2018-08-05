import ACTION from '../actionTypes';
import { STATUS } from '../../global/definitions/index';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const INIT_STATE = {
  todos: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION._ADD: return addTodo(state, action);
    case ACTION._UPDATE: return updateTodos(state, action);
    case ACTION._DELETE: return deleteTodos(state, action);
    default: return state;
  }
};

export default reducer;
//----------------------------------------------------------------------------------------------------
// addTodo
//----------------------------------------------------------------------------------------------------
const addTodo = (state, action) => {
  const todo = {
    id: new Date().getTime() + state.todos.length,
    content: action.content,
  };

  return {
    ...state,
    todos: state.todos.concat(todo),
  };
};
//----------------------------------------------------------------------------------------------------
// updateTodos
//----------------------------------------------------------------------------------------------------
const updateTodos = (state, action) => {
  const todos = state.todos.slice();

  todos.forEach(todo => {
    if (action.ids.includes(todo.id)) {
      todos.splice(todos.indexOf(todo), 1, {
        ...todo,
        content: {
          ...todo.content,
          ...action.content,
        },
      });
    }
  });

  return {
    ...state,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// deleteTodos
//----------------------------------------------------------------------------------------------------
const deleteTodos = (state, action) => {
  return {
    ...state,
    todos: state.todos.filter(todo => action.ids.includes(todo.id) === false),
  };
};

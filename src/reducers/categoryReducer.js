import CAT from '../definitions/categories';

const initState = {
  todos: [],
  activeTodos: [],
  selectedTodos: [],
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case OP._SORT: {
      const todos = action.todos.slice();
      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default todoReducer;

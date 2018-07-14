import OP from '../definitions/operations';
import STATUS from '../definitions/statuses';

const INIT_STATE = {
  todos: [],
  filteredTodos: [],
  selectedTodos: [],
};

const todoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //----------------------------------------------------------------------------------------------------
    // OP._ADD
    //----------------------------------------------------------------------------------------------------
    case OP._ADD: {
      const todo = {
        id: new Date().getTime() + state.todos.length,
        status: STATUS._ON_GOING,
        ...action.content,
      };

      state = {
        ...state,
        todos: state.todos.concat(todo),
      };

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._UPDATE
    //----------------------------------------------------------------------------------------------------
    case OP._UPDATE: {
      let todos = state.todos.slice();
      const selectedTodos = action.id ?
        [ todos.find(todo => todo.id === action.id) ] :
        state.selectedTodos.slice();
      let todo;

      while ((todo = selectedTodos.pop())) {
        todos.splice(todos.indexOf(todo), 1, {
          ...todo,
          ...action.content,
        });

      }

      state = {
        ...state,
        todos: todos,
      };

      if (action.id === undefined) {
        state.selectedTodos = [];
      }

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._DELETE
    //----------------------------------------------------------------------------------------------------
    case OP._DELETE: {
      const selectedTodos = action.id ? [ state.todos.find(todo => todo.id === action.id) ] : state.selectedTodos;

      state = {
        ...state,
        todos: state.todos.filter(todo => selectedTodos.includes(todo) === false),
      };
      console.log(state.todos, selectedTodos);
      if (action.id === undefined) {
        state.selectedTodos = [];
      }

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._SELECT
    //----------------------------------------------------------------------------------------------------
    case OP._SELECT: {
      const todo = state.todos.find(todo => todo.id === action.id);
      const selectedTodos = state.selectedTodos.slice();

      if (action.value) {
        //--- select
        if (selectedTodos.includes(todo) === false) {
          selectedTodos.push(todo);
        }
      } else {
        //--- de-select
        if (selectedTodos.includes(todo)) {
          selectedTodos.splice(selectedTodos.indexOf(todo), 1);
        }
      }

      state = {
        ...state,
        selectedTodos: selectedTodos,
      };

      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default todoReducer;

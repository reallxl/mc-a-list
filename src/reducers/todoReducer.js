import OP from '../definitions/operations';
import STAT from '../definitions/statuses';

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
        status: STAT._ON_GOING,
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
      const todos = state.todos.slice();
      const todo = todos.find(todo => todo.id === action.id);

      todos.splice(todos.indexOf(todo), 1, {
        ...todo,
        ...action.content,
      });

      state = {
        ...state,
        todos: todos,
      };

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._UPDATE_STATUS
    //----------------------------------------------------------------------------------------------------
    case OP._UPDATE_STATUS: {
      let todos = state.todos.slice();
      const selectedTodos = action.id ? [ todos.find(todo => todo.id === action.id) ] : state.selectedTodos.slice();
      let todo;

      while ((todo = selectedTodos.pop())) {
        if (todo.status !== action.status) {
          todos.splice(todos.indexOf(todo), 1, {
            ...todo,
            status: action.status,
          });

          if (action.status === STAT._DONE) {
            //--- auto sorting while updating status to STAT._DONE
            todos = todos.filter(todo => todo.status === STAT._DONE).concat(todos.filter(todo => todo.status !== STAT._DONE));
          }
        }
      }

      state = {
        ...state,
        todos: todos,
        selectedTodos: action.id ? state.selectedTodos : selectedTodos,
      };

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._DELETE
    //----------------------------------------------------------------------------------------------------
    case OP._DELETE: {
      const selectedTodos = action.id ? [ state.todos.find(todo => todo.id === action.id) ] : state.selectedTodos.slice();

      state = {
        ...state,
        todos: state.todos.filter(todo => selectedTodos.includes(todo) === false),
        selectedTodos: action.id ? state.selectedTodos : [],
      };

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

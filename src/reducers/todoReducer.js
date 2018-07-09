import CAT from '../definitions/categories';
import OP from '../definitions/operations';
import STAT from '../definitions/statuses';

const initState = {
  todos: [],
  activeTodos: [],
  selectedTodos: [],
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case OP._ADD: {
      const todo = {
        id: new Date().getTime() + state.todos.length,
        status: STAT._ON_GOING,
        content: action.content,
      };

      state = {
        ...state,
        todos: state.todos.concat(todo),
      };

      break;
    }
    case OP._UPDATE: {
      const todos = state.todos.slice();
      const todo = todos.find(todo => todo.id === action.id);

      todos.splice(todos.indexOf(todo), 1, {
        ...todo,
        content: action.content,
      });

      state = {
        ...state,
        todos: todos,
      };

      break;
    }
    case OP._UPDATE_STATUS: {
      let todos = state.todos.slice();
      const selectedTodos = state.selectedTodos.slice();
      let todo;

      if (action.id) {
        //--- single
        todo = todos.find(todo => todo.id === action.id);
      } else {
        //--- batch
        todo = selectedTodos.pop();
      }

      do {
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
      } while (action.id === undefined && (todo = selectedTodos.pop()));

      if (action.id) {
        //--- single
        state = {
          ...state,
          todos: todos,
        }
      } else {
        //--- batch
        state = {
          ...state,
          todos: todos,
          selectedTodos: [],
        }
      }

      break;
    }
    case OP._DELETE: {
      let todos;

      if (action.id) {
        //--- single
        todos = state.todos.filter(todo => todo.id !== action.id);
      } else {
        //--- batch
        todos = state.todos.filter(todo => state.selectedTodos.includes(todo) === false);
      }

      state = {
        ...state,
        todos: todos,
        selectedTodos: [],
      };

      break;
    }
    case OP._SELECT: {
      const todo = state.todos.find(todo => todo.id === action.id);
      const selectedTodos = state.selectedTodos.slice();

      if (action.value) {
        if (selectedTodos.includes(todo) === false) {
          selectedTodos.push(todo);
        }
      } else {
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
    case OP._SORT: {
      let todos;

      if (action.criterion) {
        //--- sort based on given criterion
        const groupedTodos = [];

        state.todos.forEach(todo => {
          const group = groupedTodos.find(group => group[action.criterion] === todo.content[action.criterion]);

          if (group) {
            //--- categorize into an existing group
            group.todos.push(todo);
          } else {
            //--- add a new group
            groupedTodos.push({
              [action.criterion]: todo.content[action.criterion],
              todos: [ todo, ],
            });
          }
        });

        todos = [];
        groupedTodos.forEach(group => {
          todos = todos.concat(group.todos);
        });
      } else {
        //--- default order (by creation time)
        todos = state.todos.slice();

        todos.sort((priorTodo, laterTodo) => priorTodo.id - laterTodo.id);
      }

      state = {
        ...state,
        todos: todos,
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

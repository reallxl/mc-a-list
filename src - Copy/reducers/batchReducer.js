import OP from '../definitions/operations';
import STAT from '../definitions/statuses';

const initState = {
  //--- TODO
};

const batchReducer = (state = initState, action) => {
  //--- TODO
  /*if (action.selectedTodos.length) {
    //--- default protection
    switch (action.type) {
      case OP._UPDATE_STATUS: {
        const todos = action.todos.slice();
        let todo;

        while ((todo = selectedTodos.pop())) {
          if (todo.status !== action.status) {
            todos.splice(todos.indexOf(todo), 1, {
              ...todo,
              status: action.status,
            });
          }
        }

        if (action.status === STAT._DONE) {
          //--- auto sorting while updating status to STAT._DONE
          todos = todos.filter(todo => todo.status === STAT._DONE).concat(todos.filter(todo => todo.status !== STAT._DONE));
        }

        state = {
          ...state,
          todos: todos,
        }

        break;
      }
      case OP._DELETE: {
        const todos = action.todos.filter(todo => action.selectedTodos.includes(todo) === false);

        state = {
          ...state,
          todos: todos,
          selectedTodos: [],
        };

        break;
      }
      case OP._SORT: {
        let todos;

        if (action.criterion) {
          //--- sort based on given criterion
          const groupedTodos = [];

          action.todos.forEach(todo => {
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
          todos = action.todos.slice();

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
  }*/

  return state;
};

export default batchReducer;

import OP from '../definitions/operations';
import STAT from '../definitions/statuses';
import SCOPE from '../definitions/scopes';

const INIT_STATE = {
  totalTodoNum: 0,
  allTodos: [],
  filteredTodos: [],
  selectedTodos: [],
  scope: {
    type: SCOPE._DAY,
    fromDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
    toDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
  },
};

const todoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //----------------------------------------------------------------------------------------------------
    // OP._ADD
    //----------------------------------------------------------------------------------------------------
    case OP._ADD: {
      const todo = {
        id: new Date().getTime() + state.totalTodoNum,
        status: STAT._ON_GOING,
        content: action.content,
      };

      const dailyTodoList = state.dailyTodoList.slice();
      let dailyTodos = dailyTodoList.find(dailyTodos => dailyTodos.date === todo.content.date);

      if (dailyTodos) {
        //--- add to an existing dailyTodos
        const todos = dailyTodos.todos.concat(todo);

        dailyTodoList.splice(dailyTodoList.indexOf(dailyTodos), 1, {
          ...dailyTodos,
          todos: todos,
        });
      } else {
        //--- create a new dailyTodos and push into dailyTodoList
        dailyTodos = {
          date: todo.content.date,
          todos: [
            todo,
          ],
        };

        dailyTodoList.push(dailyTodos);
        dailyTodoList.sort((priorDateTodos, laterDateTodos) => {
          let ret = 0;

          if (priorDateTodos.date < laterDateTodos.date) {
            ret = -1;
          } else if (priorDateTodos.date > laterDateTodos.date) {
            ret = 1;
          }

          return ret;
        });
      }

      state = {
        ...state,
        totalTodoNum: state.totalTodoNum + 1,
        dailyTodoList: dailyTodoList,
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
        content: action.content,
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
      const dailyTodoList = state.dailyTodoList.slice();
      let selectedTodos = action.todo ? [ action.todo ] : state.selectedTodos.slice();
      let dailyTodos = undefined, todos, todo;

      const updateTodos = (dailyTodoList, dailyTodos, todos) => dailyTodoList.splice(dailyTodoList.indexOf(dailyTodos), 1, {
        ...dailyTodos,
        todos: todos,
      });

      while ((todo = selectedTodos.pop())) {
        if (todo.status !== action.status) {
          if (dailyTodos === undefined || dailyTodos.date != todo.content.date) {
            if (dailyTodos) {
              //--- update modifications of last dailyTodos
              updateTodos(dailyTodoList, dailyTodos, todos);
            }

            dailyTodos = dailyTodoList.find(dailyTodos => dailyTodos.date === todo.content.date),
            todos = dailyTodos.todos.slice();
          }

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

      updateTodos(dailyTodoList, dailyTodos, todos);

      if (action.todo) {
        state = {
          ...state,
          dailyTodoList: dailyTodoList,
        };
      } else {
        state = {
          ...state,
          dailyTodoList: dailyTodoList,
          selectedTodos: [],
        };
      }

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._DELETE
    //----------------------------------------------------------------------------------------------------
    case OP._DELETE: {
      let selectedTodos = action.todo ? [ action.todo ] : state.selectedTodos.slice();
      const deleteTodoNum = selectedTodos.length;
      let todos;

      if (action.todo) {
        //--- single
        todos = state.todos.filter(todo => todo.id !== action.id);
      } else {
        //--- batch
        todos = state.todos.filter(todo => state.selectedTodos.includes(todo) === false);
      }
      while ((todo = selectedTodos.pop())) {
        if (dailyTodos === undefined || dailyTodos.date != todo.content.date) {
          if (dailyTodos) {
            //--- update modifications of last dailyTodos
            updateTodos(dailyTodoList, dailyTodos, todos);
          }

          dailyTodos = dailyTodoList.find(dailyTodos => dailyTodos.date === todo.content.date),
          todos = dailyTodos.todos.filter(todo => state.selectedTodos.includes(todo) === false);
        }

        todos.splice(todos.indexOf(todo), 1, {
          ...todo,
          status: action.status,
        });

        if (action.status === STAT._DONE) {
          //--- auto sorting while updating status to STAT._DONE
          todos = todos.filter(todo => todo.status === STAT._DONE).concat(todos.filter(todo => todo.status !== STAT._DONE));
        }
      }

      if (action.todo) {
        state = {
          ...state,
          totalTodoNum: state.totalTodoNum - deleteTodoNum,
          dailyTodoList: dailyTodoList,
        };
      } else {
        state = {
          ...state,
          totalTodoNum: state.totalTodoNum - deleteTodoNum,
          dailyTodoList: dailyTodoList,
          selectedTodos: [],
        };
      }

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._SELECT
    //----------------------------------------------------------------------------------------------------
    case OP._SELECT: {
      const selectedTodos = state.selectedTodos.slice();

      if (action.value) {
        //--- select
        if (selectedTodos.includes(action.todo) === false) {
          selectedTodos.push(action.todo);
        }
      } else {
        //--- de-select
        if (selectedTodos.includes(action.todo)) {
          selectedTodos.splice(selectedTodos.indexOf(action.todo), 1);
        }
      }

      state = {
        ...state,
        selectedTodos: selectedTodos,
      };

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._SORT
    //----------------------------------------------------------------------------------------------------
    case OP._SORT: {
      let todos;

      if (action.criterion === 'default') {
        todos = state.todos.slice();

        todos.sort((priorTodo, laterTodo) => priorTodo.id - laterTodo.id);
      } else {
        //--- sort based on given criterion
        const groupedTodos = [];

        state.todos.forEach(todo => {
          const group = groupedTodos.find(group => group[action.criterion] === todo.content[action.criterion]);

          if (group) {
            //--- push into an existing group
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
      }

      state = {
        ...state,
        todos: todos,
      };

      break;
    }
    //----------------------------------------------------------------------------------------------------
    // OP._UPDATE_SCOPE
    //----------------------------------------------------------------------------------------------------
    case OP._UPDATE_SCOPE: {
      if (action.scopeType !== state.scope.type) {
        const today = new Date();
        let fromTime, toTime;

        switch (action.scopeType) {
          default:
          case SCOPE._DAY: {
            fromTime = toTime = today.getTime();
            break;
          }
          case SCOPE._WEEK: {
            fromTime = new Date(today.getTime()).setDate(today.getDate() - today.getDay());
            toTime = new Date(today.getTime()).setDate(today.getDate() + (6 - today.getDay()));
            break;
          }
          case SCOPE._MONTH: {
            fromTime = new Date(today.getTime()).setDate(1);
            toTime = new Date(new Date(today.getTime()).setMonth(today.getMonth() + 1)).setDate(0);
            break;
          }
          case SCOPE._SEASON: {
            fromTime = new Date(new Date(today.getTime()).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1);
            toTime = new Date(new Date(today.getTime()).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0);
            break;
          }
        }

        state = {
          ...state,
          scope: {
            type: action.scopeType,
            fromDate: new Date(fromTime - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
            toDate: new Date(toTime - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
          },
        }
      }

      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default todoReducer;

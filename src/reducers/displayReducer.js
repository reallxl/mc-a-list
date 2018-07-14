import * as DEFAULT from '../definitions/defaultSettings';

import OP from '../definitions/operations';
import RANGE from '../definitions/ranges';

import { getDisplayingTodos, sortTodoList, localDate, getDateStr } from './utility';

const initState = {
  range: {
    type: RANGE._DAY,
    fromDate: getDateStr(localDate()),
    toDate: getDateStr(localDate()),
  },
  sortingKey: DEFAULT._SORTING_KEY,
  rangeTodoList: [],
};

const displayReducer = (state = initState, action) => {
  switch (action.type) {
    case OP._DISPLAY: {
      const rangeTodoList = state.rangeTodoList.slice();
      const dailyTodoList = rangeTodoList.find(dailyTodoList => dailyTodoList.date === action.todo.date);

      if (dailyTodoList) {
        //--- push into an existing daily todos
        rangeTodoList.splice(rangeTodoList.indexOf(dailyTodoList), 1, {
          ...dailyTodoList,
          todoList: sortTodoList(dailyTodoList.todoList.concat(action.todo), state.sortingKey),
        });
      } else {
        //--- add a new daily todos
        rangeTodoList.push({
          date: action.todo.date,
          todoList: [
            action.todo,
          ],
        });

        rangeTodoList.sort((priorDailyTodoList, laterDailyTodoList) => priorDailyTodoList.date - laterDailyTodoList.date);
      }

      state = {
        ...state,
        rangeTodoList,
      };

      break;
    }
    case OP._UPDATE_DISPLAY: {
      const rangeTodoList = state.rangeTodoList.slice();

      action.todoList.forEach(todo => {
        const dailyTodoList = rangeTodoList.find(dailyTodoList => dailyTodoList.date === todo.date);
        const todoList = dailyTodoList.todoList.slice();
        const oldTodo = todoList.find(testTodo => testTodo.id === todo.id);

        todoList.splice(todoList.indexOf(oldTodo), 1, todo);

        rangeTodoList.splice(rangeTodoList.indexOf(dailyTodoList), 1, {
          ...dailyTodoList,
          todoList: sortTodoList(todoList, state.sortingKey),
        });
      });

      state = {
        ...state,
        rangeTodoList,
      };

      break;
    }
    case OP._DELETE_DISPLAY: {
      const rangeTodoList = state.rangeTodoList.slice();

      action.todoList.forEach(todo => {
        const dailyTodoList = rangeTodoList.find(dailyTodoList => dailyTodoList.date === todo.date);

        rangeTodoList.splice(rangeTodoList.indexOf(dailyTodoList), 1, {
          ...dailyTodoList,
          todoList: dailyTodoList.todoList.filter(testTodo => testTodo !== todo),
        });
      });

      state = {
        ...state,
        rangeTodoList,
      };

      break;
    }
    case OP._SET_RANGE: {
      if (action.rangeType !== state.range.type ||
        //--- switch to explicitly specified date
        (action.rangeType === RANGE._DAY && action.date)) {
        const today = localDate();
        let fromDate, toDate;

        switch (action.rangeType) {
          default:
          case RANGE._DAY: {
            fromDate = toDate = action.date ? new Date(action.date) : today;
            break;
          }
          case RANGE._WEEK: {
            fromDate = new Date(new Date(today).setDate(today.getDate() - today.getDay()));
            toDate = new Date(new Date(today).setDate(today.getDate() + (6 - today.getDay())));
            break;
          }
          case RANGE._MONTH: {
            fromDate = new Date(new Date(today).setDate(1));
            toDate = new Date(new Date(new Date(today).setMonth(today.getMonth() + 1)).setDate(0));
            break;
          }
          case RANGE._SEASON: {
            fromDate = new Date(new Date(new Date(today).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1));
            toDate = new Date(new Date(new Date(today).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0));
            break;
          }
        }

        state = {
          ...state,
          range: {
            type: action.rangeType,
            fromDate: getDateStr(fromDate),
            toDate: getDateStr(toDate),
          },
          rangeTodoList: getDisplayingTodos(fromDate, toDate, action.todoList, state.rangeTodoList, state.sortingKey),
        };
      }

      break;
    }
    case OP._SHIFT_RANGE: {
      const offset = action.dir === RANGE._PREV ? -1 : 1;
      let fromDate = new Date(state.range.fromDate),
        toDate = new Date(state.range.toDate);

      switch (state.range.type) {
        case RANGE._DAY: {
          fromDate = toDate = new Date(fromDate.setDate(fromDate.getDate() + offset));
          break;
        }
        case RANGE._WEEK: {
          fromDate = new Date(fromDate.setDate(fromDate.getDate() + 7 * offset));
          toDate = new Date(toDate.setDate(toDate.getDate() + 7 * offset));
          break;
        }
        case RANGE._MONTH: {
          fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + offset));
          toDate = action.dir === RANGE._PREV ?
            new Date(toDate.setDate(0)) :
            new Date(new Date(toDate.setMonth(toDate.getMonth() + 2 * offset)).setDate(0));
          break;
        }
        case RANGE._SEASON: {
          fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + 3 * offset));
          toDate = action.dir === RANGE._PREV ?
            new Date(new Date(toDate.setMonth(toDate.getMonth() + 3 * offset + 1)).setDate(0)) :
            new Date(new Date(toDate.setMonth(toDate.getMonth() + 4 * offset)).setDate(0));
          break;
        }
        default: {
          break;
        }
      }

      state = {
        ...state,
        range: {
          ...state.range,
          fromDate: getDateStr(fromDate),
          toDate: getDateStr(toDate),
        },
        rangeTodoList: getDisplayingTodos(fromDate, toDate, action.todoList, state.rangeTodoList, state.sortingKey),
      };

      break;
    }
    case OP._SORT: {
      const rangeTodoList = state.rangeTodoList.map(dailyTodoList => {
        return {
          ...dailyTodoList,
          todoList: sortTodoList(dailyTodoList.todoList.slice(), action.sortingKey),
        };
      });

      state = {
        ...state,
        sortingKey: action.sortingKey,
        rangeTodoList,
      };

      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default displayReducer;

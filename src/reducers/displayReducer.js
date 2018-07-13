import * as DEFAULT from '../definitions/defaultSettings';

import OP from '../definitions/operations';
import STAT from '../definitions/statuses';
import RANGE from '../definitions/ranges';

import { sortTodoList, getDateStr } from './utility';

const initState = {
  range: {
    type: RANGE._DAY,
    fromDate: getDateStr(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))),
    toDate: getDateStr(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))),
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
          todoList: dailyTodoList.todoList.concat(action.todo),
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
          todoList,
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
    case OP._UPDATE_RANGE: {
      if (state.range.type !== action.rangeType) {
        const today = new Date();
        let fromDate, toDate;

        switch (action.rangeType) {
          default:
          case RANGE._DAY: {
            fromDate = toDate = today.getTime();
            break;
          }
          case RANGE._WEEK: {
            fromDate = new Date(today.getTime()).setDate(today.getDate() - today.getDay());
            toDate = new Date(today.getTime()).setDate(today.getDate() + (6 - today.getDay()));
            break;
          }
          case RANGE._MONTH: {
            fromDate = new Date(today.getTime()).setDate(1);
            toDate = new Date(new Date(today.getTime()).setMonth(today.getMonth() + 1)).setDate(0);
            break;
          }
          case RANGE._SEASON: {
            fromDate = new Date(new Date(today.getTime()).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1);
            toDate = new Date(new Date(today.getTime()).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0);
            break;
          }
        }

        //--- convert to local time
        fromDate = new Date(fromDate - (today.getTimezoneOffset() * 60000));
        toDate = new Date(toDate - (today.getTimezoneOffset() * 60000));

        //--- update corresponding todoList within given time range
        const rangeTodoList = [];
        for (let date = new Date(fromDate); date <= toDate; date.setDate(date.getDate() + 1)) {
          const dateStr = getDateStr(date);
          const dailyTodoList = state.rangeTodoList.find(dailyTodoList => dailyTodoList.date === dateStr);

          if (dailyTodoList) {
            //--- simply copy existing daily todo list
            rangeTodoList.push(dailyTodoList);
          } else {
            //--- collect todos and add a new daily todo list if found
            const todoList = action.todoList.filter(todo => todo.date === dateStr);

            rangeTodoList.push({
              date: dateStr,
              todoList: sortTodoList(todoList, state.sortingKey),
            });
          }
        }

        state = {
          ...state,
          range: {
            type: action.rangeType,
            fromDate: getDateStr(fromDate),
            toDate: getDateStr(toDate),
          },
          rangeTodoList,
        };
      }

      break;
    }
    case OP._SORT: {
      console.log(OP._SORT, action.sortingKey);
      const rangeTodoList = state.rangeTodoList.map(dailyTodoList => {
        return {
          ...dailyTodoList,
          todoList: sortTodoList(dailyTodoList.todoList.slice(), action.sortingKey),
        };
      });
      console.log(rangeTodoList);
      state = {
        ...state,
        sortingKey: action.sortingKey,
        rangeTodoList,
      };

      break;
    }
  }

  return state;
};

export default displayReducer;

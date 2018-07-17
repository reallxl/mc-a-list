import * as DEFAULT from '../../settings/default';
import { PERIOD, STATUS } from '../../global/definitions/index';
import ACTION from '../actionTypes';

import * as period from './display_period';

import { getLocalDate, getDateStr } from '../../global/utilities/utility';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const initState = {
  sortingKey: DEFAULT._SORTING_KEY,
  period: {
    type: PERIOD._DAY,
    fromDate: getDateStr(getLocalDate()),
    toDate: getDateStr(getLocalDate()),
  },
  todos: [
    {
      date: getDateStr(getLocalDate()),
      todos: [],
    },
  ],
  selectedTodos: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION._RELOAD: return reloadTodos(state, action);
    case ACTION._RENDER: return renderTodo(state, action);
    case ACTION._RE_RENDER: return reRenderTodos(state, action);
    case ACTION._HIDE: return hideTodos(state, action);
    case ACTION._SELECT: return selectTodos(state, action);
    case ACTION._SORT: return sortTodos(state, action);
    //--- display_period
    case ACTION._SET_PERIOD_TYPE: return period.setPeriodType(state, action);
    case ACTION._SET_PERIOD: return period.setPeriod(state, action);
    case ACTION._SHIFT_PERIOD: return period.shiftPeriod(state, action);
    default: return state;
  }
};

export default reducer;

//----------------------------------------------------------------------------------------------------
// reloadTodos
//----------------------------------------------------------------------------------------------------
const reloadTodos = (state, action) => {
  const todos = [];

  for (let d = new Date(state.period.fromDate); d <= new Date(state.period.toDate); d.setDate(d.getDate() + 1)) {
    const date = getDateStr(d);
    const dailyTodos = state.todos.find(dailyTodos => dailyTodos.date === date);

    if (dailyTodos) {
      //--- simply copy existing daily todo list
      todos.push(dailyTodos);
    } else {
      //--- collect todos and add a new daily todo list if found
      const dailyTodos = action.todos.filter(todo => todo.date === date);

      todos.push({
        date,
        //--- always apply sorting rule automatically
        todos: sortTodosByKey(dailyTodos, state.sortingKey),
      });
    }
  }

  return {
    ...state,
    todos,
    selectedTodos: [],
  };
};
//----------------------------------------------------------------------------------------------------
// renderTodo
//----------------------------------------------------------------------------------------------------
const renderTodo = (state, action) => {
  const todos = state.todos.slice();
  const dailyTodos = todos.find(dailyTodos => dailyTodos.date === action.todo.date);

  todos.splice(todos.indexOf(dailyTodos), 1, {
    ...dailyTodos,
    todos: sortTodosByKey(dailyTodos.todos.concat(action.todo), state.sortingKey),
  });

  return {
    ...state,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// reRenderTodo
//----------------------------------------------------------------------------------------------------
const reRenderTodos = (state, action) => {
  const periodTodos = state.todos.slice();

  action.todos.forEach(todo => {
    const dailyTodos = periodTodos.find(dailyTodos => dailyTodos.date === todo.date);
    const todos = dailyTodos.todos.slice();
    const oldTodo = todos.find(testTodo => testTodo.id === todo.id);

    todos.splice(todos.indexOf(oldTodo), 1, todo);

    //--- NOTE: might be an inefficient implementation to invoke splice here, think of it later
    periodTodos.splice(periodTodos.indexOf(dailyTodos), 1, {
      ...dailyTodos,
      todos: sortTodosByKey(todos, state.sortingKey),
    });
  });

  return {
    ...state,
    todos: periodTodos,
  };
}
//----------------------------------------------------------------------------------------------------
// hideTodos
//----------------------------------------------------------------------------------------------------
const hideTodos = (state, action) => {
  const periodTodos = state.todos.slice();

  action.todos.forEach(todo => {
    const dailyTodos = periodTodos.find(dailyTodos => dailyTodos.date === todo.date);

    periodTodos.splice(periodTodos.indexOf(dailyTodos), 1, {
      ...dailyTodos,
      todos: dailyTodos.todos.filter(testTodo => testTodo !== todo),
    });
  });

  state = {
    ...state,
    todos: periodTodos,
  };

  return state;
}
//----------------------------------------------------------------------------------------------------
// selectTodos
//----------------------------------------------------------------------------------------------------
const selectTodos = (state, action) => {
  const selectedTodos = state.selectedTodos.slice();

  action.todos.forEach(todo => {
    if (action.selected) {
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
  });

  return {
    ...state,
    selectedTodos,
  };
}
//----------------------------------------------------------------------------------------------------
// sortTodos
//----------------------------------------------------------------------------------------------------
const sortTodos = (state, action) => {
  const todos = state.todos.map(dailyTodos => {
    return {
      ...dailyTodos,
      todos: sortTodosByKey(dailyTodos.todos.slice(), action.sortingKey),
    };
  });

  return {
    ...state,
    sortingKey: action.sortingKey,
    todos,
  };
};

//****************************************************************************************************
// local functions
//****************************************************************************************************

const sortTodosByKey = (todos, sortingKey) => {
  todos.sort((priorTodo, laterTodo) => {
    let ret = 0;

    if (priorTodo[sortingKey] < laterTodo[sortingKey]) {
      ret = -1;
    } else if ( priorTodo[sortingKey] > laterTodo[sortingKey]) {
      ret = 1;
    } else if (priorTodo.status < laterTodo.status) {
      //--- always put "done" todos at the top of each individual sorted todo group
      ret = -1;
    } else if (priorTodo.status > laterTodo.status) {
      ret = 1;
    }

    return ret;
  });

  if (sortingKey === 'id') {
    //--- which is equivalent to sorting by craetion time
    todos = todos.filter(todo => todo.status === STATUS._DONE).concat(todos.filter(todo => todo.status !== STATUS._DONE));
  }

  return todos;
};

import * as DEFAULT from '../../definitions/defaultSettings';
import ACTION from '../actionTypes';

import { sortTodosByKey, getLocalDate, getDateStr } from './utility';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const initState = {
  sortingKey: DEFAULT._SORTING_KEY,
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
    case ACTION._REFRESH: return refreshTodos(state, action);
    case ACTION._PUT_ON: return putOnTodo(state, action);
    case ACTION._RERENDER: return rerenderTodos(state, action);
    case ACTION._TAKE_OFF: return takeOffTodos(state, action);
    case ACTION._SELECT: return selectTodos(state, action);
    case ACTION._SORT: return sortTodos(state, action);
    default: return state;
  }
};

export default reducer;

//----------------------------------------------------------------------------------------------------
// refreshTodos
//----------------------------------------------------------------------------------------------------
const refreshTodos = (state, action) => {
  const todos = [];

  for (let d = new Date(action.fromDate); d <= new Date(action.toDate); d.setDate(d.getDate() + 1)) {
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
// putOnTodo
//----------------------------------------------------------------------------------------------------
const putOnTodo = (state, action) => {
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
// rerenderTodos
//----------------------------------------------------------------------------------------------------
const rerenderTodos = (state, action) => {
  const withinPeriodTodos = state.todos.slice();

  action.todos.forEach(todo => {
    const dailyTodos = withinPeriodTodos.find(dailyTodos => dailyTodos.date === todo.date);
    const todos = dailyTodos.todos.slice();
    const oldTodo = todos.find(testTodo => testTodo.id === todo.id);

    todos.splice(todos.indexOf(oldTodo), 1, todo);

    //--- might be an inefficient implementation to invoke splice here, think of it later
    withinPeriodTodos.splice(withinPeriodTodos.indexOf(dailyTodos), 1, {
      ...dailyTodos,
      todos: sortTodosByKey(todos, state.sortingKey),
    });
  });

  return {
    ...state,
    todos: withinPeriodTodos,
  };
}
//----------------------------------------------------------------------------------------------------
// takeOffTodos
//----------------------------------------------------------------------------------------------------
const takeOffTodos = (state, action) => {
  const withinPeriodTodos = state.todos.slice();

  action.todos.forEach(todo => {
    const dailyTodos = withinPeriodTodos.find(dailyTodos => dailyTodos.date === todo.date);

    withinPeriodTodos.splice(withinPeriodTodos.indexOf(dailyTodos), 1, {
      ...dailyTodos,
      todos: dailyTodos.todos.filter(testTodo => testTodo !== todo),
    });
  });

  state = {
    ...state,
    todos: withinPeriodTodos,
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

import STATUS from '../definitions/statuses';

export const getDisplayingTodos = (fromDate, toDate, allTodos, oldRangeTodos, sortingKey) => {
  const rangeTodoList = [];

  for (let date = new Date(fromDate); date <= toDate; date.setDate(date.getDate() + 1)) {
    const dateStr = getDateStr(date);
    const dailyTodoList = oldRangeTodos.find(dailyTodoList => dailyTodoList.date === dateStr);

    if (dailyTodoList) {
      //--- simply copy existing daily todo list
      rangeTodoList.push(dailyTodoList);
    } else {
      //--- collect todos and add a new daily todo list if found
      const todoList = allTodos.filter(todo => todo.date === dateStr);

      rangeTodoList.push({
        date: dateStr,
        //--- always apply sorting rule automatically
        todoList: sortTodoList(todoList, sortingKey),
      });
    }
  }

  return rangeTodoList;
};

export const sortTodoList = (todoList, sortingKey) => {
  todoList.sort((priorTodo, laterTodo) => {
    let ret = 0;

    if (priorTodo[sortingKey] < laterTodo[sortingKey]) {
      ret = -1;
    } else if ( priorTodo[sortingKey] > laterTodo[sortingKey]) {
      ret = 1;
    } else if (priorTodo.status < laterTodo.status) {
      ret = -1;
    } else if (priorTodo.status > laterTodo.status) {
      ret = 1;
    }

    return ret;
  });

  if (sortingKey === 'id') {
    todoList = todoList.filter(todo => todo.status === STATUS._DONE).concat(todoList.filter(todo => todo.status !== STATUS._DONE));
  }

  return todoList;
};

export const localDate = () => {
  const today = new Date();
  return new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
};

export const getDateStr = date => date.toISOString().substring(0, 10);

export const retrieveTodoContent = todo => {
  const {
    id,
    ...content,
  } = todo;

  if (id) {
    //--- just in order to eliminate compile warning
  }

  return content;
};

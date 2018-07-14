import STATUS from '../definitions/statuses';

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

export const getDateStr = date => date.toISOString().substring(0, 10);

export const retrieveTodoContent = (todo) => {
  const {
    id,
    ...content,
  } = todo;

  if (id) {
    //--- just in order to eliminate compile warning
  }

  return content;
};

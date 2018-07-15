import STATUS from '../../definitions/statuses';

//----------------------------------------------------------------------------------------------------
// getLocalDate
//----------------------------------------------------------------------------------------------------
export const getLocalDate = (date = new Date()) => new Date(date - (date.getTimezoneOffset() * 60000));

//----------------------------------------------------------------------------------------------------
// getDateStr
//----------------------------------------------------------------------------------------------------
export const getDateStr = date => getLocalDate(date).toISOString().substring(0, 10);

//----------------------------------------------------------------------------------------------------
// sortTodosByKey
//----------------------------------------------------------------------------------------------------
export const sortTodosByKey = (todos, sortingKey) => {
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

//----------------------------------------------------------------------------------------------------
// retrieveTodoContent
//----------------------------------------------------------------------------------------------------
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

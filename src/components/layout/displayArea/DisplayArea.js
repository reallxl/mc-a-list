import React from 'react';
import { connect } from 'react-redux';

import OperationBar from './OperationBar';
import Todos from './Todos';
import TodoAdder from './TodoAdder';

import OP from '../../../definitions/operations';

import classes from './DisplayArea.css';

const DisplayArea = (props) => {
  const scopedTodos = [];

  props.todos.forEach(todo => {
    if (todo.content.date >= props.scope.from && todo.content.date <= props.scope.to) {
      const dateTodos = scopedTodos.find(dateTodos => dateTodos.length && dateTodos[0].date === todo.content.date);

      if (dateTodos) {
        //--- push into an existing date group
        dateTodos.push(todo);
      } else {
        //--- add a new date group
        scopedTodos.push([
          todo,
        ]);
      }
    }
  });
  console.log(scopedTodos);

  return (
    <div className={ classes.DisplayArea }>
      <OperationBar />
      { scopedTodos.map(dateTodos => <Todos key={ dateTodos[0].content.date } todos={ dateTodos } />) }
      <TodoAdder />
    </div>
  );
}

const mappedProps = state => {
  return {
    todos: state.todo.todos,
    scope: state.todo.scope,
  };
};

const mappedDispatches = dispatch => {
  return {

  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

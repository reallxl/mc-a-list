import React from 'react';
import { connect } from 'react-redux';

import OperationBar from './OperationBar';
import DailyTodos from './DailyTodos';

import OP from '../../../definitions/operations';

import classes from './DisplayArea.css';

const DisplayArea = (props) => {
  const scopedTodos = [];

  props.dailyTodoList.forEach(dailyTodos => {
    if (dailyTodos.date >= props.scope.fromDate && dailyTodos.date <= props.scope.toDate) {
      scopedTodos.push(dailyTodos);
    }
  });

  return (
    <div className={ classes.DisplayArea }>
      <OperationBar />
      { props.scope.fromDate !== props.scope.toDate && <p>{ props.scope.fromDate }-{ props.scope.toDate }</p> }
      { scopedTodos.length ?
        scopedTodos.map(dailyTodos => <DailyTodos key={ dailyTodos.date } date={ dailyTodos.date } todos={ dailyTodos.todos } />) :
        <DailyTodos date={ new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10) } /> }
    </div>
  );
}

const mappedProps = state => {
  return {
    dailyTodoList: state.todo.dailyTodoList,
    scope: state.todo.scope,
  };
};

const mappedDispatches = dispatch => {
  return {

  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

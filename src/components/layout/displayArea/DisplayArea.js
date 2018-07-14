import React from 'react';
import { connect } from 'react-redux';

import OperationBar from './OperationBar';
import DailyTodos from './DailyTodos';
import TodoAdder from './TodoAdder';

import { getDateStr } from '../../../reducers/utility';

import OP from '../../../definitions/operations';
import RANGE from '../../../definitions/ranges';

import classes from './DisplayArea.css';

class DisplayArea extends React.Component {
  state = {
  };

  render = () => {
    const rangeString = this.props.range.fromDate !== this.props.range.toDate &&
      <p>{ this.props.range.fromDate }-{ this.props.range.toDate }</p>;

    const shownDailyTodos = this.props.range.type === RANGE._DAY || this.props.range.type === RANGE._WEEK ?
      this.props.todoList :
      this.props.todoList.filter(dailyTodos => dailyTodos.todoList.length);

    const dailyTodoLists = this.props.todoList.length ?
      shownDailyTodos.map(dailyTodoList => (
        <DailyTodos
          key={ dailyTodoList.date }
          date={ dailyTodoList.date }
          todos={ dailyTodoList.todoList } />
      )) :
      //--- add dummy daily todo list
      <DailyTodos
        date={ getDateStr(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))) } />;

    return (
      <div className={ classes.DisplayArea }>
        <OperationBar
          handleUpdateRange={ (type) => this.props.onUpdateRange(type) }
          handleBatch={ () => this.props.onBatchProc() }
          handleDelete={ () => this.props.onDelete() }
          handleSort={ (sortingKey) => this.props.onSort(sortingKey) } />
        { rangeString }
        { dailyTodoLists }
        { (this.props.range.type !== RANGE._DAY && this.props.range.type !== RANGE._WEEK) &&
          <TodoAdder date={ this.props.date } /> }
      </div>
    );
  };
}

const updateRange = (rangeType) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._UPDATE_RANGE,
      rangeType,
      todoList: getState().database.todos,
    });
  };
}

const deleteTodo = (id = undefined) => {
  return (dispatch, getState) => {
    const todoList = id ?
      [ getState().database.todos.find(todo => todo.id === id) ] :
      getState().database.selectedTodos;

    dispatch({
      type: OP._DELETE_DISPLAY,
      todoList,
    });
    dispatch({
      type: OP._DELETE,
      id,
    });
  };
};

const mappedProps = state => {
  return {
    todos: state.database.todos,
    range: state.display.range,
    todoList: state.display.rangeTodoList,
  };
};

const mappedDispatches = dispatch => {
  return {
    onDelete: () => dispatch(deleteTodo()),
    onUpdateRange: (rangeType) => dispatch(updateRange(rangeType)),
    onSort: (sortingKey) => dispatch({
      type: OP._SORT,
      sortingKey,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

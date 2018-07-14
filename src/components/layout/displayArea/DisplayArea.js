import React from 'react';
import { connect } from 'react-redux';

import OperationBar from './OperationBar';
import DailyTodos from './DailyTodos';

import { getDateStr } from '../../../reducers/utility';

import OP from '../../../definitions/operations';
import STATUS from '../../../definitions/statuses';

import classes from './DisplayArea.css';

class DisplayArea extends React.Component {
  state = {
  };

  render = () => {
    const rangeString = this.props.range.fromDate !== this.props.range.toDate &&
      <p>{ this.props.range.fromDate }-{ this.props.range.toDate }</p>;

    const dailyTodoLists = this.props.todoList.length ?
      this.props.todoList.map(dailyTodoList => (
        <DailyTodos
          key={ dailyTodoList.date }
          date={ dailyTodoList.date }
          todos={ dailyTodoList.todoList } />)) :
      //--- dault dummy daily todo list
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

const mappedProps = state => {
  return {
    todos: state.database.todos,
    range: state.display.range,
    todoList: state.display.rangeTodoList,
  };
};

const mappedDispatches = dispatch => {
  return {
    onBatchProc: () => dispatch({
      type: OP._UPDATE_STATUS,
      status: STATUS._DONE,
    }),
    onDelete: () => dispatch({
      type: OP._DELETE,
    }),
    onUpdateRange: (rangeType) => dispatch(updateRange(rangeType)),
    onSort: (sortingKey) => dispatch({
      type: OP._SORT,
      sortingKey,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

import React from 'react';
import { connect } from 'react-redux';

import PeriodSelector from './PeriodSelector';
import DailyTodos from './DailyTodos';

import { getDateStr } from '../../../reducers/utility';

import OP from '../../../definitions/operations';
import RANGE from '../../../definitions/ranges';

import classes from './DisplayArea.css';

class DisplayArea extends React.Component {
  state = {
  };

  render = () => {
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
        <PeriodSelector
          period={ this.props.range }
          handleSetRange={ (rangeType, date = undefined) => this.props.onSetRange(rangeType, date) }
          handleShiftRange={ (dir) => this.props.onShiftRange(dir) }
          handleBatch={ () => this.props.onBatchProc() }
          handleDelete={ () => this.props.onDelete() }
          handleSort={ (sortingKey) => this.props.onSort(sortingKey) } />
        { dailyTodoLists }
      </div>
    );
  };
}

const setRange = (rangeType, date) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._SET_RANGE,
      rangeType,
      date,
      todoList: getState().database.todos,
    });
  };
};

const shiftRange = (dir) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._SHIFT_RANGE,
      dir,
      todoList: getState().database.todos,
    });
  };
};

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
    onSetRange: (rangeType, date) => dispatch(setRange(rangeType, date)),
    onShiftRange: (dir) => dispatch(shiftRange(dir)),
    onSort: (sortingKey) => dispatch({
      type: OP._SORT,
      sortingKey,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

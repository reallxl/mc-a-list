import React from 'react';
import { connect } from 'react-redux';

import TodoEditor from './TodoEditor';

import OP from '../../../definitions/operations';

import classes from './TodoAdder.css';

class TodoAdder extends React.Component {
  state = {
    isEditing: false,
  };

  toggleEditor = (enable) => {
      let isEditing = this.state.isEditing;

      if (isEditing !== enable) {
        isEditing = !isEditing;
        this.setState({
          ...this.state,
          isEditing: isEditing,
        });
      }
  };

  render() {
    const EMPTY_CONTENT = {
        type: 'personal',
        color: '',
        date: this.props.date,
        time: '',
        tillDate: '',
        tillTime: '',
        place: '',
        companion: '',
        description: '',
        tags: '',
    };

    return (
      <span onClick={ () => this.toggleEditor(true) }>
        { this.state.isEditing ?
          <TodoEditor
            content= { EMPTY_CONTENT }
            handleSave={ (content) => { this.props.onAddTodo(content); this.toggleEditor(false); } }
            handleCancel={ () => this.toggleEditor(false) }
          /> :
          <p className={ classes.TodoAdder }>click to add a todo...</p> }
      </span>
    );
  }
}

const mappedProps = state => {
  return {
    todos: state.database.todos,
  };
};

const addTodo = (content) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._ADD,
      content,
    });

    const todo = getState().database.todos[getState().database.todos.length - 1];

    if (todo.date >= getState().display.range.fromDate && todo.date <= getState().display.range.toDate) {
      dispatch({
        type: OP._DISPLAY,
        todo,
      });
    }
  };
}

const mappedDispatches = dispatch => {
  return {
    onAddTodo: content => dispatch(addTodo(content)),
  };
};

export default connect(mappedProps, mappedDispatches)(TodoAdder);

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
        date: new Date().toISOString().substring(0, 10),
        time: '',
        tillDate: '',
        tillTime: '',
        place: '',
        companion: '',
        description: '',
        tags: '',
    };

    return (
      <div onClick={ () => this.toggleEditor(true) }>
        { this.state.isEditing ?
          <TodoEditor
            content= { EMPTY_CONTENT }
            handleSave={ (content) => this.props.onAddTodo(content) && this.toggleEditor(false) }
            handleCancel={ () => this.toggleEditor(false) }
          /> :
          <p className={ classes.TodoAdder }>click to add a todo...</p> }
      </div>
    );
  }
}

const mappedProps = state => {
  return {
  };
};

const mappedDispatches = dispatch => {
  return {
    onAddTodo: (content) => dispatch({
      type: OP._ADD,
      content: content,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(TodoAdder);

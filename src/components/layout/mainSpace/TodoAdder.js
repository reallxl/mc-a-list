import React from 'react';
import { connect } from 'react-redux';

import TodoEditor from './TodoEditor/TodoEditor';

import Emoji from '../../Emoji/Emoji';

import * as ACTION from '../../../store/actions/index';

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
          <Emoji symbol="✳️" label="idea" larger onClick={() => this.toggleEditor(true) } /> }
      </span>
    );
  }
}

const mappedProps = state => {
  return {
    todos: state.database.todos,
  };
};

const mappedDispatches = dispatch => {
  return {
    onAddTodo: content => dispatch(ACTION.addTodo(content)),
  };
};

export default connect(mappedProps, mappedDispatches)(TodoAdder);

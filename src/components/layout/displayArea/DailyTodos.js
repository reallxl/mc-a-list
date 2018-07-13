import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import TodoEditor from './TodoEditor';
import TodoAdder from './TodoAdder';

import { retrieveTodoContent } from '../../../reducers/utility';

import OP from '../../../definitions/operations';

import classes from './DailyTodos.css';

class DailyTodos extends React.Component {
  state = {
    curEditingTodo: null,
    todos: this.props.todos,
  };

  toggleEditingTodo = (todo) => {
    console.log('toggleEditingTodo', todo);
    if (this.state.curEditingTodo !== todo) {
      this.setState({
        ...this.state,
        curEditingTodo: todo,
      });
    }
  };

  handleSave = (todo, content) => {
    console.log('handleSave',content);
    this.props.onUpdateTodo(todo.id, content);

    if (this.state.curEditingTodo === todo) {
      this.toggleEditingTodo(undefined);
    }
  };

  render = () => {
    return (
      <div className={ classes.DailyTodos }>
        <p>{ this.props.date }</p>
        { this.props.todos && (this.props.todos.map(todo => todo === this.state.curEditingTodo ? (
          <TodoEditor key={ todo.id }
            id={ todo.id }
            content={ retrieveTodoContent(todo) }
            handleSave={ (content) => this.handleSave(todo, content) }
            handleCancel={ () => this.toggleEditingTodo(undefined) } />
          ) : (
          <Todo key={ todo.id }
            isSelected={ this.props.selectedTodos.includes(todo) }
            content={ retrieveTodoContent(todo) }
            handleSelect={ (value) => this.props.onSelectTodo(todo.id, value) }
            handleUpdateStatus={ (status) => this.props.onUpdateTodoStatus(todo.id, status) }
            handleEdit={ () => this.toggleEditingTodo(todo) }
            handleDelete={ () => this.props.onDeleteTodo(todo.id) } />
        ))) }
        <TodoAdder date={ this.props.date } />
      </div>
    );
  };
}

const mappedProps = state => {
  return {
    selectedTodos: state.database.selectedTodos,
  };
};

const updateTodo = (id, content) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._UPDATE,
      id,
      content,
    });
    dispatch({
      type: OP._UPDATE_DISPLAY,
      todoList: [
        getState().database.todos.find(todo => todo.id === id),
      ],
    });
  };
}

const deleteTodo = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: OP._DELETE_DISPLAY,
      todoList: [
        getState().database.todos.find(todo => todo.id === id),
      ],
    });
    dispatch({
      type: OP._DELETE,
      id,
    });
  };
}

const mappedDispatches = dispatch => {
  return {
    onUpdateTodo: (id, content) => dispatch(updateTodo(id, content)),
    onUpdateTodoStatus: (id, status) => dispatch({
      type: OP._UPDATE_STATUS,
      id,
      status,
    }),
    onSelectTodo: (id, value) => dispatch({
      type: OP._SELECT,
      id,
      value,
    }),
    onDeleteTodo: (id) => dispatch(deleteTodo(id)),
  };
};

export default connect(mappedProps, mappedDispatches)(DailyTodos);

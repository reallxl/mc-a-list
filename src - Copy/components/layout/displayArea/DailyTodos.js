import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import TodoEditor from './TodoEditor';
import TodoAdder from './TodoAdder';

import OP from '../../../definitions/operations';

import classes from './DailyTodos.css';

class DailyTodos extends React.Component {
  state = {
    curEditingTodo: null,
  };

  toggleEditingTodo = (todo) => {
    if (this.state.curEditingTodo !== todo) {
      this.setState({
        ...this.state,
        curEditingTodo: todo,
      });
    }
  };

  handleSave = (todo, content) => {
    this.props.onUpdateTodo(todo.id, content);

    if (this.state.curEditingTodo === todo) {
      this.toggleEditingTodo(null);
    }
  };

  render() {
    return (
      <div className={ classes.DailyTodos }>
        <p>{ this.props.date }</p>
        { this.props.todos && (this.props.todos.map(todo => todo === this.state.curEditingTodo ? (
          <TodoEditor key={ todo.id }
            id={ todo.id }
            content={ todo.content }
            handleSave={ (content) => this.handleSave(todo, content) }
            handleCancel={ () => this.toggleEditingTodo(null) } />
          ) : (
          <Todo key={ todo.id }
            isSelected={ this.props.selectedTodos.includes(todo) }
            status={ todo.status }
            content={ todo.content }
            handleSelect={ (value) => this.props.onSelectTodo(todo, value) }
            handleUpdateStatus={ (status) => this.props.onUpdateTodoStatus(todo, status) }
            handleEdit={ () => this.toggleEditingTodo(todo) }
            handleDelete={ () => this.props.onDeleteTodo(todo) } />
        ))) }
        <TodoAdder date={ this.props.date } />
      </div>
    );
  }
}

const mappedProps = state => {
  return {
    selectedTodos: state.todo.selectedTodos,
  };
};

const mappedDispatches = dispatch => {
  return {
    onUpdateTodo: (todo, content) => dispatch({
      type: OP._UPDATE,
      todo: todo,
      content: content,
    }),
    onUpdateTodoStatus: (todo, status) => dispatch({
      type: OP._UPDATE_STATUS,
      todo: todo,
      status: status,
    }),
    onSelectTodo: (todo, value) => dispatch({
      type: OP._SELECT,
      todo: todo,
      value: value,
    }),
    onDeleteTodo: (todo) => dispatch({
      type: OP._DELETE,
      todo: todo,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(DailyTodos);

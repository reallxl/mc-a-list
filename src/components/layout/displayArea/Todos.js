import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import TodoEditor from './TodoEditor';

import OP from '../../../definitions/operations';

import classes from './Todos.css';

class Todos extends React.Component {
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
      <div className={ classes.Todos }>
        <p>{ this.props.todos[0].content.date }</p>
        { this.props.todos.map(todo => todo === this.state.curEditingTodo ? (
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
            handleSelect={ (value) => this.props.onSelectTodo(todo.id, value) }
            handleUpdateStatus={ (status) => this.props.onUpdateTodoStatus(todo.id, status) }
            handleEdit={ () => this.toggleEditingTodo(todo) }
            handleDelete={ () => this.props.onDeleteTodo(todo.id) } />
        )) }
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
    onUpdateTodo: (id, content) => dispatch({
      type: OP._UPDATE,
      id: id,
      content: content,
    }),
    onUpdateTodoStatus: (id, status) => dispatch({
      type: OP._UPDATE_STATUS,
      id: id,
      status: status,
    }),
    onSelectTodo: (id, value) => dispatch({
      type: OP._SELECT,
      id: id,
      value: value,
    }),
    onDeleteTodo: (id) => dispatch({
      type: OP._DELETE,
      id: id,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(Todos);

import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo/Todo';
import TodoEditor from '../../components/TodoEditor/TodoEditor';

import { retrieveTodoContent } from '../../global/utilities/utility';

import * as ACTION from '../../store/actions/index';

import classes from './DailyTodos.css';

class DailyTodos extends React.Component {
  state = {
    curEditingTodo: null,
    todos: this.props.todos,
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
    this.props.onUpdateTodos([ todo ], content);

    if (this.state.curEditingTodo === todo) {
      this.toggleEditingTodo(undefined);
    }
  };

  handleUpdateStatus = (todo, status) => {
    const content = retrieveTodoContent(todo);

    return this.props.onUpdateTodos([ todo ], {
      ...content,
      status,
    });
  };

  render = () => {
    return (
      <div className={ classes.DailyTodos }>
        <p>{ this.props.date }</p>
        { this.props.todos && (this.props.todos.map(todo => todo === this.state.curEditingTodo ? (
          <TodoEditor
            key={ todo.id }
            id={ todo.id }
            content={ retrieveTodoContent(todo) }
            handleSave={ (content) => this.handleSave(todo, content) }
            handleCancel={ () => this.toggleEditingTodo(undefined) } />
          ) : (
          <Todo
            key={ todo.id }
            isSelected={ this.props.selectedTodos.includes(todo) }
            content={ retrieveTodoContent(todo) }
            handleSelect={ (value) => this.props.onSelectTodos([ todo ], value) }
            handleUpdateStatus={ (status) => this.handleUpdateStatus(todo, status) }
            handleEdit={ () => this.toggleEditingTodo(todo) }
            handleDelete={ () => this.props.onDeleteTodos([ todo ]) } />
        ))) }
      </div>
    );
  };
}

const mappedProps = state => {
  return {
    selectedTodos: state.display.selectedTodos,
  };
};

const mappedDispatches = dispatch => {
  return {
    onUpdateTodos: (todos, content) => dispatch(ACTION.updateTodos(todos, content)),
    onDeleteTodos: (todos) => dispatch(ACTION.deleteTodos(todos)),
    onSelectTodos: (todos, value) => dispatch(ACTION.selectTodos(todos, value)),
  };
};

export default connect(mappedProps, mappedDispatches)(DailyTodos);

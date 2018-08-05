import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo/Todo';
//import TodoEditor from '../../components/TodoEditor/TodoEditor';

import { PERIOD } from '../../../global/definitions/index';

import classes from './DailyTodos.css';

class DailyTodos extends React.Component {
  render = () => {
    return (
      <div className={ classes.DailyTodos }>
        { this.props.period.type !== PERIOD._DAY && <p>{ this.props.date }</p> }
        <ul>
          { this.props.todos && (this.props.todos.map(todo => (
            <Todo
              key={ todo.id }
              id={ todo.id }
              content={ todo.content }
              isEditing={ todo.id === this.props.curEmbeddedEditorId }
            />
          ))) }
        </ul>
      </div>
    );
  };
}

const mappedProps = state => {
  return {
    period: state.display.period,
    curEmbeddedEditorId: state.edit.curEmbeddedEditorId,
  };
};

export default connect(mappedProps)(DailyTodos);

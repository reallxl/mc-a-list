import React from 'react';

import STATUS from '../../../definitions/statuses';

import classes from './Todo.css';

const Todo = (props) => {
  const dynamicStyle = {
    backgroundColor: props.content.color
  };

  return (
    <div className={ classes.Todo } style={ dynamicStyle }>
      <input type="checkbox" id="select" onChange={ (event) => props.handleSelect(event.target.checked) } checked={ props.isSelected } />
      { props.status === STATUS._DONE ? (
        <span role="img" className="staticEmoji" id="done" arial-label="done">💯</span>
      ) : (
        <span role="img" id="done" arial-label="done" onClick={ () => props.handleUpdateStatus(STATUS._DONE) }>⚪</span>
      ) }
      { props.content.title }
      { props.content.description }
      { props.status !== STATUS._DONE && <span role="img" arial-lable="edit" id="edit" onClick={ props.handleEdit }>📝</span> }
      <span role="img" arial-label="delete" id="delete" onClick={ props.handleDelete }>🚮</span>
    </div>
  );
};

export default Todo;

import React from 'react';

import classes from './TodoAdder.css';

const TodoAdder = (props) => {
  return (
    <div className={ classes.TodoAdder }>
      <i className="fa fa-plus-circle" onClick={ props.handleAdding } />
    </div>
  );
}

export default TodoAdder;

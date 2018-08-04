import React from 'react';

import classes from './TodoSorter.css';

const TodoSorter = (props) => {
  return (
    <div className={ classes.TodoSorter }>
      <a onClick={ () => props.handleSort('id') }>by Time</a>
      <a onClick={ () => props.handleSort('type') }>by Activity</a>
      <a onClick={ () => props.handleSort('color') }>by Color</a>
    </div>
  )
};

export default TodoSorter;

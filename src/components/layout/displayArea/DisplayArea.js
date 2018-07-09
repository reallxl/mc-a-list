import React from 'react';

import OperationBar from './OperationBar';
import Todos from './Todos';
import TodoAdder from './TodoAdder';

import classes from './DisplayArea.css';

const DisplayArea = (props) => {
  return (
    <div className={ classes.DisplayArea }>
      <OperationBar />
      <Todos />
      <TodoAdder />
    </div>
  );
}

export default DisplayArea;

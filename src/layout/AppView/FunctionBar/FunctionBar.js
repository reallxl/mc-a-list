import React from 'react';

import Icon from '../../../components/Icon/Icon';
import BatchProcessor from './BatchProcessor/BatchProcessor';
import TodoSorter from './TodoSorter/TodoSorter';

import classes from './FunctionBar.css';

const FunctionBar = (props) => {
  return (
    <div className={ classes.FunctionBar }>
      <Icon
        iconClass="fa fa-object-group"
        dropDownContent={
          <BatchProcessor />
        }
        toolTipsText="batch process"
      />
      <Icon
        iconClass="glyphicon glyphicon-sort"
        dropDownContent={
          <TodoSorter />
        }
        toolTipsText="sort"
      />
    </div>
  );
};

export default FunctionBar;

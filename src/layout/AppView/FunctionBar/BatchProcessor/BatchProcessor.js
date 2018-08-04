import React from 'react';

import StatusModifier from '../../../../components/StatusModifier/StatusModifier';

import classes from './BatchProcessor.css';

const BatchProcessor = (props) => {
  return (
    <div className={ classes.BatchProcessor }>
      
      <i className="fa fa-edit" onClick={ props.handleEdit } />
      <i className="fa fa-trash-o" onClick={ props.handleDelete } />
    </div>
  )
        //<i className="fa fa-check-square-o" onClick={ props.handleEdit } />
};

export default BatchProcessor;

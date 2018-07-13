import React from 'react';

import RANGE from '../../../definitions/ranges';

import classes from './OperationBar.css';

const OperationBar = (props) => {
  return (
    <div>
      <p className={ classes.Left }>
        <span className="functionalText" onClick={ () => props.handleUpdateRange(RANGE._DAY) }>Ⓓ</span>
        <span className="functionalText" onClick={ () => props.handleUpdateRange(RANGE._WEEK) }>Ⓦ</span>
        <span className="functionalText" onClick={ () => props.handleUpdateRange(RANGE._MONTH) }>Ⓜ</span>
        <span className="functionalText" onClick={ () => props.handleUpdateRange(RANGE._SEASON) }>Ⓢ</span>
        <input type="date" onChange={ (event) => props.handleUpdateRange(event.target.value) } />
      </p>
      <span role="img" arial-label="prev" onClick={ () => props.handleSort('color') }>⏪</span>
      <span role="img" arial-label="next" onClick={ () => props.handleSort('id') }>⏩</span>
      <span role="img" arial-label="batch" onClick={ props.handleBatch }>📚</span>
      <span role="img" arial-label="delete" onClick={ props.handleDelete }>🚮</span>
      <span role="img" arial-label="sort" onClick={ () => props.handleSort('type') }>📋</span>
    </div>
  );
};

export default OperationBar;

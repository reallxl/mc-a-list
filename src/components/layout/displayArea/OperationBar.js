import React from 'react';

import Emoji from '../Emoji';

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
      <Emoji symbol="⏪" label="prev" handleClick={ () => props.handleSort('color') } />
      <Emoji symbol="⏩" label="next" handleClick={ () => props.handleSort('id') } />
      <Emoji symbol="📚" label="batch" handleClick={ props.handleBatch } />
      <Emoji symbol="🚮" label="delete" handleClick={ props.handleDelete } />
      <Emoji symbol="📋" label="sort" handleClick={ () => props.handleSort('type') } />
    </div>
  );
};

export default OperationBar;

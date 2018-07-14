import React from 'react';

import TodoAdder from './TodoAdder';

import Emoji from '../Emoji';

import { localDate, getDateStr } from '../../../reducers/utility';

import RANGE from '../../../definitions/ranges';

import classes from './OperationBar.css';

const OperationBar = (props) => {
  const dateStr = getDateStr(localDate());
  return (
    <div>
      <span className={ classes.Left }>
        <span className="functionalText" onClick={ () => props.handleSetRange(RANGE._DAY) }>Ⓓ</span>
        <span className="functionalText" onClick={ () => props.handleSetRange(RANGE._WEEK) }>Ⓦ</span>
        <span className="functionalText" onClick={ () => props.handleSetRange(RANGE._MONTH) }>Ⓜ</span>
        <span className="functionalText" onClick={ () => props.handleSetRange(RANGE._SEASON) }>Ⓢ</span>
        <input type="date" value={ props.date || dateStr } onChange={ (event) => props.handleSetRange(RANGE._DAY, event.target.value) } />
        <TodoAdder date={ dateStr } />
      </span>
      <Emoji symbol="⏪" label="prev" handleClick={ () => props.handleShiftRange(RANGE._PREV) } />
      <Emoji symbol="⏩" label="next" handleClick={ () => props.handleShiftRange(RANGE._NEXT) } />
      <Emoji symbol="📚" label="batch" handleClick={ props.handleBatch } />
      <Emoji symbol="🚮" label="delete" handleClick={ props.handleDelete } />
      <Emoji symbol="📋" label="sort" handleClick={ () => props.handleSort('type') } />
    </div>
  );
};

export default OperationBar;

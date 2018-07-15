import React from 'react';

import TodoAdder from './TodoAdder';

import Emoji from '../Emoji';

import { localDate, getDateStr } from '../../../reducers/utility';

import RANGE from '../../../definitions/ranges';

import '../select.css';
import classes from './OperationBar.css';

const OperationBar = (props) => {
  const dateStr = getDateStr(localDate());

  return (
    <div>
      <span className={ classes.Left }>
      <select defaultValue={ RANGE._DAY } onChange={ (event) => props.handleSetRange(event.target.value) }>
        <option value={ RANGE._DAY }>Daily</option>
        <option value={ RANGE._WEEK }>Weekly</option>
        <option value={ RANGE._MONTH }>Monthly</option>
        <option value={ RANGE._SEASON }>Seasonly</option>
      </select>
        <span className="Button" onClick={ () => props.handleShiftRange(RANGE._PREV) }>&#8249;</span>
        <span className="Button" onClick={ () => props.handleShiftRange(RANGE._NEXT) }>&#8250;</span>
        <input type="date" value={ props.date || '' } onChange={ (event) => props.handleSetRange(RANGE._DAY, event.target.value) } />
        <TodoAdder date={ dateStr } />
      </span>
      <Emoji symbol="📚" label="batch" handleClick={ props.handleBatch } />
      <Emoji symbol="🚮" label="delete" handleClick={ props.handleDelete } />
      <Emoji symbol="📋" label="sort" handleClick={ () => props.handleSort('type') } />
    </div>
  );
};

export default OperationBar;

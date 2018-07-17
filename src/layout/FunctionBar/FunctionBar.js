import React from 'react';

//import TodoAdder from './TodoAdder';

import Emoji from '../../components/Emoji/Emoji';

import classes from './FunctionBar.css';

const FunctionBar = props => {
  return (
    <div className={ classes.FunctionBar }>
      <span className={ classes.dropdown }>
        <Emoji className={ classes.dropbtn } symbol="📚" label="batch" />
        <div className={ classes.dropdownContent }>
          <span><Emoji symbol="📝" label="edit" handleClick={ props.handleEdit } /></span>
          <span><Emoji symbol="🗑️" label="delete" handleClick={ props.handleDelete } /></span>
        </div>
      </span>
      <span className={ classes.dropdown }>
        <Emoji className={ classes.dropbtn } symbol="📋" label="sort" />
        <div className={ classes.dropdownContent }>
          <a onClick={ () => props.handleSort('id') }>by Time</a>
          <a onClick={ () => props.handleSort('type') }>by Activity</a>
          <a onClick={ () => props.handleSort('color') }>by Color</a>
        </div>
      </span>
    </div>
  );
};

export default FunctionBar;

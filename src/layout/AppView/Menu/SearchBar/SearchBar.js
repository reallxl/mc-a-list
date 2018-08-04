import React from 'react';

import classes from './SearchBar.css';

const SearchBar = props => {
  return (
    <div className={ classes.SearchBar }>
      <input id="keywords" type="text" placeholder="search..." />
      <i className="fa fa-search" />
    </div>
  );
};

export default SearchBar;

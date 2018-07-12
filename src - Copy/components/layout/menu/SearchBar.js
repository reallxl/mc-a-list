import React from 'react';

import classes from './SearchBar.css';

const SearchBar = (props) => {
  return (
    <div className={ classes.SearchBar }>
      <input id="keywords" type="text" placeholder="seach..." />
      <span role="img" id="search">🔍</span>
    </div>
  );
};

export default SearchBar;

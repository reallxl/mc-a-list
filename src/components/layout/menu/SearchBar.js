import React from 'react';

import Emoji from '../Emoji';

import classes from './SearchBar.css';

const SearchBar = (props) => {
  return (
    <div className={ classes.SearchBar }>
      <input id="keywords" type="text" placeholder="seach..." />
      <Emoji symbol="🔍" label="search" forbidden />
    </div>
  );
};

export default SearchBar;

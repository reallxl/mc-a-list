import React from 'react';

import Emoji from '../../../components/Emoji/Emoji';

import classes from './SearchBar.css';

const SearchBar = props => {
  return (
    <div className={ classes.SearchBar }>
      <input id="keywords" type="text" placeholder="search..." />
      <Emoji symbol="🔍" label="search" forbidden />
    </div>
  );
};

export default SearchBar;

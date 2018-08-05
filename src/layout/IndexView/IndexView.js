import React from 'react';

import HeaderQuote from './HeaderQuote/HeaderQuote';
import TodoAdders from './TodoAdders/TodoAdders';

import classes from './IndexView.css';

const IndexView = (props) => {
  return (
    <div className={ classes.IndexView }>
      <HeaderQuote />
      <TodoAdders />
    </div>
  );
};

export default IndexView;

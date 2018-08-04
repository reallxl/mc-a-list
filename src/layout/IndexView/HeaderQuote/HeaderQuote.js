import React from 'react';

import classes from './HeaderQuote.css';

const HeaderQuote = (props) => {
  return (
    <div className={ classes.HeaderQuote }>
      <div>
        <span className={ classes.Intro }>To do </span>
        <span className={ classes.Prelude }>or </span>
        <span className={ classes.MiddlePeriod }>not to do,</span>
      </div>
      <div>
        <span className={ classes.Outro }>that is the question.</span>
      </div>
    </div>
  );
};

export default HeaderQuote;

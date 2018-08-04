import React from 'react';

import classes from './Logo.css';

const Logo = (props) => {
  return (
    <div className={ classes.Logo }>
      <span className={ classes.McPart }>M</span>
      <span className={ classes.McPart } style={ { fontSize: '16px', } }>c</span>
      <span className={ classes.APart }>A</span>
      <span className={ classes.ListPart }>List</span>
    </div>
  );
};

export default Logo;

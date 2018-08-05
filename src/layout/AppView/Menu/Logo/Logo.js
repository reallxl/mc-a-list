import React from 'react';

import classes from './Logo.css';

const Logo = (props) => {
  return (
    <div className={ classes.Logo }>
      <div className={ classes.McPart }>M</div>
      <div className={ classes.McPart } style={ { fontSize: '16px', } }>c</div>
      <div className={ classes.APart }>A</div>
      <div className={ classes.ListPart }>List</div>
    </div>
  );
};

export default Logo;

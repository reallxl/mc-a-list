import React from 'react';

const Button = (props) => {
  return (
    <button onClick={ props.clicked }>{ props.value }</button>
  );
};

export default Button;

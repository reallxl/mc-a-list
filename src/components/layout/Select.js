import React from 'react';

const Select = (props) => {
  return (
    <select name={ props.name } value={ props.value } onChange={ props.handleChange }>
      { props.options.map(option => <option key={ option } id={ option } value={ option } label={ option } />) }
    </select>
  );
};

export default Select;

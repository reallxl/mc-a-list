import React from 'react';

import classes from './TodoDetails.css';

const TodoDetails = (props) => {
  return (
    <div className={ classes.TodoDetails }>
      <div className={ classes.ColorPicker } style={ { backgroundColor: props.color, } } >
        <input type="color" onChange={ (event) => props.handleColorChange(event.target.value) } defaultValue={ props.color } />
      </div>
      <i className="fa fa-user-circle" />
      <i className="fa fa-map-marker" />
      <i className="fa fa-paperclip" />
    </div>
  );
}

export default TodoDetails;

import React from 'react';

import classes from './Popup.css';

class Popup extends React.Component {
  state = {
    isPopping: undefined,
  };

  toggle = () => {
    const isPopping = this.state.isPopping;

    this.setState({
      isPopping: isPopping ? false : true,
    });
  }

  render = () => {
    const TogglerTag = this.props.togglerTag;
    const togglerClass = [ this.props.togglerClass, ];
    const contentStyle = [ classes.PopupContent, ];

    togglerClass.push(classes.Popup);

    if (this.state.isPopping !== undefined) {
      contentStyle.push(this.state.isPopping ? classes.show : classes.hide);
    }

    return (
      <TogglerTag className={ togglerClass.join(' ') } onClick={ this.toggle }>
        { React.cloneElement(this.props.children, { className: contentStyle.join(' ') }) }
      </TogglerTag>
    );
  };
}

export default Popup;

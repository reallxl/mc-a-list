import React from 'react';

import Emoji from '../../Emoji/Emoji';

import { STATUS } from '../../../global/definitions/index';

import classes from './Todo.css';

class Todo extends React.Component {
  state = {
    isActive: this.props.isSelected,
  };

  handleHover = (value) => {
    if (this.props.isSelected === false) {
      this.setState({
        isActive: value,
      });
    }
  };

  render = () => {
    const dynamicStyle = {
      backgroundColor: this.props.content.color
    };

    return (
      <div
        className={ classes.Todo }
        style={ dynamicStyle }
        onMouseEnter={ () => this.handleHover(true) }
        onMouseLeave={ () => this.handleHover(false) }
      >
        { this.state.isActive ? (
          <span>
            <input type="checkbox" id="select" onChange={ (event) => this.props.handleSelect(event.target.checked) } checked={ this.props.isSelected } />
            { this.props.content.status === STATUS._DONE ?
              <Emoji symbol="💯" label="done" inactive /> :
              <Emoji symbol="⚪" label="mark" handleClick={ () => this.props.handleUpdateStatus(STATUS._DONE) } />
            }
            { this.props.content.description }
            { this.props.content.status !== STATUS._DONE && <Emoji symbol="📝" label="edit" handleClick={ this.props.handleEdit } /> }
            <Emoji symbol="🚮" label="delete" handleClick={ this.props.handleDelete } />
          </span>
        ) : (
          <span>
            { this.props.content.status === STATUS._DONE && <Emoji symbol="💯" label="done" inactive /> }
            { this.props.content.description }
          </span>
        ) }
      </div>
    );
  };
}

export default Todo;

import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import StatusModifier from '../../../../components/StatusModifier/StatusModifier';
import TodoEditor from '../../../../components/TodoEditor/TodoEditor';

import * as ACTION from '../../../../store/actions/index';
import { STATUS } from '../../../../global/definitions/index';

import classes from './Todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.dropDownRef = React.createRef();
  }

  state = {
    showReOrderIcon: false,
    isFocused: this.props.isSelected,
    isDropped: false,
  };

  render = () => {
    const focusClass = this.state.isFocused ? classes.Focused : classes.UnFocused;
    const dropClass = [ 'DropDownContent', ];

    if (this.state.isDropped) {
      dropClass.push('show');
    }

    return (
      <li className={ classes.Todo }
        onMouseEnter={ () => this.handleFocus(true) }
        onMouseLeave={ () => this.handleFocus(false) }
        onClick={ (event) => this.checkModal(event) }
        style={ { backgroundColor: this.props.content.color, } }
      >
        { this.props.isEditing ?
          <TodoEditor id={ this.props.id } content={ this.props.content } /> :
          <div>
            <span className={ focusClass } style={{margin: '0px 8px',}}>
              <StatusModifier />
            </span>
            <p>
              { this.props.content.description }
            </p>
            <div className={ [ focusClass, "right", "DropDown" ].join(' ') }>
              <i className="material-icons"
                style={{paddingTop: '10px',marginRight: '8px',}}
                onClick={ () => this.toggleDropDown(true) }>more_horiz</i>
              <div className={ dropClass.join(' ') } ref={ this.dropDownRef }>
                <i className="fa fa-edit" onClick={ () => this.props.onOpenEmbeddedEditor(this.props.id) } />
                <i className="fa fa-trash-o" onClick={ () => this.props.onDeleteTodos([ this.props.id, ]) } />
              </div>
            </div>
          </div>
        }
      </li>
    );
  };

  handleFocus = (value) => {
    //if (this.props.isSelected !== true) {
      this.setState({
        isFocused: value,
      });
    //}
  };

  toggleDropDown = (value) => {
    //if (this.props.isSelected !== true) {
      this.setState({
        isDropped: value,
      });
    //}
  };

  checkModal = (event) => {
    if (this.state.isDropped && event.target !== this.dropDownRef.current) {
      this.toggleDropDown(false);
    }
  }

  /*<span
    onMouseEnter={ () => this.setState({ showReOrderIcon: true }) }
    onMouseLeave={ () => this.setState({ showReOrderIcon: false }) }
  >
    { this.state.showReOrderIcon && <span className={ classes.Check }><i className="fa fa-reorder" /></span> }
  </span>*/
  /*{ this.props.content.status === STATUS._DONE && <Emoji symbol="💯" label="done" inactive /> }*/
  /*{ this.state.isFocused &&
    <Popup trigger={ <span className={ classes.More }><i className="material-icons">more_horiz</i></span> }>
      <div>
        <i className="fa fa-edit" onClick={ this.props.handleEdit } />
        <i className="fa fa-trash-o" onClick={ this.props.handleDelete } />
      </div>
    </Popup> }*/
}

const mappedProps = (state) => {
  return {

  };
};

const mappedDispatches = (dispatch) => {
  return {
    onOpenEmbeddedEditor: (id) => dispatch(ACTION.openEmbeddedEditor(id)),
    onDeleteTodos: (ids) => dispatch(ACTION.deleteTodos(ids)),
    onSelectTodos: (todos, value) => dispatch(ACTION.selectTodos(todos, value)),
  };
};

export default connect(mappedProps, mappedDispatches)(Todo);

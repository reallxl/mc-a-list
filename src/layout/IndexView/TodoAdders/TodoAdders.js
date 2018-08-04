import React from 'react';
import { connect } from 'react-redux';

import * as ACTION from '../../../store/actions/index';

import classes from './TodoAdders.css';

const TodoAdders = (props) => {
  const todoAdderClasses = [ classes.TodoAdders, ];
  const subAdderClasses = [ classes.SubAdder, ];

  if (props.activated) {
    todoAdderClasses.push(classes.TodoAddersActivated);
    subAdderClasses.push(classes.SubAdderAnim);
  }

  return (
    <div className={ todoAdderClasses.join(' ') }>
      <div className={ classes.MainAdder }>
        <i className="fa fa-calendar-plus-o ToolTips" onClick={ props.onOpenModalEditor } />
      </div>
      <div className={ subAdderClasses.join(' ') }>
        <i className="fa fa-user-circle ToolTips">
          <span className="ToolTipsText">personal</span>
        </i>
        <i className="fa fa-briefcase ToolTips" style={ { animationDelay: '6s', } }>
          <span className="ToolTipsText">business</span>
        </i>
        <i className="fa fa-shopping-cart ToolTips" style={ { animationDelay: '12s', } }>
          <span className="ToolTipsText">shopping</span>
        </i>
        <i className="fa fa-cutlery ToolTips" style={ { animationDelay: '18s', } }>
          <span className="ToolTipsText">date</span>
        </i>
        <i className="fa fa-soccer-ball-o ToolTips" style={ { animationDelay: '24s', } }>
          <span className="ToolTipsText">interest</span>
        </i>
      </div>
    </div>
  );
}

const mappedProps = state => {
  return {
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onOpenModalEditor: (content) => dispatch(ACTION.openModalEditor(content)),
  };
};

export default connect(mappedProps, mappedDispatches)(TodoAdders);

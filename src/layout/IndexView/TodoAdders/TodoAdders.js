import React from 'react';
import { connect } from 'react-redux';

import * as ACTION from '../../../store/actions/index';
import { CATEGORY } from '../../../global/definitions/index';

import classes from './TodoAdders.css';

const TodoAdders = (props) => {
  return (
    <div className={ classes.TodoAdders }>
      <div className={ classes.MainAdder }>
        <i className="fa fa-calendar-plus-o ToolTips" onClick={ props.onOpenModalEditor } />
      </div>
      <div className={ classes.SubAdder }>
        <i className="fa fa-user-circle ToolTips"
          style={ { animationDelay: '7s', } }
          onClick={ () => props.onOpenModalEditor({ category: CATEGORY._PERSONAL, }) }
        >
          <span className="ToolTipsText">personal</span>
        </i>
        <i className="fa fa-briefcase ToolTips"
          style={ { animationDelay: '13s', } }
          onClick={ () => props.onOpenModalEditor({ category: CATEGORY._BUSINESS, }) }
        >
          <span className="ToolTipsText">business</span>
        </i>
        <i className="fa fa-cutlery ToolTips"
          style={ { animationDelay: '19s', } }
          onClick={ () => props.onOpenModalEditor({ category: CATEGORY._DATE, }) }
        >
          <span className="ToolTipsText">date</span>
        </i>
        <i className="fa fa-soccer-ball-o ToolTips"
          style={ { animationDelay: '25s', } }
          onClick={ () => props.onOpenModalEditor({ category: CATEGORY._INTEREST, }) }
        >
          <span className="ToolTipsText">interest</span>
        </i>
        <i className="fa fa-shopping-cart ToolTips"
          style={ { animationDelay: '31s', } }
          onClick={ () => props.onOpenModalEditor({ category: CATEGORY._SHOPPING, }) }
        >
          <span className="ToolTipsText">shopping</span>
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

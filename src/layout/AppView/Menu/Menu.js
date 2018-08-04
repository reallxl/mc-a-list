import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo/Logo';
/*import SearchBar from './SearchBar/SearchBar';*/

import * as ACTION from '../../../store/actions/index';

import classes from './Menu.css';

/*
<i className="fa fa-calendar ToolTips">
  <span className="ToolTipsText">period</span>
</i>
<i className="material-icons ToolTips">location_searching
  <span className="ToolTipsText">filter</span>
</i>
*/
class Menu extends React.Component {
  state = {
    isShowingDisplaySubMenu: false,
    isShowingSortingOptions: false,
  };

  render = () => {
    let displaySubMenuStyle,
      displaySubMenuContentStyle;

    if (this.state.isShowingDisplaySubMenu) {
      displaySubMenuStyle = {
        marginLeft: '-21px',
        borderBottom: '36px solid black',
        borderLeft: '18px solid transparent',
        borderRight: '18px solid black',
        height: 0,
        width: '15%',
        transitionProperty: 'width',
      };
      displaySubMenuContentStyle = {
        display: 'inline-block',
      };
    } else {
      displaySubMenuStyle = {
        marginLeft: '-12px',
        width: '5px',
        height: '36px',
        transform: 'skew(-27deg)',
        background: 'black',
        transitionProperty: 'width, border-right',
      };
      displaySubMenuContentStyle = {
        display: 'none',
      };
    }

    const sortDropDownClasses = [ 'DropDownContent', ];

    if (this.state.isShowingSortingOptions) {
      sortDropDownClasses.push('show');
    }

    return (
      <div className={ classes.Menu }>
        <Logo />
        <div className={ classes.pointer } />
        <i className="fa fa-calendar-plus-o ToolTips"
          onClick={ this.props.onOpenModalEditor }
        >
          <span className="ToolTipsText">add</span>
        </i>
        <i className="glyphicon glyphicon-eye-open ToolTips"
          onClick={ () => this.setState(prevState => ({ isShowingDisplaySubMenu: !prevState.isShowingDisplaySubMenu, })) }
        >
          <span className="ToolTipsText">display</span>
        </i>
        <div className={ classes.DisplaySubMenu }
          style={ displaySubMenuStyle }
        >
          <div className={ classes.DisplaySubMenuContent }
            style={ displaySubMenuContentStyle }
          >
            <i className="fa fa-calendar ToolTips">
              <span className="ToolTipsText">period</span>
            </i>
            <i className="material-icons ToolTips">
              location_searching
              <span className="ToolTipsText">filter</span>
            </i>
            <i className="glyphicon glyphicon-sort ToolTips"
              onClick={ () => this.setState(prevState => ({ isShowingSortingOptions: !prevState.isShowingSortingOptions, })) }
            >
              <span className="ToolTipsText">sort</span>
            </i>
            <div className="DropDown">
              <div className={ sortDropDownClasses.join(' ') }
                style={ { left: '63%', } }
              >
                <div onClick={()=>this.props.onSortTodos('id')}>by time</div>
                <div onClick={()=>this.props.onSortTodos('category')}>by category</div>
                <div onClick={()=>this.props.onSortTodos('color')}>by color</div>
              </div>
            </div>
          </div>
        </div>
        <i className="fa fa-search ToolTips">
          <span className="ToolTipsText">search</span>
        </i>
        <div className={ classes.RightMenu }>
          <i className="material-icons ToolTips">notifications
            <span className="ToolTipsText">notifications</span>
          </i>
          <i className="material-icons ToolTips">timelapse
            <span className="ToolTipsText">analysis</span>
          </i>
          <i className="fa fa-cog ToolTips">
            <span className="ToolTipsText">settings</span>
          </i>
        </div>
      </div>
    );
  }
}

const mappedProps = state => {
  return {
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onOpenModalEditor: (content) => dispatch(ACTION.openModalEditor(content)),
    onSortTodos: (sortingKey) => dispatch(ACTION.sortTodos(sortingKey)),
  };
};

export default connect(mappedProps, mappedDispatches)(Menu);

import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo/Logo';
//import SystemMenu from './SystemMenu/SystemMenu';
//import SearchBar from './SearchBar/SearchBar';
import PeriodSelector from './PeriodSelector/PeriodSelector';

import * as DATA from './Menu_data';
import * as ACTION from '../../../store/actions/index';

import classes from './Menu.css';

class Menu extends React.Component {
  state = {
    isShowingDisplaySubMenu: false,
    curSubMenuType: undefined,
  };

  render = () => {
    return (
      <div className={ classes.Menu }>
        { this.renderMainMenu() }
        <div className={ classes.Divider } />
        { this.renderSubMenu() }
      </div>
    );
  }

  renderMainMenu = () => {
    let displaySubMenuStyle,
      displaySubMenuContentStyle;

    if (this.state.isShowingDisplaySubMenu) {
      displaySubMenuStyle = {
        width: '15%',
      };
      displaySubMenuContentStyle = {
        display: 'inline-block',
      };
    } else {
      displaySubMenuStyle = undefined;
      displaySubMenuContentStyle = {
        display: 'none',
      };
    }

    return (
      <div className={ classes.MainMenu }>
        <Logo />
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
            <i className="fa fa-calendar ToolTips"
              onClick={ () => this.toggleSubMenu(DATA._SUBMENU_TYPE._PERIOD) }
            >
              <span className="ToolTipsText">period</span>
            </i>
            <i className="material-icons ToolTips">location_searching
              <span className="ToolTipsText">filter</span>
            </i>
            <i className="glyphicon glyphicon-sort ToolTips"
              onClick={ () => this.toggleSubMenu(DATA._SUBMENU_TYPE._SORT) }
            >
              <span className="ToolTipsText">sort</span>
            </i>
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

  renderSubMenu = () => {
    let subMenuStyle,
      subMenuContent;

    if (this.state.curSubMenuType) {
      subMenuStyle = this.state.curSubMenuType ? {
        height: '35px',
      } : undefined;
    }

    switch (this.state.curSubMenuType) {
      case DATA._SUBMENU_TYPE._PERIOD:
        return (
          <div className={ classes.SubMenu }
            style={ subMenuStyle }
          >
            <PeriodSelector />
          </div>
        );
      case DATA._SUBMENU_TYPE._SORT:
        return (
          <div className={ classes.SubMenu }
            style={ subMenuStyle }
          >
            <div className={ classes.Tag }>
              <span onClick={ () => this.props.onSortTodos('id') }>by time</span>
            </div>
            <div className={ classes.TagO }>
              <span onClick={ () => this.props.onSortTodos('category') }>by category</span>
            </div>
            <div className={ classes.Tag }>
              <span onClick={ () => this.props.onSortTodos('color') }>by color</span>
            </div>
          </div>
        );
        default:
          return;
    }
  }

  toggleSubMenu = (type) => {
    this.setState(prevState => ({
      curSubMenuType: type === prevState.curSubMenuType ? undefined : type,
    }));
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

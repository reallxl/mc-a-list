import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo/Logo';
/*import SearchBar from './SearchBar/SearchBar';*/

import * as ACTION from '../../../store/actions/index';

import classes from './Menu.css';

class Menu extends React.Component {
  state = {
    isShowingDisplaySubMenu: false,
    curSubMenuType: undefined,
  };

  render = () => {
    let displaySubMenuStyle,
      displaySubMenuContentStyle,
      SubMenuStyle;

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

    if (this.state.curSubMenuType) {
      SubMenuStyle = this.state.curSubMenuType ? {
        height: '35px',
      } : undefined;
    }

    return (
      <div className={ classes.Menu }>
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
                onClick={ () => this.toggleSubMenu() }
              >
                <span className="ToolTipsText">period</span>
              </i>
              <i className="material-icons ToolTips">location_searching
                <span className="ToolTipsText">filter</span>
              </i>
              <i className="glyphicon glyphicon-sort ToolTips"
                onClick={ () => this.toggleSubMenu() }
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
        <div className={ classes.SubMenu }
          style={ SubMenuStyle }
        >
        </div>
      </div>
    );
  }

  toggleSubMenu = (type = 1) => {
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
  };
};

export default connect(mappedProps, mappedDispatches)(Menu);

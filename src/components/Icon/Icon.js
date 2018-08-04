import React from 'react';

import classes from './Icon.css';

class Icon extends React.Component {
  state = {
    isContentDropped: false,
  };

  render = () => {
    const iconClasses = [
      classes.Icon,
      this.props.iconClass,
    ];

    iconClasses.push(
      this.state.isContentDropped ?
        'DropDown' :
        'ToolTips'
    );

    return this.state.isContentDropped ?
      //--- DropDown
      (
        <div className="DropDown" style={ { float: 'right', } }>
          <i className={ iconClasses.join(' ') }
            style={ this.props.iconStyle }
            onClick={ () => this.setState(prevState => ({ isContentDropped: !prevState.isContentDropped, })) }
          />
          <div className='DropDownContent show'
            onClick={ (event) => event.stopPropagation() }
          >
            { this.props.dropDownContent }
          </div>
        </div>
      ) :
      //--- ToolTips
      (
        <i className={ iconClasses.join(' ') }
          style={ this.props.iconStyle }
          onClick={ () => this.setState(prevState => ({ isContentDropped: !prevState.isContentDropped, })) }
        >
          <span className="ToolTipsText"
            style={ this.props.toolTipsTextStyle }
          >
            { this.props.toolTipsText }
          </span>
        </i>
      );
  }
};

export default Icon;

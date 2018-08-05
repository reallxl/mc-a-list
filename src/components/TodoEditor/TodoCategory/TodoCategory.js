import React from 'react';

import { CATEGORY_DATA } from '../../../global/definitions/index';

//import classes from './TodoCategory.css';

class TodoCategory extends React.Component {
  state = {
    isContentDropped: false,
  };

  render = () => {
    const iconClasses = [ CATEGORY_DATA[this.props.category].iconClass, ];

    iconClasses.push(this.state.isContentDropped ?
      'DropDown' :
      'ToolTips'
    );
    const toolTipsTextStyle = {
      top: '110%',
    };

    return (
      <i className={ iconClasses.join(' ') }
        style={ this.props.dynamicFGStyle }
        onClick={ () => this.setState(prevState => ({ isContentDropped: !prevState.isContentDropped, })) }>
        {
          this.state.isContentDropped ?
          <div className='DropDownContent show'>
            {
              CATEGORY_DATA.map((category, index) => (
                <i className={ [ category.iconClass, 'ToolTips', ].join(' ') }
                  key={ index }
                  onClick={ () => this.props.handleCategoryChange(index) }
                >
                  <span className="ToolTipsText" style={ toolTipsTextStyle }>{ category.text }</span>
                </i>
              ))
            }
          </div> :
          <span className="ToolTipsText" style={ toolTipsTextStyle }>{ CATEGORY_DATA[this.props.category].text }</span>
        }
      </i>
    );
  }
};

export default TodoCategory;

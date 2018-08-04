import React from 'react';
import Popup from 'reactjs-popup';

import classes from './StatusModifier.css';

class StatusModifier extends React.Component {
  state = {
    isStatusBarToggled: false,
  };

  toggleHiddenStatusBar = (enable) => {

    if (enable) {
      this.countDownId = setTimeout(() => this.setState({ isStatusBarToggled: true }), 2000);
    } else {
      clearTimeout(this.countDownId);
    }
  };

  render = () => {
    return (
      <div className={ classes.StatusModifier }>
      { this.state.isStatusBarToggled ?
        <Popup trigger={ <i className="fa fa-check-square-o" /> } defaultOpen={ true }>
          <div>
            <i className="fa fa-thumb-tack" />
            <i className="fa fa-check-square-o" />
            <i className="fa fa-check-square-o" />
          </div>
        </Popup> :
        <i className="fa fa-check-square-o"
          onClick={ () => console.log('woo') }
          onMouseDown={ (e) => { e.preventDefault(); this.toggleHiddenStatusBar(true); } }
          onMouseUp={ (e) => { e.preventDefault(); this.toggleHiddenStatusBar(false); } }
          onMouseLeave={ (e) => { e.preventDefault(); this.toggleHiddenStatusBar(false); } } />
      }
      </div>

    );
  };
}

export default StatusModifier;

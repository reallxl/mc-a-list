import React from 'react';

import IndexView from './layout/IndexView/IndexView';
import AppView from './layout/AppView/AppView';

import classes from './App.css';

class App extends React.Component {
  state = {
    isActivated: false,
  };

  render = () => {
    return (
      <div className={ classes.App }>
        <AppView />
      </div>
    );
  }

  /*{ this.state.isActivated ?
    <AppView /> :
    <IndexView />
  }*/

  activate = () => {
    this.setState({
      isActivated: true,
    });
  }
}

export default App;

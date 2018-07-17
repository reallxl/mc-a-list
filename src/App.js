import React, { Component } from 'react';

import McAList from './layout/McAList';

import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <McAList />
      </div>
    );
  }
}

export default App;

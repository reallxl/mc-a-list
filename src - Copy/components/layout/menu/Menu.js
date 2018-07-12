import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';

import OP from '../../../definitions/operations';

import logo from './logo.svg';
import classes from './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className={ classes.Menu }>
        <table>
          <tbody>
          <tr>
            <td rowSpan="2">
              <img src={ logo } className={ classes.Logo } alt="logo" />
            </td>
            <td>
              <SearchBar />
            </td>
          </tr>
          <tr>
            <td>
              <button id="filterSwitch" onClick={ this.props.onSwitchFilter }>Filter</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  };
}

const mappedDispatches = dispatch => {
  return {
    onSwitchFilter: () => dispatch({
      type: OP._SWITCH_FILTER,
    }),
  };
};

export default connect(mappedDispatches)(Menu);

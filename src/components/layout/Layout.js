import React, { Component } from 'react';
//import { connect } from 'react-redux';

import Menu from './menu/Menu';
//import FilterPanel from './filterPanel/FilterPanel';
//import Navigator from './navigator/Navigator';
import DisplayArea from './displayArea/DisplayArea';

import './global.css';

class Layout extends Component {
  render() {
    return (
      <div>
        <table>
        <tbody>
        <tr>
          <td>
            <Menu />
          </td>
        </tr>
        <tr>
          <td>
            <DisplayArea />
          </td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
}

export default Layout;

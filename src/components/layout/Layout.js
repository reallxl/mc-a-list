import React, { Component } from 'react';

import Menu from './Menu/Menu';
import DisplayArea from './mainSpace/DisplayArea';

import './commonStyling/global.css';

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

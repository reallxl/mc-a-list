import React from 'react';

import SearchBar from './SearchBar/SearchBar';

import logo from './logo.svg';
import classes from './Menu.css';

const Menu = props => {
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
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Menu;

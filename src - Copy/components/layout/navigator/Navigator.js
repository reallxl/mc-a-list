import React from 'react';
import { connect } from 'react-redux';

import OP from '../../../definitions/operations';
import SCOPE from '../../../definitions/scopes';

import classes from './Navigator.css';

const Navigator = (props) => {
  return (
    <div className={ classes.Navigator }>
      <p className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._DAY) }>Ⓓ</p>
      <p className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._WEEK) }>Ⓦ</p>
      <p className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._MONTH) }>Ⓜ</p>
      <p className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._SEASON) }>Ⓢ</p>
      <input type="date" onChange={ (event) => props.onUpdateScope(event.target.value) } />
    </div>
  );
};

const mappedProps = state => {
  return {

  };
};

const mappedDispatches = dispatch => {
  return {
    onUpdateScope: (scopeType) => dispatch({
      type: OP._UPDATE_SCOPE,
      scopeType: scopeType,
    }),
  };
}

export default connect(mappedProps, mappedDispatches)(Navigator);

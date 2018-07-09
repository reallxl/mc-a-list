import React from 'react';
import { connect } from 'react-redux';

import OP from '../../../definitions/operations';
import STATUS from '../../../definitions/statuses';

import classes from './Navigator.css';

const Navigator = (props) => {
  return (
    <div className={ classes.Navigator }>
      <p>Navigator</p>
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
    onUpdateScope: (from, to = undefined) => dispatch({
      type: OP._UPDATE_SCOPE,
      from: from,
      to: to || from,
    }),
  };
}

export default connect(mappedProps, mappedDispatches)(Navigator);

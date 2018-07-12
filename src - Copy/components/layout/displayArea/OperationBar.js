import React from 'react';
import { connect } from 'react-redux';

import OP from '../../../definitions/operations';
import SCOPE from '../../../definitions/scopes';
import STATUS from '../../../definitions/statuses';

import classes from './OperationBar.css';

const OperationBar = (props) => {
  return (
    <div>
      <p className={ classes.Left }>
        <span className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._DAY) }>Ⓓ</span>
        <span className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._WEEK) }>Ⓦ</span>
        <span className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._MONTH) }>Ⓜ</span>
        <span className="functionalText" onClick={ () => props.onUpdateScope(SCOPE._SEASON) }>Ⓢ</span>
        <input type="date" onChange={ (event) => props.onUpdateScope(event.target.value) } />
      </p>
      <span role="img" arial-label="prev" onClick={ () => props.onSort('color') }>⏪</span>
      <span role="img" arial-label="next" onClick={ () => props.onSort() }>⏩</span>
      <span role="img" arial-label="batch" onClick={ props.onBatchProc }>📚</span>
      <span role="img" arial-label="delete" onClick={ props.onDelete }>🚮</span>
      <span role="img" arial-label="sort" onClick={ () => props.onSort('type') }>📋</span>
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
    onBatchProc: () => dispatch({
      type: OP._UPDATE_STATUS,
      status: STATUS._DONE,
    }),
    onDelete: () => dispatch({
      type: OP._DELETE,
    }),
    onSort: (criterion) => dispatch({
      type: OP._SORT,
      criterion: criterion,
    }),
  };
}

export default connect(mappedProps, mappedDispatches)(OperationBar);

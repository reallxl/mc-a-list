import React from 'react';
import { connect } from 'react-redux';

import * as ACTION from '../../../../store/actions/index';
import RANGE from '../../../../definitions/ranges';

import classes from './PeriodSelector.css';

const PeriodSelector = props => {
  return (
    <div>
      <select className={ classes.prev } defaultValue={ props.period.type } onChange={ (event) => props.onSetPeriodType(event.target.value) }>
        <option value={ RANGE._DAY }>Daily</option>
        <option value={ RANGE._WEEK }>Weekly</option>
        <option value={ RANGE._MONTH }>Monthly</option>
        <option value={ RANGE._SEASON }>Quarter</option>
      </select>
      { showPeriod(props) }
      <span className={ classes.next }>
      <span className="Button Lefter" onClick={ () => props.onUpdatePeriod(RANGE._PREV) }>&#8249;</span>
      <span className="Button Righter" onClick={ () => props.onUpdatePeriod(RANGE._NEXT) }>&#8250;</span>
      </span>
    </div>
  );
};

const mappedProps = state => {
  return {
    period: state.period.period,
  };
};

const mappedDispatches = dispatch => {
  return {
    onSetPeriodType: (rangeType, date) => dispatch(ACTION.setPeriodType(rangeType, date)),
    onUpdatePeriod: (dir) => dispatch(ACTION.updatePeriod(dir)),
  };
};

export default connect(mappedProps, mappedDispatches)(PeriodSelector);

//****************************************************************************************************
// local functions
//****************************************************************************************************

const showPeriod = props => {
  const fromDate = new Date(props.period.fromDate);
  const MONTH_NAME = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  switch (props.period.type) {
    case RANGE._DAY: default:
      return <input type="date" value={ props.period.fromDate } onChange={ (event) => props.onSetPeriodType(RANGE._DAY, event.target.value) } />;
    case RANGE._WEEK:
      const getFirstDayOfMonth = (date) => new Date(new Date(date).setDate(1)).getDay();
      const getFullWeekStrArr = (date) => [ date.getFullYear(), MONTH_NAME[date.getMonth()], 'W' + (Math.floor(((date.getDate() - 1) + getFirstDayOfMonth(date)) / 7) + 1) ];

      let period = getFullWeekStrArr(fromDate);

      const toDate = new Date(props.period.toDate);
      if (toDate.getMonth() !== fromDate.getMonth()) {
        period = period.concat([ '/' ], getFullWeekStrArr(toDate));
      }

      return <span className={ classes.period }>{ period.join(' ') }</span>;
    case RANGE._MONTH:
      return <span className={ classes.period }>{ [ fromDate.getFullYear(), MONTH_NAME[fromDate.getMonth()] ].join(' ') }</span>;
    case RANGE._SEASON:
      return <span className={ classes.period }>{ [ fromDate.getFullYear(), 'Q' + (Math.floor(fromDate.getMonth() / 3) + 1) ].join(' ') }</span>;
  }
};

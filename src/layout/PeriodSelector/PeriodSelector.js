import React from 'react';
import { connect } from 'react-redux';

import * as ACTION from '../../store/actions/index';
import { PERIOD } from '../../global/definitions/index';

import classes from './PeriodSelector.css';

const PeriodSelector = props => {
  return (
    <div>
      <select className={ classes.prev } defaultValue={ props.period.type } onChange={ (event) => props.onSetPeriodType(event.target.value) }>
        <option value={ PERIOD._DAY }>Daily</option>
        <option value={ PERIOD._WEEK }>Weekly</option>
        <option value={ PERIOD._MONTH }>Monthly</option>
        <option value={ PERIOD._SEASON }>Quarter</option>
      </select>
      { showPeriod(props) }
      <span className={ classes.next }>
      <span className="Button Lefter" onClick={ () => props.onShiftPeriod(PERIOD._PREV) }>&#8249;</span>
      <span className="Button Righter" onClick={ () => props.onShiftPeriod(PERIOD._NEXT) }>&#8250;</span>
      </span>
    </div>
  );
};

const mappedProps = state => {
  return {
    period: state.display.period,
  };
};

const mappedDispatches = dispatch => {
  return {
    onSetPeriodType: periodType => dispatch(ACTION.setPeriodType(periodType)),
    onSetPeriod: (fromDate, toDate = fromDate, periodType = undefined) => dispatch(ACTION.setPeriod(periodType, fromDate, toDate)),
    onShiftPeriod: dir => dispatch(ACTION.shiftPeriod(dir)),
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
    case PERIOD._DAY: default:
      return <input type="date" value={ props.period.fromDate } onChange={ (event) => props.onSetPeriod(event.target.value) } />;
    case PERIOD._WEEK:
      const getFirstDayOfMonth = (date) => new Date(new Date(date).setDate(1)).getDay();
      const getFullWeekStrArr = (date) => [ date.getFullYear(), MONTH_NAME[date.getMonth()], 'W' + (Math.floor(((date.getDate() - 1) + getFirstDayOfMonth(date)) / 7) + 1) ];

      let period = getFullWeekStrArr(fromDate);

      const toDate = new Date(props.period.toDate);
      if (toDate.getMonth() !== fromDate.getMonth()) {
        period = period.concat([ '/' ], getFullWeekStrArr(toDate));
      }

      return <span className={ classes.period }>{ period.join(' ') }</span>;
    case PERIOD._MONTH:
      return <span className={ classes.period }>{ [ fromDate.getFullYear(), MONTH_NAME[fromDate.getMonth()] ].join(' ') }</span>;
    case PERIOD._SEASON:
      return <span className={ classes.period }>{ [ fromDate.getFullYear(), 'Q' + (Math.floor(fromDate.getMonth() / 3) + 1) ].join(' ') }</span>;
  }
};

import React from 'react';

import RANGE from '../../../definitions/ranges';

import classes from './PeriodSelector.css';

const PeriodSelector = (props) => {
  const showPeriod = () => {
    const fromDate = new Date(props.period.fromDate);
    const MONTH_NAME = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    switch (props.period.type) {
      case RANGE._DAY: default:
        return <input type="date" value={ props.period.fromDate } onChange={ (event) => props.handleSetRange(RANGE._DAY, event.target.value) } />;
      case RANGE._WEEK:
        const getFirstDayOfMonth = (date) => new Date(new Date(date).setDate(1)).getDay();
        const getFullWeekStrArr = (date) => [ date.getFullYear(), MONTH_NAME[date.getMonth()], 'W' + (Math.floor(((date.getDate() - 1) + getFirstDayOfMonth(date)) / 7) + 1) ];

        let period = getFullWeekStrArr(fromDate);

        const toDate = new Date(props.period.toDate);
        if (toDate.getMonth() !== fromDate.getMonth()) {
          period = period.concat([ '/' ], getFullWeekStrArr(toDate));
        }

        return period.join(' ');
      case RANGE._MONTH:
        return [ fromDate.getFullYear(), MONTH_NAME[fromDate.getMonth()] ].join(' ');
      case RANGE._SEASON:
        return [ fromDate.getFullYear(), 'Q' + (Math.floor(fromDate.getMonth() / 3) + 1) ].join(' ');
    }
  };

  return (
    <div>
      <select className={ classes.L } defaultValue={ props.period.type } onChange={ (event) => props.handleSetRange(event.target.value) }>
        <option value={ RANGE._DAY }>Daily</option>
        <option value={ RANGE._WEEK }>Weekly</option>
        <option value={ RANGE._MONTH }>Monthly</option>
        <option value={ RANGE._SEASON }>Quarter</option>
      </select>
      { showPeriod() }
      <span className={ classes.R }>
      <span className="Button Lefter" onClick={ () => props.handleShiftRange(RANGE._PREV) }>&#8249;</span>
      <span className="Button Righter" onClick={ () => props.handleShiftRange(RANGE._NEXT) }>&#8250;</span>
      </span>
    </div>
  );
};

export default PeriodSelector;

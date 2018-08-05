import React from 'react';
import { connect } from 'react-redux';

import * as ACTION from '../../../../store/actions/index';
import { PERIOD } from '../../../../global/definitions/index';

import classes from './PeriodSelector.css';

class PeriodSelector extends React.Component {
  state = {
    isSelectingPeriodType: false,
  };

  render = () => {
    return (
      <div className={ classes.PeriodSelector }>
        <div className={ classes.Tag }
          style={ { padding: '8px 0px 1px', } }
          onClick={ () => this.setState(prevState => ({ isSelectingPeriodType: !prevState.isSelectingPeriodType, })) }
        >
          <div className={ classes.TagA }
            onClick={ () => this.props.onSetPeriodType(PERIOD._DAY) }
          >
            { PERIOD._DAY }
          </div>
          <div className={ classes.TagA }
            onClick={ () => this.props.onSetPeriodType(PERIOD._WEEK) }
          >
            { PERIOD._WEEK }
          </div>
          <div className={ classes.TagA }
            onClick={ () => this.props.onSetPeriodType(PERIOD._MONTH) }
          >
            { PERIOD._MONTH }
          </div>
          <div className={ classes.TagA }
            onClick={ () => this.props.onSetPeriodType(PERIOD._SEASON) }
          >
            { PERIOD._SEASON }
          </div>
        </div>
        <div className={ classes.TagO }
          onClick={ () => this.props.onShiftPeriod(PERIOD._PREV) }
        >
          <i className="fa fa-step-backward"
          >
          </i>
        </div>
        <div className={ [ classes.TagW, 'ToolTips', ].join(' ') }
          style={ { padding: '8px 0px 1px', } }
        >
          { this.showPeriodText() }
          <span className="ToolTipsText">{ [ this.props.period.fromDate, '-', this.props.period.toDate ].join(' ') }</span>
        </div>
        <div className={ classes.TagO }
          onClick={ () => this.props.onShiftPeriod(PERIOD._NEXT) }
        >
          <i className="fa fa-step-forward"
          >
          </i>
        </div>
      </div>
    );
  }

  showPeriodSelector = () => {
    /*return (
      /*<button className={ classes.Cute }
        onChange={ () => this.props.onSetPeriodType(PERIOD._DAY) }
      >
        { PERIOD._DAY }
      </button>
      <button className={ classes.Cute }
        onChange={ () => this.props.onSetPeriodType(PERIOD._WEEK) }
      >
        { PERIOD._WEEK }
      </button>
      <button className={ classes.Cute }
        onChange={ () => this.props.onSetPeriodType(PERIOD._MONTH) }
      >
        { PERIOD._MONTH }
      </button>
      <button className={ classes.Cute }
        onChange={ () => this.props.onSetPeriodType(PERIOD._SEASON) }
      >
        { PERIOD._SEASON }
      </button>
    );*/
  }

  showPeriodText = () => {
    const fromDate = new Date(this.props.period.fromDate);
    const MONTH_NAME = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    switch (this.props.period.type) {
      case PERIOD._DAY: default:
        return (
          <input type="date"
            value={ this.props.period.fromDate }
            onChange={ (event) => this.props.onSetPeriod(event.target.value) }
          />
          /*<div className={ classes.DateSelector }>
            <label onClick={ () => this.node.focus() }>
              { this.props.period.fromDate }
            </label>
            <input type="date"
              ref={ node => this.node = node }
              value={ this.props.period.fromDate }
              onChange={ (event) => this.props.onSetPeriod(event.target.value) }
            />
          </div>*/
        );
      case PERIOD._WEEK:
        const getFirstDayOfMonth = (date) => new Date(new Date(date).setDate(1)).getDay();
        const getFullWeekStrArr = (date) => [ date.getFullYear(), MONTH_NAME[date.getMonth()], 'W' + (Math.floor(((date.getDate() - 1) + getFirstDayOfMonth(date)) / 7) + 1) ];

        let periodText = getFullWeekStrArr(fromDate);

        const toDate = new Date(this.props.period.toDate);
        if (toDate.getMonth() !== fromDate.getMonth()) {
          periodText.push([ '/' ], getFullWeekStrArr(toDate));
        }

        return periodText.join(' ');
      case PERIOD._MONTH:
        return [ fromDate.getFullYear(), MONTH_NAME[fromDate.getMonth()] ].join(' ');
      case PERIOD._SEASON:
        return [ fromDate.getFullYear(), 'Q' + (Math.floor(fromDate.getMonth() / 3) + 1) ].join(' ');
    }
  }
};

const mappedProps = (state) => {
  return {
    period: state.display.period,
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onSetPeriodType: (periodType) => dispatch(ACTION.setPeriodType(periodType)),
    onSetPeriod: (fromDate, toDate = fromDate, periodType = undefined) => dispatch(ACTION.setPeriod(periodType, fromDate, toDate)),
    onShiftPeriod: (dir) => dispatch(ACTION.shiftPeriod(dir)),
  };
};

export default connect(mappedProps, mappedDispatches)(PeriodSelector);

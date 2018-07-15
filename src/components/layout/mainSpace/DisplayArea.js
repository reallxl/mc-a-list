import React from 'react';
import { connect } from 'react-redux';

import PeriodSelector from './PeriodSelector/PeriodSelector';
import FunctionBar from './FunctionBar/FunctionBar';
import DailyTodos from './DailyTodos/DailyTodos';

import { getDateStr } from '../../../store/reducers/utility';
import RANGE from '../../../definitions/ranges';

import classes from './DisplayArea.css';

const DisplayArea = props => {
  return (
    <div className={ classes.DisplayArea }>
      <table>
        <tbody>
          <tr>
            <td className="L">
              <PeriodSelector />
            </td>
            <td className="R">
              <FunctionBar />
            </td>
          </tr>
        </tbody>
      </table>
      { dailyTodos(props) }
    </div>
  );
}

const mappedProps = state => {
  return {
    withinPeriodTodos: state.display.todos,
    period: state.period.period,
  };
};

export default connect(mappedProps)(DisplayArea);

//****************************************************************************************************
// local functions
//****************************************************************************************************

const dailyTodos = props => {
  const shownDailyTodos = props.period.type === RANGE._DAY || props.period.type === RANGE._WEEK ?
    props.withinPeriodTodos :
    //--- show date with existing todos only since the period is quite long
    props.withinPeriodTodos.filter(dailyTodos => dailyTodos.todos.length);

  return shownDailyTodos.length ?
    shownDailyTodos.map(dailyTodos => (
      <DailyTodos
        key={ dailyTodos.date }
        date={ dailyTodos.date }
        todos={ dailyTodos.todos } />
    )) :
    //--- add dummy daily todo list
    <DailyTodos
      date={ getDateStr(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))) } />;
}

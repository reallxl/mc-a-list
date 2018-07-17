import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu/Menu';
import PeriodSelector from './PeriodSelector/PeriodSelector';
import FunctionBar from './FunctionBar/FunctionBar';
import DailyTodos from '../components/DailyTodos/DailyTodos';

import { getDateStr } from '../global/utilities/utility';
import { PERIOD } from '../global/definitions/index';

import classes from './McAList.css';

const McAList = props => {
  return (
    <div className={ classes.McAList }>
      <table>
        <tbody>
          <tr>
            <td>
              <Menu />
            </td>
          </tr>
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
    period: state.display.period,
  };
};

export default connect(mappedProps)(McAList);

//****************************************************************************************************
// local functions
//****************************************************************************************************

const dailyTodos = props => {
  const shownDailyTodos = props.period.type === PERIOD._DAY || props.period.type === PERIOD._WEEK ?
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

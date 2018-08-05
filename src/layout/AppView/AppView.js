import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu/Menu';
//import TodoEditor from '../../components/TodoEditor/TodoEditor';
import DailyTodos from './DailyTodos/DailyTodos';

import * as ACTION from '../../store/actions/index';
import { PERIOD } from '../../global/definitions/index';

import classes from './AppView.css';

class AppView extends React.Component {
  render = () => {
    return (
      <div className={ classes.AppView }>
        <Menu />
        <div className={ classes.content }>
          { this.layoutContent() }
        </div>
      </div>
    );
  }

  layoutContent = () => {
    const shownDailyTodos = this.props.period.type === PERIOD._DAY || this.props.period.type === PERIOD._WEEK ?
      this.props.withinPeriodTodos :
      //--- show date with existing todos only since the period is quite long
      this.props.withinPeriodTodos.filter(dailyTodos => dailyTodos.todos.length);

    return shownDailyTodos.map(dailyTodos =>
      <DailyTodos
        key={ dailyTodos.date }
        date={ dailyTodos.date }
        todos={ dailyTodos.todos }
      />
    );
  }
}

const mappedProps = state => {
  return {
    allTodos: state.database.todos,
    withinPeriodTodos: state.display.todos,
    period: state.display.period,
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onCloseModalEditor: () => dispatch(ACTION.closeModalEditor()),
  };
};

export default connect(mappedProps, mappedDispatches)(AppView);

import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu/Menu';
import PeriodSelector from './PeriodSelector/PeriodSelector';
import TodoEditor from '../../components/TodoEditor/TodoEditor';
import DailyTodos from './DailyTodos/DailyTodos';

import * as ACTION from '../../store/actions/index';
import { PERIOD } from '../../global/definitions/index';

import classes from './AppView.css';

class AppView extends React.Component {
  render = () => {
    console.log(this.props.period.fromDate, this.props.period.toDate);
    return (
      <div className={ classes.AppView }>
        { this.props.isModalEditorActivated && (
          <div className={ classes.modal }>
            <TodoEditor preClass={ classes.modalContent } content={ this.props.curContent } />
          </div>
        ) }
        <Menu />
        <div className={ classes.content }>
          { this.layoutContent() }
        </div>
        <PeriodSelector />
      </div>
    );
  }
  /*
  { this.props.allTodos.length ?
    <Menu activated={ this.state.isActivated } /> :
    <IndexView activated={ this.state.isActivated } />
  }
  */

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
      />);
  }
}

const mappedProps = state => {
  return {
    allTodos: state.database.todos,
    isModalEditorActivated: state.edit.isModalEditorActivated,
    curContent: state.edit.curContent,
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

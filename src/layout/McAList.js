import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu/Menu';
import PeriodSelector from './PeriodSelector/PeriodSelector';
import FunctionBar from './FunctionBar/FunctionBar';
import DailyTodos from './DailyTodos/DailyTodos';
import TodoAdder from '../components/TodoAdder/TodoAdder';
import TodoEditor from '../components/TodoEditor/TodoEditor';

import { getDateStr } from '../global/utilities/utility';
import { PERIOD } from '../global/definitions/index';

import * as ACTION from '../store/actions/index';

import classes from './McAList.css';

class McAList extends React.Component {
  state = {
    addingTodoToDate: undefined,
  };

  render = () => {
    return (
      <div className={ classes.McAList }>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
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
            <tr>
              <td colSpan="2">
                { this.layoutContent() }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  layoutContent = () => {
    const today = getDateStr();
    const shownDailyTodos = this.props.period.type === PERIOD._DAY || this.props.period.type === PERIOD._WEEK ?
      this.props.withinPeriodTodos :
      //--- show date with existing todos only since the period is quite long
      this.props.withinPeriodTodos.filter(dailyTodos => dailyTodos.todos.length);

    return shownDailyTodos.length ?
      shownDailyTodos.map(dailyTodos => {
        const content = {
          date: dailyTodos.date,
        };

        return (
          <span key={ dailyTodos.date }>
            <DailyTodos
              date={ dailyTodos.date }
              todos={ dailyTodos.todos } />
            { dailyTodos.date >= today && (
              dailyTodos.date === this.state.addingTodoToDate ?
              <TodoEditor
                content= { content }
                handleSave={ (content) => { this.props.onAddTodo(content); this.toggleTodoEditor(); } }
                handleCancel={ () => this.toggleTodoEditor() }
              /> :
              <TodoAdder handleAdding={ () => this.toggleTodoEditor(dailyTodos.date) } />
            )}
          </span>
        );
      }) :
      //--- add dummy daily todo list
      <DailyTodos date={ today } />;
  };

  toggleTodoEditor = (date = undefined) => {
    if (date !== this.state.addingTodoToDate) {
      this.setState({
        addingTodoToDate: date,
      });
    }
  };
}

const mappedProps = (state) => {
  return {
    withinPeriodTodos: state.display.todos,
    period: state.display.period,
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onAddTodo: content => dispatch(ACTION.addTodo(content)),
  };
};

export default connect(mappedProps, mappedDispatches)(McAList);

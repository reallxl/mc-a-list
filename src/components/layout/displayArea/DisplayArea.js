import React from 'react';
import { connect } from 'react-redux';

import OperationBar from './OperationBar';
import DailyTodos from './DailyTodos';

import OP from '../../../definitions/operations';
import STATUS from '../../../definitions/statuses';
import SCOPE from '../../../definitions/scopes';

import classes from './DisplayArea.css';

class DisplayArea extends React.Component {
  state = {
    scope: {
      type: SCOPE._DAY,
      fromDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      toDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      todoList: [],
    },
  };

  render = () => {
    const scope = this.state.scope.fromDate !== this.state.scope.toDate &&
      <p>{ this.state.scope.fromDate }-{ this.state.scope.toDate }</p>;

    const dailyTodos = this.state.scope.todoList.length ?
      this.state.scope.todoList.map(dailyTodos => (
        <DailyTodos
          key={ dailyTodos.date }
          date={ dailyTodos.date }
          todos={ dailyTodos.todos } />)) :
      <DailyTodos
        date={ new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10) } />;

    return (
      <div className={ classes.DisplayArea }>
        <OperationBar
          handleUpdateScope={ (type) => this.handleUpdateScope(type) }
          handleBatch={ () => this.props.onBatchProc() }
          handleDelete={ () => this.props.onDelete() }
          handleSort={ (criterion) => this.handleSort(criterion) } />
        { scope }
        { dailyTodos }
      </div>
    );
  };

  componentWillReceiveProps = (nextProps) => {
    const todoList = this.state.scope.todoList.slice();

    if (nextProps.todos.length > this.props.todos.length) {
      //--- new todo added
      const newlyAddedTodo = nextProps.todos[nextProps.todos.length - 1];

      if (newlyAddedTodo.content.date >= this.state.scope.fromDate && newlyAddedTodo.content.date <= this.state.scope.toDate) {
        const dailyTodos = todoList.find(dailyTodos => dailyTodos.date === newlyAddedTodo.content.date);
        //--- newly added todo is within current scope, simply add it into the todoList
        if (dailyTodos) {
          //--- push into an existing daily todos
          todoList.splice(todoList.indexOf(dailyTodos), 1, {
            ...dailyTodos,
            todos: dailyTodos.todos.concat(newlyAddedTodo),
          });
        } else {
          //--- add a new daily todos
          todoList.push({
            date: newlyAddedTodo.content.date,
            todos: [
              newlyAddedTodo,
            ],
          });
        }
      }
    } else {
      //--- todo updated
      nextProps.todos.forEach(todo => {
        const prevTodo = this.props.todos.find(prevTodo => prevTodo.id === todo.id);

        if (prevTodo !== todo) {
          const dailyTodos = todoList.find(dailyTodos => dailyTodos.date === todo.content.date);
          const todos = dailyTodos.todos.slice();

          todos.splice(todos.indexOf(prevTodo), 1, todo);
          todoList.splice(todoList.indexOf(dailyTodos), 1, {
            ...dailyTodos,
            todos: todos,
          });
        }
      });
    }

    this.setState({
      scope: {
        ...this.state.scope,
        todoList: todoList,
      },
    });
  };

  handleUpdateScope = (type) => {
    if (type !== this.state.scope.type) {
      const today = new Date();
      let fromTime, toTime;

      switch (type) {
        default:
        case SCOPE._DAY: {
          fromTime = toTime = today.getTime();
          break;
        }
        case SCOPE._WEEK: {
          fromTime = new Date(today.getTime()).setDate(today.getDate() - today.getDay());
          toTime = new Date(today.getTime()).setDate(today.getDate() + (6 - today.getDay()));
          break;
        }
        case SCOPE._MONTH: {
          fromTime = new Date(today.getTime()).setDate(1);
          toTime = new Date(new Date(today.getTime()).setMonth(today.getMonth() + 1)).setDate(0);
          break;
        }
        case SCOPE._SEASON: {
          fromTime = new Date(new Date(today.getTime()).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1);
          toTime = new Date(new Date(today.getTime()).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0);
          break;
        }
      }

      const fromDate = new Date(fromTime - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      const toDate = new Date(toTime - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      const todoList = [];

      for (let date = new Date(fromDate); date <= new Date(toDate); date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().substring(0, 10);
        const dailyTodos = this.state.scope.todoList.find(dailyTodos => dailyTodos.date === dateStr);

        if (dailyTodos) {
          //--- simply copy existing daily todos
          todoList.push(dailyTodos);
        } else {
          const todos = this.props.todos.filter(todo => todo.content.date === dateStr);
          if (todos.length) {
            //--- add a new daily todos
            todoList.push({
              date: dateStr,
              todos: todos,
            });
          }
        }
      }

      this.setState({
        scope: {
          type: type,
          fromDate: fromDate,
          toDate: toDate,
          todoList: todoList,
        },
      });
    }
  };

  handleSort = (criterion) => {
    const todoList = this.state.scope.todoList.slice();
    let todos;

    todoList.forEach(dailyTodos => {
      //--- sort todos in each date seperately
      if (criterion === undefined) {
        todos = dailyTodos.todos.slice();
        todos.sort((priorTodo, laterTodo) => priorTodo.id - laterTodo.id);
      } else {
        //--- sort based on given criterion
        const sortedTodosList = [];

        dailyTodos.todos.forEach(todo => {
          const sortedTodos = sortedTodosList.find(sortedTodos => sortedTodos[criterion] === todo.content[criterion]);

          if (sortedTodos) {
            //--- push into an existing group
            sortedTodos.todos.push(todo);
          } else {
            //--- add a new group
            sortedTodosList.push({
              [criterion]: todo.content[criterion],
              todos: [ todo, ],
            });
          }
        });

        todos = [];
        sortedTodosList.forEach(sortedTodos => {
          todos = todos.concat(sortedTodos.todos);
        });
      }

      todoList.splice(todoList.indexOf(dailyTodos), 1, {
        ...dailyTodos,
        todos: todos,
      });
    });

    this.setState({
      scope: {
        ...this.state.scope,
        todoList: todoList,
      },
    })
  };
}

const mappedProps = state => {
  return {
    todos: state.todo.todos,
  };
};

const mappedDispatches = dispatch => {
  return {
    onBatchProc: () => dispatch({
      type: OP._UPDATE_STATUS,
      status: STATUS._DONE,
    }),
    onDelete: () => dispatch({
      type: OP._DELETE,
    }),
  };
};

export default connect(mappedProps, mappedDispatches)(DisplayArea);

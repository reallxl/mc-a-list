import React from 'react';
import { connect } from 'react-redux';

import TodoEditor from './components/TodoEditor/TodoEditor';
import IndexView from './layout/IndexView/IndexView';
import AppView from './layout/AppView/AppView';

import classes from './App.css';

const App = (props) => {
  return (
    <div className={ classes.App }>
      {
        props.isModalEditorActivated && (
          <div className={ classes.modal }>
            <TodoEditor preClass={ classes.modalContent } content={ props.curContent } />
          </div>
        )
      }
      {
        props.allTodos.length ? (
          <AppView />
        ) : (
          <IndexView />
        )
      }
    </div>
  );
}

const mappedProps = state => {
  return {
    allTodos: state.database.todos,
    isModalEditorActivated: state.edit.isModalEditorActivated,
    curContent: state.edit.curContent,
  };
};

export default connect(mappedProps)(App);

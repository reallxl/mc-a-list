//--- modules
import React from 'react';
import Popup from "reactjs-popup";
//--- components
import TodoTags from './TodoTags/TodoTags';
import TodoDetails from './TodoDetails/TodoDetails';
import TodoSchedules from './TodoSchedules/TodoSchedules';
//import Popup from '../Popup/Popup';
//--- global
import { getLocalDate, getDateStr } from '../../global/utilities/utility';
//--- local styling
import classes from './TodoEditor.css';

const EMPTY_CONTENT = {
    type: 'personal',
    color: '',
    date: '',
    time: '',
    tillDate: '',
    tillTime: '',
    place: '',
    companion: '',
    description: '',
    tags: '',
};

class TodoEditor extends React.Component {
  state = {
    content: {
      ...EMPTY_CONTENT,
      ...this.props.content,
    },
    isAutoSaving: this.props.id ? true : false,
  };

  render = () => {
    const arrowStyle = {
      borderRadius: '0px',
    };

    return (
      <div className={ classes.TodoEditor }>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <input name="date" type="date" value={ this.state.content.date } onChange={ this.handleChange } />
                <input name="description" type="text" placeholder="description" value={ this.state.content.description } onChange={ this.handleChange } />
              </td>
            </tr>
            <tr>
              <td name="lefter">
                <i className="fa fa-save" onClick={ this.handleSave } />
                <i className="fa fa-remove" onClick={ this.handleCancel } />
              </td>
              <td name="righter">
                <i className="fa fa-thumb-tack" />
                <Popup trigger={<i className="fa fa-tags" />} arrowStyle={ arrowStyle }><TodoTags /></Popup>
                <Popup trigger={<i className="fa fa-edit" />} arrowStyle={ arrowStyle }><TodoDetails /></Popup>
                <Popup trigger={<i className="fa fa-calendar" />} arrowStyle={ arrowStyle }><TodoSchedules content={ this.state.content } handleChange={ this.handleChange } /></Popup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  handleChange = (event) => {
    const content = {
      ...this.state.content,
      [event.target.name]: event.target.value,
    };

    this.setState({
      content: content,
    });
  };

  handleSave = () => {
    //--- default
    let ret = this.props.handleCacel;

    if (this.state.content.description.length) {
      let content = this.state.content;

      if (content.date.length === 0) {
        //--- default to today if not explicitly specified
        content = {
          ...this.state.content,
          date: getDateStr(getLocalDate()),
        };
      }

      ret = this.setState({
        isAutoSaving: false,
        content: content,
      },
      () => this.props.handleSave(this.state.content));
    }

    return ret;
  };

  handleCancel = () => {
    this.setState({
      isAutoSaving: false,
    },
    this.props.handleCancel);
  };

  componentWillUnmount = () => {
    if (this.state.isAutoSaving) {
      this.props.handleSave(this.state.content);
    }
  };
}

export default TodoEditor;

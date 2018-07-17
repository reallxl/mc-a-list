import React from 'react';

import { getLocalDate, getDateStr } from '../../global/utilities/utility';

import Select from '../Select';
import Emoji from '../Emoji/Emoji';

import classes from './TodoEditor.css';

class TodoEditor extends React.Component {
  state = {
    content: this.props.content,
    isSimpleFormat: true,
    isAutoSaving: this.props.id ? true : false,
  };

  switchDisplayFormat = () => {
    let isSimpleFormat = this.state.isSimpleFormat;
    isSimpleFormat = !isSimpleFormat;

    this.setState({
      isSimpleFormat: isSimpleFormat,
    });
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

  render() {
    return (
      <div className={ classes.TodoEditor }>
        <span>
          Type: <Select name="type" options={ [ 'personal', 'business', 'interest', 'shopping', 'date', ] } value={ this.state.content.type } handleChange={ this.handleChange } />
        </span>
        <input name="description" type="text" placeholder="description" value={ this.state.content.description } onChange={ this.handleChange } />
        <input name="tags" type="text" placeholder="tags" value={ this.state.content.tags } onChange={ this.handleChange } />
        { this.state.isSimpleFormat || (
          <span>
            <br />
            Color: <input name="color" type="color" value={ this.state.content.color } onChange={ this.handleChange } />
            From: <input name="date" type="date" value={ this.state.content.date } onChange={ this.handleChange } />
            <input name="time" type="time" value={ this.state.content.time } onChange={ this.handleChange } />
            Till: <input name="tillDate" type="date" value={ this.state.content.tillDate } onChange={ this.handleChange } />
            <input name="tillTime" type="time" value={ this.state.content.tillTime } onChange={ this.handleChange } />
            <input name="place" type="text" placeholder="place" value={ this.state.content.place } onChange={ this.handleChange } />
            <input name="companion" type="text" placeholder="companion" value={ this.state.content.companion } onChange={ this.handleChange } />
          </span>
        ) }
        { this.state.isSimpleFormat ?
          <Emoji symbol="⏬" label="expand" handleClick={ this.switchDisplayFormat } /> :
          <Emoji symbol="⏫" label="collapse" handleClick={ this.switchDisplayFormat } />
        }
        <Emoji symbol="✅" label="save" handleClick={ this.handleSave } />
        <Emoji symbol="❎" label="cancel" handleClick={ this.handleCancel } />
      </div>
    );
  }

  componentWillUnmount() {
    if (this.state.isAutoSaving) {
      this.props.handleSave(this.state.content);
    }
  }
}

export default TodoEditor;

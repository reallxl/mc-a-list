import React from 'react';

import Select from '../Select';

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
    if (this.state.content.description.length) {
      return this.props.handleSave(this.state.content);
    } else {
      return this.props.handleCancel();
    }
  };

  handleCancel = () => {
    this.setState({
      isAutoSaving: false,
    },
    this.props.handleCancel);
  };

  render() {
    return (
      <div>
        Type: <Select name="type" name="type" options={ [ 'personal', 'business', 'interest', 'shopping', 'date', ] } value={ this.state.content.type } handleChange={ this.handleChange } />
        <input name="tags" name="description" placeholder="description" value={ this.state.content.description } onChange={ this.handleChange } />
        <input name="tags" type="text" placeholder="tags" value={ this.state.content.tags } onChange={ this.handleChange } />
        { this.state.isSimpleFormat || (
          <span>
            <br />
            Color: <input name="color" type="color" value={ this.state.content.color } onChange={ this.handleChange } />
            From: <input name="from" type="datetime-local" value={ this.state.content.from } onChange={ this.handleChange } />
            Till: <input name="till" type="datetime-local" value={ this.state.content.till } onChange={ this.handleChange } />
            <input name="place" type="text" placeholder="place" value={ this.state.content.place } onChange={ this.handleChange } />
            <input name="companion" type="text" placeholder="companion" value={ this.state.content.companion } onChange={ this.handleChange } />
          </span>
        ) }
        <span role="img" arial-label={ this.state.isSimpleFormat ? 'expand' : 'collapse' } onClick={ this.switchDisplayFormat }>{ this.state.isSimpleFormat ? '⏬' : '⏫' }</span>
        <span role="img" arial-label="save" onClick={ this.handleSave }>✅</span>
        <span role="img" arial-label="cancel" onClick={ this.handleCancel }>❎</span>
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

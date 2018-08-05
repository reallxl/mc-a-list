//--- modules
import React from 'react';
import { connect } from 'react-redux';
//--- components
import TodoDetails from './TodoDetails/TodoDetails';
import TodoSchedules from './TodoSchedules/TodoSchedules';
import TodoCategory from './TodoCategory/TodoCategory';
//import Popup from '../Popup/Popup';
//--- global
import * as DATA from './TodoEditor_data';
import * as ACTION from '../../store/actions/index';
//--- local styling
import classes from './TodoEditor.css';

class TodoEditor extends React.Component {
  state = {
    content: {
      ...DATA._DEFAULT_CONTENT,
    },
    curDroppedContent: undefined,
  };

  componentWillMount = () => {
    if (this.props.content.description || this.props.content.category) {
      const content = {
        ...this.state.content,
        ...this.props.content,
      };

      this.setState({
        content,
      });
    }
  }

  render = () => {
    const dynamicStyle = {
      backgroundColor: this.state.content.color,
    };
    const dynamicFGStyle = this.state.content.color === '#000000' ? {
      color: '#FFFFFF',
    } : undefined;
    const editorClasses = [ classes.TodoEditor, ];

    if (this.props.preClass) {
      editorClasses.push(this.props.preClass);
    }

    const contentClasses = {
      [DATA._CONTENT._TAGS] : [ 'fa fa-tags', ],
      [DATA._CONTENT._DETAILS] : [ 'fa fa-file-text-o', ],
      [DATA._CONTENT._SCHEDULES] : [ 'fa fa-calendar', ],
    };

    for (let key in contentClasses) {
      if (key === this.state.curDroppedContent) {
        contentClasses[key].push('DropDown', classes.DroppedContent);
      } else {
        contentClasses[key].push('ToolTips');
      }
    }

    const toolTipsTextStyle = {
      top: '110%',
    };

    return (
      <div className={ editorClasses.join(' ') } style={ dynamicStyle }>
        { /*--------------------------------------------------------------------------------
            date and description
          --------------------------------------------------------------------------------*/ }
        <input name="date" type="date" value={ this.state.content.date } onChange={ this.handleChange } />
        <input name="description" type="text" placeholder="what to do..." value={ this.state.content.description } onChange={ this.handleChange } />
        { /*--------------------------------------------------------------------------------
            sub contents
          --------------------------------------------------------------------------------*/ }
        <div className={ classes.Content }>
          <TodoCategory
            category={ this.state.content.category }
            dynamicFGStyle={ dynamicFGStyle }
            handleCategoryChange={ (category) => this.setState(prevState => ({ content: { ...prevState.content, category } })) }
          />
          <i className={ contentClasses[DATA._CONTENT._DETAILS].join(' ') }
            style={ dynamicFGStyle }
            onClick={ () => this.toggleDropContent(DATA._CONTENT._DETAILS) }>
            { this.state.curDroppedContent === DATA._CONTENT._DETAILS ?
              <div className='DropDownContent show'
                ref={ node => this.node = node }
                onClick={ (event) => event.stopPropagation() }
              >
                <TodoDetails
                  color={ this.state.content.color }
                  handleColorChange={ (color) => this.setState(prevState => ({ content: { ...prevState.content, color } })) }
                />
              </div> :
              <span className="ToolTipsText" style={ toolTipsTextStyle }>details</span>
            }
          </i>
          <i className={ contentClasses[DATA._CONTENT._SCHEDULES].join(' ') }
            style={ dynamicFGStyle }
            onClick={ () => this.toggleDropContent(DATA._CONTENT._SCHEDULES) }>
            { this.state.curDroppedContent === DATA._CONTENT._SCHEDULES ?
              <div className='DropDownContent show'
                ref={ node => this.node = node }
                onClick={ (event) => event.stopPropagation() }
              >
                <TodoSchedules content={ this.state.content } handleChange={ this.handleChange } />
              </div> :
              <span className="ToolTipsText" style={ toolTipsTextStyle }>schedules</span>
            }
          </i>
        </div>
        { /*--------------------------------------------------------------------------------
            operator buttons
          --------------------------------------------------------------------------------*/ }
        <div className={ classes.Operations }>
          <i className="fa fa-save ToolTips" onClick={ this.handleSave } style={ dynamicFGStyle }>
            <span className="ToolTipsText" style={ toolTipsTextStyle }>save</span>
          </i>
          <i className="fa fa-remove ToolTips" onClick={ this.handleCancel } style={ dynamicFGStyle }>
            <span className="ToolTipsText" style={ toolTipsTextStyle }>cancel</span>
          </i>
        </div>
      </div>
    );
  }

  componentWillUnmount = () => {
    //document.removeEventListener('mousedown', this.checkClick);
    if (this.state.content.description.length) {
      //--- prompt to save
      this.handleCancel();
    }
  }

  checkClick = (event) => {
    if (this.state.curDroppedContent && !this.node.contains(event.target)) {
      //this.toggleDropContent(undefined);
    }
  };

  toggleDropContent = (content) => {
    const curDroppedContent = this.state.curDroppedContent;

    this.setState({
      curDroppedContent: content === curDroppedContent ? undefined : content,
    });
  };

  handleChange = (event) => {
    const content = {
      ...this.state.content,
      [event.target.name]: event.target.value,
    };

    this.setState({
      content,
    });
  };

  handleSave = () => {
    if (this.state.content.description.length) {
      if (this.props.id) {
        this.props.onUpdateTodos([ this.props.id, ], this.state.content);
      } else {
        this.props.onAddTodo(this.state.content);
      }
    }

    return this.handleClose();
  };

  handleCancel = () => {
    return this.handleClose();
  };

  handleClose = () => {
    return this.props.id ?
      this.props.onCloseEmbeddedEditor() :
      this.props.onCloseModalEditor();
  };
}

const mappedProps = (state) => {
  return {
  };
};

const mappedDispatches = (dispatch) => {
  return {
    onAddTodo: (content) => dispatch(ACTION.addTodo(content)),
    onUpdateTodos: (ids, content) => dispatch(ACTION.updateTodos(ids, content)),
    onCloseModalEditor: () => dispatch(ACTION.closeModalEditor()),
    onCloseEmbeddedEditor: () => dispatch(ACTION.closeEmbeddedEditor()),
  };
};

export default connect(mappedProps, mappedDispatches)(TodoEditor);

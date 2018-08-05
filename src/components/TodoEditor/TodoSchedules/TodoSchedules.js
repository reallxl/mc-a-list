import React from 'react';

//import classes from './TodoSchedules.css';

const TodoSchedules = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan="2">
              <input name="time" type="time" value={ props.content.time } onChange={ props.handleChange } />
            </td>
          </tr>
          <tr>
            <td>
              <input name="tillDate" type="date" value={ props.content.tillDate } onChange={ props.handleChange } />
            </td>
            <td>
              <input name="tillTime" type="time" value={ props.content.tillTime } onChange={ props.handleChange } />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TodoSchedules;

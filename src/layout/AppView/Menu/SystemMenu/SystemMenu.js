import React from 'react';

import classes from './SystemMenu.css';

const SystemMenu = (props) => {
  return (
    <div className={ classes.SystemMenu }>
      <i className="material-icons ToolTips">notifications
        <span className="ToolTipsText">notifications</span>
      </i>
      <i className="material-icons ToolTips">timelapse
        <span className="ToolTipsText">analysis</span>
      </i>
      <i className="fa fa-cog ToolTips">
        <span className="ToolTipsText">settings</span>
      </i>
    </div>
  );
};

export default SystemMenu;

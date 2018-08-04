import React from 'react';

import classes from './Emoji.css';

const Emoji = props => {
  const emojiClasses = [
    classes.Emoji,
  ];

  if (props.larger) {
    emojiClasses.push(classes.larger);
  }

  if (props.forbidden) {
    emojiClasses.push(classes.forbidden);
  } else if (props.inactive) {
    emojiClasses.push(classes.inactive);
  }

  return (
    <span
      className={ emojiClasses.join(' ') }
      role="img"
      aria-label={ props.label }
      onClick={ props.handleClick }
    >
      { props.symbol }
    </span>
  );
};

export default Emoji;

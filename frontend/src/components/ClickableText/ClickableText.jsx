import React from 'react';
import * as classNames from 'classnames';

import * as styles from './ClickableText.module.scss';

export const ClickableText = ({ className, text, onClick }) => {
  return (
    <span
      className={classNames(styles.clickableText, className)}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

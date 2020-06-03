import React from 'react';
import * as classNames from 'classnames';

import * as styles from './UserEntry.module.scss';

export const UserEntry = ({ className, user, isYou }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <span className={classNames({ [styles.name]: isYou })}>{user.name}</span>
      {isYou && <i className={styles.you}>(You)</i>}
    </div>
  );
};

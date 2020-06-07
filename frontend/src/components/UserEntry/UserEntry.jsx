import React from 'react';
import * as classNames from 'classnames';

import * as styles from './UserEntry.module.scss';

export const UserEntry = ({ className, user, isMe, onUserClick }) => {
  const onHandleUserClick = () => {
    onUserClick && onUserClick(isMe, user);
  };

  return (
    <div
      className={classNames(styles.container, className)}
      onClick={onHandleUserClick}
    >
      <span className={classNames({ [styles.name]: isMe })}>{user.name}</span>
      {isMe && <i className={styles.me}>(You)</i>}
    </div>
  );
};

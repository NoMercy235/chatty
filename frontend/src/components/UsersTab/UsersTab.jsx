import React from 'react';

import { UserEntry } from '../UserEntry/UserEntry';

import * as styles from './UsersTab.module.scss';

export const UsersTab = ({ currentUser, users, onUserClick }) => {
  const onHandleUserClick = (isMe, user) => {
    !isMe && onUserClick(user);
  };

  return users.map(user => {
    return (
      <UserEntry
        key={user.id}
        className={styles.userRow}
        user={user}
        isMe={user.id === currentUser.id}
        onUserClick={onHandleUserClick}
      />
    );
  });
};

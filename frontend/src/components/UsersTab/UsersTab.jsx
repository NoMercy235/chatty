import React from 'react';

import { UserEntry } from '../UserEntry/UserEntry';

import * as styles from './UsersTab.module.scss';

export const UsersTab = ({ currentUser, users }) => {
  return users.map(user => {
    return (
      <UserEntry
        key={user.id}
        className={styles.userRow}
        user={user}
        isYou={user.id === currentUser.id}
      />
    );
  });
};

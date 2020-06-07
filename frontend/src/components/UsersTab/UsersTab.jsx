import React from 'react';
import * as classNames from 'classnames';

import { UserEntry } from '../UserEntry/UserEntry';
import { MEETINGBOT_USER_ID } from '../../shared/constants';

import * as styles from './UsersTab.module.scss';

export const UsersTab = ({ currentUser, users, onUserClick }) => {
  const isMe = (user) => user.id === currentUser.id;

  const isSelectable = (user) => !isMe(user) && (user.id !== MEETINGBOT_USER_ID);

  const onHandleUserClick = (isMe, user) => {
    isSelectable(user) && onUserClick(user);
  };

  return users.map(user => {
    return (
      <UserEntry
        key={user.id}
        className={classNames(styles.userRow, { [styles.selectable]: isSelectable(user) })}
        user={user}
        isMe={isMe(user)}
        onUserClick={onHandleUserClick}
      />
    );
  });
};

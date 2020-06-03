import React from 'react';

import { UserEntry } from '../UserEntry/UserEntry';

export const UsersTab = ({ currentUser, users }) => {
  return users.map(user => {
    return (
      <UserEntry
        key={user.id}
        user={user}
        isYou={user.id === currentUser.id}
      />
    );
  });
};

import React from 'react';

export const UsersTab = ({ users }) => {
  return users.map(user => {
    return <div key={user.id}>{user.id}</div>;
  });
};

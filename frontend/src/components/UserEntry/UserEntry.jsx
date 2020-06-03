import React from 'react';

import * as styles from './UserEntry.module.scss';

export const UserEntry = ({ user, isYou }) => {
  return (
    <div className={styles.container}>
      {user.name} {isYou && <i className={styles.you}>(You)</i>}
    </div>
  );
};

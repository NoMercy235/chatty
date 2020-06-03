import React from 'react';
import * as classNames from 'classnames';

import { UserMessageType } from '../../shared/constants';
import { UserEntry } from '../UserEntry/UserEntry';

import * as styles from './MessageEntry.module.scss';

export const MessageEntry = ({ currentUser, type, source, when, message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={classNames(styles.source, { [styles.removed]: source.isInactive })}
        >
          <UserEntry user={source} isYou={currentUser.id === source.id} />
        </div>
        {source.isInactive && <i className={styles.inactiveText}>(inactive)</i>}
        <div className={styles.when}><i>{when}</i></div>
      </div>
      <div className={classNames({ [styles.infoMessage]: type === UserMessageType.Info})}>
        {message}
      </div>
    </div>
  );
};

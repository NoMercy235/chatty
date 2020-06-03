import React from 'react';
import * as classNames from 'classnames';

import { UserMessageType } from '../../shared/constants';

import * as styles from './MessageEntry.module.scss';

export const MessageEntry = ({ type, source, when, message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={classNames(styles.source, { [styles.removed]: source.isInactive })}
        >
          {source.name}
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

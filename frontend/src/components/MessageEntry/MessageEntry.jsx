import React from 'react';
import * as classNames from 'classnames';

import { UserMessageType } from '../../shared/constants';
import { UserEntry } from '../UserEntry/UserEntry';
import { ClickableText } from '../ClickableText/ClickableText';

import * as styles from './MessageEntry.module.scss';

export const MessageEntry = ({ currentUser, type, source, when, message, onDeleteMessage }) => {
  const isYou = currentUser.id === source.id;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={classNames(styles.source, { [styles.removed]: source.isInactive })}
        >
          <UserEntry user={source} isYou={isYou} />
        </div>
        {source.isInactive && <i className={styles.inactiveText}>(inactive)</i>}
        <div className={styles.when}><i>{when}</i></div>
        {isYou && (
          <>
            <ClickableText className={styles.action} text="Edit"/>
            <ClickableText
              className={styles.action}
              text="Delete"
              onClick={onDeleteMessage}
            />
          </>
        )}
      </div>
      <div className={classNames({ [styles.infoMessage]: type === UserMessageType.Info})}>
        {message}
      </div>
    </div>
  );
};

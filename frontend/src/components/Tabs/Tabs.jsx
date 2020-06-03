import React from 'react';
import * as classNames from 'classnames';

import { isChatTab, isParticipantsTab } from '../../shared/utils';

import * as styles from './Tabs.module.scss';

export const Tabs = ({ selected, users }) => {
  return (
    <div className={styles.container}>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: isParticipantsTab(selected) }
        )}
      >
        Participants ({users.length})
      </h3>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: isChatTab(selected) }
        )}
      >
        Chat
      </h3>
    </div>
  );
};

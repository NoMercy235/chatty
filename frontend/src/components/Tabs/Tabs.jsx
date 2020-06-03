import React from 'react';
import * as classNames from 'classnames';

import { isChatTab, isParticipantsTab } from '../../shared/utils';
import { AppTab } from '../../shared/constants';

import * as styles from './Tabs.module.scss';

export const Tabs = ({ selected, users, onTabChange }) => {
  const onTabClick = tab => () => {
    onTabChange(tab);
  };

  return (
    <div className={styles.container}>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: isParticipantsTab(selected) }
        )}
        onClick={onTabClick(AppTab.Participants)}
      >
        Participants ({users.length})
      </h3>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: isChatTab(selected) }
        )}
        onClick={onTabClick(AppTab.Chat)}
      >
        Chat
      </h3>
    </div>
  );
};

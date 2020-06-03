import React from 'react';
import * as classNames from 'classnames';

import { AppTab } from '../../shared/constants';

import * as styles from './Tabs.module.scss';

export const Tabs = ({ selected, users }) => {
  return (
    <div className={styles.container}>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: selected === AppTab.Participants }
        )}
      >
        Participants ({users.length})
      </h3>
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: selected === AppTab.Chat }
        )}
      >
        Chat
      </h3>
    </div>
  );
};

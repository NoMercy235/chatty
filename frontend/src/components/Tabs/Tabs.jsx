import React from 'react';
import * as classNames from 'classnames';

import { isChatTab, isEncryptedChatTab, isParticipantsTab } from '../../shared/utils';
import { AppTab } from '../../shared/constants';

import * as styles from './Tabs.module.scss';

export const Tabs = ({ selected, noOfUsers, encryptedChatPartner, onTabChange }) => {
  const onTabClick = tab => () => {
    onTabChange(tab);
  };

  const getEncryptedChatPartnerName = () => {
    return encryptedChatPartner
      ? <span>({encryptedChatPartner.name})</span>
      : '';
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
        Participants ({noOfUsers})
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
      <h3
        className={classNames(
          styles.tabBtn,
          { [styles.selected]: isEncryptedChatTab(selected) },
          { [styles.disabled]: !encryptedChatPartner },
        )}
        {...(encryptedChatPartner && { onClick: onTabClick(AppTab.EncryptedChat) })}
      >
        Encrypted chat {getEncryptedChatPartnerName()}
      </h3>
    </div>
  );
};

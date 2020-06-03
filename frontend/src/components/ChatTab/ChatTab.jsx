import React, { useState } from 'react';

import { KeyCode } from '../../shared/constants';

import * as styles from './ChatTab.module.scss';

export const ChatTab = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onMessageChange = e => {
    setMessage(e.currentTarget.value);
  }

  const onMessageKeyDown = e => {
    if (e.ctrlKey && e.keyCode === KeyCode.Enter) {
      onSendMessage(message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>messages</div>
      <textarea
        id="message"
        rows={3}
        className={styles.textArea}
        placeholder="Write a message (send with Ctrl+Enter)"
        value={message}
        onChange={onMessageChange}
        onKeyDown={onMessageKeyDown}
      />
    </div>
  );
};

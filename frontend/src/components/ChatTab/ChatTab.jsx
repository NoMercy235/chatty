import React, { useState } from 'react';

import { KeyCode } from '../../shared/constants';
import { MessageEntry } from '../MessageEntry/MessageEntry';
import { formatDate } from '../../shared/utils';

import * as styles from './ChatTab.module.scss';

export const ChatTab = ({ users, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onMessageChange = e => {
    setMessage(e.currentTarget.value);
  }

  const onMessageKeyDown = e => {
    if (e.ctrlKey && e.keyCode === KeyCode.Enter) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        {messages.map(message => {
          const author = users.find(({ id }) => id === message.author);
          return (
            <MessageEntry
              key={message.createdAt}
              type="message"
              source={author}
              when={formatDate(message.createdAt)}
              message={message.message}
            />
          );
        })}
      </div>
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

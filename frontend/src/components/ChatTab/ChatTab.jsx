import React, { useState } from 'react';

import * as styles from './ChatTab.module.scss';

export const ChatTab = () => {
  const [message, setMessage] = useState('');

  const onMessageChange = e => setMessage(e.currentTarget.value);

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>messages</div>
      <textarea
        id="message"
        rows={3}
        className={styles.textArea}
        placeholder="Write a message"
        value={message}
        onChange={onMessageChange}
      />
    </div>
  );
};

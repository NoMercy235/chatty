import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from '@giphy/react-components';

import { GIF_CAROUSEL_HEIGHT, KeyCode, UserMessageType } from '../../shared/constants';
import { MessageEntry } from '../MessageEntry/MessageEntry';
import { fetchGifs } from '../../shared/giphy';

import * as styles from './ChatTab.module.scss';

export const ChatTab = ({ currentUser, users, messages, onSendMessage, onEditMessage, onDeleteMessage }) => {
  const [message, setMessage] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const onMessageChange = e => {
    setMessage(e.currentTarget.value);
  }

  const onMessageKeyDown = e => {
    if (e.keyCode === KeyCode.Enter) {
      onSendMessage({ message, type: UserMessageType.Message });
      setMessage('');
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const onGifClicked = (gif, e) => {
    onSendMessage({
      gif,
      type: UserMessageType.Gif,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onHandleEditMessage = (messageId) => (message) => {
    onEditMessage(messageId, message);
  };

  const onHandleDeleteMessage = (messageId) => () => {
    onDeleteMessage(messageId);
  };

  return (
    <div className={styles.container}>
      <div ref={messagesRef} className={styles.messagesContainer}>
        {messages.map(message => {
          const author = users.find(({ id }) => id === message.author);
          return (
            <MessageEntry
              key={message.id}
              message={message}
              currentUser={currentUser}
              source={author}
              onEditMessage={onHandleEditMessage(message.id)}
              onDeleteMessage={onHandleDeleteMessage(message.id)}
            />
          );
        })}
      </div>
      <Carousel gifHeight={GIF_CAROUSEL_HEIGHT} fetchGifs={fetchGifs} onGifClick={onGifClicked} />
      <textarea
        id="message"
        rows={3}
        className={styles.textArea}
        placeholder="Write a message (send with Enter)"
        value={message}
        onChange={onMessageChange}
        onKeyDown={onMessageKeyDown}
      />
    </div>
  );
};

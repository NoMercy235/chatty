import React from 'react';
import { ChatTab } from '../ChatTab/ChatTab';
import { UserMessageType } from '../../shared/constants';

export const EncryptedChatTab = ({ user, partner, messages, onSendMessage }) => {
  const onHandleSendMessage = (metadata) => {
    if (metadata.type !== UserMessageType.Message) {
      onSendMessage(metadata);
      return;
    }

    onSendMessage({
      destination: partner.id,
      message: metadata.message, // TODO: encrypt
      type: UserMessageType.EncryptedMessage,
    })
  };

  return (
    <ChatTab
      currentUser={user}
      users={[user, partner]}
      messages={messages}
      isEncrypted={true}
      onSendMessage={onHandleSendMessage}
      onEditMessage={console.log}
      onDeleteMessage={console.log}
    />
  )
};

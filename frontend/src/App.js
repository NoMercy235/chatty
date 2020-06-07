import React, { useEffect, useReducer, useState } from 'react';

import { Config } from './config';
import { User } from './domain/user';
import { Message } from './domain/message';
import { AppTab, AppEvent, WsProtocol, UserMessageType, LocalStorageItem } from './shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Tabs } from './components/Tabs/Tabs';
import {
  createEncryptedChatId,
  createWsEndpoint,
  isChatTab,
  isEncryptedChatTab,
  isErrorTab,
  isParticipantsTab,
  isPickNameTab,
  jsonParseLocalStorageItem
} from './shared/utils';
import { UsersTab } from './components/UsersTab/UsersTab';
import { ChatTab } from './components/ChatTab/ChatTab';
import { PickNameTab } from './components/PickNameTab/PickNameTab';
import { createPayload } from './shared/utils';
import { getEncryptedPayload, myKeys } from './shared/encryptionUtils';
import { ErrorTab } from './components/ErrorTab/ErrorTab';

import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case AppEvent.SetUser:
      const user = new User(action.data);
      localStorage.setItem(LocalStorageItem.User, JSON.stringify(user.forApi()));
      localStorage.setItem(LocalStorageItem.Keys, JSON.stringify(myKeys));
      return { ...state, user, currentTab: AppTab.Participants };
    case AppEvent.GetUsers:
      const users = action.data.map(u => new User(u));
      return {
        ...state,
        users,
        activeUsers: users.filter(({ isInactive }) => !isInactive),
      };
    case AppEvent.TabChange:
      return { ...state, currentTab: action.data };
    case AppEvent.SendMessage:
      return { ...state, messages: [...state.messages, new Message(action.data)] };
    case AppEvent.GetMessages:
      return { ...state, messages: action.data.map(m => new Message(m)) };
    case AppEvent.GetEncryptedMessage:
      const chatId = createEncryptedChatId(action.data.author, action.data.destination);
      return {
        ...state,
        encryptedMessages: {
          ...state.encryptedMessages,
          [chatId]: [...(state.encryptedMessages[chatId] || []), new Message(action.data)],
        }
      };
    case AppEvent.SetEncryptedChatPartner:
      return { ...state, encryptedChatPartner: action.data };
    default:
      return state;
  }
}

const localUser = jsonParseLocalStorageItem(LocalStorageItem.User);
const localUserParsed = localUser && new User(localUser);

const initialState = {
  currentTab: AppTab.PickName,
  user: undefined,
  users: [],
  activeUsers: [],
  messages: [],
  encryptedMessages: {},
  encryptedChatPartner: undefined,
};


function App() {
  const [socket, setSocket] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket(
      createWsEndpoint(Config.WsHost, Config.WsPort, localUserParsed),
      WsProtocol.EchoProtocol
    );

    ws.onmessage = ((message) => {
      const payload = JSON.parse(message.data);
      dispatch(payload);
    });

    setSocket(ws);

    ws.onerror = (() => onTabChange(AppTab.Error));
  }, []);

  const onTabChange = newTab => {
    dispatch({ type: AppEvent.TabChange, data: newTab });
  };

  const onPickName = name => {
    const updatedUser = new User({
      ...state.user,
      name,
      publicKey: myKeys.publicKey,
    });
    socket.send(createPayload(AppEvent.SetUser, updatedUser.forApi()));
  };

  const onChangeName = () => {
    dispatch({ type: AppEvent.TabChange, data: AppTab.PickName });
  };

  const onSendMessage = metadata => {
    const data = {
      ...metadata,
      author: state.user.id,
    }
    socket.send(createPayload(AppEvent.SendMessage, data));
  };

  const onSendEncryptedMessage = (metadata) => {
    const commonData = {
      ...metadata,
      id: new Date().getTime(),
      author: state.user.id,
      destination: state.encryptedChatPartner.id,
      type: UserMessageType.EncryptedMessage,
    };
    socket.send(
      createPayload(
        AppEvent.SendEncryptedMessage,
        {
          ...commonData,
          message: getEncryptedPayload(state.encryptedChatPartner.publicKey, metadata.message),
        }));
    dispatch({
      type: AppEvent.GetEncryptedMessage,
      data: commonData,
    });
  };

  const getEncryptedMessagesForPair = (fromId, toId) => {
    return state.encryptedMessages[createEncryptedChatId(fromId, toId)] || [];
  };

  const onEditMessage = (messageId, message) => {
    socket.send(createPayload(AppEvent.EditMessage, { id: messageId, message }));
  };

  const onDeleteMessage = messageId => {
    socket.send(createPayload(AppEvent.DeleteMessage, messageId));
  };

  const onUserClick = user => {
    dispatch({ type: AppEvent.SetEncryptedChatPartner, data: user });
    dispatch({ type: AppEvent.TabChange, data: AppTab.EncryptedChat });
  };

  if (isErrorTab(state.currentTab)) {
    return (
      <ErrorTab />
    );
  }

  if (isPickNameTab(state.currentTab)) {
    return (
      <PickNameTab onPickName={onPickName} />
    );
  }

  return (
    <>
      <AppHeader
        user={state.user}
        onChangeName={onChangeName}
      />
      <Tabs
        selected={state.currentTab}
        noOfUsers={state.activeUsers.length}
        onTabChange={onTabChange}
      />
      {isParticipantsTab(state.currentTab) && (
        <UsersTab
          currentUser={state.user}
          users={state.activeUsers}
          onUserClick={onUserClick}
        />
      )}
      {isChatTab(state.currentTab) && (
        <ChatTab
          currentUser={state.user}
          users={state.users}
          messages={state.messages}
          onSendMessage={onSendMessage}
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
        />
      )}
      {isEncryptedChatTab(state.currentTab) && (
        <ChatTab
          currentUser={state.user}
          users={[state.user, state.encryptedChatPartner]}
          messages={getEncryptedMessagesForPair(state.user.id, state.encryptedChatPartner.id)}
          isEncrypted={true}
          noActions={true}
          onSendMessage={onSendEncryptedMessage}
        />
      )}
    </>
  );
}

export default App;

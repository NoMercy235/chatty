import React, { useEffect, useReducer, useState } from 'react';

import { Config } from './config';
import { User } from './domain/user';
import { Message } from './domain/message';
import { AppTab, AppEvent, WsProtocol } from './shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Tabs } from './components/Tabs/Tabs';
import { createWsEndpoint, isChatTab, isErrorTab, isParticipantsTab, isPickNameTab } from './shared/utils';
import { UsersTab } from './components/UsersTab/UsersTab';
import { ChatTab } from './components/ChatTab/ChatTab';
import { PickNameTab } from './components/PickNameTab/PickNameTab';
import { createPayload } from './shared/utils';
import { ErrorTab } from './components/ErrorTab/ErrorTab';

import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case AppEvent.SetUser:
      localStorage.setItem('user', JSON.stringify(action.data));
      return { ...state, user: new User(action.data), currentTab: AppTab.Participants };
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
    default:
      return state;
  }
}

const localUser = new User(JSON.parse(localStorage.getItem('user') || '{}'));

const initialState = {
  currentTab: AppTab.PickName,
  user: undefined,
  users: [],
  activeUsers: [],
  messages: [],
};


function App() {
  const [socket, setSocket] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket(createWsEndpoint(Config.WsHost, Config.WsPort, localUser), WsProtocol.EchoProtocol);

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
    const updatedUser = new User({ ...state.user, name });
    socket.send(createPayload(AppEvent.SetUser, updatedUser));
  };

  const onChangeName = () => {
    dispatch({ type: AppEvent.TabChange, data: AppTab.PickName });
  };

  const onSendMessage = message => {
    const data = {
      message,
      author: state.user.id,
    }
    socket.send(createPayload(AppEvent.SendMessage, data));
  };

  const onEditMessage = (messageId, message) => {
    socket.send(createPayload(AppEvent.EditMessage, { id: messageId, message }));
  };

  const onDeleteMessage = messageId => {
    socket.send(createPayload(AppEvent.DeleteMessage, messageId));
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
    </>
  );
}

export default App;

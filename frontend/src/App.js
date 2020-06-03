import React, { useEffect, useReducer, useState } from 'react';

import { User } from './domain/user';
import { Message } from './domain/message';
import { AppTab, AppEvent } from './shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Tabs } from './components/Tabs/Tabs';
import { isChatTab, isParticipantsTab, isPickNameTab } from './shared/utils';
import { UsersTab } from './components/UsersTab/UsersTab';
import { ChatTab } from './components/ChatTab/ChatTab';
import { PickNameTab } from './components/PickNameTab/PickNameTab';
import { createPayload } from './shared/utils';

import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case AppEvent.SetUser:
      return { ...state, user: new User(action.data) };
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
  currentTab: localUser.id ? AppTab.Participants : AppTab.PickName,
  user: undefined,
  users: [],
  activeUsers: [],
  messages: [],
};


function App() {
  const [socket, setSocket] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Initialize socket
    // TODO:maybe: store the userId in localStorage and use that in the query string part
    // of the URL to get back the data of a user who has already visited the app
    const ws = new WebSocket(`ws://localhost:8080?id=${localUser.id}&name=${localUser.name}`, 'echo-protocol');

    ws.onmessage = ((message) => {
      const payload = JSON.parse(message.data);
      dispatch(payload);
    });

    setSocket(ws);

    // TODO: handle on error
  }, []);

  const onTabChange = newTab => {
    dispatch({ type: AppEvent.TabChange, data: newTab });
  };

  const onPickName = name => {
    const updatedUser = new User({ ...state.user, name });
    socket.send(createPayload(AppEvent.SetUser, updatedUser));
    dispatch({ type: AppEvent.TabChange, data: AppTab.Participants });
  };

  const onSendMessage = message => {
    const data = {
      message,
      author: state.user.id,
    }
    socket.send(createPayload(AppEvent.SendMessage, data));
  };

  if (isPickNameTab(state.currentTab)) {
    return (
      <PickNameTab onPickName={onPickName} />
    );
  }

  return (
    <>
      <AppHeader/>
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
          users={state.users}
          messages={state.messages}
          onSendMessage={onSendMessage}
        />
      )}
    </>
  );
}

export default App;

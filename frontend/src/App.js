import React, { useEffect, useReducer, useState } from 'react';

import { User } from './domain/user';
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
      return { ...state, users: action.data.map(u => new User(u)) };
    case AppEvent.TabChange:
      return { ...state, currentTab: action.data };
    default:
      return state;
  }
}

const name = localStorage.getItem('name') || '';

const initialState = {
  currentTab: name ? AppTab.Participants : AppTab.PickName,
  user: undefined,
  users: [],
  messages: [],
};


function App() {
  const [socket, setSocket] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Initialize socket
    // TODO:maybe: store the userId in localStorage and use that in the query string part
    // of the URL to get back the data of a user who has already visited the app
    const ws = new WebSocket(`ws://localhost:8080?name=${name}`, 'echo-protocol');

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
    dispatch({ type: AppEvent.SetUser, data: updatedUser });
    socket.send(createPayload(AppEvent.SetUser, updatedUser));
    dispatch({ type: AppEvent.TabChange, data: AppTab.Participants });
  };

  const onSendMessage = message => {
    socket.send(createPayload({ type: AppEvent.SendMessage, data: message }))
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
        users={state.users}
        onTabChange={onTabChange}
      />
      {isParticipantsTab(state.currentTab) && <UsersTab users={state.users}/>}
      {isChatTab(state.currentTab) && <ChatTab onSendMessage={onSendMessage} />}
    </>
  );
}

export default App;

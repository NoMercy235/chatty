import React, { useEffect, useReducer } from 'react';

import { User } from './domain/user';
import { AppTab, AppEvent } from './shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Tabs } from './components/Tabs/Tabs';
import { isChatTab, isParticipantsTab } from './shared/utils';
import { UsersTab } from './components/UsersTab/UsersTab';
import { ChatTab } from './components/ChatTab/ChatTab';

import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case AppEvent.UserCreated:
      return { ...state, user: new User(action.data) };
    case AppEvent.GetUsers:
      return { ...state, users: action.data.map(u => new User(u)) };
    case AppEvent.TabChange:
      return { ...state, currentTab: action.data };
    default:
      return state;
  }
}

const initialState = {
  currentTab: AppTab.Participants,
  user: undefined,
  users: [],
  messages: [],
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let socket;

  useEffect(() => {
    // Initialize socket
    // TODO:maybe: store the userId in localStorage and use that in the query string part
    // of the URL to get back the data of a user who has already visited the app
    socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

    socket.onmessage = ((message) => {
      const payload = JSON.parse(message.data);
      dispatch(payload);
    });

    // TODO: handle on error
  }, []);

  const onTabChange = newTab => {
    dispatch({ type: AppEvent.TabChange, data: newTab });
  };

  return (
    <>
      <AppHeader/>
      <Tabs
        selected={state.currentTab}
        users={state.users}
        onTabChange={onTabChange}
      />
      {isParticipantsTab(state.currentTab) && <UsersTab users={state.users}/>}
      {isChatTab(state.currentTab) && <ChatTab/>}
    </>
  );
}

export default App;

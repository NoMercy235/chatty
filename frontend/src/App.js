import React, { useEffect, useReducer } from 'react';

import { User } from './domain/user';
import { AppTab, WsEvent } from './shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Tabs } from './components/Tabs/Tabs';

import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case WsEvent.UserCreated:
      return { ...state, user: new User(action.data) };
    case WsEvent.GetUsers:
      return { ...state, users: action.data.map(u => new User(u)) };
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

  return (
    <>
      <AppHeader/>
      <Tabs selected={state.currentTab} users={state.users}/>
      <div>UserID: {state.user?.id}</div>
      <div>Users</div>
      {state.users.map(user => {
        return <div key={user.id}>{user.id}</div>;
      })}
    </>
  );
}

export default App;

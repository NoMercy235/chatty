import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// TODO:maybe: store the userId in localStorage and use that in the query string part
// of the URL to get back the data of a user who has already visited the app
const socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

socket.onmessage = ((payload) => {
  if (payload.data) {
    console.log('USER_REGISTERED');
    console.log(payload);
    const { data: user } = JSON.parse(payload.data);
    console.log(user);
  }
});

// TODO: handle on error
socket.onopen = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App socket={socket} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

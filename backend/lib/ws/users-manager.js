const User = require('../../domain/user');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');
const { botUserAnnouncement } = require('./messages-manager');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const syncUser = (connectionId, user) => {
  Db.getConnection(connectionId).send(createPayload(Event.SetUser, user));
  wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
  wsServer.broadcast(createPayload(Event.GetMessages, Db.getMessages()));
};

const handleUsersMessages = (wsServer, action, connectionId) => {
  let user;
  switch (action.type) {
    case Event.SetUser:
      user = createUser(action.data);
      Db.addUser(user);
      Db.linkUserToConnection(user.id, connectionId);
      botUserAnnouncement(user, { hasLeft: false });
      syncUser(connectionId, user);
      break;
    case Event.ActivateUser:
      user = action.data
      Db.activateUser(user.id);
      syncUser(connectionId, user);
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

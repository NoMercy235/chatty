const User = require('../../domain/user');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');
const { botUserAnnouncement } = require('./messages-manager');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const syncUser = (connectionId, user) => {
  Db.linkUserToConnection(user.id, connectionId);
  botUserAnnouncement(user, { hasLeft: false });
  Db.getConnection(connectionId).send(createPayload(Event.SetUser, user));
  wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
  wsServer.broadcast(createPayload(Event.GetMessages, Db.getMessages()));
};

const handleUsersMessages = (wsServer, action, connectionId) => {
  let user;
  switch (action.type) {
    case Event.SetUser:
      user = createUser(action.data);
      if (!user.isValid()) return;
      Db.addUser(user);
      syncUser(connectionId, user);
      break;
    case Event.ActivateUser:
      user = action.data;
      Db.activateUser(user.id, user.publicKey);
      const dbUser = Db.getUser(user.id);
      syncUser(connectionId, dbUser);
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

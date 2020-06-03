const User = require('../../domain/user');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');
const { botUserAnnouncement } = require('./messages-manager');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const handleUsersMessages = (wsServer, action, connectionId) => {
  switch (action.type) {
    case Event.SetUser:
      const user = createUser(action.data);
      Db.addUser(user);
      Db.linkUserToConnection(user.id, connectionId);
      botUserAnnouncement(user, { hasLeft: false });
      Db.getConnection(connectionId).send(createPayload(Event.SetUser, user));
      wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
      wsServer.broadcast(createPayload(Event.GetMessages, Db.getMessages()));
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

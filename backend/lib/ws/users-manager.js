const User = require('../../domain/user');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');
const { botUserAnnouncement } = require('./messages-manager');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const handleUsersMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SetUser:
      const user = createUser(action.data);
      Db.addUser(user);
      botUserAnnouncement(user, { hasLeft: false });
      wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

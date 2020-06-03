const User = require('../../domain/user');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const handleUsersMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SetUser:
      Db.addUser(createUser(action.data));
      connection.send(createPayload(Event.GetUsers, Db.getUsers()));
      wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

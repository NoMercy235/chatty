const User = require('../../domain/user');
const Message = require('../../domain/message');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');
const { UserMessageType } = require('../../lib/shared/constants');

const createUser = (metadata = {}) => {
  return new User(metadata);
};

const handleUsersMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SetUser:
      const user = createUser(action.data);
      Db.addUser(user);

      const message = new Message({
        message: `${user.name} has joined.`,
        type: UserMessageType.Info,
        author: User.bot.id,
      });
      Db.addMessage(message);

      wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
      wsServer.broadcast(createPayload(Event.SendMessage, message));
  }
};

module.exports = {
  createUser,
  handleUsersMessages,
};

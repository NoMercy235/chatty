const User = require('../../domain/user');
const Message = require('../../domain/message');
const Db = require('../../domain/db');
const { Event, UserMessageType } = require('../shared/constants');
const { createPayload } = require('../shared/utils');

const handleMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SendMessage:
      const message = new Message(action.data);
      Db.addMessage(message);
      wsServer.broadcast(createPayload(Event.SendMessage, message));
  }
};

const botUserAnnouncement = (user, { hasLeft }) => {
  const message = new Message({
    message: `${user.name} has ${hasLeft ? 'left' : 'joined'}.`,
    type: UserMessageType.Info,
    author: User.bot.id,
  });
  Db.addMessage(message);
  wsServer.broadcast(createPayload(Event.SendMessage, message));
};

module.exports = {
  botUserAnnouncement,
  handleMessages,
};

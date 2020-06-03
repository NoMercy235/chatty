const User = require('../../domain/user');
const Message = require('../../domain/message');
const Db = require('../../domain/db');
const { Event, UserMessageType } = require('../shared/constants');
const { createPayload } = require('../shared/utils');

const handleMessages = (wsServer, action) => {
  let message;
  switch (action.type) {
    case Event.SendMessage:
      message = new Message(action.data);
      Db.addMessage(message);
      wsServer.broadcast(createPayload(Event.SendMessage, message));
      break;
    case Event.EditMessage:
      const { id: messageId, message: newMessage } = action.data;
      Db.updateMessage(messageId, newMessage);
      wsServer.broadcast(createPayload(Event.GetMessages, Db.getMessages()));
      break;
    case Event.DeleteMessage:
      Db.deleteMessage(action.data);
      wsServer.broadcast(createPayload(Event.GetMessages, Db.getMessages()));
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

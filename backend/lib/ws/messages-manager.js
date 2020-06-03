const Message = require('../../domain/message');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');

const handleMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SendMessage:
      const message = new Message(action.data);
      Db.addMessage(message);
      wsServer.broadcast(createPayload(Event.SendMessage, message));
  }
};

module.exports = {
  handleMessages,
};

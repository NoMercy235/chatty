const Message = require('../../domain/message');
const Db = require('../../domain/db');
const { Event } = require('../shared/constants');
const { createPayload } = require('../shared/utils');

const handleMessages = (wsServer, connection, action) => {
  switch (action.type) {
    case Event.SendMessage:
      Db.addMessage(new Message(action.data));
      connection.send(createPayload(Event.SendMessage, Db.getMessages()));
      wsServer.broadcast(createPayload(Event.SendMessage, Db.getMessages()));
  }
};

module.exports = {
  handleMessages,
};

const User = require('./user');
const { idGenerator } = require('../lib/shared/utils');

class Db {
  users = {};
  messages = [];
  connections = {};
  connectionsMapper = {};

  constructor () {
    this.addUser(User.bot);
  }

  getUser = userId => this.users[userId];

  getUsers = () => {
    return Object
      .values(this.users)
      // Users with no name have just accessed the app and are not using it yet
      .filter(user => !!user.name)
      .map(user => user.forApi());
  };

  addUser = (user) => {
    this.users[user.id] = user;
  };

  activateUser = (userId) => {
    this.users[userId].activate();
  }

  deactivateUser = (userId) => {
    this.users[userId].deactivate();
  }

  addMessage = (message) => {
    this.messages.push(message);
  };

  updateMessage = (messageId, newMessage) => {
    const message = this.getMessage(messageId);
    message.message = newMessage.message;
    message.updatedAt = new Date();
  };

  deleteMessage = (messageId) => {
    const message = this.getMessage(messageId);
    message.isDeleted = true;
    message.message = 'This message has been deleted';
    message.gif = undefined;
  };

  getMessage = (messageId) => {
    return this.messages.find(({ id }) => id === messageId);
  };

  getMessages = () => {
    return this.messages.map(message => message.forApi());
  };

  getConnection = (connectionId) => {
    return this.connections[connectionId];
  };

  addConnection = (connection) => {
    const id = idGenerator.next().value;
    this.connections[id] = connection;
    return id;
  };

  linkUserToConnection = (userId, connectionId) => {
    Object
      .entries(this.connectionsMapper)
      .forEach(([mappedConnectionId, mappedUserId]) => {
        if (mappedUserId === userId) {
          delete this.connectionsMapper[mappedConnectionId];
        }
      });
    this.connectionsMapper[connectionId] = userId;
  };

  getUserByConnectionId = connectionId => {
    return this.getUser(this.connectionsMapper[connectionId]);
  };

  getConnectionByUserId = userId => {
    const [connectionId] = Object
      .entries(this.connectionsMapper)
      .find(([_, mappedUserId]) => {
        return mappedUserId !== userId;
      });
    console.log(connectionId);
    return this.connections[connectionId];
  };
}

module.exports = new Db();

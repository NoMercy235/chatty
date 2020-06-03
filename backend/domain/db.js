const User = require('./user');

class Db {
  users = {};
  messages = [];
  connections = {};

  constructor () {
    this.addUser(User.bot);
  }

  getUsers = () => {
    return Object
      .values(this.users)
      // Users with no name have just accessed the app and are not using it yet
      .filter(user => !!user.name)
      .map(user => user.forApi());
  };

  addUser = (user, connection) => {
    // If the user existed in the past, use that information for them
    if (this.users[user.id]) {
      this.users[user.id] = user;
      this.users[user.id].activate();
      if (!connection) return;
      this.connections[user.id] = connection;
      return;
    }

    // Otherwise, just store them normally
    this.users[user.id] = user;
    this.connections[user.id] = connection;
  };

  removeUser = (userId) => {
    this.users[userId].deactivate();
  }

  addMessage = (message) => {
    this.messages.push(message);
  };

  getMessages = () => {
    return this.messages.map(message => message.forApi());
  };
}

module.exports = new Db();

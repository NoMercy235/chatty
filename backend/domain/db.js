class Db {
  users = {};
  messages = {};
  connections = {};

  getUsers = () => {
    return Object
      .values(this.users)
      // Users with no name have just accessed the app and are not using it yet
      .filter(user => !!user.name)
      .map(user => user.forApi());
  };

  addUser = (user, connection) => {
    this.users[user.id] = user;
    if (!connection) return;
    this.connections[user.id] = connection;
  };

  removeUser = (userId) => {
    delete this.users[userId];
  }
}

module.exports = new Db();

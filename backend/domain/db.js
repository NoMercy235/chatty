class Db {
  users = {};
  messages = {};

  addUser = (user) => {
    this.users[user.id] = user;
  };

  removeUser = (userId) => {
    delete this.users[userId];
  }
}

module.exports = new Db();

class Db {
  users = {};
  messages = {};

  getUsers = () => {
    return Object.values(this.users).map(user => user.forApi());
  };

  addUser = (user) => {
    this.users[user.id] = user;
  };

  removeUser = (userId) => {
    delete this.users[userId];
  }
}

module.exports = new Db();

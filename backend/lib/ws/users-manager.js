const User = require('../../domain/user');

const createUser = () => {
  return new User();
};

module.exports = {
  createUser,
};

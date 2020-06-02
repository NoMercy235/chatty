const { idGenerator } = require('../lib/shared/utils');

class User {
  id = idGenerator.next().value;
}

module.exports = User;

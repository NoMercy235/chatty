const { idGenerator } = require('../lib/shared/utils');

class User {
  id = idGenerator.next().value;

  toString = () => {
    const toSend = {
      id: this.id,
    }
    return JSON.stringify(toSend);
  };
}

module.exports = User;

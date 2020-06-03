const { idGenerator } = require('../lib/shared/utils');

class User {
  constructor ({ id, name } = {}) {
    this.id = id || idGenerator.next().value;
    this.name = name;
  }

  forApi = () => {
    return {
      id: this.id,
      name: this.name,
    };
  };
}

module.exports = User;

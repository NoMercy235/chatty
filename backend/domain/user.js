const { idGenerator } = require('../lib/shared/utils');

class User {
  id = idGenerator.next().value;

  constructor ({ id, name } = {}) {
    this.id = id || this.id;
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

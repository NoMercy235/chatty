const { idGenerator } = require('../lib/shared/utils');

class User {
  id = idGenerator.next().value;

  forApi = () => {
    return {
      id: this.id,
    };
  };
}

module.exports = User;

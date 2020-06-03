const { idGenerator } = require('../lib/shared/utils');
const { UserBotMetadata } = require('../lib/shared/constants');

class User {
  static bot = new User(UserBotMetadata);

  constructor ({ id, name, isInactive } = {}) {
    this.id = id || idGenerator.next().value;
    this.name = name;
    this.isInactive = isInactive || false;
  }

  activate = () => this.isInactive = false;
  deactivate = () => this.isInactive = true;

  forApi = () => {
    return {
      id: this.id,
      name: this.name,
      isInactive: this.isInactive,
    };
  };
}

module.exports = User;

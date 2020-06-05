const { idGenerator } = require('../lib/shared/utils');
const { UserBotMetadata } = require('../lib/shared/constants');

class User {
  static bot = new User(UserBotMetadata);

  constructor ({ id, name, isInactive, publicKey } = {}) {
    this.id = id || idGenerator.next().value;
    this.name = name;
    this.isInactive = isInactive || false;
    this.publicKey = publicKey;
  }

  activate = () => this.isInactive = false;
  deactivate = () => {
    this.isInactive = true;
    this.publicKey = undefined;
  }

  isValid = () => {
    return this.id !== undefined && this.name;
  };

  forApi = () => {
    return {
      id: this.id,
      name: this.name,
      isInactive: this.isInactive,
      publicKey: this.publicKey,
    };
  };
}

module.exports = User;

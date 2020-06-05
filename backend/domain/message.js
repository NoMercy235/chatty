const { idGenerator } = require('../lib/shared/utils');
const { UserMessageType } = require('../lib/shared/constants');

class Message {
  constructor ({ id, message, author, createdAt, updatedAt, isDeleted, type, gif, image }) {
    this.id = id || idGenerator.next().value;
    this.message = message;
    this.author = author;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
    this.gif = gif;
    this.image = image;
  }

  isValid = () => {
    return this.id &&
      (
        (this.type === UserMessageType.Message && this.message) ||
        (this.type === UserMessageType.Gif && this.gif) ||
        (this.type === UserMessageType.Image && this.image)
      );
  };

  forApi = () => {
    return {
      id: this.id,
      message: this.message,
      author: this.author,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDeleted: this.isDeleted,
      type: this.type,
      gif: this.gif,
      image: this.image,
    };
  };
}

module.exports = Message;

const { UserMessageType } = require('../lib/shared/constants');

class Message {
  constructor ({ message, author, createdAt, updatedAt, isDeleted, type }) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
  }

  forApi = () => {
    return {
      message: this.message,
      author: this.author,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDeleted: this.isDeleted,
      type: this.type,
    };
  };
}

module.exports = Message;

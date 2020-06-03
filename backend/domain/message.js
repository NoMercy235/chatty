class Message {
  constructor ({ message, author, createdAt, updatedAt, isDeleted }) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.isDeleted = isDeleted || false;
  }

  forApi = () => {
    return {
      message: this.message,
      author: this.author,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isDeleted: this.isDeleted,
    };
  };
}

module.exports = Message;

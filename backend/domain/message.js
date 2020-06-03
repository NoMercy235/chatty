class Message {
  constructor ({ message, author, createdAt, updatedAt, isDeleted }) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  forApi = () => {
    return {
      message: this.message,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
    };
  };
}

module.exports = Message;

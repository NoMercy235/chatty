export class Message {
  constructor ({ message, author, createdAt, updatedAt, isDeleted }) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}

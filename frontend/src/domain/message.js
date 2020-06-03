import { UserMessageType } from '../shared/constants';

export class Message {
  constructor ({ id, message, author, createdAt, updatedAt, isDeleted, type }) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
  }
}

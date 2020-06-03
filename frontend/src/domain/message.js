import { UserMessageType } from '../shared/constants';

export class Message {
  constructor ({ message, author, createdAt, updatedAt, isDeleted, type }) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
  }
}

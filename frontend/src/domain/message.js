import { UserMessageType } from '../shared/constants';

export class Message {
  constructor ({ id, message, author, destination, createdAt, updatedAt, isDeleted, type, gif }) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.destination = destination;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
    this.gif = gif;
  }

  get isEdited () {
    return (this.updatedAt?.getTime() - this.createdAt?.getTime()) !== 0;
  }

  get isGif () {
    return this.type === UserMessageType.Gif && this.gif;
  }
}

import { UserMessageType } from '../shared/constants';

export class Message {
  constructor ({ id, message, author, createdAt, updatedAt, isDeleted, type, gif, image }) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    this.isDeleted = isDeleted || false;
    this.type = type || UserMessageType.Message;
    this.gif = gif;
    this.image = image;
  }

  get isEdited () {
    return (this.updatedAt?.getTime() - this.createdAt?.getTime()) !== 0;
  }

  get isText () {
    return (this.type === UserMessageType.Message || this.type === UserMessageType.Info) && this.message;
  }

  get isGif () {
    return this.type === UserMessageType.Gif && this.gif;
  }

  get isImage () {
    return this.type === UserMessageType.Image && this.image;
  }
}

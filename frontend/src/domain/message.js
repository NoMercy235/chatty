import { UserMessageType } from '../shared/constants';
import { objectToUint8 } from '../shared/encryptionUtils';

export class Message {
  constructor ({ id, message, author, destination, createdAt, updatedAt, isDeleted, type, gif }) {
    this.id = id;
    this.message = message
      ? typeof message === 'string'
        ? message
        : {
          publicKey: objectToUint8(message.publicKey),
          encrypted: objectToUint8(message.encrypted),
          nonce: objectToUint8(message.nonce),
        }
      : undefined;
    this.author = author;
    this.destination = destination;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
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

  get isMessageEncrypted () {
    return typeof this.message === 'object';
  }
}

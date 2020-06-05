import { objectToUint8 } from '../shared/encryptionUtils';

export class User {
  constructor ({ id, name, isInactive, publicKey }) {
    this.id = id;
    this.name = name;
    this.isInactive = isInactive;
    this.publicKey = publicKey
      ? publicKey instanceof Uint8Array
        ? publicKey
        : objectToUint8(publicKey)
      : undefined;
  }

  forApi = () => {
    return {
      id: this.id,
      name: this.name,
      isInactive: this.isInactive,
      publicKey: this.publicKey,
    }
  };
}

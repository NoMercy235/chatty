import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

import { LocalStorageItem } from './constants';
import { jsonParseLocalStorageItem } from './utils';

const existingKeys = jsonParseLocalStorageItem(LocalStorageItem.Keys);

export const objectToUint8 = (value) => {
  return new Uint8Array(Object.values(value));
};

export const myKeys = existingKeys
  ? {
    publicKey: objectToUint8(existingKeys.publicKey),
    secretKey: objectToUint8(existingKeys.secretKey),
  }
  : nacl.box.keyPair();

export const generateNonce = () => nacl.randomBytes(24);

export const encryptMessage = (nonce, destinationPublicKey, message) => {
  return nacl.box(naclUtil.decodeUTF8(message), nonce, destinationPublicKey, myKeys.secretKey);
};

export const decryptMessage = ({ nonce, publicKey: sourcePublicKey, encrypted }) => {
  const payload = nacl.box.open(encrypted, nonce, sourcePublicKey, myKeys.secretKey);
  return payload ? naclUtil.encodeUTF8(payload) : undefined;
};

export const getEncryptedPayload = (destinationPublicKey, messageText) => {
  const nonce = generateNonce();

  return {
    publicKey: myKeys.publicKey,
    encrypted: encryptMessage(nonce, destinationPublicKey, messageText),
    nonce,
  };
};

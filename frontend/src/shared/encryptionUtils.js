import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

import { ErrorMessage } from './constants';

export const myKeys = nacl.box.keyPair();

export const generateNonce = () => nacl.randomBytes(24);

export const encryptMessage = (me, nonce, destinationPublicKey, message) => {
  return nacl.box(naclUtil.decodeUTF8(message), nonce, destinationPublicKey, me.secretKey);
};

export const decryptMessage = (me, nonce, destinationPublicKey, message) => {
  const payload = nacl.box.open(message, nonce, destinationPublicKey, me.secretKey);
  return payload ? naclUtil.encodeUTF8(payload) : ErrorMessage.CouldNotDecrypt;
};

export const objectToUint8 = (value) => {
  return new Uint8Array(Object.values(value));
};

export const getEncryptedPayload = (publicKey, messageText) => {
  const nonce = generateNonce();

  return {
    publicKey: myKeys.publicKey,
    encrypted: encryptMessage(myKeys, nonce, publicKey, messageText),
    nonce,
  };
};

export const generateLocalEncryptedId = (currentMessages) => {
  return `local-encrypted-${currentMessages.length}`;
};

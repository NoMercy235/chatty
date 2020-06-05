const HttpCodes = {
  NotFound: 404,
};

const MessageType = {
  Utf8: 'utf8',
  Binary: 'binary'
};

const Event = {
  ActivateUser: 'ACTIVATE_USER',
  SetUser: 'SET_USER',
  GetUsers: 'GET_USERS',
  SendMessage: 'SEND_MESSAGE',
  SendEncryptedMessage: 'SEND_ENCRYPTED_MESSAGE',
  EditMessage: 'EDIT_MESSAGE',
  DeleteMessage: 'DELETE_MESSAGE',
  GetMessages: 'GET_MESSAGES',
  GetEncryptedMessage: 'GET_ENCRYPTED_MESSAGE',
  WsNative: {
    Request: 'request',
    Message: 'message',
    Close: 'close',
  },
};

const UserMessageType = {
  Message: 'MESSAGE',
  EncryptedMessage: 'ENCRYPTED_MESSAGE',
  Info: 'INFO',
  Gif: 'GIF',
};

const UserBotMetadata = {
  id: 0,
  name: 'Meetingbot',
};

module.exports = {
  Event,
  HttpCodes,
  MessageType,
  UserBotMetadata,
  UserMessageType,
};

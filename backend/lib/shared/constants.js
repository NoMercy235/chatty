const HttpCodes = {
  NotFound: 404,
};

const MessageType = {
  Utf8: 'utf8',
  Binary: 'binary'
};

const Event = {
  SetUser: 'SET_USER',
  GetUsers: 'GET_USERS',
  SendMessage: 'SEND_MESSAGE',
  WsNative: {
    Request: 'request',
    Message: 'message',
    Close: 'close',
  },
};

module.exports = {
  Event,
  HttpCodes,
  MessageType,
};

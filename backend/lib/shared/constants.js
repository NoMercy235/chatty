const HttpCodes = {
  NotFound: 404,
};

const MessageType = {
  Utf8: 'utf8',
  Binary: 'binary'
};

const Event = {
  UserCreated: 'USER_CREATED',
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

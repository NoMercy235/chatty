export const AppEvent = {
  SetUser: 'SET_USER',
  GetUsers: 'GET_USERS',
  TabChange: 'TAB_CHANGE',
  SendMessage: 'SEND_MESSAGE',
  SendEncryptedMessage: 'SEND_ENCRYPTED_MESSAGE',
  EditMessage: 'EDIT_MESSAGE',
  DeleteMessage: 'DELETE_MESSAGE',
  GetMessages: 'GET_MESSAGES',
  GetEncryptedMessage: 'GET_ENCRYPTED_MESSAGE',
  SetEncryptedChatPartner: 'SET_ENCRYPTED_CHAT_PARTNER',
};

export const AppTab = {
  Error: 'ERROR',
  PickName: 'PICK_NAME',
  Participants: 'PARTICIPANTS',
  Chat: 'CHAT',
  EncryptedChat: 'ENCRYPTED_CHAT',
};

export const KeyCode = {
  Enter: 13,
};

export const UserMessageType = {
  Message: 'MESSAGE',
  EncryptedMessage: 'ENCRYPTED_MESSAGE',
  Info: 'INFO',
  Gif: 'GIF',
};

export const WsProtocol = {
  EchoProtocol: 'echo-protocol',
};

export const LocalStorageItem = {
  User: 'user',
  Keys: 'keys',
};

export const MEETINGBOT_USER_ID = 0;

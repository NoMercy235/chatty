import { AppTab } from './constants';
import { Config } from '../config';

export const isErrorTab = (currentTab) => {
  return currentTab === AppTab.Error;
};

export const isPickNameTab = (currentTab) => {
  return currentTab === AppTab.PickName;
};

export const isParticipantsTab = (currentTab) => {
  return currentTab === AppTab.Participants;
};

export const isChatTab = (currentTab) => {
  return currentTab === AppTab.Chat;
};

export const isEncryptedChatTab = (currentTab) => {
  return currentTab === AppTab.EncryptedChat;
};

export const createPayload = (eventType, data) => {
  return JSON.stringify({
    type: eventType,
    data,
  });
};

const intl = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

export const formatDate = date => intl.format(date);

const parseQueryParams = queryParams => {
  return Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&');
};

export const createWsEndpoint = (wsHost, wsPort, localUser) => {
  const queryParams = localUser ? { ...localUser, publicKey: JSON.stringify(localUser.publicKey) } : {};
  return `ws://${Config.WsHost}:${Config.WsPort}?${parseQueryParams(queryParams)}`;
};

export const createEncryptedChatId = (from, to) => {
  return from > to ? `${to}-${from}` : `${from}-${to}`;
};

export const jsonParseLocalStorageItem = itemName => {
  const value = localStorage.getItem(itemName);
  return value ? JSON.parse(value) : undefined;
};

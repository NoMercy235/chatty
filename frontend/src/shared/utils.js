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

export const createWsEndpoint = (wsHost, wsPort, localUser) => {
  return `ws://${Config.WsHost}:${Config.WsPort}?id=${localUser.id}&name=${localUser.name}`;
};

import { AppTab } from './constants';

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

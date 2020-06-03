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

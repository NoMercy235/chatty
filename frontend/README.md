# [FE] Chatty

The client side part of the "Chatty" project.

#### Objectives:
 - [x] Build a user interface similar to the one used in `../initial-resources/*.png`
 - [x] Connect to the backend through Web Sockets
    - [x] See a list of current users
    - [x] Send messages to the chat
 - [x] Edit/Delete your own messages but leave their trace
 
 ###### Optional objectives:
 - [ ] Image/emoji support for messages
     - Won't do. Emojis are supported out of the box, but images cannot be stored correctly in the current architecture, so it is not feasible to do it. 
 - [ ] Page preview on link hover
 - [x] Giphy support
 - [ ] Theming/Alternative layouts
 - [x] End to end encryption for peer-to-peer communication

#### Known issues:
 - There are UI issues in browsers other than Chrome (e.g. Safari mobile looks weird)
 - Multi tab app usage does not work as expected - for instance, when closing one of the tabs, the user is displayed as "inactive" even though there is one connection left
 - Regarding encrypted chat:
    - On refresh you lose all the messages and there is no way to get them again
    - On local storage clear you lose your keys and noone will be able to talk to you until they refresh the users
    - The keys are stored in local storage which poses a great security risk

#### How to run
- Create the file `./src/config.js` with the following format:
```javascript
export const Config = {
  WsHost: 'host',
  WsPort: 1234,
  GiphyAPI: 'get it from https://developers.giphy.com/',
};
```
- Run `npm run start`

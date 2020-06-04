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
 - [ ] Page preview on link hover
 - [ ] Giphy support
 - [ ] Theming/Alternative layouts
 - [ ] End to end encryption for peer-to-peer communication

#### How to run
- Create the file `./src/config.js` with the following format:
```javascript
export const Config = {
  WsHost: 'host',
  WsPort: 1234
};
```
- Run `npm run start`

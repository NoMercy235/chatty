# [BE] Chatty

The server side part of the "Chatty" project.

#### Assumptions/Decisions:
 - For speed purposes:
    - No authentication
    - No tests
    - No DB (messages/active users will be kept in memory; images, if implemented, will be kept on disk with a path reference in memory)

#### Objectives:
 - [ ] Allow connections through the ws protocol
 - [ ] Keep a list of active users (a user will be a connected device)
 - [ ] Store the messages of the main conversation (maybe up to the last 1000 messages)
 
 ###### Optional objectives:
 - [ ] Implement support for images as attachments
 - [ ] Support for Giphy (?)

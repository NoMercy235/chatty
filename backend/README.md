# [BE] Chatty

The server side part of the "Chatty" project.

#### Assumptions/Decisions:
 - For speed purposes:
    - No authentication
    - No tests
    - No DB (messages/active users will be kept in memory; images, if implemented, will be kept on disk with a path reference in memory)
 - Duplicate names will be allowed

#### Objectives:
 - [x] Allow connections through the ws protocol
 - [x] Keep a list of active users (a user will be a connected device)
 - [x] Store the messages of the main conversation
 
 ###### Optional objectives:
 - [ ] Implement support for images as attachments
 - [ ] Support for Giphy (?)

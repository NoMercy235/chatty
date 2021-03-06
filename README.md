# Chatty

This project consists of two applications:
- A backend server built on NodeJS that allows communication via the `ws` protocol (not secured)
- A frontend client built on ReactJS which serves as the interface for the server

### Assumptions
- For speed purposes:
    - No Typescript setup
    - No tests
    - No store manager (will use internal state)
    - No authentication
    - No tests
    - No DB (messages/active users will be kept in memory; images, if implemented, will be kept on disk with a path reference in memory)
    - No focus on UI elements (colors/texts/fonts/icons)
 - Duplicate names will be allowed, but they will reference different users
 - The information assigned by the server will be stored in the local storage of the browser to persist the user
 - There is no security enforced:
    - As said, there is noo authentication
    - If a user knows the id of someone, they can impersonate them
 - Error handling is done at a basic level
 
 ### How to run
 If you have Docker and `docker-compose` installed on your machine, you can run the `./serve.sh` script to build 2 containers with the backend and frontend applications respectively.
 
 Otherwise, you can go into each project and follow the "How to run" section from there.

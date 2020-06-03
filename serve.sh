#!/bin/bash
 rm -rf ./backend/node_modules
 rm -rf ./frontend/node_modules

dockerComposePath=$(which docker-compose)

${dockerComposePath} build --no-cache
${dockerComposePath} up -d

FROM node:12

# File Author / Maintainer
LABEL authors="Alexandru Florian Barascu <alex.florin235@yahoo.com>"
MAINTAINER alex.florin235@yahoo.com

# Set work directory to /src
WORKDIR /src

# Copy app source
COPY . /src

# Install app dependencies
RUN npm install

EXPOSE 8080

# Start command as per package.json
ENTRYPOINT ["npm", "run", "start"]

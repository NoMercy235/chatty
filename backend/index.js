const WebSocketServer = require('websocket').server;
const http = require('http');

const { Event, HttpCodes, MessageType } = require('./lib/shared/constants');
const { createPayload, logMessage } = require('./lib/shared/utils');
const { handleUsersMessages } = require('./lib/ws/users-manager');
const { handleMessages, botUserAnnouncement } = require('./lib/ws/messages-manager');
const Db = require('./domain/db');

const server = http.createServer(function(request, response) {
  logMessage(`Received request for ${request.url}`);
  response.writeHead(HttpCodes.NotFound);
  response.end();
});

// TODO: get port from config file/env variable
server.listen(8080, function() {
  logMessage('Server is listening on port 8080');
});

wsServer = new WebSocketServer({
  httpServer: server,
});

function originIsAllowed(origin) {
  // TODO: CORS protection, if needed
  return true;
}

wsServer.on(Event.WsNative.Request, function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    logMessage(`Connection from origin ${request.origin} rejected.`);
    return;
  }

  let connection;
  try {
    connection = request.accept('echo-protocol', request.origin);
  } catch (e) {
    logMessage(`Connection from origin ${request.origin} rejected.`);
    return;
  }

  logMessage('Connection accepted');
  const connectionId = Db.addConnection(connection);

  connection.on(Event.WsNative.Message, function(message) {
    if (message.type === MessageType.Utf8) {
      logMessage(`Received Message: ${message.utf8Data}`);
      const parsedMessage = JSON.parse(message.utf8Data);
      handleUsersMessages(wsServer, parsedMessage, connectionId);
      handleMessages(wsServer, parsedMessage);
    }
  });

  connection.on(Event.WsNative.Close, function(reasonCode, description) {
    logMessage(`Peer ${connection.remoteAddress} disconnected.`);
    const dbUser = Db.getUserByConnectionId(connectionId);

    if (!dbUser) return;

    Db.deactivateUser(dbUser.id);
    botUserAnnouncement(Db.getUser(dbUser.id), { hasLeft: true });
    wsServer.broadcast(createPayload(Event.GetUsers, Db.getUsers()));
  });
});

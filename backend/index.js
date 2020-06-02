const WebSocketServer = require('websocket').server;
const http = require('http');

const { HttpCodes, MessageType } = require('./lib/shared/constants');
const { logMessage } = require('./lib/shared/utils');

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

wsServer.on('request', function(request) {
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
  connection.on('message', function(message) {
    if (message.type === MessageType.Utf8) {
      logMessage(`Received Message: ${message.utf8Data}`);
      connection.sendUTF(message.utf8Data);
    }
    else if (message.type === MessageType.Binary) {
      logMessage(`Received Binary Message of ${message.binaryData.length} bytes`);
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function(reasonCode, description) {
    logMessage(`Peer ${connection.remoteAddress} disconnected.`);
  });
});
const logMessage = message => {
  console.log(`${new Date().toISOString()}: - ${message}`);
};

const idGenerator = function* () {
  let i = 1;
  while (true) {
    yield i;
    i ++;
  }
};

const createPayload = (eventType, data) => {
  return JSON.stringify({
    type: eventType,
    data,
  });
};

module.exports = {
  createPayload,
  logMessage,
  idGenerator: idGenerator(),
};

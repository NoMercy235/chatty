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

module.exports = {
  logMessage,
  idGenerator: idGenerator(),
};

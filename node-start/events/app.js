const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const callback = data => {
  console.log(`Received: ${data}`);
};

myEmitter.on("message", callback);
myEmitter.emit("message", "Hello, testing events in NodeJS!");
myEmitter.off("message", callback);

myEmitter.addListener("event", callback);
myEmitter.emit("event", "Checking other methods!");
myEmitter.removeListener("event", callback);
myEmitter.removeAllListeners("event");

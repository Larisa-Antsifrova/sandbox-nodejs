const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const callback = data => {
  console.log(`Received: ${data}`);
};

const once = () => {
  console.log("I have been called once!");
};

myEmitter.on("message", callback);
myEmitter.emit("message", "Hello, testing events in NodeJS!");
myEmitter.off("message", callback);

myEmitter.addListener("event", callback);
myEmitter.emit("event", "Checking other methods!");
// myEmitter.removeListener("event", callback);
// myEmitter.removeAllListeners("event");

myEmitter.once("off", once);
myEmitter.emit("off");
myEmitter.emit("off");

console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(5);
console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount("event"));
console.log(myEmitter.listenerCount("off"));

console.log(myEmitter.listeners("event"));
console.log(myEmitter.listeners("off"));

console.log(myEmitter.eventNames());

myEmitter.on("error", error => {
  console.log("Error occured: " + error.message);
});

myEmitter.emit("error", new Error("New error is here!"));

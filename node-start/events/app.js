const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const callbackEmitter = data => {
  console.log(`EventEmitter. Received: ${data}`);
};

const once = () => {
  console.log("I have been called once!");
};

myEmitter.on("message", callbackEmitter);
myEmitter.emit("message", "Hello, testing events in NodeJS!");
myEmitter.off("message", callbackEmitter);

myEmitter.addListener("event", callbackEmitter);
myEmitter.emit("event", "Checking other methods!");
// myEmitter.removeListener("event", callbackEmitter);
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

const myTarget = new EventTarget();

const callbackTarget = () => {
  console.log("EventTarget.");
};

myTarget.addEventListener("connected", callbackTarget);
myTarget.dispatchEvent(new Event("connected"));

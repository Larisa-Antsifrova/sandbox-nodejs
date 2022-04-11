const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timer 100", performance.now());
}, 100);

setImmediate(() => {
  console.log("Immediate", performance.now());
});

fs.readFile(__filename, () => {
  console.log("File read!");
});

setTimeout(() => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log("Loop is over!");

  Promise.resolve().then(() => {
    console.log("Promise inside timeout!");
  });

  process.nextTick(() => console.log("Tick inside timeout!"));
}, 0);

Promise.resolve().then(() => {
  console.log("Promise on the way!");
});

process.nextTick(() => console.log("Tick!"));

console.log("Finish");

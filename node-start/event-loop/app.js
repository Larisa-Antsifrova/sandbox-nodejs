console.log("Start");

setTimeout(() => {
  console.log("Timer 0", performance.now());
}, 100);

setImmediate(() => {
  console.log("Immediate", performance.now());
});

console.log("Finish");

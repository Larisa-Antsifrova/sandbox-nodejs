const start = performance.now();

setTimeout(() => {
  console.log(performance.now() - start);
  console.log("A second passed!");
}, 1000);

function myFunc(arg) {
  console.log("Argument =>", arg);
}

setTimeout(myFunc, 1500, "Here it goes!");

const timerId = setTimeout(() => {
  console.log("Finito!");
}, 5000);

setTimeout(() => {
  console.log(`Clearing timer id: ${timerId}`);
  clearTimeout(timerId);
}, 1000);

const intervalId = setInterval(() => {
  console.log(performance.now());
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  console.log("Done and over with!");
}, 5000);

console.log("Before");
setImmediate(() => {
  console.log("SetImmediate in action!");
});
console.log("After");

const unrefTimerId = setTimeout(() => {
  console.log("Unref timeout.");
}, 500);

unrefTimerId.unref();

setImmediate(() => {
  unrefTimerId.ref();
});

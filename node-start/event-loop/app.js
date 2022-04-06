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

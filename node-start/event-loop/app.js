const start = performance.now();

setTimeout(() => {
  console.log(performance.now() - start);
  console.log("A second passed!");
}, 1000);

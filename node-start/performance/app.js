function slow() {
  performance.mark("Start");

  const arr = [];

  for (let i = 0; i < 1000000; i++) {
    arr.push(i + 1);
  }

  performance.mark("End");

  performance.measure("Slow", "Start", "End");

  console.log(performance.getEntriesByName("Slow"));
}

slow();

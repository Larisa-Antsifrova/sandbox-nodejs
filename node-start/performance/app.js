const perf_hooks = require("perf_hooks");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    const entry = items.getEntriesByName("slow").pop();

    console.log(`Entry name: ${entry.name}. Entry duration: ${entry.duration}`);

    observer.disconnect();
  },
);

performanceObserver.observe({
  entryTypes: ["measure"],
});

function slow() {
  performance.mark("Start");

  const arr = [];

  for (let i = 0; i < 1000000; i++) {
    arr.push(i * i);
  }

  performance.mark("End");

  performance.measure("slow", "Start", "End");

  console.log(performance.getEntriesByName("slow"));
}

slow();

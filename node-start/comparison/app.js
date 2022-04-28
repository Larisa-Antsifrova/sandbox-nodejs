const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const { performance, PerformanceObserver } = require("perf_hooks");
const { readFileSync } = require("fs");

const file = readFileSync("./video.mp4");

const performanceObserver = new PerformanceObserver(items => {
  items.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = array => {
  return new Promise((resolve, reject) => {
    performance.mark("startWorkerFunction");

    const worker = new Worker("./worker.js", {
      workerData: {
        array,
        file,
      },
    });

    worker.on("message", message => {
      performance.mark("endWorkerFunction");
      performance.measure(
        "workerFunction",
        "startWorkerFunction",
        "endWorkerFunction",
      );
      resolve(message);
    });
  });
};

const forkFunction = array => {
  return new Promise((resolve, reject) => {
    performance.mark("startForkFunction");
    const forkProcess = fork("fork.js");

    forkProcess.send({ array, file });
    forkProcess.on("message", message => {
      performance.mark("endForkFunction");
      performance.measure(
        "forkFunction",
        "startForkFunction",
        "endForkFunction",
      );
      resolve(message);
    });
  });
};

const main = async () => {
  await workerFunction([25, 19, 48, 30]);

  await forkFunction([25, 19, 48, 30]);
};

main();

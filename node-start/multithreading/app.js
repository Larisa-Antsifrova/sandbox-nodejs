const { Worker } = require("worker_threads");

const compute = array => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: {
        array,
      },
    });

    worker.on("message", message => resolve(message));

    worker.on("error", error => reject(error));

    worker.on("exit", () => console.log("Worker is done!"));
  });
};

const main = async () => {
  try {
    performance.mark("start");

    const result = await Promise.all([
      compute([20, 25, 30, 35, 40, 45, 50]),
      compute([20, 25, 30, 35, 40, 45, 50]),
      compute([20, 25, 30, 35, 40, 45, 50]),
      compute([20, 25, 30, 35, 40, 45, 50]),
    ]);

    console.log("Result:", result);

    performance.mark("end");
    performance.measure("main", "start", "end");
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

main();

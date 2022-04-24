const { spawn } = require("child_process");

const childProcess = spawn("ls");

childProcess.stdout.on("data", data => {
  console.log("Stdout: ", data.toString());
});

childProcess.stderr.on("data", data => {
  console.log("Stderr: ", data.toString());
});

childProcess.on("exit", code => {
  console.log("Exit code: ", code);
});

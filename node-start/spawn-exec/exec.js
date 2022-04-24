const { exec } = require("child_process");

const childProcess = exec("ls", (error, stdout, stderr) => {
  if (error) {
    console.log("Error: ", error.message);
  }

  console.log("stdout: ", stdout);
  console.log("stderr: ", stderr);
});

childProcess.on("exit", code => {
  console.log("Exit code: ", code);
});

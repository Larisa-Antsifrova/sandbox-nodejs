const { fork } = require("child_process");

const forkProcess = fork("fork.js");

forkProcess.on("message", message => {
  console.log("Message: ", message);
});

forkProcess.on("close", code => {
  console.log("Exit code: ", code);
});

forkProcess.send("Ping!");
forkProcess.send("disconnect");

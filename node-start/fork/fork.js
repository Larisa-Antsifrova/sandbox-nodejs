process.on("message", message => {
  if (message === "disconnect") {
    process.disconnect();
    return;
  }

  console.log("Client messaged: ", message);
  process.send("Pong");
});

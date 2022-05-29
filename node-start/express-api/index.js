import express from "express";
import { usersRouter } from "./users/users.js";

const port = 8888;

const app = express();

app.use("/users", usersRouter);

app.get("/hello", (req, res) => {
  console.log("Hello from the App.");
  res.end();
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});

import express from "express";

const port = 8888;

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hi from express!");
});

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});

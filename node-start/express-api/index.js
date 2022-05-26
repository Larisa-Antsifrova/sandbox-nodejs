import express from "express";

const port = 8888;

const app = express();

app.all("/hello", (req, res, next) => {
  console.log("All");
  next();
});

const callbackOne = (req, res, next) => {
  console.log("Hello from Callback One");
  next();
};

const callbackTwo = (req, res, next) => {
  res.status(201).json({ success: true });
};

app.get("/hello", callbackOne, callbackTwo);

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});

// extra symbols
// ? - might not be included
// + - any number of the same characters after that
// * - any number of any characters
// (group)? - the symbols might be applied for groupping
// RegEx - can be used in endpoints

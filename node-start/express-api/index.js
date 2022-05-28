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
  res.set("Content-Type", "text/plain");
  res.append("Warning", "careful");
  res.type(".application/json"); // content-type will be rewritten

  res.cookie("token", "new token goes here", {
    domain: "",
    path: "/",
    secure: true,
  });

  // res.clearCookie('token') - removing a cooking by its name
  // res.status(201).send("Hi! Here is the second callback!");
  res.end();

  // res.download("path.pdf", "customname.pdf");
  // res.redirect(301, 'https://address-to-redirect.com')
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

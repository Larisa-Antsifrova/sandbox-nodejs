import http from "http";

const host = "127.0.0.1";
const port = 8888;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("Hi!");
});

server.listen(port, host, () => {
  console.log(`Server is on ${host}: ${port}`);
});

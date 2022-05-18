import http from "http";

const host = "127.0.0.1";
const port = 8888;

const server = http.createServer((request, response) => {
  //
});

server.listen(port, host, () => {
  console.log(`Server is on port: ${port}`);
});

import http from "http";

const host = "127.0.0.1";
const port = 8888;

const server = http.createServer((request, response) => {
  switch (request.method) {
    case "GET":
      switch (request.url) {
        case "/hello":
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/plain");
          response.end("Hi!");
          break;

        default:
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/plain");
          response.end("NOthing Found!");
      }
      break;
  }
});

server.listen(port, host, () => {
  console.log(`Server is on ${host}: ${port}`);
});

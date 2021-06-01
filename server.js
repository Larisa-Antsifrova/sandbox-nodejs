const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request is made.');
});

server.listen(3000, () => {
  console.log('Listening for requests.');
});

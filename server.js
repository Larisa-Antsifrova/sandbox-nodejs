const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err.message);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Listening for requests.');
});

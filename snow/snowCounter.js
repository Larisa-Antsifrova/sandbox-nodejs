const fs = require('fs');
const stream = require('stream');

class ReadStream extends stream.Readable {
  constructor(file, options) {
    super(options);
    this.readStream = fs.createReadStream(file);
  }

  transform(chunk) {
    const array = chunk.toString().split(' ');

    const reduced = array.filter(
      word =>
        (word.charCodeAt(0) > 64 && word.charCodeAt(0) < 91) ||
        (word.charCodeAt(0) > 96 && word.charCodeAt(0) < 122),
    );

    return reduced.join('\n');
  }

  _read() {
    this.readStream.on('data', chunk => {
      const result = this.transform(chunk);
      this.push(result);
    });

    this.readStream.on('end', () => this.push(null));
  }
}

const rs = new ReadStream('./smila.txt');

rs.pipe(fs.createWriteStream('snow.txt'));

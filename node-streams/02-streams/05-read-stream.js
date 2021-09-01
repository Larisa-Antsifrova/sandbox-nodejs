import fs from 'fs';
import stream from 'stream';

class ReadStream extends stream.Readable {
  constructor(file, options) {
    super(options);
    this.readStream = fs.createReadStream(file);
  }

  _read() {
    this.readStream.on('data', chunk =>
      this.push(chunk.toString().toUpperCase()),
    );

    this.readStream.on('end', () => this.push(null));
  }
}

const rs = new ReadStream('./chapter.txt');

rs.pipe(fs.createWriteStream('test.txt'));

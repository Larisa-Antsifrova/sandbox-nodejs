const fs = require('fs');
const stream = require('stream');

class ReadStream extends stream.Readable {
  constructor(file, options) {
    super(options);
    this.readStream = fs.createReadStream(file);
  }

  transform(chunk) {
    const normalizedString = chunk
      .toString()
      .toLowerCase()
      .replace(/[^a-z\n]/gi, '');

    const array = normalizedString.split('\n');

    const reduced = array.reduce((words, word) => {
      if (!word || word.length < 5) {
        return words;
      }

      if (words[word]) {
        words[word] += 1;
        return words;
      }

      words[word] = 1;
      return words;
    }, {});

    return JSON.stringify(reduced);
  }

  _read() {
    this.readStream.on('data', chunk => {
      const result = this.transform(chunk);
      this.push(result);
    });

    this.readStream.on('end', () => this.push(null));
  }
}

const rs = new ReadStream('./snow.txt');

rs.pipe(fs.createWriteStream('result.json'));

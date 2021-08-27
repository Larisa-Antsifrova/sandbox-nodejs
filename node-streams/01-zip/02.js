import fs from 'fs';
import zlib from 'zlib';

const sourceFile = 'chapter.txt';
const destFile = 'test-stream.txt';

fs.createReadStream(sourceFile)
  .pipe(zlib.createGzip())
  .on('end', () => console.log('Data has been processed!'))
  .pipe(fs.createWriteStream(`${destFile}.gz`))
  .on('finish', () => console.log('Archive is there for you!'));

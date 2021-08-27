import fs from 'fs/promises';
import zlib from 'zlib';
import { promisify } from 'util';

const sourceFile = 'chapter.txt';
const destFile = 'test-no-stream.txt';

try {
  const content = await fs.readFile(sourceFile);
  const archive = await promisify(zlib.gzip)(content);

  await fs.writeFile(`${destFile}.gz`, archive);
} catch (error) {
  console.log(error);
}

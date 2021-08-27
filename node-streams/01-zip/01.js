import fs from 'fs/promises';
import zlib from 'zlib';
import { promisify } from 'util';

const file = 'chapter.txt';

try {
  const content = await fs.readFile(file);
  const archive = await promisify(zlib.gzip)(content);

  await fs.writeFile(`${file}.gz`, archive);
} catch (error) {
  console.log(error);
}

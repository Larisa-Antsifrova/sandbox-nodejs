import fs from 'fs';

const read = fs.createReadStream('./chapter.txt');

read.on('data', chunk => console.log(chunk.toString()));

read.on('end', () => console.log('The file is over'));

import fs from 'fs';
import Chance from 'chance';

const chance = new Chance();

const file = fs.createWriteStream('write-stream.txt');

function generateData() {
  while (chance.bool({ likelihood: 95 })) {
    const ok = file.write(chance.string({ length: 16 * 1024 }));

    if (!ok) {
      console.log('Drain event!');
      return file.once('drain', generateData);
    }
  }

  file.end(() => {
    console.log('The operation ended!');
  });
}

generateData();

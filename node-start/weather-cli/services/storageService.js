import { homedir } from "os";
import { join } from "path";

const filePath = join(homedir(), "weather-data.json");

const saveKeyValue = (key, value) => {};

export { saveKeyValue };

// path cheat sheet

/*
import {
  join,
  basename,
  dirname,
  extname,
  relative,
  isAbsolute,
  resolve,
  sep,
} from "path";

  const filePath = join(homedir(), "weather-data.json");

  console.log(filePath);
  console.log(basename(filePath));
  console.log(dirname(filePath));
  console.log(extname(filePath));
  console.log(relative(filePath, dirname(filePath)));
  console.log(isAbsolute(filePath));
  console.log(resolve(".."));
  console.log(sep);
*/

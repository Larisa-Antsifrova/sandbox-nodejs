#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printSuccess, printHelp } from "./services/logService.js";
import { saveKeyValue } from "./services/storageService.js";
const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }

  if (args.s) {
    // Save the city
  }

  if (args.t) {
    saveKeyValue("token", args.t);
    // Save the token
  }

  // Display weather
};

initCLI();

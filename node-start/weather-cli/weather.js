#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printSuccess, printHelp } from "./services/logService.js";
import { saveKeyValue } from "./services/storageService.js";

const saveToken = async token => {
  try {
    await saveKeyValue("token", token);
    printSuccess("The token is saved.");
  } catch (error) {
    printError(error.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    // Save the city
  }

  if (args.t) {
    return saveToken(args.t);
  }

  // Display weather
};

initCLI();

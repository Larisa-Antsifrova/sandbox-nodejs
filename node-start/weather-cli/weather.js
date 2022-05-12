#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printSuccess, printHelp } from "./services/logService.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storageService.js";
import { getWeather } from "./services/apiService.js";

const saveToken = async token => {
  if (!token.length) {
    printError("No token provided.");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
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

  getWeather("london");
};

initCLI();

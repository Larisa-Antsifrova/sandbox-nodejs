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

const saveCity = async city => {
  if (!city.length) {
    printError("No city name provided.");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("The city name is saved.");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("The provided city was not found.");
    } else if (e?.response?.status == 401) {
      printError("The provided token is not valid.");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForcast();
};

initCLI();

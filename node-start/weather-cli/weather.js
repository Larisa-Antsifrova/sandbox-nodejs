#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/logService.js";
import {
  saveKeyValue,
  getKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storageService.js";
import { getWeather, getIcon } from "./services/apiService.js";

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
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

    const weather = await getWeather(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
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
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

initCLI();

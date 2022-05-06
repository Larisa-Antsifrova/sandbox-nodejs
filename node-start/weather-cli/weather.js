#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    // Display help
  }

  if (args.s) {
    // Save the city
  }

  if (args.t) {
    // Save the token
  }

  // Display weather
};

initCLI();

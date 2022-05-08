import chalk from "chalk";
import dedent from "dedent-js";

const printError = error => {
  console.log(chalk.bgRed("ERROR:") + " " + error);
};

const printSuccess = message => {
  console.log(chalk.bgGreen("SUCCESS:") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP: ")}
    No parameters: weather output.
    -s [CITY]: setting the city name.
    -h: help output.
    -t [API_KEY]: saving the token.
    `,
  );
};

export { printError, printSuccess, printHelp };

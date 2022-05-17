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

const printWeather = (response, icon) => {
  console.log(
    dedent`${chalk.bgBlueBright("WEATHER ")}
    Weather in ${response.name}:
    ${icon}  ${response.weather[0].description}
    Temperature: ${response.main.temp}
    Feels like ${response.main.feels_like}
    Humidity: ${response.main.humidity}%
    Wind: ${response.wind.speed} m/s
    `,
  );
};

export { printError, printSuccess, printHelp, printWeather };

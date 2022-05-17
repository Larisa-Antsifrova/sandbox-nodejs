import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storageService.js";

const getWeather = async city => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error("No token found.");
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        units: "metric",
      },
    },
  );

  return data;
};

const getIcon = icon => {
  switch (icon.slice(0, 1)) {
    case "01":
      return "☀️";
    case "02":
      return "⛅";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "⛈️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
    default:
      return "☁️";
  }
};

export { getWeather, getIcon };

//axios free example with https package

// import https from "https";
// import { getKeyValue, TOKEN_DICTIONARY } from "./storageService.js";

// const getWeather = async city => {
//   const token = await getKeyValue(TOKEN_DICTIONARY.token);

//   if (!token) {
//     throw new Error("No token found.");
//   }

//   const url = new URL("https://api.openweathermap.org/data/2.5/weather");
//   url.searchParams.append("q", city);
//   url.searchParams.append("appid", token);
//   url.searchParams.append("units", "metric");

//   https.get(url, response => {
//     let result = "";

//     response.on("data", chunk => {
//       result += chunk;
//     });

//     response.on("end", () => {
//       console.log(result);
//     });
//   });
// };

// export { getWeather };

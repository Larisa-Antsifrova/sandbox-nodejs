const { characters, stealRing } = require("./characters.js");

stealRing(characters, "Frodo");

for (const character of characters) {
  console.log(character);
}

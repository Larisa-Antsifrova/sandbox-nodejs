const { characters, stealRing } = require("./characters.js");

let myCharacters = characters;
myCharacters = stealRing(myCharacters, "Frodo");

for (const character of characters) {
  console.log(character);
}

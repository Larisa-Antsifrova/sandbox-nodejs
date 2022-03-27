const characters = [
  {
    name: "Frodo",
    hasRing: false,
  },
  {
    name: "Bilbo",
    hasRing: false,
  },
];

function stealRing(characters, owner) {
  characters.map(character => {
    if (character.name === owner) {
      character.hasRing = true;
    } else {
      character.hasRing = false;
    }
  });
}

module.exports = { characters, stealRing };

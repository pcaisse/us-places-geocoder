const places = require("../static/places.json");
const Trie = require("./trie.js");

const placesTrie = new Trie();
places.forEach(([placeName], index) => placesTrie.insert(placeName, index));

function searchByPlaceName(placeName) {
  return (placesTrie.search(placeName) ?? []).map((id) => places[id]);
}

module.exports = { searchByPlaceName };

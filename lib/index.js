const places = require("../static/places.json");
const RadixTrie = require("./radixTrie.js");

const placesTrie = new RadixTrie();
places.forEach(([placeName], index) => {
  placesTrie.insert(placeName, index);
});

function searchByPlaceName(placeName) {
  return (placesTrie.search(placeName) ?? []).map((id) => places[id]);
}

module.exports = { searchByPlaceName };

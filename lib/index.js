const places = require("../static/places.json");
const RadixTrie = require("./radixTrie.js");

const placesTrie = new RadixTrie();
places.forEach(([placeName], index) => {
  placesTrie.insert(placeName, index);
});

function searchByPlaceName(placeName, maxNumResults = 12) {
  return (placesTrie.search(placeName, maxNumResults) ?? [])
    .map((id) => places[id])
    .sort(([a, _coordsA], [b, _coordsB]) => a.length - b.length);
}

module.exports = { searchByPlaceName };

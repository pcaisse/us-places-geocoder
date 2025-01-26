const places = require("../static/places.json");
const RadixTrie = require("./radixTrie.js");

DEFAULT_MAX_NUM_RESULTS = 12;

const placesTrie = new RadixTrie();
places.forEach(([placeName], index) => {
  placesTrie.insert(placeName, index);
});

function searchByPlaceName(placeName, maxNumResults = DEFAULT_MAX_NUM_RESULTS) {
  return (placesTrie.search(placeName, maxNumResults) ?? [])
    .sort((idA, idB) => idA - idB)
    .map((id) => places[id]);
}

module.exports = { searchByPlaceName };

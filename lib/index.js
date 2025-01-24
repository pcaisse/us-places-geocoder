const places = require("../static/places.json");
const RadixTrie = require("./radixTrie.js");

DEFAULT_MAX_NUM_RESULTS = 12;

const sortByPlaceNameLength = ([a, _coordsA], [b, _coordsB]) =>
  a.length - b.length;

const placesTrie = new RadixTrie();
places.forEach(([placeName], index) => {
  placesTrie.insert(placeName, index);
});

function searchByPlaceName(
  placeName,
  maxNumResults = DEFAULT_MAX_NUM_RESULTS,
  sortFunc = sortByPlaceNameLength
) {
  return (placesTrie.search(placeName, maxNumResults) ?? [])
    .map((id) => places[id])
    .sort(sortFunc);
}

module.exports = { searchByPlaceName };

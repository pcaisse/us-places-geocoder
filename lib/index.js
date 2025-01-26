const places = require("../static/places.json");
const RadixTrie = require("./radixTrie.js");

DEFAULT_MAX_NUM_RESULTS = 12;

function placeNameToGeolevel(placeName) {
  return /(County|Municipio), [A-Z]{2}$/.test(placeName)
    ? "county"
    : /, [A-Z]{2}$/.test(placeName)
    ? "city"
    : "state";
}

function sortByPopulationRank(a, b) {
  return a.populationRank - b.populationRank;
}

const placesTrie = new RadixTrie();
places.forEach(([placeName], index) => {
  placesTrie.insert(placeName, index);
});

const defaultOptions = {
  maxNumResults: DEFAULT_MAX_NUM_RESULTS,
  sortFunc: sortByPopulationRank,
};

function searchByPlaceName(placeName, options = {}) {
  const opts = { ...defaultOptions, options };
  return (placesTrie.search(placeName) ?? [])
    .map((id) => {
      const [name, coordinates] = places[id];
      const geolevel = placeNameToGeolevel(name);
      // NOTE: ids are pre-sorted in the data by population!
      return { populationRank: id, name, coordinates, geolevel };
    })
    .sort(opts.sortFunc)
    .filter((_, index) => index < opts.maxNumResults);
}

module.exports = { searchByPlaceName };

import places from "../static/places.json" with { type: "json" };
import Trie from "./trie.js";

const placesTrie = new Trie();
places.forEach(([placeName], index) => placesTrie.insert(placeName, index));

function searchByPlaceName(placeName) {
  return placesTrie.search(placeName).map(id => places[id]);
}

export { searchByPlaceName };

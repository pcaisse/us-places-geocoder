import placesJSON from "../static/places.json";
import RadixTrie from "./radixTrie";

const places = placesJSON as [string, Coordinates][];

const DEFAULT_MAX_NUM_RESULTS = 10;

function placeNameToGeolevel(placeName: string): Geolevel {
  return /(County|Municipio), [A-Z]{2}$/.test(placeName)
    ? "county"
    : /, [A-Z]{2}$/.test(placeName)
    ? "city"
    : "state";
}

export type Coordinates = [number, number];
export type Geolevel = "city" | "county" | "state";

export interface SearchResult {
  readonly name: string;
  readonly coordinates: Coordinates;
  readonly populationRank: number;
  readonly geolevel: Geolevel;
}

type SortFunc = (a: SearchResult, b: SearchResult) => number;

function sortByPopulationRank(a: SearchResult, b: SearchResult): number {
  return a.populationRank - b.populationRank;
}

const placesTrie = new RadixTrie();
places.forEach(([placeName, _coords]: [string, Coordinates], index: number) => {
  placesTrie.insert(placeName, index);
});

export interface SearchOptions {
  readonly maxNumResults: number;
  readonly sortFunc: SortFunc;
}

const defaultOptions: SearchOptions = {
  maxNumResults: DEFAULT_MAX_NUM_RESULTS,
  sortFunc: sortByPopulationRank,
};

export function searchByPlaceName(
  placeName: string,
  options: Partial<SearchOptions> = {}
) {
  const opts = { ...defaultOptions, ...options };
  return (placesTrie.search(placeName) ?? [])
    .map((id: number) => {
      const [name, coordinates] = places[id];
      const geolevel = placeNameToGeolevel(name);
      // NOTE: ids are pre-sorted in the data by population!
      return { populationRank: id, name, coordinates, geolevel };
    })
    .sort(opts.sortFunc)
    .filter((_: SearchResult, index: number) => index < opts.maxNumResults);
}

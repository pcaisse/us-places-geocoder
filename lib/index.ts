import placesJSON from "../static/places.json";
import RadixTrie from "./radixTrie";

import {
  AlphaFIPSCode,
  alphaFIPSCodes,
  alphaFIPSCodeToAreaName,
} from "./constants";

function parsePlacesJSON(
  placesJSON: (string | number)[]
): [string, Coordinates][] {
  let ret = [];
  for (let i = 0; i < placesJSON.length; i += 3) {
    const name = placesJSON[i];
    if (typeof name !== "string") {
      throw new Error(`Invalid name: ${name}`);
    }
    const lat = placesJSON[i + 1];
    if (typeof lat !== "number") {
      throw new Error(`Invalid lat: ${lat}`);
    }
    const lng = placesJSON[i + 2];
    if (typeof lng !== "number") {
      throw new Error(`Invalid lng: ${lng}`);
    }
    const place: [string, Coordinates] = [name, [lat, lng]];
    ret.push(place);
  }
  return ret;
}

const places = parsePlacesJSON(placesJSON);

const DEFAULT_MAX_NUM_RESULTS = 10;

function placeNameToGeolevel(placeName: string): Geolevel {
  return /(County|Municipio), [A-Z]{2}$/.test(placeName)
    ? "county"
    : /, [A-Z]{2}$/.test(placeName)
    ? "city"
    : "state";
}

function placeNameIsInArea(placeName: string, alphaFIPSCode: AlphaFIPSCode) {
  return (
    // eg. "Pennsylvania" matches PA
    alphaFIPSCodeToAreaName[alphaFIPSCode] === placeName ||
    // eg. "Philadelphia, PA" matches PA
    placeName.endsWith(", " + alphaFIPSCode)
  );
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
  readonly excludedAreas: AlphaFIPSCode[];
}

const defaultOptions: SearchOptions = {
  maxNumResults: DEFAULT_MAX_NUM_RESULTS,
  sortFunc: sortByPopulationRank,
  excludedAreas: [],
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
    .filter(({ name }) =>
      opts.excludedAreas.every(
        (excludedAreaAlphaFIPSCode) =>
          !placeNameIsInArea(name, excludedAreaAlphaFIPSCode)
      )
    )
    .sort(opts.sortFunc)
    .filter((_: SearchResult, index: number) => index < opts.maxNumResults);
}

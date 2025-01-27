const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const { searchByPlaceName } = require("../lib/index.js");

describe("Geocoder", () => {
  it("returns all matching results", () => {
    const results = searchByPlaceName("Philadelphia");
    // console.debug("results", results);
    assert.equal(results.length, 7);
  });
  it("works for partial prefix matching", () => {
    assert.deepEqual(
      searchByPlaceName("Philadelphia"),
      searchByPlaceName("Philadelphi")
    );
  });
  it("search is case insensitive", () => {
    assert.deepEqual(
      searchByPlaceName("Philadelphia"),
      searchByPlaceName("philaDELphia")
    );
  });
  it("results are sorted by population", () => {
    const results = searchByPlaceName("Philadelphia");
    // console.debug("results", results);
    assert.equal(results[0].name, "Philadelphia, PA");
  });
  it("returns no results for string that does not match", () => {
    const results = searchByPlaceName("s;ldkfj");
    assert.equal(results.length, 0);
  });
  it("cities have correct geolevel", () => {
    const results = searchByPlaceName("philadelphia, pa");
    assert.equal(results[0].geolevel, "city");
  });
  it("counties have correct geolevel", () => {
    const results = searchByPlaceName("philadelphia county");
    assert.equal(results[0].geolevel, "county");
  });
  it("states have correct geolevel", () => {
    const results = searchByPlaceName("pennsylvania");
    assert.equal(results[0].geolevel, "state");
  });
  it("Puerto Rican municipios have the correct geolevel", () => {
    const results = searchByPlaceName("san juan municipio");
    // console.debug("results", results);
    assert.equal(results[0].geolevel, "county");
  });
});

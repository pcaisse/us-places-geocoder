const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const { searchByPlaceName } = require("../lib/index.js");

describe("Geocoder", () => {
  it("returns all matching results", () => {
    const results = searchByPlaceName("Philadelphia");
    console.debug("results", results);
    assert.equal(results.length, 7);
  });
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { searchByPlaceName } from "../lib/index.js";

describe("Geocoder", () => {
  it("returns all matching results", () => {
    const results = searchByPlaceName("Philadelphia");
    assert.equal(results.length, 7);
  });
});

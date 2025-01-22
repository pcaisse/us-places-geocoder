const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const RadixTrie = require("../lib/radixTrie.js");
const { countNumberOfNodesWithId } = require("../lib/utils.js");

describe("RadixTrie", () => {
  it("inserts single node", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("compute", 0);
    // console.debug(JSON.stringify(radixTrie));
    assert.equal(countNumberOfNodesWithId(radixTrie), 1);
    assert.deepEqual(radixTrie.search("compute"), [0]);
  });
  it("inserts 'compute' and then 'computer'", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("compute", 0);
    radixTrie.insert("computer", 1);
    // console.debug(JSON.stringify(radixTrie));
    assert.equal(countNumberOfNodesWithId(radixTrie), 2);
    assert.deepEqual(new Set(radixTrie.search("compute")), new Set([0, 1]));
  });
  it("inserts 'compute', 'computer', and 'computing'", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("compute", 0);
    radixTrie.insert("computer", 1);
    radixTrie.insert("computing", 2);
    assert.equal(countNumberOfNodesWithId(radixTrie), 3);
    // console.debug(JSON.stringify(radixTrie));
    assert.deepEqual(new Set(radixTrie.search("comput")), new Set([0, 1, 2]));
  });
  it("inserts 'computing' and then 'computer'", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("computing", 0);
    radixTrie.insert("computer", 1);
    assert.equal(countNumberOfNodesWithId(radixTrie), 2);
    // console.debug(JSON.stringify(radixTrie, null, 2));
    assert.deepEqual(new Set(radixTrie.search("comput")), new Set([1, 0]));
  });
  it("matches partial prefixes", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("abcdef", 0);
    radixTrie.insert("abcd", 1);
    radixTrie.insert("abc", 2);
    assert.equal(countNumberOfNodesWithId(radixTrie), 3);
    // console.debug(JSON.stringify(radixTrie, null, 2));
    assert.deepEqual(new Set(radixTrie.search("abcde")), new Set([0]));
  });
  it("matches partial prefixes regardless of order", () => {
    const radixTrie = new RadixTrie();
    radixTrie.insert("abcd", 0);
    radixTrie.insert("abcde", 1);
    // console.debug(JSON.stringify(radixTrie, null, 2));
    assert.equal(countNumberOfNodesWithId(radixTrie), 2);
    assert.deepEqual(new Set(radixTrie.search("abc")), new Set([0, 1]));
  });
});

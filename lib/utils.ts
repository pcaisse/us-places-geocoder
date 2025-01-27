import RadixTrie from "./radixTrie";

export function countNumberOfNodesWithId(trie: RadixTrie) {
  const nodes = [trie.root];
  let count = 0;

  while (nodes.length > 0) {
    const node = nodes.pop();
    if (node) {
      if (node.id !== null) {
        count++;
      }
      for (const char in node.children) {
        nodes.push(node.children[char]);
      }
    }
  }

  return count;
}

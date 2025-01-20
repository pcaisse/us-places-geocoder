class Node {
  constructor() {
    this.children = {};
    this.id = null;
  }
}

// TODO: Convert to radix tree to be more memory efficient
class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word, id) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!(char in node.children)) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }

    node.id = id;
  }

  search(word) {
    const ids = [];
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }

    const nodes = [node];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node.id !== null) {
        ids.push(node.id);
      }
      for (const char in node.children) {
        nodes.push(node.children[char]);
      }
    }

    return ids;
  }
}

export default Trie;

class Node {
  constructor() {
    this.children = {};
    this.id = null;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(str, id) {
    let node = this.root;

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (!(char in node.children)) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }

    node.id = id;
  }

  search(prefix) {
    const ids = [];
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if (!(char in node.children)) {
        return null;
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

module.exports = Trie;

class Node {
  constructor(prefix) {
    this.prefix = prefix;
    this.children = {};
    this.id = null;
  }
}

class RadixTrie {
  constructor() {
    this.root = new Node();
  }

  commonPrefixLength(a, b) {
    let len = 0;
    while (len < a.length && len < b.length && a[len] === b[len]) {
      len++;
    }
    return len;
  }

  insert(str, id) {
    let node = this.root;
    let i = 0;

    while (i < str.length) {
      const key = str[i];
      const childExists = key in node.children;
      if (!childExists) {
        // Add new string and short-circuit
        const newNode = new Node(str.slice(i));
        newNode.id = id;
        node.children[key] = newNode;
        break;
      }

      node = node.children[key];
      const prefixLen = this.commonPrefixLength(str.slice(i), node.prefix);

      i += prefixLen;

      if (prefixLen < node.prefix.length) {
        // Split existing node due to common prefix
        const newChild = new Node(node.prefix.slice(prefixLen));
        newChild.children = node.children;
        newChild.id = node.id;
        node.prefix = node.prefix.slice(0, prefixLen);
        node.children = { [newChild.prefix[0]]: newChild };
        node.id = i === str.length ? id : null;
      }
    }
  }

  search(str) {
    const ids = [];
    let node = this.root;
    let i = 0;

    while (i < str.length) {
      const key = str[i];
      const childExists = key in node.children;
      if (!childExists) {
        return null;
      }

      node = node.children[key];
      const prefixLen = this.commonPrefixLength(str.slice(i), node.prefix);

      if (prefixLen !== node.prefix.length) {
        break;
      }

      i += prefixLen;

      if (i === str.length) {
        break;
      }
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

module.exports = RadixTrie;

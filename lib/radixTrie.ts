class TrieNode {
  prefix: string;
  children: Record<string, TrieNode>;
  id: number | null;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.children = {};
    this.id = null;
  }
}

class RadixTrie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode("");
  }

  commonPrefixLength(a: string, b: string) {
    let len = 0;
    while (len < a.length && len < b.length && a[len] === b[len]) {
      len++;
    }
    return len;
  }

  insert(str: string, id: number) {
    const strLower = str.toLowerCase();
    let node = this.root;
    let i = 0;

    while (i < strLower.length) {
      const key = strLower[i];
      const childExists = key in node.children;
      if (!childExists) {
        // Add new string and short-circuit
        const newNode = new TrieNode(strLower.slice(i));
        newNode.id = id;
        node.children[key] = newNode;
        break;
      }

      node = node.children[key];
      const prefixLen = this.commonPrefixLength(
        strLower.slice(i),
        node.prefix.toLowerCase()
      );

      i += prefixLen;

      if (prefixLen < node.prefix.length) {
        // Split existing node due to common prefix
        const newChild = new TrieNode(node.prefix.slice(prefixLen));
        newChild.children = node.children;
        newChild.id = node.id;
        node.prefix = node.prefix.slice(0, prefixLen);
        node.children = { [newChild.prefix[0]]: newChild };
        node.id = i === strLower.length ? id : null;
      }
    }
  }

  search(str: string) {
    const ids = [];

    let strLower = str.toLowerCase();
    let node = this.root;
    let i = 0;

    while (i < strLower.length) {
      const key = strLower[i];
      const childExists = key in node.children;
      if (!childExists) {
        return null;
      }

      node = node.children[key];
      const prefixLen = this.commonPrefixLength(
        strLower.slice(i),
        node.prefix.toLowerCase()
      );

      if (prefixLen !== node.prefix.length) {
        break;
      }

      i += prefixLen;

      if (i === strLower.length) {
        break;
      }
    }

    const nodes = [node];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node) {
        if (node.id !== null) {
          ids.push(node.id);
        }
        for (const char in node.children) {
          nodes.push(node.children[char]);
        }
      }
    }

    return ids;
  }
}

export default RadixTrie;

// Depth of the tree
const depth = 4;

// The separator used to ident
// nodes at different levels of tree
const separator = "    ";


// Implementation
class Triangle {
  constructor(d, value, left, right) {
    if (typeof value !== "number") {
      throw new Error("Expected number");
    }
    this.depth = d;
    this.value = value;

    if (left instanceof Triangle) {
      this.left = left;
    }

    if (right instanceof Triangle) {
      this.right = right;
    }
  }

  static makeTriangles(h = 1) {
    if (h < 1) {
      throw new Error("Expected h > 1");
    }
  
    const nAtDepth = (d) => 2 ** d;
    const rangeAtDepth = (d) => {
      const count = nAtDepth(d);
      return [count, 2 * count - 1];
    }
  
    const count = nAtDepth(h - 1);
    if (count === 1) {
      const [ min ] = rangeAtDepth(h - 1);
      return new Triangle(min);
    } else {
      const trgls = [];
      for (let d = h - 1; d >= 0; d--) {
        const [ min, max ] = rangeAtDepth(d);
  
        if (d < h - 1) {
          for (let i = min; i <= max; i++) {
            trgls.push(new Triangle(d, i, trgls.shift(), trgls.shift()));
          }
        } else {
          for (let i = min; i <= max; i++) {
            trgls.push(new Triangle(d, i));
          }
        }
      }
  
      return trgls[0];
    }
  }

  toString(sep = "\t") {
    let rightstr;
    let thisstr = sep.repeat(this.depth) + this.value.toString();
    let leftstr;

    if (this.right) {
      rightstr = this.right.toString(sep);
    }

    if (this.left) {
      leftstr = this.left.toString(sep);
    }

    return [rightstr, thisstr, leftstr].filter(str => str).join("\n");
  }
}

try {
  console.log(Triangle.makeTriangles(depth).toString(separator));
} catch (e) {
  console.error("Error occurred: " + e.toString());
}

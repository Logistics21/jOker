const DOMNodeCollection = require('./dom_node_collection.js');

window.$O = arg => {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Array) {
    return new DOMNodeCollection(arg);
  } else {
    const selectors = document.querySelectorAll(arg);
    const nodeList = Array.from(selectors);
    return new DOMNodeCollection(nodeList);
  }
}

const nodes = document.querySelectorAll(arg);
const nodeList = Array.from(nodes);
return new DOMNodeCollection(nodeList);

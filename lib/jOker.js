const DOMNodeCollection = require('./dom_node_collection.js');

const _DOMLoadCallbacks = [];

window.$O = arg => {
  switch (typeof(arg)) {
    case 'function':
      return _isCallback(arg);
    case 'object':
      return _isObject(arg);
    case 'string':
      return _isSelector(arg);
    default:
      break;
  }
}

$O.myExtend = (...args) {
  const collection = {};

  args.forEach((arg) => {
    for (let key in arg) {
      collection[key] = arg[key];
    }
  });

  return collection;
}

$O.ajax = options => {
  const defaultSetting = {
    method:
    url:
    data:
    contentType:
    dataType:
    success: () => {}
    error: () => {}
  };

  options = $O.myExtend(defaultSetting, options);

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open
  })
}

// private helper functions

_isSelector = queryString => {
  const nodes = [];
  const nodeList = document.querySelectorAll(queryString);
  nodeList.forEach(node => nodes.push(node));
  return new DOMNodeCollection(nodes);
}

_isObject = object => {
  if (object instanceof HTMLElement) {
    return new DOMNodeCollection(nodes);
  }
}

_isCallback = callback => {
  if (document.readyState === 'complete') {
    callback();
  } else {
    _DOMLoadCallbacks.push(callback);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  _DOMLoadCallbacks.forEach(callback => callback());
});

//   if (arg instanceof HTMLElement) {
//     return new DOMNodeCollection([arg]);
//   } else if (arg instanceof Array) {
//     return new DOMNodeCollection(arg);
//   } else if (typeof(arg) === 'string') {
//     const nodes = document.querySelectorAll(arg);
//     const nodeList = Array.from(nodes);
//     return new DOMNodeCollection(nodeList);
//   }
// }

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
  }
}

$O.extend = (...args) => {
  const collection = {};

  args.forEach((arg) => {
    for (let key in arg) {
      collection[key] = arg[key];
    }
  });

  return collection;
};


$O.ajax = options => {
  const defaultSetting = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'jsonp',
    success: () => {},
    error: () => {}
  };

  options = $O.extend(defaultSetting, options);

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open(options.method, options.url, true);
    req.setRequestHeader('Content-Type', options.contentType);
    req.onload = function () {
      if (req.status === 200) {
        if (options.dataType === 'jsonp') {
          resolve(JSON.parse(req.response));
        } else {
          resolve(req.response);
        }
      } else {
        reject(req.response);
      }
    }

    req.onerror = () => reject(req.response);
    req.send(JSON.stringify(options.data));
  });
};

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

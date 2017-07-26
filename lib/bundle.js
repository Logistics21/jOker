/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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

$O.myExtend = (...args) => {
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

  options = $O.myExtend(defaultSetting, options);

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open(options.method, options.url);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.HTMLElements = array;
  }

  addClass(newClass) {
    this.each(el => el.classList.add(newClass));
  }

  append(potpurri) {
    if (potpurri instanceof DOMNodeCollection) {
      potpurri.HTMLElements.forEach(el => this.append(el));
    } else if (potpurri instanceof HTMLElement) {
      this.each(el => el.appendChild(potpurri));
    } else {
      this.each(el => el.innerHTML += potpurri);
    }
  }

  attr(attributeName, value) {
    if (value) {
      this.each(el => el.setAttribute(attributeName, value));
    } else {
      return this.HTMLElements[0].getAttribute(attributeName);
    }
  }

  children() {
    let children = [];

    this.each(el => {
      children = children.concat(...el.children)
    });

    return new DOMNodeCollection(children);
  }

  each(callback) {
    this.HTMLElements.forEach(callback);
  }

  empty() {
    this.html("");
  }

  find(selector) {
    let foundNodes = [];

    this.each(el => {
      let elFoundNodes = Array.from(el.querySelectorAll(selector));

      elFoundNodes.forEach((node) => {
        if (!foundNodes.includes(node)) {
          foundNodes.push(node);
        }
      });
    });

    return new DOMNodeCollection(foundNodes);
  }

  html(string) {
    if (string !== undefined) {
      this.each(el => el.innerHTML = string);
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }


  removeClass(targetClass) {
    this.HTMLElements.forEach((el) => {
      if (el.classList.contains(targetClass)) {
        el.classList.remove(targetClass);
      }
    });
  }

  parent() {
    let parentsArray = [];
    this.HTMLElements.forEach(el => {
      let parentEl = el.parentElement;
      if (!parentsArray.includes(parentEl)) {
        parentsArray.push(el.parentElement);
      }
    });

    return new DOMNodeCollection(parentsArray);
  }


  remove(selector) {
    let targetNodes = this.find(selector);

    targetNodes.HTMLElements.forEach(el => {
      let targetParent = el.parentElement;
      targetParent.removeChild(el);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
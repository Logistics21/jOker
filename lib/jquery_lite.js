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

function $l(arg) {
  if (arg instanceof HTMLElement) {
    const argArray = [arg];
    return new DOMNodeCollection(argArray);
  } else if (arg instanceof Array) {
    return new DOMNodeCollection(arg);
  } else {
    const selector = arg;
    const selection = document.querySelectorAll(selector);
    const nodeList = Array.from(selection);
    return new DOMNodeCollection(nodeList);
  }
}


window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(HTMLelements) {
    this.HTMLelements = HTMLelements;
  }

  html(string) {
    if (string !== undefined) {
      this.HTMLelements.forEach(el => {
        el.innerHTML = string;
      });
    } else {
      return this.HTMLelements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(potpurri) {
    if (typeof potpurri === "string") {
      this.appendAttach(potpurri);
    } else if (potpurri instanceof HTMLElement) {
      this.appendAttach(potpurri.outerHTML);
    } else if (potpurri instanceof DOMNodeCollection) {
      potpurri.HTMLelements.forEach(newEl => {
        this.appendAttach(newEl.outerHTML);
      });
    }
  }

  appendAttach(content) {
    this.HTMLelements.forEach(el => {
      el.insertAdjacentHTML('beforeend', content);
    });
  }

  attr(attribute, value) {
    if (typeof attribute === "undefined") return undefined;
    if (typeof value === "undefined") {
      return this.HTMLelements[0].getAttribute(attribute);
    } else {
      this.HTMLelements.forEach(el => {
        if (el.hasAttribute(attribute)) {
          let appendedValue = el.getAttribute(attribute) + ` ${value}`;
          el.setAttribute(attribute, appendedValue);
        } else {
          el.setAttribute(attribute, value);
        }
      });
    }
  }

  addClass(newClass) {
    this.HTMLelements.forEach((el) => {
      if (!el.classList.contains(targetClass)) {
        el.classList.add(targetClass);
      }
    });
  }

  removeClass(targetClass) {
    this.HTMLelements.forEach((el) => {
      if (el.classList.contains(targetClass)) {
        el.classList.remove(targetClass);
      }
    });
  }

  children() {
    let childrenArray = [];

    this.HTMLelements.forEach(el => {
      let elChildren = Array.from(el.children);
      childrenArray = childrenArray.concat(elChildren);
    });

    return new DOMNodeCollection(childrenArray);
  }

  parent() {
    let parentsArray = [];
    this.HTMLelements.forEach(el => {
      let parentEl = el.parentElement;
      if (!parentsArray.includes(parentEl)) {
        parentsArray.push(el.parentElement);
      }
    });

    return new DOMNodeCollection(parentsArray);
  }

  find(selector) {
    let foundNodes = [];

    this.HTMLelements.forEach(el => {
      let elFoundNodes = Array.from(el.querySelectorAll(selector));

      elFoundNodes.forEach((node) => {
        if (!foundNodes.includes(node)) {
          foundNodes.push(node);
        }
      });
    });

    return new DOMNodeCollection(foundNodes);
  }

  remove(selector) {
    let targetNodes = this.find(selector);

    targetNodes.HTMLelements.forEach(el => {
      let targetParent = el.parentElement;
      targetParent.removeChild(el);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
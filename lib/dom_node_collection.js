class DOMNodeCollection {
  constructor(array) {
    this.HTMLElements = array;
  }

  html(string) {
    if (string !== undefined) {
      this.HTMLElements.forEach(el => el.innerHTML = string);
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(potpurri) {
    if (potpurri instanceof HTMLElement) {
      this.HTMLElements.forEach(el => el.appendChild(potpurri));
    } else if (potpurri instanceof DOMNodeCollection) {
      potpurri.HTMLElements.forEach(el => this.append(el));
    } else {
      this.HTMLElements.forEach(el => el.innerHTML += potpurri);
    }
  }

  // append(potpurri) {
  //   if (typeof potpurri === "string") {
  //     this.appendAttach(potpurri);
  //   } else if (potpurri instanceof HTMLElement) {
  //     this.appendAttach(potpurri.outerHTML);
  //   } else if (potpurri instanceof DOMNodeCollection) {
  //     potpurri.HTMLElements.forEach(newEl => {
  //       this.appendAttach(newEl.outerHTML);
  //     });
  //   }
  // }
  //
  // appendAttach(content) {
  //   this.HTMLElements.forEach(el => {
  //     el.insertAdjacentHTML('beforeend', content);
  //   });
  // }

  attr(attribute, value) {
    if (typeof attribute === "undefined") return undefined;
    if (typeof value === "undefined") {
      return this.HTMLElements[0].getAttribute(attribute);
    } else {
      this.HTMLElements.forEach(el => {
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
    this.HTMLElements.forEach((el) => {
      if (!el.classList.contains(targetClass)) {
        el.classList.add(targetClass);
      }
    });
  }

  removeClass(targetClass) {
    this.HTMLElements.forEach((el) => {
      if (el.classList.contains(targetClass)) {
        el.classList.remove(targetClass);
      }
    });
  }

  children() {
    let childrenArray = [];

    this.HTMLElements.forEach(el => {
      let elChildren = Array.from(el.children);
      childrenArray = childrenArray.concat(elChildren);
    });

    return new DOMNodeCollection(childrenArray);
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

  find(selector) {
    let foundNodes = [];

    this.HTMLElements.forEach(el => {
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

    targetNodes.HTMLElements.forEach(el => {
      let targetParent = el.parentElement;
      targetParent.removeChild(el);
    });
  }
}

module.exports = DOMNodeCollection;

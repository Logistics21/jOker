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

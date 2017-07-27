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
    let found = [];

    this.each(el => {
      let selected = el.querySelectorAll(selector);

      selected.forEach((node => found.push(node)));
    });

    return new DOMNodeCollection(found);
  }

  html(string) {
    if (string !== undefined) {
      this.each(el => el.innerHTML = string);
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  off(eventType) {
    this.each(el => {
      const eventKey = `Event-${eventType}`;
      if (el[eventKey]) {
        el[eventKey].forEach(callback => {
          el.removeEventListener(eventType, callback);
        });
      }

      el[eventKey] = [];
    });
  }

  // stores eventType in object to be removed later by off
  on(eventType, callback) {
    this.each(el => {
      el.addEventListener(eventType, callback);
      const eventKey = `Event-${eventType}`;
      if (typeof el[eventKey] === 'undefined') el[eventKey] = [];
      el[eventKey].push(callback);
    });
  }


  parent() {
    let parents = [];
    this.each(el => {
      let parentEl = el.parentElement;
      if (!parents.includes(parentEl)) parents.push(el.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  remove() {
    this.each(el => el.parentNode.removeChild(el));
  }

  removeClass(className) {
    this.each(el => el.classList.remove(className));
  }

  toggleClass(className) {
    this.each(el => el.classList.toggle(className));
  }

  value(value) {
    if (typeof value === 'string') {
      this.each(el => el.value = value);
    } else {
      return this.HTMLElements[0].value;
    }
  }
}

module.exports = DOMNodeCollection;

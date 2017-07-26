# jOker #

Some programmers call it the space cowboy, some call it the library of love, some programmers call it ...Maurice.

jOker is a minimalist JavaScript library designed for DOM manipulation, AJAX requests (with Promise return), and event handling across various browsers using native DOM API.

## Setup ##

All essential files are located in a lib.zip file. Unzip this file and run the command `webpack --watch lib/jOker.js lib/bundle.js`. Afterwards, add the created webpack output file in a script tag `bundle.js` to your source code (i.e index.html).

## API ##

`$O()` is jOker's global variable wrapping all DOM nodes, HTML elements, and Callback functions in it's library. It comes equip with a number of intuitively named, easy to use methods. It accepts three primary parameters:

1. CSS Selectors
2. HTMLElements
3. Callbacks

### CSS Selectors

When passed a CSS Selector string i.e `('li')` the `$O()` variable

### DOM Manipulation ###

* `html()` takes an optional string argument to set the `innerHTML` of selected elements, or returns the `innerHTML` of the first member of the selected collection if no argument is provided.

* `empty()` clears the `innerHTML` of all selected elements.

* `append(element)` flexibly appends an `HTMLElement`, `DOMNodeCollection`, or string to every selected element.

* `addClass(className)` adds a class to all selected elements.

* `removeClass(className)` removes the specified class from each selected element.

* `attr(name)` takes an optional string argument to set the value of the specified attribute for each selected element, or returns the value of the attribute for the first member of the collection if no value is provided.

### DOM Traversal ###

* `children()` returns a `DOMNodeCollection` containing all children of every selected element.

* `parent()` returns a `DOMNodeCollection` containing the parent nodes of every selected element.

* `find(selector)` returns all descendants of selected elements matching the CSS selector argument.

* `remove()` removes all selected elements from the DOM.

### Event Handling ###

* `on(eventType, callback)` sets an event listener for the specified event type on all selected elements.

* `off(eventType)` removes all event listeners for the given event type from selected elements.

## AJAX Requests ##

jOker also provides a flexible and intuitive interface for asynchronous HTTP requests.  

* `$s.ajax({options})` constructs and sends an `XMLHttpRequest` using the provided options object, a `Promise` is returned allowing for subsequent function calls to be chained based on `success` or failure (`error`).

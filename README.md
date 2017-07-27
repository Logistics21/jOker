# jOker #

Some programmers call it the space cowboy, some call it the library of love, some programmers call it ... Maurice.

jOker is a minimalist JavaScript library designed for DOM manipulation, AJAX requests (with Promise return), and event handling across various browsers using native DOM API.

## Setup ##

All essential files are located in the lib folder. If you have webpack globally installed then run the command `webpack --watch lib/jOker.js lib/bundle.js`. Afterwards, add a script tag containing the created webpack output file (`bundle.js`) to your source code (i.e index.html).

## API ##

`$O()` is jOker's global variable wrapping all DOM nodes, HTMLElements, and Callback functions in it's library. It comes equip with a number of intuitively named, easy to use methods. It accepts three primary parameters:

1. CSS Selectors
2. HTMLElements
3. Callbacks

### CSS Selectors

When passed a CSS Selector string i.e `('li')` the `$O()` variable selects one or more of those, `HTMLElements` from the DOM.

### DOM Manipulation ###

* `addClass(className)` takes a string and adds it as a CSS class to all selected elements, ignoring duplicates.

* `append(element)` takes an instance of a `DOMNodeCollection`, `HTMLElement`, or string as an argument.

  * When given a `DOMNodeCollection`, it iterates over each element in the `DOMNodeCollection`, appending the element to each `HTMLElement` in the `DOMNodeCollection` `append()` was originally called on.

  * When given an `HTMLElement`, it appends the element to each `HTMLElement` in the `DOMNodeCollection`.

  * When given a string, it appends the string the the `innerHTML` of each `HTMLElement` in the `DOMNodeCollection`.

* `attr(attributeName, value)` takes one string argument, and a second optional argument.

  * If given only the attributeName, it returns the value of the specified attribute for the first element in the `DOMNodeCollection`.

  * If also given a value, it sets the value of the attribute for each member of the collection. If the elements do not currently have an attributeName it will also set one using the provided attributeName.

* `empty()` clears the `innerHTML` of all elements.

* `html()` takes an optional string argument to set the `innerHTML` of all selected elements, or returns the `innerHTML` of the first member of the selected `DOMNodeCollection` if no argument is provided.

* `removeClass(className)` removes the specified class from each selected element.

* `value()` takes an optional string and sets it as the value of all `HTMLElements` in the `DOMNodeCollection`. If no argument is given, it returns the value of the first `HTMLElement` in the `DOMNodeCollection`.


### DOM Traversal ###

* `children()` returns a `DOMNodeCollection` containing all children of every selected element.

* `parent()` returns a `DOMNodeCollection` containing the parent nodes of every selected element.

* `find(selector)` returns all descendants of selected elements that match the CSS selector argument.

* `remove()` removes all selected elements from the DOM.

### Event Handling ###

* `on(eventType, callback)` sets an event listener, in the form of a callback function, for the specified `eventType` on all the selected elements, and stores the `eventType` for later removal.

* `off(eventType)` removes all event listeners for the given `eventType` from the selected elements.

## AJAX Requests ##

jOker also provides a flexible and intuitive interface for asynchronous HTTP requests.  

* `$O.ajax({options})` builds and sends an `XMLHttpRequest` using a default options object, a `Promise` is returned allowing for subsequent function calls to be chained based on `success` or failure (`error`). The `Promise` by default sets the `dataType` to `jsonp` to bypass cross-domain restrictions. However, the API receiving the request must support cross origin resources sharing (CORS) and/or `jsonp` or the request will fail.

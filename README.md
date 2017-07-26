# jOker #

Some programmers call it the space cowboy, some call it the library of love, some programmers call it ... Maurice.

jOker is a minimalist JavaScript library designed for DOM manipulation, AJAX requests (with Promise return), and event handling across various browsers using native DOM API.

## Setup ##

All essential files are located in the lib folder. If you have webpack globally installed then run the command `webpack --watch lib/jOker.js lib/bundle.js`. Afterwards, add the created webpack output file `bundle.js` in a script tag to your source code (i.e index.html).

## API ##

`$O()` is jOker's global variable wrapping all DOM nodes, HTMLElements, and Callback functions in it's library. It comes equip with a number of intuitively named, easy to use methods. It accepts three primary parameters:

1. CSS Selectors
2. HTMLElements
3. Callbacks

### CSS Selectors

When passed a CSS Selector string i.e `('li')` the `$O()` variable can select one or more, already present, `HTMLElements` from the DOM.

### DOM Manipulation ###

* `addClass(className)` takes a string and adds it as a CSS class to all selected elements, ignoring duplicates.

* `append(element)` takes an instance of a `DOMNodeCollection`, `HTMLElement`, or string as an argument. When given a DOMNodeCollection iterates over the DOMNodeCollection, appending the new element to each HTMLElement in the original DOMNodeCollection.

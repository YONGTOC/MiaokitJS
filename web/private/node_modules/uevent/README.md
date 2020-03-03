# uEvent

[![Bower version](https://img.shields.io/bower/v/uevent.svg?style=flat-square)](https://github.com/mistic100/uEvent)
[![NPM version](https://img.shields.io/npm/v/uevent.svg?style=flat-square)](https://www.npmjs.com/package/uevent)
[![Build Status](https://travis-ci.org/mistic100/uEvent.svg?branch=master)](https://travis-ci.org/mistic100/uEvent)

_uEvent_ is a event emitter library which provides the [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) to javascript objects.
It works on node.js and browser and also supports RequireJS (AMD).

It is a fork of [jeromeetienne/microevents.js](https://github.com/jeromeetienne/microevent.js) with the changes of few other forks and custom changes.

### Changes from original

* AMD support
* renamed `bind`/`unbind` into `on`/`off`
* `on` and `off` can be called with a space separated list of events like jQuery
* `on` and `off` can be called with a hashmap like jQuery
* add `once` method [alinz](https://github.com/alinz/microevent.js/commit/a8293fe9571ea4e609d51ec906d627e64dfb8eba)
* add `change` method
* allow to rename methods in the mixin
* make `on`, `off` and `once` methods chainable [feross](https://github.com/PeerCDN/microevent.js/commit/617c9a26ed861b812c61eb836b22c0f313292a20)
* fix error in `off` [#27](https://github.com/jeromeetienne/microevent.js/pull/27)
* fix callback skips when `off` is called from another callback [#10](https://github.com/jeromeetienne/microevent.js/issues/10)
* integrate **prevent default** and **stop propagation** patterns
* listeners can be objects with an [handleEvent](https://developer.mozilla.org/en/docs/Web/API/EventListener#handleEvent()) method

## How to Use It

You need a single file [uevent.js](https://github.com/mistic100/uEvent/blob/master/uevent.min.js).
Include it in a webpage via the usual script tag.

```html
<script src="uevent.min.js"></script>
```

To include it in a nodejs code isn't much harder

```js
var uEvent = require('uevent')
```

Now suppose you got a class `Foobar`, and you wish it to support the observer pattern:

```js
uEvent.mixin(Foobar)
```

If needed you can rename the name of some or all methods:

```js
uEvent.mixin(Foobar, {
  'trigger': 'emit',
  'change': 'modify'
})
```

After applying the mixin the following methods are added to your class (all methods are chainable):

### on

Add one or many event handlers.

```js
// bind 'callback' to 'event'
obj.on('event', callback);

// bind 'callback' to 'event1' and 'event2'
obj.on('event1 event2', callback)

// bind 'callback1' to 'event1' and 'callback2' to 'event2'
obj.on({
  event1: callback1,
  event2: callback2
})
```

### off

Remove one or many or all event handlers.

```js
// remove all callbacks for 'event'
obj.off('event')

// remove 'callback' if attached to 'event'
obj.off('event', callback)

// remove all callbacks for 'event1' and 'event2'
obj.off('event1 event2')

// remove 'callback1' if attached to 'event1' and 'callback2' if attached to 'event2'
obj.off({
  event1: callback1,
  event2: callback2
})

// remove all callbacks
obj.off()
```

### once

Same as `on` but the callbacks will be removed after the first invocation.

The callbacks attached once are **only** called by `trigger` and **not** by `change`.

### trigger

Trigger all handlers for an event. Accept optional arguments transmitted to the callbacks.

```js
// trigger 'event'
obj.trigger('event')

// trigger 'event' with arguments
obj.trigger('event', true, 42)
```

### change

Works like `trigger` but returns a value. This is used to filter a value before display for example. All callbacks **must** accept at least on input value and return the modified (or not) value.

```js
// call 'event' filters with 'Hello world' input
var newVal = obj.change('event', 'Hello world')

// call 'event' filters with 'Hello world' input and other arguments
var newVal = obj.change('event', 'Hello world', true, 42)
```

## Advanced

uEvent integrates two concepts from jQuery : prevent default and stop propagation. This is done via an additional argument transmitted to each `trigger` and/or `change` callback.

### Prevent default

Call `preventDefault()` on this additional object to "mark" the event. After calling `trigger` you get a reference to the Event object and test `isDefaultPrevented()`.

```js
obj.on('event', function(id, e) {
  if (id == 0) {
    e.preventDefault();
  }
});

var e = obj.trigger('event', id);

if (!e.isDefaultPrevented()) {
  // ...
}
```

### Stop propagation

Call `stopPropagation()` on the Event object to prevent any further callbacks to be called. Works for `trigger` and `change`.

```js
obj.on('event', function(val, e) {
  e.stopPropagation();
  return val;
});

obj.on('event', function(val, e) {
  return 'azerty';
});

var newVal = obj.change('event', '1234');
// newVal is still '1234'
```

### Event listener

When using `on`, `off` and `once` you can provide an object instead of the callback. The `handleEvent` method of this object will be called with the event object as first argument.

```js
var listener = {
    handleEvent: function(e) {
        // e.type : name of the event
        // e.args : array of 'trigger' arguments
    }
};

obj.on('event', listener)
```

## Example

First we define the class which gonna use uEvent. This is a ticker, it is triggering 'tick' event every second, and add the current date as parameter

```js
var Ticker = function() {
    var self = this;
    var i = 0;

    setInterval(function() {
        self.trigger('tick', new Date());
        i = self.change('index', i);
    }, 1000);
};
```

We mixin _uEvent_ into _Ticker_ and we are all set.

```
uEvent.mixin(Ticker);
```

Now lets actually use the _Ticker_ class. First, create the object.

```js
var ticker = new Ticker();
```

and bind our _tick_ event with its data parameter

```js
ticker.on('tick', function(date) {
    console.log('notified date', date);
});

ticker.on('hello', function(index) {
    console.log('index', index);
    return index + 1;
});
```

And you will see this output:

```
notified date Tue, 22 Mar 2011 14:43:41 GMT
index 0
notified date Tue, 22 Mar 2011 14:43:42 GMT
index 1
...
```

/*!
 * uEvent - to make any js object an event emitter
 * Copyright 2011 Jerome Etienne (http://jetienne.com)
 * Copyright 2015-2016 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    }
    else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        root.uEvent = factory();
    }
}(this, function() {
    "use strict";

    var returnTrue = function() {
        return true;
    };
    var returnFalse = function() {
        return false;
    };

    var uEvent = function() {
    };

    /**
     * Event object used to stop propagations and prevent default
     */
    uEvent.Event = function(type, args) {
        var typeReadOnly = type;
        var argsReadonly = args;

        Object.defineProperties(this, {
            'type': {
                get: function() {
                    return typeReadOnly;
                },
                set: function(value) {
                },
                enumerable: true
            },
            'args': {
                get: function() {
                    return argsReadonly;
                },
                set: function(value) {
                },
                enumerable: true
            }
        });
    };

    uEvent.Event.prototype = {
        constructor: uEvent.Event,

        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,

        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
        }
    };

    uEvent.prototype = {
        constructor: uEvent,

        /**
         * Add one or many event handlers
         *
         *  obj.on('event', callback)
         *  obj.on('event', listener) -- listener has an handleEvent method
         *  obj.on('event1 event2', callback)
         *  obj.on({ event1: callback1, event2: callback2 })
         *
         * @param {String,Object} events
         * @param {Function,optional} callback
         * @return {Object} main object
         */
        on: function(events, callback) {
            this.__events = this.__events || {};

            if (typeof events === 'object') {
                for (var event in events) {
                    if (events.hasOwnProperty(event)) {
                        this.__events[event] = this.__events[event] || [];
                        this.__events[event].push(events[event]);
                    }
                }
            }
            else {
                events.split(' ').forEach(function(event) {
                    this.__events[event] = this.__events[event] || [];
                    this.__events[event].push(callback);
                }, this);
            }

            return this;
        },

        /**
         * Remove one or many or all event handlers
         *
         *  obj.off('event')
         *  obj.off('event', callback)
         *  obj.off('event1 event2')
         *  obj.off({ event1: callback1, event2: callback2 })
         *  obj.off()
         *
         * @param {String|Object,optional} events
         * @param {Function,optional} callback
         * @return {Object} main object
         */
        off: function(events, callback) {
            this.__events = this.__events || {};

            if (typeof events === 'object') {
                for (var event in events) {
                    if (events.hasOwnProperty(event) && (event in this.__events)) {
                        var index = this.__events[event].indexOf(events[event]);
                        if (index !== -1) this.__events[event].splice(index, 1);
                    }
                }
            }
            else if (!!events) {
                events.split(' ').forEach(function(event) {
                    if (event in this.__events) {
                        if (callback) {
                            var index = this.__events[event].indexOf(callback);
                            if (index !== -1) this.__events[event].splice(index, 1);
                        }
                        else {
                            this.__events[event].length = 0;
                        }
                    }
                }, this);
            }
            else {
                this.__events = {};
            }

            return this;
        },

        /**
         * Add one or many event handlers that will be called only once
         * This handlers are only applicable to "trigger", not "change"
         *
         *  obj.once('event', callback)
         *  obj.once('event1 event2', callback)
         *  obj.once({ event1: callback1, event2: callback2 })
         *
         * @param {String|Object} events
         * @param {Function,optional} callback
         * @return {Object} main object
         */
        once: function(events, callback) {
            this.__once = this.__once || {};

            if (typeof events === 'object') {
                for (var event in events) {
                    if (events.hasOwnProperty(event)) {
                        this.__once[event] = this.__once[event] || [];
                        this.__once[event].push(events[event]);
                    }
                }
            }
            else {
                events.split(' ').forEach(function(event) {
                    this.__once[event] = this.__once[event] || [];
                    this.__once[event].push(callback);
                }, this);
            }

            return this;
        },

        /**
         * Trigger all handlers for an event
         *
         * @param {String} event name
         * @param {mixed...,optional} arguments
         * @return {uEvent.Event}
         */
        trigger: function(event /* , args... */) {
            var args = Array.prototype.slice.call(arguments, 1);
            var e = new uEvent.Event(event, args);
            var i, l, f;

            args.push(e);

            if (this.__events && event in this.__events) {
                for (i = 0, l = this.__events[event].length; i < l; i++) {
                    f = this.__events[event][i];
                    if (typeof f === 'object') {
                        f.handleEvent(e);
                    }
                    else {
                        f.apply(this, args);
                    }
                    if (e.isPropagationStopped()) {
                        return e;
                    }
                }
            }

            if (this.__once && event in this.__once) {
                for (i = 0, l = this.__once[event].length; i < l; i++) {
                    f = this.__once[event][i];
                    if (typeof f === 'object') {
                        f.handleEvent(e);
                    }
                    else {
                        f.apply(this, args);
                    }
                    if (e.isPropagationStopped()) {
                        delete this.__once[event];
                        return e;
                    }
                }
                delete this.__once[event];
            }

            return e;
        },

        /**
         * Trigger all modificators for an event, each handler must return a value
         *
         * @param {String} event name
         * @param {mixed} event value
         * @param {mixed...,optional} arguments
         * @return {mixed} modified value
         */
        change: function(event, value /* , args... */) {
            var args = Array.prototype.slice.call(arguments, 1);
            var e = new uEvent.Event(event, args);
            var i, l, f;

            args.push(e);

            if (this.__events && event in this.__events) {
                for (i = 0, l = this.__events[event].length; i < l; i++) {
                    args[0] = value;
                    f = this.__events[event][i];
                    if (typeof f === 'object') {
                        value = f.handleEvent(e);
                    }
                    else {
                        value = f.apply(this, args);
                    }
                    if (e.isPropagationStopped()) {
                        return value;
                    }
                }
            }

            return value;
        }
    };

    /**
     * Copy all uEvent functions in the destination object
     *
     * @param {Object} target, the object which will support uEvent
     * @param {Object,optional} names, strings map to rename methods
     */
    uEvent.mixin = function(target, names) {
        names = names || {};
        target = typeof target === 'function' ? target.prototype : target;

        ['on', 'off', 'once', 'trigger', 'change'].forEach(function(name) {
            var method = names[name] || name;
            target[method] = uEvent.prototype[name];
        });

        Object.defineProperties(target, {
            '__events': {
                value: null,
                writable: true
            },
            '__once': {
                value: null,
                writable: true
            }
        });
    };

    return uEvent;
}));

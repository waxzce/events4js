/**
 * @module events4js
 */
var EventProducer = (function() {

    /**
	* Abstract class for managing events
	* @class EventProducer
	* @constructor
	**/
    EventProducer = function() {
        this.initialize();
    }
    var p = EventProducer.prototype;



    // constructor:
    /** 
	* @method initialize
	* @description Initialization method.
	* @protected
	**/
    p.initialize = function() {
        this.events = {};
        this.allevents = [];
        this.onces = {};
    };
    // public methods:
    /**
	* @description Add an event listener
	* @param eventName {string} the name of the event listened
	* @param callback {function} the function trigged
	* @method addEventListener
	**/
    p.addEventListener = function(eventName, callback) {
        if (this.events[eventName] == undefined) {
            this.events[eventName] = [callback];
        } else {
            this.events[eventName].push(callback);
        }
    };
    /**
	* @description Add an once listener
	* @param {string} eventName the name of the event listened
	* @param {function} callback the function trigged
	* @method addOnceListener
	**/
    p.addOnceListener = function(eventName, callback) {
        if (this.onces[eventName] == undefined) {
            this.onces[eventName] = [callback];
        } else {
            this.onces[eventName].push(callback);
        }
    };
    /**
	* @description Add all events listener
	* @param {function} callback the function trigged
	* @method addAllEventsListener
	**/
    p.addAllEventsListener = function(callback) {
        this.allevents.push(callback);
    };
    /**
	* @description Remove a listener 
	* @private
	* @param {string} eventName the name of the event listened
    * @param {function} callback the function trigged
	* @param {array} ar the array of function where we want to remove
	* @method _removeListener
	**/
    p._removeListener = function(eventName, callback, ar) {
        if (ar[eventName] != undefined) {
            for (var ee in ar[eventName]) {
                if (ar[eventName][ee] === callback) {
                    ar[eventName].splice(ee, 1);
                    break;
                };
            }
        }
    };
    /**
	* @description Remove an event listener
	* @param {string} eventName the name of the event listened
	* @param {function} callback the function trigged
	* @method removeEventListener
	**/
    p.removeEventListener = function(eventName, callback) {
        this._removeListener(eventName, callback, this.events);
    }
    /**
	* @description Remove an once listener
	* @param {string} eventName the name of the once listened
	* @param {function} callback the function trigged
	* @method removeOnceListener
	**/
    p.removeOnceListener = function(eventName, callback) {
        this._removeListener(eventName, callback, this.onces);
    }
    /**
	* @description Remove all event listeners
	* @param {string} eventName the name of the event listened
	* @method removeAllEventListeners
	**/
    p.removeAllEventListeners = function(eventName) {
        this.events[eventName] = [];
    };
    /**
	* @description Remove all once listeners
	* @param {string} eventName the name of the once listened
	* @method removeAllOnceListeners
	**/
    p.removeAllOnceListeners = function(eventName) {
        this.onces[eventName] = [];
    };
    /**
	* @description Remove all events listeners - for all events
	* @method removeAllEventsListeners
	**/
    p.removeAllEventsListeners = function() {
        this.events = {};
    };
    /**
	* @description Fire an Event
	* @param {string} eventName the name of the event fired
	* @param {object} params optional : information about the event, forward to listeners
	* @method fireEvent
	**/
    p.fireEvent = function(eventName, params) {
        if (this.onces[eventName] !== undefined) {
            for (var ee in this.onces[eventName]) {
                this.onces[eventName][ee](params);
                this.onces[eventName].splice(ee, 1);
            }
        }
        if (this.events[eventName] !== undefined) {
            for (var ee in this.events[eventName]) {
                this.events[eventName][ee](params);
            }
        }
        for (var ee in this.allevents) {
            this.allevents[ee](eventName, params);
        }
    };

    return EventProducer;

})();
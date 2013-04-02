enyo.media = {
	HTML5Events: [
		"abort",
		"canplay",
		"canplaythrough",
		"durationchange",
		"emptied",
		"ended",
		"error",
		"loadeddata",
		"loadedmetadata",
		"loadstart",
		"pause",
		"play",
		"playing",
		"progress",
		"ratechange",
		"seeked",
		"seeking",
		"stalled",
		"suspend",
		"timeupdate",
		"volumechange",
		"waiting"
	],
	// Finds the media engine from any contained component
	// For example, can get the media engine from an overlay control
	engine: function(c) {
		while(c) {
			if(c.isMedia) {
				return c.$.player;
			}
			c = c.parent;
		}
	}
};

/*
	Polyfill for current stable version of Enyo, as the below functions are currently
	only in the nightly build.
*/

if(!enyo.dispatcher.stopListening) {
	enyo.dispatcher.stopListening = function(inListener, inEventName, inHandler) {
		var d = enyo.dispatch;
		if (inListener.addEventListener) {
			enyo.dispatcher.stopListening = function(inListener, inEventName, inHandler) {
				inListener.removeEventListener(inEventName, inHandler || d, false);
			};
		} else {
			enyo.dispatcher.stopListening = function(inListener, inEvent, inHandler) {
				inListener.detachEvent("on" + inEvent, inHandler || d);
			};
		}
		enyo.dispatcher.stopListening(inListener, inEventName, inHandler);
	}
}

if(!enyo.unmakeBubble) {
	(function() {
		var bubbleUp = function() {
			enyo.bubble(arguments[0]);
		};
		enyo.makeBubble = function() {
			var args = Array.prototype.slice.call(arguments, 0),
				control = args.shift();
			if((typeof control === "object") && (typeof control.hasNode === "function")) {
				enyo.forEach(args, function(event) {
					if(this.hasNode()) {
						enyo.dispatcher.listen(this.node, event, bubbleUp);
					}
				}, control);
			}
		};
		enyo.unmakeBubble = function() {
			var args = Array.prototype.slice.call(arguments, 0),
				control = args.shift();
			if((typeof control === "object") && (typeof control.hasNode === "function")) {
				enyo.forEach(args, function(event) {
					if(this.hasNode()) {
						enyo.dispatcher.stopListening(this.node, event, bubbleUp);
					}
				}, control);
			}
		};
	})();
}
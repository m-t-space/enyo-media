enyo.media = {
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
	//TODO: all other constants abd misc static functions/objects
};

define([],function(){
	return [function(require,module,exports){"use strict";var pattern=/(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;module.exports=function linkify(inputText){return inputText.replace(pattern,'<a href="$1">$1</a>')}},{}]
});
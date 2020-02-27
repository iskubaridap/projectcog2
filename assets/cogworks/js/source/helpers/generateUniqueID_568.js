define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function generateUniqueID(exists){var i=1;while(i<1e5){if(!exists(i))return i;i++}return null}},{}]
});
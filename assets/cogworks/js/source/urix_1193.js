define([],function(){
	return [function(require,module,exports){var path=require("path");"use strict";function urix(aPath){if(path.sep==="\\"){return aPath.replace(/\\/g,"/").replace(/^[a-z]:\/?/i,"/")}return aPath}module.exports=urix},{"path":1083}]
});
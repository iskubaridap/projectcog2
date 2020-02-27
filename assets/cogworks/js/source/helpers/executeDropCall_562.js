define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function executeDropCall(dropCall){return dropCall.object[dropCall.method].apply(dropCall.object,dropCall.arguments||[])}},{}]
});
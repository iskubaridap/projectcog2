define([],function(){
	return [function(require,module,exports){require("./$.fix-re-wks")("match",1,function(defined,MATCH){return function match(regexp){"use strict";var O=defined(this),fn=regexp==undefined?undefined:regexp[MATCH];return fn!==undefined?fn.call(regexp,O):new RegExp(regexp)[MATCH](String(O))}})},{"./$.fix-re-wks":782}]
});
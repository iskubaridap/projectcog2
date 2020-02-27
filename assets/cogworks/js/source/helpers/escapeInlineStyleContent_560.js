define([],function(){
	return [function(require,module,exports){"use strict";var endOfTag=/<\s*\//g;module.exports=function escapeInlineStyleContent(str){return str.replace(endOfTag,"<\\/")}},{}]
});
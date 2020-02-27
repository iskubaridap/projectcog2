define([],function(){
	return [function(require,module,exports){"use strict";var regexEscape=/[-\/\\^$*+?.()|[\]{}]/g;module.exports=function escapeRegexString(str){return str.replace(regexEscape,"\\$&")}},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var cleanRegex=/data\:.*base64,/;module.exports=function cleanUpDataURL(url){return url.replace(cleanRegex,"")}},{}]
});
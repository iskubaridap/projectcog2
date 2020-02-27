define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function convert(json,converters){if(!json.version)json.version=1;while(true){if(converters.hasOwnProperty(json.version)){json=converters[json.version](json);continue}break}return json}},{}]
});
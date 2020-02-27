define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function convert(json){if(!json.design.id){json.design.id=app.generateUniqueID()}json.version=15;return json}},{}]
});
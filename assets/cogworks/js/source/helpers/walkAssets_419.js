define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function walkAssets(entry,cb){if(Array.isArray(entry.children)){for(var i=0;i<entry.children.length;i++){walkAssets(entry.children[i],cb)}}else{cb(entry)}}},{}]
});
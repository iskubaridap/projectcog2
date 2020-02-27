define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function walk(component,cb){cb(component);if(Array.isArray(component.children)){for(var i=0;i<component.children.length;i++){walk(component.children[i],cb)}}}},{}]
});
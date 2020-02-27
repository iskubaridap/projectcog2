define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function domTreeToArray(node){if(!node)return;return walk(node)};function walk(node){var results=[node];if(node.children&&node.children.length){for(var i=0;i<node.children.length;i++){Array.prototype.push.apply(results,walk(node.children[i]))}}return results}},{}]
});
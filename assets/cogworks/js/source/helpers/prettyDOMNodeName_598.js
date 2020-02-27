define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function prettyDOMNodeName(element){var name="";if(element.id){name+="#"+element.id}else if(element.className.trim&&element.className.trim().length){name+="."+element.className.trim().replace(/\s+/g,".")}else{name=element.nodeName.toLowerCase()}return name}},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function setAnimationToFadeIn(component){if(component.properties&&component.properties.animation=="scroll"&&!component.properties["animation-scroll-type"]){component.properties["animation-scroll-type"]="fade-up"}}},{}]
});
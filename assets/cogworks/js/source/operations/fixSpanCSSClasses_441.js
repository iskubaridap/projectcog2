define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function fixSpanCSSClasses(component){if(component["class"]==="Span"&&typeof component.cssClasses.system==="string"){component.cssClasses.system={main:component.cssClasses.system}}}},{}]
});
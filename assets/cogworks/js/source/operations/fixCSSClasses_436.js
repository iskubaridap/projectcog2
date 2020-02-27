define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function fixCSSClasses(tree){walk(tree,function(component){if(component["class"]!=="InlineCharacter"){if(typeof component.cssClasses.system==="string"){component.cssClasses.system={main:component.cssClasses.system}}}})}},{"../helpers/walk":418}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function fixParagraphAndChildrenClasses(tree){walk(tree,function(component){if((component["class"]=="Caption"||component["class"]=="Paragraph")&&component.cssClasses.system.main){component.cssClasses.system.lead=component.cssClasses.system.main;delete component.cssClasses.system.main}if(component["class"]=="HelpTextBlock"||component["class"]=="StaticControl"){var cls=component.cssClasses.system;component.cssClasses.system={main:cls}}})}},{"../helpers/walk":418}]
});
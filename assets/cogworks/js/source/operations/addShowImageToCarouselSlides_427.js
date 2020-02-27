define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function convertCarouselCaptionToDiv(tree){walk(tree,function(component){if(component["class"]=="CarouselSlide"){component.properties.showImage=true}})}},{"../helpers/walk":418}]
});
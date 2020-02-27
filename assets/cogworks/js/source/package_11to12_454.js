define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/addShowImageToCarouselSlides");module.exports=function convert(json){op(json["package"].component);json.version=12;return json}},{"../operations/addShowImageToCarouselSlides":427}]
});
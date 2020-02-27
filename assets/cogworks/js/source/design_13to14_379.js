define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/addShowImageToCarouselSlides");var loopTree=require("../helpers/loopTree");module.exports=function convert(json){loopTree(json.design.pages,function(page){op(page.html)});json.version=14;return json}},{"../helpers/loopTree":417,"../operations/addShowImageToCarouselSlides":427}]
});
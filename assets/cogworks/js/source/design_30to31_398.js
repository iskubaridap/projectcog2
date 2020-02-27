define([],function(){
	return [function(require,module,exports){"use strict";var loopTree=require("../helpers/loopTree");var op=require("../operations/fixIoniconClasses");module.exports=function convert(json){loopTree(json.design.pages,function(page){op(page.html)});json.version=31;return json}},{"../helpers/loopTree":417,"../operations/fixIoniconClasses":437}]
});
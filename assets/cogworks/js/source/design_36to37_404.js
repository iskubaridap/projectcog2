define([],function(){
	return [function(require,module,exports){"use strict";var loopTree=require("../helpers/loopTree");var fixObjectProperties=require("../operations/fixObjectProperties");module.exports=function convert(json){loopTree(json.design.pages,function(page){fixObjectProperties(page.html)});json.version=37;return json}},{"../helpers/loopTree":417,"../operations/fixObjectProperties":439}]
});
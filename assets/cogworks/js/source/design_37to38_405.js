define([],function(){
	return [function(require,module,exports){"use strict";var loopTree=require("../helpers/loopTree");var walkAssets=require("../helpers/walkAssets");var fixKeyframesEnabledState=require("../operations/fixKeyframesEnabledState");var removeParentClassesInButtons=require("../operations/removeParentClassesInButtons");module.exports=function convert(json){loopTree(json.design.pages,function(page){removeParentClassesInButtons(page.html)});walkAssets(json.design.assets.css,function(css){fixKeyframesEnabledState(css)});json.version=38;return json}},{"../helpers/loopTree":417,"../helpers/walkAssets":419,"../operations/fixKeyframesEnabledState":438,"../operations/removeParentClassesInButtons":447}]
});
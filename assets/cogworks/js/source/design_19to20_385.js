define([],function(){
	return [function(require,module,exports){"use strict";var walkAssets=require("../helpers/walkAssets");module.exports=function convert(json){walkAssets(json.design.assets.images,function(item){item.fileSize=0});json.version=20;return json}},{"../helpers/walkAssets":419}]
});
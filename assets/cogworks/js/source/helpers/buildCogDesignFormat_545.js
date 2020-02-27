define([],function(){
	return [function(require,module,exports){"use strict";var packageJSON=require("../package.json");module.exports=function buildCogDesignFormat(context){return{version:packageJSON._version_design_format,timestamp:Date.now(),design:context.serialize()}}},{"../package.json":1203}]
});
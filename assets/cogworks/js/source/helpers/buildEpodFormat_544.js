define([],function(){
	return [function(require,module,exports){"use strict";var packageJSON=require("../package.json");module.exports=function buildEpodFormat(pkg){return{version:packageJSON._version_component_format,timestamp:Date.now(),package:pkg.serialize()}}},{"../package.json":1203}]
});
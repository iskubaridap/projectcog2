define([],function(){
	return [function(require,module,exports){"use strict";var fixObjectProperties=require("../operations/fixObjectProperties");module.exports=function convert(json){fixObjectProperties(json["package"].component);json.version=32;return json}},{"../operations/fixObjectProperties":439}]
});
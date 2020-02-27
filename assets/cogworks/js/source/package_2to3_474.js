define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/overridesEnableAllAttributes");module.exports=function convert(json){op(json["package"].components);json.version=3;return json}},{"../operations/overridesEnableAllAttributes":445}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/overridesEnableAllAttributes");module.exports=function convert(json){op(json.design.components);json.version=4;return json}},{"../operations/overridesEnableAllAttributes":445}]
});
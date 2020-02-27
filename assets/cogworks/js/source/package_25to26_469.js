define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/fixIoniconClasses");module.exports=function convert(json){op(json["package"].component);json.version=26;return json}},{"../operations/fixIoniconClasses":437}]
});
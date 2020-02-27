define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/navBarAddToggle");module.exports=function convert(json){op(json.design.components);json.version=3;return json}},{"../operations/navBarAddToggle":444}]
});
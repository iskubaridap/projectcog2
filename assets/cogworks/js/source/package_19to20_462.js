define([],function(){
	return [function(require,module,exports){"use strict";var op1=require("../operations/fixAnchorCSS");var op2=require("../operations/createNavBarCollapse");module.exports=function convert(json){if(json["package"].framework=="4"){op1(json["package"].component);op2(json["package"].component)}json.version=20;return json}},{"../operations/createNavBarCollapse":430,"../operations/fixAnchorCSS":434}]
});
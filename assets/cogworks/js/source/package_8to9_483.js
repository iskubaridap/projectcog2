define([],function(){
	return [function(require,module,exports){"use strict";var op1=require("../operations/removeNavBarChildCSS");var op2=require("../operations/addMenuToDropdownAndSplitButton");module.exports=function convert(json){op1(json["package"].component);op2(json["package"].component);json.version=9;return json}},{"../operations/addMenuToDropdownAndSplitButton":426,"../operations/removeNavBarChildCSS":446}]
});
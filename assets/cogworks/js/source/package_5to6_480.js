define([],function(){
	return [function(require,module,exports){"use strict";var op1=require("../operations/fixSystemCSSClasses");var op2=function op2(arr){arr.forEach(function(r){return r.properties={}})};module.exports=function convert(json){op1(json["package"].components);op2(json["package"].css);op2(json["package"].fonts);op2(json["package"].images);json.version=6;return json}},{"../operations/fixSystemCSSClasses":442}]
});
define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object"),cof=require("./$.cof"),MATCH=require("./$.wks")("match");module.exports=function(it){var isRegExp;return isObject(it)&&((isRegExp=it[MATCH])!==undefined?!!isRegExp:cof(it)=="RegExp")}},{"./$.cof":768,"./$.is-object":795,"./$.wks":840}]
});
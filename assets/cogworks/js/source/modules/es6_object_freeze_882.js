define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("freeze",function($freeze){return function freeze(it){return $freeze&&isObject(it)?$freeze(it):it}})},{"./$.is-object":795,"./$.object-sap":811}]
});
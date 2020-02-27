define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("preventExtensions",function($preventExtensions){return function preventExtensions(it){return $preventExtensions&&isObject(it)?$preventExtensions(it):it}})},{"./$.is-object":795,"./$.object-sap":811}]
});
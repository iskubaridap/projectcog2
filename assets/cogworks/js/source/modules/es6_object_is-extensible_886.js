define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("isExtensible",function($isExtensible){return function isExtensible(it){return isObject(it)?$isExtensible?$isExtensible(it):true:false}})},{"./$.is-object":795,"./$.object-sap":811}]
});
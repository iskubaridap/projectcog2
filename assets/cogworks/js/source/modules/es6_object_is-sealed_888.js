define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("isSealed",function($isSealed){return function isSealed(it){return isObject(it)?$isSealed?$isSealed(it):false:true}})},{"./$.is-object":795,"./$.object-sap":811}]
});
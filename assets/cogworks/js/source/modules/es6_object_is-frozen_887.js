define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("isFrozen",function($isFrozen){return function isFrozen(it){return isObject(it)?$isFrozen?$isFrozen(it):false:true}})},{"./$.is-object":795,"./$.object-sap":811}]
});
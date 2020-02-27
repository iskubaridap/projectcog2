define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");require("./$.object-sap")("seal",function($seal){return function seal(it){return $seal&&isObject(it)?$seal(it):it}})},{"./$.is-object":795,"./$.object-sap":811}]
});
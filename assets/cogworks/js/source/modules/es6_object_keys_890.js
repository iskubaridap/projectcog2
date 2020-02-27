define([],function(){
	return [function(require,module,exports){var toObject=require("./$.to-object");require("./$.object-sap")("keys",function($keys){return function keys(it){return $keys(toObject(it))}})},{"./$.object-sap":811,"./$.to-object":837}]
});
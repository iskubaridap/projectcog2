define([],function(){
	return [function(require,module,exports){var toObject=require("./$.to-object");require("./$.object-sap")("getPrototypeOf",function($getPrototypeOf){return function getPrototypeOf(it){return $getPrototypeOf(toObject(it))}})},{"./$.object-sap":811,"./$.to-object":837}]
});
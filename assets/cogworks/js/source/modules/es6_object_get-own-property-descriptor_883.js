define([],function(){
	return [function(require,module,exports){var toIObject=require("./$.to-iobject");require("./$.object-sap")("getOwnPropertyDescriptor",function($getOwnPropertyDescriptor){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key)}})},{"./$.object-sap":811,"./$.to-iobject":835}]
});
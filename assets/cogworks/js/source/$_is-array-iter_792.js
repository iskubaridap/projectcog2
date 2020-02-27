define([],function(){
	return [function(require,module,exports){var Iterators=require("./$.iterators"),ITERATOR=require("./$.wks")("iterator"),ArrayProto=Array.prototype;module.exports=function(it){return it!==undefined&&(Iterators.Array===it||ArrayProto[ITERATOR]===it)}},{"./$.iterators":802,"./$.wks":840}]
});
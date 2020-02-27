define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object");module.exports=function(it){if(!isObject(it))throw TypeError(it+" is not an object!");return it}},{"./$.is-object":795}]
});
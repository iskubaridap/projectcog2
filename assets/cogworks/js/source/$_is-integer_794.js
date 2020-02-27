define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object"),floor=Math.floor;module.exports=function isInteger(it){return!isObject(it)&&isFinite(it)&&floor(it)===it}},{"./$.is-object":795}]
});
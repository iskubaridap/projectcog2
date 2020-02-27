define([],function(){
	return [function(require,module,exports){var toInteger=require("./$.to-integer"),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),9007199254740991):0}},{"./$.to-integer":834}]
});
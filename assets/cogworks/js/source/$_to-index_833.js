define([],function(){
	return [function(require,module,exports){var toInteger=require("./$.to-integer"),max=Math.max,min=Math.min;module.exports=function(index,length){index=toInteger(index);return index<0?max(index+length,0):min(index,length)}},{"./$.to-integer":834}]
});
define([],function(){
	return [function(require,module,exports){var redefine=require("./$.redefine");module.exports=function(target,src){for(var key in src)redefine(target,key,src[key]);return target}},{"./$.redefine":818}]
});
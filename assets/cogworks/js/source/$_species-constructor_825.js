define([],function(){
	return [function(require,module,exports){var anObject=require("./$.an-object"),aFunction=require("./$.a-function"),SPECIES=require("./$.wks")("species");module.exports=function(O,D){var C=anObject(O).constructor,S;return C===undefined||(S=anObject(C)[SPECIES])==undefined?D:aFunction(S)}},{"./$.a-function":759,"./$.an-object":761,"./$.wks":840}]
});
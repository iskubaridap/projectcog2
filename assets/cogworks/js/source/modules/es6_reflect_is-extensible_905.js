define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),anObject=require("./$.an-object"),$isExtensible=Object.isExtensible;$export($export.S,"Reflect",{isExtensible:function isExtensible(target){anObject(target);return $isExtensible?$isExtensible(target):true}})},{"./$.an-object":761,"./$.export":779}]
});
define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),getProto=require("./$").getProto,anObject=require("./$.an-object");$export($export.S,"Reflect",{getPrototypeOf:function getPrototypeOf(target){return getProto(anObject(target))}})},{"./$":803,"./$.an-object":761,"./$.export":779}]
});
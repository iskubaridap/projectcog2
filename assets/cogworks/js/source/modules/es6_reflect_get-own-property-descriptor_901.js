define([],function(){
	return [function(require,module,exports){var $=require("./$"),$export=require("./$.export"),anObject=require("./$.an-object");$export($export.S,"Reflect",{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(target,propertyKey){return $.getDesc(anObject(target),propertyKey)}})},{"./$":803,"./$.an-object":761,"./$.export":779}]
});
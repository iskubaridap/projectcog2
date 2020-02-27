define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),_apply=Function.apply,anObject=require("./$.an-object");$export($export.S,"Reflect",{apply:function apply(target,thisArgument,argumentsList){return _apply.call(target,thisArgument,anObject(argumentsList))}})},{"./$.an-object":761,"./$.export":779}]
});
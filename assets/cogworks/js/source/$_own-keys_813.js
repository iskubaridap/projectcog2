define([],function(){
	return [function(require,module,exports){var $=require("./$"),anObject=require("./$.an-object"),Reflect=require("./$.global").Reflect;module.exports=Reflect&&Reflect.ownKeys||function ownKeys(it){var keys=$.getNames(anObject(it)),getSymbols=$.getSymbols;return getSymbols?keys.concat(getSymbols(it)):keys}},{"./$":803,"./$.an-object":761,"./$.global":786}]
});
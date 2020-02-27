define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),isInteger=require("./$.is-integer"),abs=Math.abs;$export($export.S,"Number",{isSafeInteger:function isSafeInteger(number){return isInteger(number)&&abs(number)<=9007199254740991}})},{"./$.export":779,"./$.is-integer":794}]
});
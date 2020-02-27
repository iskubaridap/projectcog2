define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),$re=require("./$.replacer")(/[\\^$*+?.()|[\]{}]/g,"\\$&");$export($export.S,"RegExp",{escape:function escape(it){return $re(it)}})},{"./$.export":779,"./$.replacer":819}]
});
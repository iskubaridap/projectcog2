define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),sign=require("./$.math-sign");$export($export.S,"Math",{cbrt:function cbrt(x){return sign(x=+x)*Math.pow(Math.abs(x),1/3)}})},{"./$.export":779,"./$.math-sign":808}]
});
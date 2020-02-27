define([],function(){
	return [function(require,module,exports){(function(Buffer){var bn=require("bn.js");function withPublic(paddedMsg,key){return new Buffer(paddedMsg.toRed(bn.mont(key.modulus)).redPow(new bn(key.publicExponent)).fromRed().toArray())}module.exports=withPublic}).call(this,require("buffer").Buffer)},{"bn.js":645,"buffer":676}]
});
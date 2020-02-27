define([],function(){
	return [function(require,module,exports){(function(Buffer){module.exports=function xor(a,b){var length=Math.min(a.length,b.length);var buffer=new Buffer(length);for(var i=0;i<length;++i){buffer[i]=a[i]^b[i]}return buffer}}).call(this,require("buffer").Buffer)},{"buffer":676}]
});
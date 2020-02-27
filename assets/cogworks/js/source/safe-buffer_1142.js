define([],function(){
	return [function(require,module,exports){var buffer=require("buffer");var Buffer=buffer.Buffer;function copyProps(src,dst){for(var key in src){dst[key]=src[key]}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer}else{copyProps(buffer,exports);exports.Buffer=SafeBuffer}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length)}copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==="number"){throw new TypeError("Argument must not be a number")}return Buffer(arg,encodingOrOffset,length)};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==="string"){buf.fill(fill,encoding)}else{buf.fill(fill)}}else{buf.fill(0)}return buf};SafeBuffer.allocUnsafe=function(size){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}return Buffer(size)};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}return buffer.SlowBuffer(size)}},{"buffer":676}]
});
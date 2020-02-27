define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function dataURLToBlob(dataURL){var split=dataURL.split(",");var type=split[0].match(/data:(.*);base64/)[1];var binary=atob(split[1]);var array=new Array(binary.length);for(var i=0;i<binary.length;i++){array[i]=binary.charCodeAt(i)}return new Blob([new Uint8Array(array)],{type:type})}},{}]
});
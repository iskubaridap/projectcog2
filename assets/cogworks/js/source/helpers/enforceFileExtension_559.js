define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function enforceFileExtension(path,ext){if(path.slice(-ext.length-1)!="."+ext){path=path+"."+ext}return path}},{}]
});
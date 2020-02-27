define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function isContextClick(e){return e.button==2||electron.os=="osx"&&e.button==0&&e.ctrlKey}},{}]
});
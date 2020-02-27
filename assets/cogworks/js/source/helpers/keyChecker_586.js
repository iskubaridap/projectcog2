define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function keyChecker(linWinCondition,OSXCondition){if(window.electron&&electron.os=="osx"&&OSXCondition!==undefined){return OSXCondition}return linWinCondition}},{}]
});
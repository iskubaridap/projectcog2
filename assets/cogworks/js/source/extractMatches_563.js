define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function extractMatches(str,regex){var matches=[];str.replace(regex,function(match,index){matches.push({start:index,end:index+match.length,match:match})});return matches}},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function deletePackageIDOriginFromCSS(blocks){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=blocks[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var block=_step.value;delete block.packageID;delete block.origin}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{}]
});
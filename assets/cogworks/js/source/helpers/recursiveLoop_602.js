define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function recursiveLoop(folder,cb){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=folder.children[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;if(item.children){recursiveLoop(item,cb)}else{if(cb(item)===false){return false}}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}return true}},{}]
});
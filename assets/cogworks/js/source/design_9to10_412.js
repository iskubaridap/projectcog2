define([],function(){
	return [function(require,module,exports){"use strict";function fixLinkedResourceNames(arr){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=arr[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;if(item.url){item.name=item.url}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}module.exports=function convert(json){fixLinkedResourceNames(json.design.assets.css);fixLinkedResourceNames(json.design.assets.js);json.version=10;return json}},{}]
});
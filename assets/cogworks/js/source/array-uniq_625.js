define([],function(){
	return [function(require,module,exports){(function(global){"use strict";function uniqNoSet(arr){var ret=[];for(var i=0;i<arr.length;i++){if(ret.indexOf(arr[i])===-1){ret.push(arr[i])}}return ret}function uniqSet(arr){var seen=new Set;return arr.filter(function(el){if(!seen.has(el)){seen.add(el);return true}return false})}function uniqSetWithForEach(arr){var ret=[];new Set(arr).forEach(function(el){ret.push(el)});return ret}function doesForEachActuallyWork(){var ret=false;new Set([true]).forEach(function(el){ret=el});return ret===true}if("Set"in global){if(typeof Set.prototype.forEach==="function"&&doesForEachActuallyWork()){module.exports=uniqSetWithForEach}else{module.exports=uniqSet}}else{module.exports=uniqNoSet}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}]
});
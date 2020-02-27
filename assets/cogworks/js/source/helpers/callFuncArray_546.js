define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function callFuncArray(arr){var args=arguments.length<=1||arguments[1]===undefined?[]:arguments[1];if(!Array.isArray(arr)||arr.length<2)return false;if(!Array.isArray(args))args=[args];var obj=arr[0];for(var i=1;i<arr.length-1;i++){obj=obj[arr[i]]}return obj[arr[arr.length-1]].apply(obj,args)}},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function selectElementContents(element){var selection=window.getSelection();var range=document.createRange();range.selectNodeContents(element);selection.removeAllRanges();selection.addRange(range)}},{}]
});
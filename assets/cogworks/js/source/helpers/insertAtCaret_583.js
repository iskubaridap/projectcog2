define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function insertAtCaret(elem,value){if(elem.matches("textarea, input")){var scrollTop=elem.scrollTop;var val=elem.value;var pos=elem.selectionStart;elem.value=val.slice(0,pos)+value+val.slice(pos);elem.selectionStart=pos+1;elem.selectionEnd=pos+1;elem.scrollTop=scrollTop}else{document.execCommand("insertText",false,value)}}},{}]
});
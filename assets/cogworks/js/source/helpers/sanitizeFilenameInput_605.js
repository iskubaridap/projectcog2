define([],function(){
	return [function(require,module,exports){"use strict";var Resource=require("../resources/Resource");module.exports=function sanitizeFilenameInput(input){var name=input.value;var oldLength=name.length;var diff=0;var start=input.selectionStart,end=input.selectionEnd;if(!Resource.isNameValid(name)){name=Resource.sanitizeName(name)}diff=oldLength-name.length;start-=diff;end-=diff;input.value=name;input.setSelectionRange(start,end)}},{"../resources/Resource":1256}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var inlineToDOM=require("./inlineToDOM");module.exports=function inlineToHTML(inlineElements){var tree=inlineToDOM(inlineElements,true);var cleanup=tree.querySelectorAll("[bs-system-element]");for(var i=0,len=cleanup.length;i<len;i++){cleanup[i].parentNode.removeChild(cleanup[i])}var tmp=document.createElement("div");tmp.appendChild(tree);return tmp.innerHTML}},{"./inlineToDOM":581}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var splitMatches=require("./splitMatches");module.exports=function highlightMatches(node,regex,prefix){var highlightedID=arguments.length<=3||arguments[3]===undefined?null:arguments[3];var splits=splitMatches(node.textContent,regex);var parent=node.parentNode,lastNode=null;for(var i=0;i<splits.length;i++){var sp=splits[i];var tmp=null;if(sp.isMatch){tmp=document.createElement("span");tmp.classList.add("search-match");tmp.innerText=sp.text;tmp.highlightID=prefix+"-"+i;if(highlightedID&&tmp.highlightID==highlightedID){tmp.classList.add("highlighted")}}else{tmp=document.createTextNode(sp.text)}if(i==0){parent.replaceChild(tmp,node)}else{parent.insertBefore(tmp,lastNode.nextSibling)}lastNode=tmp}}},{"./splitMatches":616}]
});
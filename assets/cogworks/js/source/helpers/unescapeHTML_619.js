define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function unescapeHTML(str){return String(str).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}},{}]
});
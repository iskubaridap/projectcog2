define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function parseThemeFonts(){var content=arguments.length<=0||arguments[0]===undefined?"":arguments[0];var fonts=[];var re=/@import (?:url\((["'])(.*?)\1\)|(["'])(.*?)\3);/g;var match;while(match=re.exec(content)){if(match.length){var url=match[2]||match[4];if(url){fonts.push({url:url,name:url.match(/family=([^:,&]+)/)[1].replace(/\+/g," ")})}}}return fonts}},{}]
});
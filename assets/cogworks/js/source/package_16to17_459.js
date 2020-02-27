define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function convert(json){if(json["package"]["class"]=="DownloadedPackage"){delete json["package"].downloads;delete json["package"].authorPhoto;delete json["package"].authorDownloads}json.version=17;return json}},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var op=require("../operations/addShowImageToCarouselSlides");module.exports=function convert(json){if(json["package"].authorID){json["package"]["class"]="DownloadedPackage"}else{json["package"]["class"]="UserPackage"}json.version=13;return json}},{"../operations/addShowImageToCarouselSlides":427}]
});
define([],function(){
	return [function(require,module,exports){"use strict";module.exports=function convert(storage){var themes3=[];var themes4=[];if(storage.themes3){themes3=JSON.parse(storage.themes3)}if(storage.themes4){themes4=JSON.parse(storage.themes4)}electron.writeDataFile("customThemes3",JSON.stringify(themes3));electron.writeDataFile("customThemes4",JSON.stringify(themes4));delete storage.themes3;delete storage.themes4;storage.version=4;return storage}},{}]
});
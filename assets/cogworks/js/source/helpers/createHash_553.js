define([],function(){
	return [function(require,module,exports){"use strict";var crypto=require("crypto");module.exports=function createHash(data){return crypto.createHash("md5").update(data).digest("hex")}},{"crypto":953}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var classof=require("./$.classof"),test={};test[require("./$.wks")("toStringTag")]="z";if(test+""!="[object z]"){require("./$.redefine")(Object.prototype,"toString",function toString(){return"[object "+classof(this)+"]"},true)}},{"./$.classof":767,"./$.redefine":818,"./$.wks":840}]
});
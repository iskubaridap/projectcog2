define([],function(){
	return [function(require,module,exports){"use strict";var componentTreeToArray=require("../helpers/componentTreeToArray");module.exports=function findInTreeCallback(cb,where){return componentTreeToArray(where).filter(cb)}},{"../helpers/componentTreeToArray":551}]
});
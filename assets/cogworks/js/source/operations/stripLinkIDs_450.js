define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function stripLinkIDs(tree){walk(tree,function(component){if(component.linkID)delete component.linkID})}},{"../helpers/walk":418}]
});
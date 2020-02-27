define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function createCanBeCopiedFlag(tree){walk(tree,function(component){if(!component.flags)return;if(component.flags.canBeMoved==false){component.flags.canBeCopied=false}})}},{"../helpers/walk":418}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function deletePackageIDProperty(tree){walk(tree,function(component){if(!component.properties)return;delete component.properties.packageID})}},{"../helpers/walk":418}]
});
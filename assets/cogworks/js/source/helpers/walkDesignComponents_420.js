define([],function(){
	return [function(require,module,exports){"use strict";var loopTree=require("./loopTree");var walk=require("./walk");module.exports=function walkDesignComponents(pages,cb){loopTree(pages,function(page){walk(page.html,function(component){cb(component)})})}},{"./loopTree":417,"./walk":418}]
});
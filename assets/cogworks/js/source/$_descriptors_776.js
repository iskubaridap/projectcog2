define([],function(){
	return [function(require,module,exports){module.exports=!require("./$.fails")(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},{"./$.fails":781}]
});
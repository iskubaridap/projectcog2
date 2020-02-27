define([],function(){
	return [function(require,module,exports){var UNSCOPABLES=require("./$.wks")("unscopables"),ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES]==undefined)require("./$.hide")(ArrayProto,UNSCOPABLES,{});module.exports=function(key){ArrayProto[UNSCOPABLES][key]=true}},{"./$.hide":788,"./$.wks":840}]
});
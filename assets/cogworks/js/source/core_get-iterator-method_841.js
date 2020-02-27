define([],function(){
	return [function(require,module,exports){var classof=require("./$.classof"),ITERATOR=require("./$.wks")("iterator"),Iterators=require("./$.iterators");module.exports=require("./$.core").getIteratorMethod=function(it){if(it!=undefined)return it[ITERATOR]||it["@@iterator"]||Iterators[classof(it)]}},{"./$.classof":767,"./$.core":773,"./$.iterators":802,"./$.wks":840}]
});
define([],function(){
	return [function(require,module,exports){var store=require("./$.shared")("wks"),uid=require("./$.uid"),Symbol=require("./$.global").Symbol;module.exports=function(name){return store[name]||(store[name]=Symbol&&Symbol[name]||(Symbol||uid)("Symbol."+name))}},{"./$.global":786,"./$.shared":824,"./$.uid":839}]
});
define([],function(){
	return [function(require,module,exports){var def=require("./$").setDesc,has=require("./$.has"),TAG=require("./$.wks")("toStringTag");module.exports=function(it,tag,stat){if(it&&!has(it=stat?it:it.prototype,TAG))def(it,TAG,{configurable:true,value:tag})}},{"./$":803,"./$.has":787,"./$.wks":840}]
});
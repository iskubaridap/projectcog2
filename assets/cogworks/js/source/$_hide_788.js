define([],function(){
	return [function(require,module,exports){var $=require("./$"),createDesc=require("./$.property-desc");module.exports=require("./$.descriptors")?function(object,key,value){return $.setDesc(object,key,createDesc(1,value))}:function(object,key,value){object[key]=value;return object}},{"./$":803,"./$.descriptors":776,"./$.property-desc":816}]
});
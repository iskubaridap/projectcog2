define([],function(){
	return [function(require,module,exports){var isObject=require("./$.is-object"),document=require("./$.global").document,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{}}},{"./$.global":786,"./$.is-object":795}]
});
define([],function(){
	return [function(require,module,exports){module.exports={Text:"text",Directive:"directive",Comment:"comment",Script:"script",Style:"style",Tag:"tag",CDATA:"cdata",isTag:function(elem){return elem.type==="tag"||elem.type==="script"||elem.type==="style"}}},{}]
});
define([],function(){
	return [function(require,module,exports){module.exports=Compiler;function Compiler(opts){this.options=opts||{}}Compiler.prototype.emit=function(str){return str};Compiler.prototype.visit=function(node){return this[node.type](node)};Compiler.prototype.mapVisit=function(nodes,delim){var buf="";delim=delim||"";for(var i=0,length=nodes.length;i<length;i++){buf+=this.visit(nodes[i]);if(delim&&i<length-1)buf+=this.emit(delim)}return buf}},{}]
});
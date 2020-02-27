define([],function(){
	return [function(require,module,exports){module.exports=Math.sign||function sign(x){return(x=+x)==0||x!=x?x:x<0?-1:1}},{}]
});
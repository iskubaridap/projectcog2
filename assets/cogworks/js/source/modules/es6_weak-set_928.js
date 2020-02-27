define([],function(){
	return [function(require,module,exports){"use strict";var weak=require("./$.collection-weak");require("./$.collection")("WeakSet",function(get){return function WeakSet(){return get(this,arguments.length>0?arguments[0]:undefined)}},{add:function add(value){return weak.def(this,value,true)}},weak,false,true)},{"./$.collection":772,"./$.collection-weak":771}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var global=require("./$.global"),$=require("./$"),DESCRIPTORS=require("./$.descriptors"),SPECIES=require("./$.wks")("species");module.exports=function(KEY){var C=global[KEY];if(DESCRIPTORS&&C&&!C[SPECIES])$.setDesc(C,SPECIES,{configurable:true,get:function(){return this}})}},{"./$":803,"./$.descriptors":776,"./$.global":786,"./$.wks":840}]
});
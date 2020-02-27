define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),setProto=require("./$.set-proto");if(setProto)$export($export.S,"Reflect",{setPrototypeOf:function setPrototypeOf(target,proto){setProto.check(target,proto);try{setProto.set(target,proto);return true}catch(e){return false}}})},{"./$.export":779,"./$.set-proto":821}]
});
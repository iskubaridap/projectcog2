define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),$imul=Math.imul;$export($export.S+$export.F*require("./$.fails")(function(){return $imul(4294967295,5)!=-5||$imul.length!=2}),"Math",{imul:function imul(x,y){var UINT16=65535,xn=+x,yn=+y,xl=UINT16&xn,yl=UINT16&yn;return 0|xl*yl+((UINT16&xn>>>16)*yl+xl*(UINT16&yn>>>16)<<16>>>0)}})},{"./$.export":779,"./$.fails":781}]
});
define([],function(){
	return [function(require,module,exports){var $export=require("./$.export"),toIndex=require("./$.to-index"),fromCharCode=String.fromCharCode,$fromCodePoint=String.fromCodePoint;$export($export.S+$export.F*(!!$fromCodePoint&&$fromCodePoint.length!=1),"String",{fromCodePoint:function fromCodePoint(x){var res=[],$$=arguments,$$len=$$.length,i=0,code;while($$len>i){code=+$$[i++];if(toIndex(code,1114111)!==code)throw RangeError(code+" is not a valid code point");res.push(code<65536?fromCharCode(code):fromCharCode(((code-=65536)>>10)+55296,code%1024+56320))}return res.join("")}})},{"./$.export":779,"./$.to-index":833}]
});
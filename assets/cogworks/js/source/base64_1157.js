define([],function(){
	return [function(require,module,exports){if(typeof define!=="function"){var define=require("amdefine")(module,require)}define(function(require,exports,module){var intToCharMap="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");exports.encode=function(number){if(0<=number&&number<intToCharMap.length){return intToCharMap[number]}throw new TypeError("Must be between 0 and 63: "+aNumber)};exports.decode=function(charCode){var bigA=65;var bigZ=90;var littleA=97;var littleZ=122;var zero=48;var nine=57;var plus=43;var slash=47;var littleOffset=26;var numberOffset=52;if(bigA<=charCode&&charCode<=bigZ){return charCode-bigA}if(littleA<=charCode&&charCode<=littleZ){return charCode-littleA+littleOffset}if(zero<=charCode&&charCode<=nine){return charCode-zero+numberOffset}if(charCode==plus){return 62}if(charCode==slash){return 63}return-1}})},{"amdefine":624}]
});
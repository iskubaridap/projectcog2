define([],function(){
	return [function(require,module,exports){var isRegExp=require("./$.is-regexp"),defined=require("./$.defined");module.exports=function(that,searchString,NAME){if(isRegExp(searchString))throw TypeError("String#"+NAME+" doesn't accept regex!");return String(defined(that))}},{"./$.defined":775,"./$.is-regexp":796}]
});
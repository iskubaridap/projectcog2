define([],function(){
	return [function(require,module,exports){(function(Buffer){var inherits=require("inherits");var Sha256=require("./sha256");var Hash=require("./hash");var W=new Array(64);function Sha224(){this.init();this._w=W;Hash.call(this,64,56)}inherits(Sha224,Sha256);Sha224.prototype.init=function(){this._a=3238371032;this._b=914150663;this._c=812702999;this._d=4144912697;this._e=4290775857;this._f=1750603025;this._g=1694076839;this._h=3204075428;return this};Sha224.prototype._hash=function(){var H=new Buffer(28);H.writeInt32BE(this._a,0);H.writeInt32BE(this._b,4);H.writeInt32BE(this._c,8);H.writeInt32BE(this._d,12);H.writeInt32BE(this._e,16);H.writeInt32BE(this._f,20);H.writeInt32BE(this._g,24);return H};module.exports=Sha224}).call(this,require("buffer").Buffer)},{"./hash":1144,"./sha256":1149,"buffer":676,"inherits":1060}]
});
define([],function(){
	return [function(require,module,exports){(function(Buffer){var inherits=require("inherits");var SHA512=require("./sha512");var Hash=require("./hash");var W=new Array(160);function Sha384(){this.init();this._w=W;Hash.call(this,128,112)}inherits(Sha384,SHA512);Sha384.prototype.init=function(){this._ah=3418070365;this._bh=1654270250;this._ch=2438529370;this._dh=355462360;this._eh=1731405415;this._fh=2394180231;this._gh=3675008525;this._hh=1203062813;this._al=3238371032;this._bl=914150663;this._cl=812702999;this._dl=4144912697;this._el=4290775857;this._fl=1750603025;this._gl=1694076839;this._hl=3204075428;return this};Sha384.prototype._hash=function(){var H=new Buffer(48);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset);H.writeInt32BE(l,offset+4)}writeInt64BE(this._ah,this._al,0);writeInt64BE(this._bh,this._bl,8);writeInt64BE(this._ch,this._cl,16);writeInt64BE(this._dh,this._dl,24);writeInt64BE(this._eh,this._el,32);writeInt64BE(this._fh,this._fl,40);return H};module.exports=Sha384}).call(this,require("buffer").Buffer)},{"./hash":1144,"./sha512":1151,"buffer":676,"inherits":1060}]
});
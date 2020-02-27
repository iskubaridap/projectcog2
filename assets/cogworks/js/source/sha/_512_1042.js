define([],function(){
	return [function(require,module,exports){"use strict";var utils=require("../utils");var common=require("../common");var assert=require("minimalistic-assert");var rotr64_hi=utils.rotr64_hi;var rotr64_lo=utils.rotr64_lo;var shr64_hi=utils.shr64_hi;var shr64_lo=utils.shr64_lo;var sum64=utils.sum64;var sum64_hi=utils.sum64_hi;var sum64_lo=utils.sum64_lo;var sum64_4_hi=utils.sum64_4_hi;var sum64_4_lo=utils.sum64_4_lo;var sum64_5_hi=utils.sum64_5_hi;var sum64_5_lo=utils.sum64_5_lo;var BlockHash=common.BlockHash;var sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function SHA512(){if(!(this instanceof SHA512))return new SHA512;BlockHash.call(this);this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209];this.k=sha512_K;this.W=new Array(160)}utils.inherits(SHA512,BlockHash);module.exports=SHA512;SHA512.blockSize=1024;SHA512.outSize=512;SHA512.hmacStrength=192;SHA512.padLength=128;SHA512.prototype._prepareBlock=function _prepareBlock(msg,start){var W=this.W;for(var i=0;i<32;i++)W[i]=msg[start+i];for(;i<W.length;i+=2){var c0_hi=g1_512_hi(W[i-4],W[i-3]);var c0_lo=g1_512_lo(W[i-4],W[i-3]);var c1_hi=W[i-14];var c1_lo=W[i-13];var c2_hi=g0_512_hi(W[i-30],W[i-29]);var c2_lo=g0_512_lo(W[i-30],W[i-29]);var c3_hi=W[i-32];var c3_lo=W[i-31];W[i]=sum64_4_hi(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo);W[i+1]=sum64_4_lo(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo)}};SHA512.prototype._update=function _update(msg,start){this._prepareBlock(msg,start);var W=this.W;var ah=this.h[0];var al=this.h[1];var bh=this.h[2];var bl=this.h[3];var ch=this.h[4];var cl=this.h[5];var dh=this.h[6];var dl=this.h[7];var eh=this.h[8];var el=this.h[9];var fh=this.h[10];var fl=this.h[11];var gh=this.h[12];var gl=this.h[13];var hh=this.h[14];var hl=this.h[15];assert(this.k.length===W.length);for(var i=0;i<W.length;i+=2){var c0_hi=hh;var c0_lo=hl;var c1_hi=s1_512_hi(eh,el);var c1_lo=s1_512_lo(eh,el);var c2_hi=ch64_hi(eh,el,fh,fl,gh,gl);var c2_lo=ch64_lo(eh,el,fh,fl,gh,gl);var c3_hi=this.k[i];var c3_lo=this.k[i+1];var c4_hi=W[i];var c4_lo=W[i+1];var T1_hi=sum64_5_hi(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo,c4_hi,c4_lo);var T1_lo=sum64_5_lo(c0_hi,c0_lo,c1_hi,c1_lo,c2_hi,c2_lo,c3_hi,c3_lo,c4_hi,c4_lo);c0_hi=s0_512_hi(ah,al);c0_lo=s0_512_lo(ah,al);c1_hi=maj64_hi(ah,al,bh,bl,ch,cl);c1_lo=maj64_lo(ah,al,bh,bl,ch,cl);var T2_hi=sum64_hi(c0_hi,c0_lo,c1_hi,c1_lo);var T2_lo=sum64_lo(c0_hi,c0_lo,c1_hi,c1_lo);hh=gh;hl=gl;gh=fh;gl=fl;fh=eh;fl=el;eh=sum64_hi(dh,dl,T1_hi,T1_lo);el=sum64_lo(dl,dl,T1_hi,T1_lo);dh=ch;dl=cl;ch=bh;cl=bl;bh=ah;bl=al;ah=sum64_hi(T1_hi,T1_lo,T2_hi,T2_lo);al=sum64_lo(T1_hi,T1_lo,T2_hi,T2_lo)}sum64(this.h,0,ah,al);sum64(this.h,2,bh,bl);sum64(this.h,4,ch,cl);sum64(this.h,6,dh,dl);sum64(this.h,8,eh,el);sum64(this.h,10,fh,fl);sum64(this.h,12,gh,gl);sum64(this.h,14,hh,hl)};SHA512.prototype._digest=function digest(enc){if(enc==="hex")return utils.toHex32(this.h,"big");else return utils.split32(this.h,"big")};function ch64_hi(xh,xl,yh,yl,zh){var r=xh&yh^~xh&zh;if(r<0)r+=4294967296;return r}function ch64_lo(xh,xl,yh,yl,zh,zl){var r=xl&yl^~xl&zl;if(r<0)r+=4294967296;return r}function maj64_hi(xh,xl,yh,yl,zh){var r=xh&yh^xh&zh^yh&zh;if(r<0)r+=4294967296;return r}function maj64_lo(xh,xl,yh,yl,zh,zl){var r=xl&yl^xl&zl^yl&zl;if(r<0)r+=4294967296;return r}function s0_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,28);var c1_hi=rotr64_hi(xl,xh,2);var c2_hi=rotr64_hi(xl,xh,7);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=4294967296;return r}function s0_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,28);var c1_lo=rotr64_lo(xl,xh,2);var c2_lo=rotr64_lo(xl,xh,7);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=4294967296;return r}function s1_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,14);var c1_hi=rotr64_hi(xh,xl,18);var c2_hi=rotr64_hi(xl,xh,9);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=4294967296;return r}function s1_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,14);var c1_lo=rotr64_lo(xh,xl,18);var c2_lo=rotr64_lo(xl,xh,9);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=4294967296;return r}function g0_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,1);var c1_hi=rotr64_hi(xh,xl,8);var c2_hi=shr64_hi(xh,xl,7);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=4294967296;return r}function g0_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,1);var c1_lo=rotr64_lo(xh,xl,8);var c2_lo=shr64_lo(xh,xl,7);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=4294967296;return r}function g1_512_hi(xh,xl){var c0_hi=rotr64_hi(xh,xl,19);var c1_hi=rotr64_hi(xl,xh,29);var c2_hi=shr64_hi(xh,xl,6);var r=c0_hi^c1_hi^c2_hi;if(r<0)r+=4294967296;return r}function g1_512_lo(xh,xl){var c0_lo=rotr64_lo(xh,xl,19);var c1_lo=rotr64_lo(xl,xh,29);var c2_lo=shr64_lo(xh,xl,6);var r=c0_lo^c1_lo^c2_lo;if(r<0)r+=4294967296;return r}},{"../common":1034,"../utils":1044,"minimalistic-assert":1073}]
});
define([],function(){
	return [function(require,module,exports){(function(Buffer){"use strict";var inherits=require("inherits");var HashBase=require("hash-base");function RIPEMD160(){HashBase.call(this,64);this._a=1732584193;this._b=4023233417;this._c=2562383102;this._d=271733878;this._e=3285377520}inherits(RIPEMD160,HashBase);RIPEMD160.prototype._update=function(){var m=new Array(16);for(var i=0;i<16;++i)m[i]=this._block.readInt32LE(i*4);var al=this._a;var bl=this._b;var cl=this._c;var dl=this._d;var el=this._e;al=fn1(al,bl,cl,dl,el,m[0],0,11);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[1],0,14);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[2],0,15);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[3],0,12);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[4],0,5);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[5],0,8);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[6],0,7);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[7],0,9);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[8],0,11);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[9],0,13);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[10],0,14);cl=rotl(cl,10);el=fn1(el,al,bl,cl,dl,m[11],0,15);bl=rotl(bl,10);dl=fn1(dl,el,al,bl,cl,m[12],0,6);al=rotl(al,10);cl=fn1(cl,dl,el,al,bl,m[13],0,7);el=rotl(el,10);bl=fn1(bl,cl,dl,el,al,m[14],0,9);dl=rotl(dl,10);al=fn1(al,bl,cl,dl,el,m[15],0,8);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[7],1518500249,7);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[4],1518500249,6);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[13],1518500249,8);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[1],1518500249,13);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[10],1518500249,11);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[6],1518500249,9);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[15],1518500249,7);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[3],1518500249,15);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[12],1518500249,7);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[0],1518500249,12);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[9],1518500249,15);bl=rotl(bl,10);dl=fn2(dl,el,al,bl,cl,m[5],1518500249,9);al=rotl(al,10);cl=fn2(cl,dl,el,al,bl,m[2],1518500249,11);el=rotl(el,10);bl=fn2(bl,cl,dl,el,al,m[14],1518500249,7);dl=rotl(dl,10);al=fn2(al,bl,cl,dl,el,m[11],1518500249,13);cl=rotl(cl,10);el=fn2(el,al,bl,cl,dl,m[8],1518500249,12);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[3],1859775393,11);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[10],1859775393,13);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[14],1859775393,6);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[4],1859775393,7);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[9],1859775393,14);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[15],1859775393,9);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[8],1859775393,13);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[1],1859775393,15);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[2],1859775393,14);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[7],1859775393,8);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[0],1859775393,13);al=rotl(al,10);cl=fn3(cl,dl,el,al,bl,m[6],1859775393,6);el=rotl(el,10);bl=fn3(bl,cl,dl,el,al,m[13],1859775393,5);dl=rotl(dl,10);al=fn3(al,bl,cl,dl,el,m[11],1859775393,12);cl=rotl(cl,10);el=fn3(el,al,bl,cl,dl,m[5],1859775393,7);bl=rotl(bl,10);dl=fn3(dl,el,al,bl,cl,m[12],1859775393,5);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[1],2400959708,11);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[9],2400959708,12);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[11],2400959708,14);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[10],2400959708,15);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[0],2400959708,14);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[8],2400959708,15);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[12],2400959708,9);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[4],2400959708,8);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[13],2400959708,9);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[3],2400959708,14);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[7],2400959708,5);el=rotl(el,10);bl=fn4(bl,cl,dl,el,al,m[15],2400959708,6);dl=rotl(dl,10);al=fn4(al,bl,cl,dl,el,m[14],2400959708,8);cl=rotl(cl,10);el=fn4(el,al,bl,cl,dl,m[5],2400959708,6);bl=rotl(bl,10);dl=fn4(dl,el,al,bl,cl,m[6],2400959708,5);al=rotl(al,10);cl=fn4(cl,dl,el,al,bl,m[2],2400959708,12);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[4],2840853838,9);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[0],2840853838,15);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[5],2840853838,5);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[9],2840853838,11);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[7],2840853838,6);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[12],2840853838,8);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[2],2840853838,13);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[10],2840853838,12);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[14],2840853838,5);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[1],2840853838,12);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[3],2840853838,13);dl=rotl(dl,10);al=fn5(al,bl,cl,dl,el,m[8],2840853838,14);cl=rotl(cl,10);el=fn5(el,al,bl,cl,dl,m[11],2840853838,11);bl=rotl(bl,10);dl=fn5(dl,el,al,bl,cl,m[6],2840853838,8);al=rotl(al,10);cl=fn5(cl,dl,el,al,bl,m[15],2840853838,5);el=rotl(el,10);bl=fn5(bl,cl,dl,el,al,m[13],2840853838,6);dl=rotl(dl,10);var ar=this._a;var br=this._b;var cr=this._c;var dr=this._d;var er=this._e;ar=fn5(ar,br,cr,dr,er,m[5],1352829926,8);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[14],1352829926,9);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[7],1352829926,9);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[0],1352829926,11);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[9],1352829926,13);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[2],1352829926,15);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[11],1352829926,15);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[4],1352829926,5);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[13],1352829926,7);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[6],1352829926,7);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[15],1352829926,8);cr=rotl(cr,10);er=fn5(er,ar,br,cr,dr,m[8],1352829926,11);br=rotl(br,10);dr=fn5(dr,er,ar,br,cr,m[1],1352829926,14);ar=rotl(ar,10);cr=fn5(cr,dr,er,ar,br,m[10],1352829926,14);er=rotl(er,10);br=fn5(br,cr,dr,er,ar,m[3],1352829926,12);dr=rotl(dr,10);ar=fn5(ar,br,cr,dr,er,m[12],1352829926,6);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[6],1548603684,9);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[11],1548603684,13);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[3],1548603684,15);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[7],1548603684,7);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[0],1548603684,12);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[13],1548603684,8);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[5],1548603684,9);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[10],1548603684,11);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[14],1548603684,7);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[15],1548603684,7);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[8],1548603684,12);br=rotl(br,10);dr=fn4(dr,er,ar,br,cr,m[12],1548603684,7);ar=rotl(ar,10);cr=fn4(cr,dr,er,ar,br,m[4],1548603684,6);er=rotl(er,10);br=fn4(br,cr,dr,er,ar,m[9],1548603684,15);dr=rotl(dr,10);ar=fn4(ar,br,cr,dr,er,m[1],1548603684,13);cr=rotl(cr,10);er=fn4(er,ar,br,cr,dr,m[2],1548603684,11);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[15],1836072691,9);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[5],1836072691,7);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[1],1836072691,15);dr=rotl(dr,10)
;ar=fn3(ar,br,cr,dr,er,m[3],1836072691,11);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[7],1836072691,8);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[14],1836072691,6);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[6],1836072691,6);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[9],1836072691,14);dr=rotl(dr,10);ar=fn3(ar,br,cr,dr,er,m[11],1836072691,12);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[8],1836072691,13);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[12],1836072691,5);ar=rotl(ar,10);cr=fn3(cr,dr,er,ar,br,m[2],1836072691,14);er=rotl(er,10);br=fn3(br,cr,dr,er,ar,m[10],1836072691,13);dr=rotl(dr,10);ar=fn3(ar,br,cr,dr,er,m[0],1836072691,13);cr=rotl(cr,10);er=fn3(er,ar,br,cr,dr,m[4],1836072691,7);br=rotl(br,10);dr=fn3(dr,er,ar,br,cr,m[13],1836072691,5);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[8],2053994217,15);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[6],2053994217,5);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[4],2053994217,8);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[1],2053994217,11);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[3],2053994217,14);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[11],2053994217,14);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[15],2053994217,6);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[0],2053994217,14);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[5],2053994217,6);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[12],2053994217,9);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[2],2053994217,12);er=rotl(er,10);br=fn2(br,cr,dr,er,ar,m[13],2053994217,9);dr=rotl(dr,10);ar=fn2(ar,br,cr,dr,er,m[9],2053994217,12);cr=rotl(cr,10);er=fn2(er,ar,br,cr,dr,m[7],2053994217,5);br=rotl(br,10);dr=fn2(dr,er,ar,br,cr,m[10],2053994217,15);ar=rotl(ar,10);cr=fn2(cr,dr,er,ar,br,m[14],2053994217,8);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[12],0,8);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[15],0,5);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[10],0,12);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[4],0,9);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[1],0,12);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[5],0,5);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[8],0,14);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[7],0,6);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[6],0,8);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[2],0,13);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[13],0,6);dr=rotl(dr,10);ar=fn1(ar,br,cr,dr,er,m[14],0,5);cr=rotl(cr,10);er=fn1(er,ar,br,cr,dr,m[0],0,15);br=rotl(br,10);dr=fn1(dr,er,ar,br,cr,m[3],0,13);ar=rotl(ar,10);cr=fn1(cr,dr,er,ar,br,m[9],0,11);er=rotl(er,10);br=fn1(br,cr,dr,er,ar,m[11],0,11);dr=rotl(dr,10);var t=this._b+cl+dr|0;this._b=this._c+dl+er|0;this._c=this._d+el+ar|0;this._d=this._e+al+br|0;this._e=this._a+bl+cr|0;this._a=t};RIPEMD160.prototype._digest=function(){this._block[this._blockOffset++]=128;if(this._blockOffset>56){this._block.fill(0,this._blockOffset,64);this._update();this._blockOffset=0}this._block.fill(0,this._blockOffset,56);this._block.writeUInt32LE(this._length[0],56);this._block.writeUInt32LE(this._length[1],60);this._update();var buffer=new Buffer(20);buffer.writeInt32LE(this._a,0);buffer.writeInt32LE(this._b,4);buffer.writeInt32LE(this._c,8);buffer.writeInt32LE(this._d,12);buffer.writeInt32LE(this._e,16);return buffer};function rotl(x,n){return x<<n|x>>>32-n}function fn1(a,b,c,d,e,m,k,s){return rotl(a+(b^c^d)+m+k|0,s)+e|0}function fn2(a,b,c,d,e,m,k,s){return rotl(a+(b&c|~b&d)+m+k|0,s)+e|0}function fn3(a,b,c,d,e,m,k,s){return rotl(a+((b|~c)^d)+m+k|0,s)+e|0}function fn4(a,b,c,d,e,m,k,s){return rotl(a+(b&d|c&~d)+m+k|0,s)+e|0}function fn5(a,b,c,d,e,m,k,s){return rotl(a+(b^(c|~d))+m+k|0,s)+e|0}module.exports=RIPEMD160}).call(this,require("buffer").Buffer)},{"buffer":676,"hash-base":1032,"inherits":1060}]
});
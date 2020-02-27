define([],function(){
	return [function(require,module,exports){"use strict";var utils=require("./utils");var assert=require("minimalistic-assert");function BlockHash(){this.pending=null;this.pendingTotal=0;this.blockSize=this.constructor.blockSize;this.outSize=this.constructor.outSize;this.hmacStrength=this.constructor.hmacStrength;this.padLength=this.constructor.padLength/8;this.endian="big";this._delta8=this.blockSize/8;this._delta32=this.blockSize/32}exports.BlockHash=BlockHash;BlockHash.prototype.update=function update(msg,enc){msg=utils.toArray(msg,enc);if(!this.pending)this.pending=msg;else this.pending=this.pending.concat(msg);this.pendingTotal+=msg.length;if(this.pending.length>=this._delta8){msg=this.pending;var r=msg.length%this._delta8;this.pending=msg.slice(msg.length-r,msg.length);if(this.pending.length===0)this.pending=null;msg=utils.join32(msg,0,msg.length-r,this.endian);for(var i=0;i<msg.length;i+=this._delta32)this._update(msg,i,i+this._delta32)}return this};BlockHash.prototype.digest=function digest(enc){this.update(this._pad());assert(this.pending===null);return this._digest(enc)};BlockHash.prototype._pad=function pad(){var len=this.pendingTotal;var bytes=this._delta8;var k=bytes-(len+this.padLength)%bytes;var res=new Array(k+this.padLength);res[0]=128;for(var i=1;i<k;i++)res[i]=0;len<<=3;if(this.endian==="big"){for(var t=8;t<this.padLength;t++)res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=len>>>24&255;res[i++]=len>>>16&255;res[i++]=len>>>8&255;res[i++]=len&255}else{res[i++]=len&255;res[i++]=len>>>8&255;res[i++]=len>>>16&255;res[i++]=len>>>24&255;res[i++]=0;res[i++]=0;res[i++]=0;res[i++]=0;for(t=8;t<this.padLength;t++)res[i++]=0}return res}},{"./utils":1044,"minimalistic-assert":1073}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var BN=require("bn.js");var elliptic=require("../../elliptic");var utils=elliptic.utils;var assert=utils.assert;function Signature(options,enc){if(options instanceof Signature)return options;if(this._importDER(options,enc))return;assert(options.r&&options.s,"Signature without r or s");this.r=new BN(options.r,16);this.s=new BN(options.s,16);if(options.recoveryParam===undefined)this.recoveryParam=null;else this.recoveryParam=options.recoveryParam}module.exports=Signature;function Position(){this.place=0}function getLength(buf,p){var initial=buf[p.place++];if(!(initial&128)){return initial}var octetLen=initial&15;var val=0;for(var i=0,off=p.place;i<octetLen;i++,off++){val<<=8;val|=buf[off]}p.place=off;return val}function rmPadding(buf){var i=0;var len=buf.length-1;while(!buf[i]&&!(buf[i+1]&128)&&i<len){i++}if(i===0){return buf}return buf.slice(i)}Signature.prototype._importDER=function _importDER(data,enc){data=utils.toArray(data,enc);var p=new Position;if(data[p.place++]!==48){return false}var len=getLength(data,p);if(len+p.place!==data.length){return false}if(data[p.place++]!==2){return false}var rlen=getLength(data,p);var r=data.slice(p.place,rlen+p.place);p.place+=rlen;if(data[p.place++]!==2){return false}var slen=getLength(data,p);if(data.length!==slen+p.place){return false}var s=data.slice(p.place,slen+p.place);if(r[0]===0&&r[1]&128){r=r.slice(1)}if(s[0]===0&&s[1]&128){s=s.slice(1)}this.r=new BN(r);this.s=new BN(s);this.recoveryParam=null;return true};function constructLength(arr,len){if(len<128){arr.push(len);return}var octets=1+(Math.log(len)/Math.LN2>>>3);arr.push(octets|128);while(--octets){arr.push(len>>>(octets<<3)&255)}arr.push(len)}Signature.prototype.toDER=function toDER(enc){var r=this.r.toArray();var s=this.s.toArray();if(r[0]&128)r=[0].concat(r);if(s[0]&128)s=[0].concat(s);r=rmPadding(r);s=rmPadding(s);while(!s[0]&&!(s[1]&128)){s=s.slice(1)}var arr=[2];constructLength(arr,r.length);arr=arr.concat(r);arr.push(2);constructLength(arr,s.length);var backHalf=arr.concat(s);var res=[48];constructLength(res,backHalf.length);res=res.concat(backHalf);return utils.encode(res,enc)}},{"../../elliptic":997,"bn.js":645}]
});
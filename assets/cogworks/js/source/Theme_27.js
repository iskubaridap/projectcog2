define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var createHash=require("../helpers/createHash");var FontResource=require("../resources/FontResource");var Theme=function(){function Theme(){_classCallCheck(this,Theme);this.id="";this.name="";this.fonts=[];this.type=null;this.timestamp=Date.now()}_createClass(Theme,[{key:"hasCDN",value:function hasCDN(){return false}},{key:"getHash",value:function getHash(){return createHash(this.timestamp.toString())}},{key:"serialize",value:function serialize(){return{id:this.id,name:this.name,fonts:this.fonts.map(function(f){return f.serialize()})}}},{key:"unserialize",value:function unserialize(obj){this.id=obj.id;this.name=obj.name;this.fonts=obj.fonts.map(function(f){return new FontResource(f.name,f.url)})}},{key:"createDescriptor",value:function createDescriptor(){return{id:this.id,type:this.type}}}]);return Theme}();module.exports=Theme},{"../helpers/createHash":553,"../resources/FontResource":1250}]
});
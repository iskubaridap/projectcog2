define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var TreeItem=function(){function TreeItem(){_classCallCheck(this,TreeItem);this.parent=null}_createClass(TreeItem,[{key:"initialize",value:function initialize(){}},{key:"getName",value:function getName(){return""}},{key:"nameSameAs",value:function nameSameAs(item){return item.getName().toLowerCase()==this.getName().toLowerCase()}},{key:"getGroup",value:function getGroup(){return this.parent.getGroup()}},{key:"getPath",value:function getPath(){return this.parent.getPath()+"/"+this.getName()}},{key:"getRelativePath",value:function getRelativePath(parent){if(!parent)parent=this.getGroup();var rp=this.getPath().replace(parent.getPath(),"");if(rp[0]&&rp[0]=="/"){rp=rp.slice(1)}return rp}},{key:"getPathRelativeTo",value:function getPathRelativeTo(item){var currentPath=this.getRelativePath().split("/");var itemPath=item.getRelativePath().split("/");var itemDepth=itemPath.length-1;var commonParentDepth=0;var depthDiff=0;for(var i=0;i<itemDepth;i++){if(currentPath[0]!==itemPath[0])break;commonParentDepth=i+1;currentPath.shift();itemPath.shift()}depthDiff=itemDepth-commonParentDepth;for(var i=0;i<depthDiff;i++){currentPath.unshift("..")}return currentPath.join("/")}},{key:"clone",value:function clone(){var clone=new this.constructor;clone.unserialize(this.serialize());return clone}},{key:"serialize",value:function serialize(){}},{key:"unserialize",value:function unserialize(){}}]);return TreeItem}();module.exports=TreeItem},{}]
});
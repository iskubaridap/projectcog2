define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Bar=function(){function Bar(){_classCallCheck(this,Bar);this.element=null;this.visible=false}_createClass(Bar,[{key:"show",value:function show(){this.element.show();this.visible=true}},{key:"hide",value:function hide(){this.element.hide();this.visible=false}},{key:"isVisible",value:function isVisible(){return this.visible}}]);return Bar}();module.exports=Bar},{}]
});
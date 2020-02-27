define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithChildren=require("../base/ComponentWithChildren");var Heading=require("./Heading");var Paragraph=require("../bootstrap/Paragraph");var MediaBody=function(_ComponentWithChildren){_inherits(MediaBody,_ComponentWithChildren);function MediaBody(){_classCallCheck(this,MediaBody);_get(Object.getPrototypeOf(MediaBody.prototype),"constructor",this).call(this);this.element=$("<div>");this.cssClasses.system.main="media-body"}_createClass(MediaBody,[{key:"initialize",value:function initialize(){var h=new Heading;h.initialize("Media Heading");h.properties.type="h4";h.setOverride("/","class","media-heading");this.insertFirst(h);var p=new Paragraph;p.initialize("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. ");this.insertLast(p)}},{key:"convertUp",value:function convertUp(){var MediaBody4=require("../bootstrap4/MediaBody");var mb=new MediaBody4;mb.initialize();this.transferDefinedPropsTo(mb);return this.framework().convertUpFromTo(this,mb,{transferFlags:false})}}]);return MediaBody}(ComponentWithChildren);MediaBody.prettyName="Media Body";module.exports=MediaBody},{"../base/ComponentWithChildren":40,"../bootstrap/Paragraph":146,"../bootstrap4/MediaBody":324,"./Heading":201}]
});
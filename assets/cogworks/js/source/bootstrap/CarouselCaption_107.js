define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Div=require("../base/Div");var Paragraph=require("./Paragraph");var CarouselCaption=function(_Div){_inherits(CarouselCaption,_Div);function CarouselCaption(){_classCallCheck(this,CarouselCaption);_get(Object.getPrototypeOf(CarouselCaption.prototype),"constructor",this).call(this);this.element=$("<div>");this.cssClasses.system.main="carousel-caption"}_createClass(CarouselCaption,[{key:"initialize",value:function initialize(){var h=new this.headingConstructor;h.initialize("Slide Title");h.properties.type="h3";this.insertLast(h);var p=new Paragraph;p.initialize("Slide Caption");this.insertLast(p)}},{key:"headingConstructor",get:function get(){}}]);return CarouselCaption}(Div);CarouselCaption.prettyName="Caption";module.exports=CarouselCaption},{"../base/Div":43,"./Paragraph":146}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var CarouselBase=require("../bootstrap/Carousel");var CarouselControls=require("./CarouselControls");var CarouselSlides=require("./CarouselSlides");var CarouselSlide=require("./CarouselSlide");var Carousel=function(_CarouselBase){_inherits(Carousel,_CarouselBase);function Carousel(){_classCallCheck(this,Carousel);_get(Object.getPrototypeOf(Carousel.prototype),"constructor",this).apply(this,arguments)}_createClass(Carousel,[{key:"convertUp",value:function convertUp(){var Carousel4=require("../bootstrap4/Carousel");var carousel=new Carousel4;carousel.initialize();this.transferDefinedPropsTo(carousel);if(carousel.properties.size==="btn-xs"){carousel.properties.size="btn-sm"}
return this.framework().convertUpFromTo(this,carousel)}},{key:"carouselSlide",get:function get(){return CarouselSlide}},{key:"carouselSlides",get:function get(){return CarouselSlides}},{key:"carouselControls",get:function get(){return CarouselControls}}]);return Carousel}(CarouselBase);module.exports=Carousel},{"../bootstrap/Carousel":106,"../bootstrap4/Carousel":282,"./CarouselControls":181,"./CarouselSlide":182,"./CarouselSlides":183}]
});
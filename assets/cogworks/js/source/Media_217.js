define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x4,_x5,_x6){var _again=true;_function:while(_again){var object=_x4,property=_x5,receiver=_x6;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x4=parent;_x5=property;_x6=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithChildren=require("../base/ComponentWithChildren");var MediaLeft=require("./MediaLeft");var MediaRight=require("./MediaRight");var MediaBody=require("./MediaBody");var Media=function(_ComponentWithChildren){_inherits(Media,_ComponentWithChildren);function Media(){_classCallCheck(this,Media);_get(Object.getPrototypeOf(Media.prototype),"constructor",this).call(this);this.element=$("<div>");this.cssClasses.system.main="media"}_createClass(Media,[{key:"initialize",value:function initialize(){this.properties.showMediaLeft=true;this.properties.showMediaBody=true;this.properties.showMediaRight=false;this.insertFirst(this.createOrSelectInstance(MediaLeft));this.insertLast(this.createOrSelectInstance(MediaBody))}},{key:"canTakeChild",value:function canTakeChild(child){return child instanceof MediaLeft||child instanceof MediaRight||child instanceof MediaBody}},{key:"injectOptions",value:function injectOptions(){_get(Object.getPrototypeOf(Media.prototype),"injectOptions",this).call(this);var media=this;var mediaOptions=this.getMainOptionsGroup();mediaOptions.add(this.createCheckBoxForSubComponent("showMediaLeft","Media Left",MediaLeft,function(parent,child){var index=arguments.length<=2||arguments[2]===undefined?-1:arguments[2];if(index>-1){parent.insertAt(child,index);return}parent.insertFirst(child)}))
;mediaOptions.add(this.createCheckBoxForSubComponent("showMediaBody","Media Body",MediaBody,function(parent,child){var index=arguments.length<=2||arguments[2]===undefined?-1:arguments[2];if(index>-1){parent.insertAt(child,index);return}var index=0;for(var i=0;i<parent.children.length;i++){if(parent.children[i]instanceof MediaRight){index=i;break}if(parent.children[i]instanceof MediaLeft){index=i+1;break}}parent.insertAt(child,index)}));mediaOptions.add(this.createCheckBoxForSubComponent("showMediaRight","Media Right",MediaRight,function(parent,child){var index=arguments.length<=2||arguments[2]===undefined?-1:arguments[2];if(index>-1){parent.insertAt(child,index);return}parent.insertLast(child)}))}},{key:"convertUp",value:function convertUp(){var Media4=require("../bootstrap4/Media");var media=new Media4;media.initialize();this.transferDefinedPropsTo(media);return this.framework().convertUpFromTo(this,media)}}]);return Media}(ComponentWithChildren);Media.description="This is Bootstrap's Media component. It is used for building rich types of content like comments and tweets, which combine images and text.";module.exports=Media},{"../base/ComponentWithChildren":40,"../bootstrap4/Media":323,"./MediaBody":218,"./MediaLeft":219,"./MediaRight":220}]
});
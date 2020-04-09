define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x2,_x3,_x4){var _again=true;_function:while(_again){var object=_x2,property=_x3,receiver=_x4;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x2=parent;_x3=property;_x4=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Paragraph=require("../bootstrap/Paragraph");var HelpTextBlock=function(_Paragraph){_inherits(HelpTextBlock,_Paragraph);function HelpTextBlock(){_classCallCheck(this,HelpTextBlock);_get(Object.getPrototypeOf(HelpTextBlock.prototype),"constructor",this).call(this);this.cssClasses.system.main="help-block"}_createClass(HelpTextBlock,[{key:"initialize",value:function initialize(){var str=arguments.length<=0||arguments[0]===undefined?"Help text for a form field.":arguments[0];_get(Object.getPrototypeOf(HelpTextBlock.prototype),"initialize",this).call(this,str)}},{key:"convertUp",value:function convertUp(){var HelpText=require("../bootstrap4/HelpText");var ht=new HelpText;ht.initialize();return this.framework().convertUpFromTo(this,ht)}}]);return HelpTextBlock}(Paragraph);HelpTextBlock.prettyName="Help Text Block";HelpTextBlock.description="This is a Bootstrap component for showing help text beneath forms inputs. Place it in a Form Group after the input field.";module.exports=HelpTextBlock},{"../bootstrap/Paragraph":146,"../bootstrap4/HelpText":308}]
});
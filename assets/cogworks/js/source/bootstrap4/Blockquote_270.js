define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var BlockquoteBase=require("../bootstrap/Blockquote");var BlockquoteFooter=require("./BlockquoteFooter");var Paragraph=require("../bootstrap/Paragraph");var Blockquote=function(_BlockquoteBase){_inherits(Blockquote,_BlockquoteBase);function Blockquote(){_classCallCheck(this,Blockquote);_get(Object.getPrototypeOf(Blockquote.prototype),"constructor",this).apply(this,arguments)}_createClass(Blockquote,[{key:"initialize",value:function initialize(){_get(Object.getPrototypeOf(Blockquote.prototype),"initialize",this).call(this);var p=new Paragraph;p.initialize("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.");p.setOverride("/","class","mb-0");p.fixate();this.insertFirst(p)}},{key:"possibleTypes",get:function get(){return possibleTypes}},{key:"blockquoteFooterConstructor",get:function get(){return BlockquoteFooter}},{key:"className",get:function get(){return"blockquote"}}]);return Blockquote}(BlockquoteBase);module.exports=Blockquote;var possibleTypes=[{label:"Regular",value:""},{label:"Center",value:"text-center"},{label:"Reverse",value:"text-right"}]},{"../bootstrap/Blockquote":98,"../bootstrap/Paragraph":146,"./BlockquoteFooter":271}]
});
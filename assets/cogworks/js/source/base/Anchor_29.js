define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){
var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x3,_x4,_x5){var _again=true;_function:while(_again){var object=_x3,property=_x4,receiver=_x5;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x3=parent;_x4=property;_x5=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithInlineEditing=require("../base/ComponentWithInlineEditing");var Anchor=function(_ComponentWithInlineEditing){_inherits(Anchor,_ComponentWithInlineEditing);function Anchor(){_classCallCheck(this,Anchor);_get(Object.getPrototypeOf(Anchor.prototype),"constructor",this).call(this);this.inline=true;this.blacklist=["link"];this.element=$("<a>")}_createClass(Anchor,[{key:"initialize",value:function initialize(){var text=arguments.length<=0||arguments[0]===undefined?"Link":arguments[0];var url=arguments.length<=1||arguments[1]===undefined?"#":arguments[1];_get(Object.getPrototypeOf(Anchor.prototype),"initialize",this).call(this,text);this.properties.url=url}},{key:"canTakeChild",value:function canTakeChild(c){if(c instanceof Anchor){return false}var Article=require("./Article"),Heading=require("./Heading"),Paragraph=require("./Paragraph"),Table=require("./Table"),List=require("./List"),Div=require("./Div");if(c instanceof Article||c instanceof Heading||c instanceof Paragraph||c instanceof Table||c instanceof List||c instanceof Div){return true}return _get(Object.getPrototypeOf(Anchor.prototype),"canTakeChild",this).call(this,c)}},{key:"findUsedImages",value:function findUsedImages(){var images=_get(Object.getPrototypeOf(Anchor.prototype),"findUsedImages",this).call(this);var url=this.properties.url;if(url){var image=this.context().assets.images.getItemByRelativePath(url);if(image&&!images.includes(image)){images.push(image)}}return images}}]);return Anchor}(ComponentWithInlineEditing);Anchor.possibleTargets=[{label:"Default",value:""},{label:"Blank",value:"_blank"},{label:"Parent",value:"_parent"},{label:"Top",value:"_top"}];Anchor.prettyName="Link";Anchor.description="This is the regular <code>&lt;a&gt;</code> element. Use it to link to other pages or websites.";module.exports=Anchor},{"../base/ComponentWithInlineEditing":41,"./Article":30,"./Div":43,"./Heading":52,"./List":77,"./Paragraph":81,"./Table":87}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Div=require("../base/Div");var Heading=require("./Heading");var AccordionItemButton=require("./AccordionItemButton");var AccordionItemHeading=function(_Div){_inherits(AccordionItemHeading,_Div);function AccordionItemHeading(){_classCallCheck(this,AccordionItemHeading);_get(Object.getPrototypeOf(AccordionItemHeading.prototype),"constructor",this).call(this);this.cssClasses.system.main="panel-heading";this.attributes.role="tab"}_createClass(AccordionItemHeading,[{key:"initialize",value:function initialize(){var heading=new Heading;heading.initialize("");heading.properties.type="h4";heading.cssClasses.parent="panel-title";heading.freeze();var button=new AccordionItemButton;button.initialize("Accordion Item");button.fixate();heading.insertFirst(button);this.insertFirst(heading)}},{key:"convertUp",value:function convertUp(){var AccordionItemHeading4=require("../bootstrap4/AccordionItemHeading");var Heading=require("../base/Heading");var acc=new AccordionItemHeading4;acc.initialize();this.transferDefinedPropsTo(acc);return this.framework().convertUpFromTo(this,acc,{childProcessCb:function childProcessCb(comp){if(comp instanceof Heading){comp.properties.type="h6";comp.setOverride("/","class","mb-0")}}})}}]);return AccordionItemHeading}(Div);AccordionItemHeading.prettyName="Item Heading";module.exports=AccordionItemHeading},{"../base/Div":43,"../base/Heading":52,"../bootstrap4/AccordionItemHeading":265,"./AccordionItemButton":163,"./Heading":201}]
});
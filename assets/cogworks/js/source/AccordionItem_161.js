define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var AccordionItemBase=require("../bootstrap/AccordionItem");var AccordionItemContent=require("./AccordionItemContent");var AccordionItemHeading=require("./AccordionItemHeading");var AccordionItem=function(_AccordionItemBase){_inherits(AccordionItem,_AccordionItemBase);function AccordionItem(){_classCallCheck(this,AccordionItem);_get(Object.getPrototypeOf(AccordionItem.prototype),"constructor",this).call(this);this.defineProperties({id:"style",label:"Style",type:"select",value:"panel-default",options:possibleStyles})}_createClass(AccordionItem,[{key:"initialize",value:function initialize(){var heading=new AccordionItemHeading;heading.initialize();heading.fixate();this.insertLast(heading);var body=new AccordionItemContent;body.initialize();body.fixate();this.insertLast(body)}},{key:"update",value:function update(){this.cssClasses.system.main="panel "+this.properties.style;return _get(Object.getPrototypeOf(AccordionItem.prototype),"update",this).call(this)}},{key:"convertUp",value:function convertUp(){var AccordionItem4=require("../bootstrap4/AccordionItem");var acc=new AccordionItem4;acc.initialize();this.transferDefinedPropsTo(acc);return this.framework().convertUpFromTo(this,acc)}}]);return AccordionItem}(AccordionItemBase);var possibleStyles=[{label:"Default",value:"panel-default"},{label:"Primary",value:"panel-primary"},{label:"Success",value:"panel-success"},{label:"Info",value:"panel-info"},{label:"Warning",value:"panel-warning"},{label:"Danger",value:"panel-danger"}];module.exports=AccordionItem},{"../bootstrap/AccordionItem":95,"../bootstrap4/AccordionItem":262,"./AccordionItemContent":164,"./AccordionItemHeading":165}]
});
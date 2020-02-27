define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var CollapseContent=require("./CollapseContent");var CardBody=require("./CardBody");var Paragraph=require("../bootstrap/Paragraph");var AccordionItemBody=function(_CollapseContent){_inherits(AccordionItemBody,_CollapseContent);function AccordionItemBody(){_classCallCheck(this,AccordionItemBody);_get(Object.getPrototypeOf(AccordionItemBody.prototype),"constructor",this).call(this);this.attributes.role="tabpanel"}_createClass(AccordionItemBody,[{key:"initialize",value:function initialize(){var content=new Paragraph;content.cssClasses.parent="card-text";content.initialize("Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.");this.insertFirst(content)}},{key:"startUpdate",value:function startUpdate(){this.attributes["data-parent"]="#"+this.parent.parent.getID();this.cssClasses.system.main+=" item-"+this.parent.getNumberInParent();_get(Object.getPrototypeOf(AccordionItemBody.prototype),"startUpdate",this).call(this);var container=$("<div>");container.addClass("card-body");this.element.children().appendTo(container);this.element.empty();this.element.append(container)}}]);return AccordionItemBody}(CollapseContent);AccordionItemBody.prettyName="Item Content";module.exports=AccordionItemBody},{"../bootstrap/Paragraph":146,"./CardBody":278,"./CollapseContent":292}]
});
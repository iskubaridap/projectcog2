define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ListGroupItemBase=require("../bootstrap/ListGroupItem");var Paragraph=require("../bootstrap/Paragraph");var Heading=require("./Heading");var ListGroupItem=function(_ListGroupItemBase){_inherits(ListGroupItem,_ListGroupItemBase);function ListGroupItem(){_classCallCheck(this,ListGroupItem);_get(Object.getPrototypeOf(ListGroupItem.prototype),"constructor",this).apply(this,arguments)}_createClass(ListGroupItem,[{key:"drop",value:function drop(component){if(component instanceof Heading){component.cssClasses.parent="list-group-item-heading"}if(component instanceof Paragraph){component.cssClasses.parent="list-group-item-text"}}},{key:"undrop",value:function undrop(component){component.cssClasses.parent=""}},{key:"convertUp",value:function convertUp(){var ListGroupItem4=require("../bootstrap4/ListGroupItem");var item=new ListGroupItem4;item.initialize();this.transferDefinedPropsTo(item);return this.framework().convertUpFromTo(this,item)}},{key:"className",get:function get(){return"list-group-item"}},{key:"possibleStyles",get:function get(){return possibleStyles}}]);return ListGroupItem}(ListGroupItemBase);module.exports=ListGroupItem;var possibleStyles=[{label:"Default",value:""},{label:"Success",value:"list-group-item-success"},{label:"Info",value:"list-group-item-info"},{label:"Warning",value:"list-group-item-warning"},{label:"Danger",value:"list-group-item-danger"}]},{"../bootstrap/ListGroupItem":134,"../bootstrap/Paragraph":146,"../bootstrap4/ListGroupItem":321,"./Heading":201}]
});
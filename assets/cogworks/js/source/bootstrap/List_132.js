define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ListBase=require("../base/List");var List=function(_ListBase){_inherits(List,_ListBase);function List(){_classCallCheck(this,List);_get(Object.getPrototypeOf(List.prototype),"constructor",this).apply(this,arguments)}_createClass(List,[{key:"update",value:function update(){this.cssClasses.system.main="";if(this.properties.style=="unstyled"){this.cssClasses.system.main="list-unstyled"}if(this.properties.style=="inline"){this.cssClasses.system.main="list-inline"}return _get(Object.getPrototypeOf(List.prototype),"update",this).call(this)}},{key:"possibleStyles",get:function get(){return possibleStyles}}]);return List}(ListBase);var possibleStyles=[{label:"Unordered (UL)",value:"ul"},{label:"Ordered (OL)",value:"ol"},{label:"Unstyled (UL)",value:"unstyled"},{label:"Inline (UL)",value:"inline"}];module.exports=List},{"../base/List":77}]
});
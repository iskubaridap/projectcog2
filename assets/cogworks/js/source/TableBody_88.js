define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithChildren=require("../base/ComponentWithChildren");var TableRow=require("./TableRow");var TableCell=require("./TableCell");var TableBody=function(_ComponentWithChildren){_inherits(TableBody,_ComponentWithChildren);function TableBody(){_classCallCheck(this,TableBody);_get(Object.getPrototypeOf(TableBody.prototype),"constructor",this).call(this);this.element=$("<tbody>");this.fixate()}_createClass(TableBody,[{key:"initialize",value:function initialize(){var row=new this.tableRowConstructor;row.initialize();this.insertLast(row);var cell=new this.tableCellConstructor;cell.initialize("Cell 1");row.insertLast(cell);cell=new this.tableCellConstructor;cell.initialize("Cell 2");row.insertLast(cell);row=new this.tableRowConstructor;row.initialize();this.insertLast(row);cell=new this.tableCellConstructor;cell.initialize("Cell 3");row.insertLast(cell);cell=new this.tableCellConstructor;cell.initialize("Cell 4");row.insertLast(cell)}},{key:"canTakeChild",value:function canTakeChild(child){return _get(Object.getPrototypeOf(TableBody.prototype),"canTakeChild",this).call(this,child)&&child instanceof TableRow}},{key:"tableRowConstructor",get:function get(){return TableRow}},{key:"tableCellConstructor",get:function get(){return TableCell}}]);return TableBody}(ComponentWithChildren);TableBody.prettyName="Table Body";module.exports=TableBody},{"../base/ComponentWithChildren":40,"./TableCell":89,"./TableRow":92}]
});
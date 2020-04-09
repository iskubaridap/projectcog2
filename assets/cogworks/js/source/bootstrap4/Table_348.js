define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var TableBase=require("../bootstrap/Table");var TableBody=require("./TableBody");var TableHeader=require("./TableHeader");var TableFooter=require("./TableFooter");var TableRow=require("./TableRow");var TableCell=require("./TableCell");var Table=function(_TableBase){_inherits(Table,_TableBase);function Table(){_classCallCheck(this,Table);_get(Object.getPrototypeOf(Table.prototype),"constructor",this).call(this);this.element=$("<div>");this.defineProperties([{id:"bordered",label:"Borders",type:"select",value:"",options:[{value:"",label:"Default"},{value:"bordered",label:"Bordered"},{value:"borderless",label:"Borderless"}],weight:-1},{id:"dark",label:"Dark",type:"checkbox",value:false},{id:"responsive",label:"Responsive",type:"select",value:"table-responsive",options:responsiveOptions,weight:-2}])}_createClass(Table,[{key:"getStyle",value:function getStyle(){var style=_get(Object.getPrototypeOf(Table.prototype),"getStyle",this).call(this);if(this.properties.condensed){style+=" table-sm"}return style.trim()}},{key:"update",value:function update(){this.cssClasses.system.main="";if(this.properties.responsive){this.cssClasses.system.main=this.properties.responsive}if(this.properties.bordered=="bordered"){this.cssClasses.system.main+=" table-bordered"}else if(this.properties.bordered=="borderless"){this.cssClasses.system.main+=" table-borderless"}return _get(Object.getPrototypeOf(Table.prototype),"update",this).call(this)}},{key:"tableBodyConstructor",get:function get(){return TableBody}},{key:"tableHeaderConstructor",get:function get(){return TableHeader}},{key:"tableFooterConstructor",get:function get(){return TableFooter}},{key:"tableRowConstructor",get:function get(){return TableRow}},{key:"tableCellConstructor",get:function get(){return TableCell}},{key:"props",get:function get(){return props}}]);return Table}(TableBase);var props=["striped","bordered","hover","dark"];var responsiveOptions=[{label:"No",value:""},{label:"Always",value:"table-responsive"},{label:"Up to SM",value:"table-responsive-sm"},{label:"Up to MD",value:"table-responsive-md"},{label:"Up to LG",value:"table-responsive-lg"},{label:"Up to XL",value:"table-responsive-xl"}];module.exports=Table},{"../bootstrap/Table":156,"./TableBody":349,"./TableCell":350,"./TableFooter":351,"./TableHeader":352,"./TableRow":353}]
});
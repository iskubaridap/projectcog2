define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var InputBase=require("./InputBase");var InputDateAndTime=function(_InputBase){_inherits(InputDateAndTime,_InputBase);function InputDateAndTime(){_classCallCheck(this,InputDateAndTime);_get(Object.getPrototypeOf(InputDateAndTime.prototype),"constructor",this).call(this);this.addCapabilities(["min","max","step"]);this.defineProperties({id:"type",label:"Type",type:"select",value:"date",options:InputDateAndTime.possibleTypes,group:"input-main"})}_createClass(InputDateAndTime,[{key:"update",value:function update(){this.attributes.type=this.properties.type;return _get(Object.getPrototypeOf(InputDateAndTime.prototype),"update",this).call(this)}}]);return InputDateAndTime}(InputBase);InputDateAndTime.possibleTypes=[{label:"Date",value:"date"},{label:"Time",value:"time"},{label:"Datetime Local",value:"datetime-local"},{label:"Month",value:"month"},{label:"Week",value:"week"}];InputDateAndTime.prettyName="Date And Time Input";InputDateAndTime.description="This component combines a number of date and time related HTML5 input elements into one. Choose the type you need from the Options panel.";module.exports=InputDateAndTime},{"./InputBase":58}]
});
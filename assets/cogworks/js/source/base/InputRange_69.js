define([],function(){
	return [function(require,module,exports){"use strict";var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var InputBase=require("./InputBase");var InputRange=function(_InputBase){_inherits(InputRange,_InputBase);function InputRange(){_classCallCheck(this,InputRange);_get(Object.getPrototypeOf(InputRange.prototype),"constructor",this).call(this);this.attributes.type="range";this.addCapabilities(["min","max","step"]);this.removeCapabilities("readonly")}return InputRange}(InputBase);InputRange.prettyName="Range Input";InputRange.description="This is the <code>&lt;input type=&quot;range&quot; /&gt;</code> HTML5 element. In modern browsers it is visualized as a slider with minimum and maximum values.";module.exports=InputRange},{"./InputBase":58}]
});
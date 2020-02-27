define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Dialog=require("./Dialog");var AlertDialog=function(_Dialog){_inherits(AlertDialog,_Dialog);function AlertDialog(elem){_classCallCheck(this,AlertDialog);_get(Object.getPrototypeOf(AlertDialog.prototype),"constructor",this).call(this,elem);this.message=elem.find(".message");this.title=elem.find("h5");this.secondaryButton=elem.find(".button.aside");elem.find(".button.ok").on("click",this.close.bind(this))}_createClass(AlertDialog,[{key:"open",value:function open(options){this.message.text(options.message);this.title.text(options.title);this.secondaryButton.toggle(!!options.secondaryAction);if(options.secondaryAction){this.secondaryButton.text(options.secondaryAction.text);this.secondaryButton.on("click",options.secondaryAction.action.bind(this))}_get(Object.getPrototypeOf(AlertDialog.prototype),"open",this).call(this,options)}},{key:"afterClose",value:function afterClose(){this.secondaryButton.off("click")}}]);return AlertDialog}(Dialog);module.exports=AlertDialog},{"./Dialog":498}]
});
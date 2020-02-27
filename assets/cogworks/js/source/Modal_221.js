define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ModalBase=require("../bootstrap/Modal");var ModalHeader=require("./ModalHeader");var ModalFooter=require("./ModalFooter");var Modal=function(_ModalBase){_inherits(Modal,_ModalBase);function Modal(){_classCallCheck(this,Modal);_get(Object.getPrototypeOf(Modal.prototype),"constructor",this).apply(this,arguments)}_createClass(Modal,[{key:"transferDefinedPropsTo",value:function transferDefinedPropsTo(component){_get(Object.getPrototypeOf(Modal.prototype),"transferDefinedPropsTo",this).call(this,component);component.properties.showModalHeader=this.properties.showModalHeader;component.properties.showModalFooter=this.properties.showModalFooter}},{key:"update",value:function update(){this.cssClasses.system.main="modal";if(this.properties.fade){this.cssClasses.system.main+=" fade"}_get(Object.getPrototypeOf(Modal.prototype),"startUpdate",this).call(this);var modalDialog=$('<div class="modal-dialog" role="document">');var content=$('<div class="modal-content">');if(this.properties.size){modalDialog.addClass(this.properties.size)}content.appendTo(modalDialog);this.element.children().appendTo(content);this.element.html(modalDialog);return _get(Object.getPrototypeOf(Modal.prototype),"finishUpdate",this).call(this)}},{key:"convertUp",value:function convertUp(){var Modal4=require("../bootstrap4/Modal");var modal=new Modal4;modal.initialize();this.transferDefinedPropsTo(modal);return this.framework().convertUpFromTo(this,modal)}},{key:"modalHeaderConstructor",get:function get(){return ModalHeader}},{key:"modalFooterConstructor",get:function get(){return ModalFooter}}]);return Modal}(ModalBase);module.exports=Modal},{"../bootstrap/Modal":135,"../bootstrap4/Modal":325,"./ModalFooter":222,"./ModalHeader":223}]
});
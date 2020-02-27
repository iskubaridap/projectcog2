define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x2,_x3,_x4){var _again=true;_function:while(_again){var object=_x2,property=_x3,receiver=_x4;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x2=parent;_x3=property;_x4=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithInlineEditing=require("../base/ComponentWithInlineEditing");var Label=function(_ComponentWithInlineEditing){_inherits(Label,_ComponentWithInlineEditing);function Label(){_classCallCheck(this,Label);_get(Object.getPrototypeOf(Label.prototype),"constructor",this).call(this);this.inline=true;this.element=$("<span>");this.defineProperties({id:"style",label:"Style",type:"select",value:"label-default",options:Label.possibleStyles})}_createClass(Label,[{key:"canTakeChild",value:function canTakeChild(component){return _get(Object.getPrototypeOf(Label.prototype),"canTakeChild",this).call(this,component)&&!(component instanceof Label)}},{key:"initialize",value:function initialize(){var txt=arguments.length<=0||arguments[0]===undefined?"Label":arguments[0];_get(Object.getPrototypeOf(Label.prototype),"initialize",this).call(this,txt)}},{key:"convertUp",value:function convertUp(){var Badge4=require("../bootstrap4/Badge");var badge=new Badge4;badge.initialize();badge.properties.style="badge-"+this.properties.style.replace("label-","");return this.framework().convertUpFromTo(this,badge)}},{key:"update",value:function update(){this.cssClasses.system.main="label "+this.properties.style;return _get(Object.getPrototypeOf(Label.prototype),"update",this).call(this)}}]);return Label}(ComponentWithInlineEditing);Label.possibleStyles=[{label:"Default",value:"label-default"},{label:"Primary",value:"label-primary"},{label:"Success",value:"label-success"},{label:"Info",value:"label-info"},{label:"Warning",value:"label-warning"},{label:"Danger",value:"label-danger"}];Label.description="This is Bootstrap's Label component. Use it to display textual labels as badges next to elements. You have a number of color themes to choose from.";module.exports=Label},{"../base/ComponentWithInlineEditing":41,"../bootstrap4/Badge":269}]
});
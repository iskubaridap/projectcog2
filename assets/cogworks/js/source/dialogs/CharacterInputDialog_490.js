define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Dialog=require("./Dialog");var insertAtCaret=require("../helpers/insertAtCaret");var CharacterInputDialog=function(_Dialog){_inherits(CharacterInputDialog,_Dialog);function CharacterInputDialog(elem){_classCallCheck(this,CharacterInputDialog);_get(Object.getPrototypeOf(CharacterInputDialog.prototype),"constructor",this).call(this,elem);this.textArea=elem.find("textarea");elem.find(".characters span").on("mousedown",this.clickChar.bind(this));elem.find(".button.insert").on("click",this.clickInsert.bind(this));elem.find(".button.clear").on("click",this.clickClear.bind(this));elem.find(".button.cancel").on("click",this.close.bind(this))}_createClass(CharacterInputDialog,[{key:"clickChar",value:function clickChar(e){e.preventDefault()
;insertAtCaret(this.textArea[0],e.target.textContent)}},{key:"clickInsert",value:function clickInsert(e){this.options.onInsert(this.textArea[0].value)}},{key:"clickClear",value:function clickClear(e){this.textArea[0].value=""}}]);return CharacterInputDialog}(Dialog);module.exports=CharacterInputDialog},{"../helpers/insertAtCaret":583,"./Dialog":498}]
});
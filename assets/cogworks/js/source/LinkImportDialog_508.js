define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Dialog=require("./Dialog");var LinkImportDialog=function(_Dialog){_inherits(LinkImportDialog,_Dialog);function LinkImportDialog(elem){_classCallCheck(this,LinkImportDialog);_get(Object.getPrototypeOf(LinkImportDialog.prototype),"constructor",this).call(this,elem);this.importButton=elem.find(".button.import");this.importButton.on("click",this.onImport.bind(this));this.urlInput=elem.find("input");this.urlInput.on("input",this.urlInputChanged.bind(this));this.working=false;elem.find(".button.cancel").on("click",this.close.bind(this))}_createClass(LinkImportDialog,[{key:"urlInputChanged",value:function urlInputChanged(){this.importButton.toggleClass("disable",!this.isURLValid())}},{key:"isURLValid",value:function isURLValid(){return this.urlInput[0].value.trim().length>0&&this.urlInput[0].validity.valid}},{key:"open",value:function open(options){this.stopWorking();this.urlInput.val(options.url||"");this.importButton.addClass("disable");_get(Object.getPrototypeOf(LinkImportDialog.prototype),"open",this).call(this,options);this.urlInput.focus();if(options.buttonText){this.importButton.text(options.buttonText)}this.urlInputChanged()}},{key:"startWorking",value:function startWorking(){this.working=true;this.importButton.text("Working")}},{key:"stopWorking",value:function stopWorking(){this.working=false;this.importButton.text("Import")}},{key:"isWorking",value:function isWorking(){return this.working}},{key:"onImport",value:function onImport(){this.options.onSave(this.urlInput[0].value);this.close()}}]);return LinkImportDialog}(Dialog);module.exports=LinkImportDialog},{"./Dialog":498}]
});
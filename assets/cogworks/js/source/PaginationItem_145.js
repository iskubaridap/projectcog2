define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x2,_x3,_x4){var _again=true;_function:while(_again){var object=_x2,property=_x3,receiver=_x4;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x2=parent;_x3=property;_x4=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Component=require("../base/Component");var PaginationItem=function(_Component){_inherits(PaginationItem,_Component);function PaginationItem(elem){_classCallCheck(this,PaginationItem);_get(Object.getPrototypeOf(PaginationItem.prototype),"constructor",this).call(this);this.element=null;var that=this;this.defineProperties([{id:"type",label:"Type",type:"select",value:"default",options:PaginationItem.possibleTypes},{id:"disabled",label:"Disabled",type:"checkbox",value:false},{id:"active",label:"Active",type:"checkbox",value:false},{id:"value",label:"Value",type:"textbox",value:"",visible:function visible(){return that.properties.type=="default"}}])}_createClass(PaginationItem,[{key:"isActive",value:function isActive(){return this.properties.active}},{key:"setActive",value:function setActive(){var status=arguments.length<=0||arguments[0]===undefined?true:arguments[0];return this.properties.active=status}},{key:"canBeDroppedIn",value:function canBeDroppedIn(component){var Pagination=require("./Pagination");return _get(Object.getPrototypeOf(PaginationItem.prototype),"canBeDroppedIn",this).call(this,component)&&component instanceof Pagination}},{key:"injectOptions",value:function injectOptions(){_get(Object.getPrototypeOf(PaginationItem.prototype),"injectOptions",this).call(this);var framework=this.framework();framework.injectLinkOptions(this)}},{key:"update",value:function update(){var link=this.element.find("a");link.removeAttr("aria-label");link.empty();if(this.properties.type=="previous"){link.attr("aria-label","Previous");link.html('<span aria-hidden="true">&laquo;</span>')}else if(this.properties.type=="next"){link.attr("aria-label","Next");link.html('<span aria-hidden="true">&raquo;</span>')}else{link.text(this.properties.value)}this.cssClasses.system.main=this.className;if(this.properties.disabled){this.cssClasses.system.main+=" disabled"}if(this.properties.active){this.cssClasses.system.main+=" active";link.add('<span class="sr-only">(current)</span>')}this.framework().linkDOMNodeUpdate(this,link[0]);return _get(Object.getPrototypeOf(PaginationItem.prototype),"update",this).call(this)}}]);return PaginationItem}(Component);PaginationItem.possibleTypes=[{label:"Default",value:"default"},{label:"Previous",value:"previous"},{label:"Next",value:"next"}];PaginationItem.prettyName="Pagination Item";module.exports=PaginationItem},{"../base/Component":39,"./Pagination":144}]
});
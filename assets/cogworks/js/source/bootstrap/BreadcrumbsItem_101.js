define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x2,_x3,_x4){var _again=true;_function:while(_again){var object=_x2,property=_x3,receiver=_x4;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property)
;if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x2=parent;_x3=property;_x4=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithChildren=require("../base/ComponentWithChildren");var Span=require("./Span");var BreadcrumbsItem=function(_ComponentWithChildren){_inherits(BreadcrumbsItem,_ComponentWithChildren);function BreadcrumbsItem(){_classCallCheck(this,BreadcrumbsItem);_get(Object.getPrototypeOf(BreadcrumbsItem.prototype),"constructor",this).call(this);this.element=$("<li>");this.defineProperties([{id:"active",label:"Active",type:"checkbox",value:false}])}_createClass(BreadcrumbsItem,[{key:"initialize",value:function initialize(txt){var span=new Span;span.initialize(txt);span.fixate();this.insertFirst(span)}},{key:"canBeDroppedIn",value:function canBeDroppedIn(component){var Breadcrumbs=require("./Breadcrumbs");return _get(Object.getPrototypeOf(BreadcrumbsItem.prototype),"canBeDroppedIn",this).call(this,component)&&component instanceof Breadcrumbs}},{key:"isActive",value:function isActive(){return this.properties.active}},{key:"injectOptions",value:function injectOptions(){var _this=this;_get(Object.getPrototypeOf(BreadcrumbsItem.prototype),"injectOptions",this).call(this);var framework=this.framework();framework.injectLinkOptions(this,"",function(){return!_this.properties.active})}},{key:"setActive",value:function setActive(){var status=arguments.length<=0||arguments[0]===undefined?true:arguments[0];return this.properties.active=status}},{key:"update",value:function update(){this.cssClasses.system.main=this.className;if(this.properties.active){this.cssClasses.system.main+=" active"}_get(Object.getPrototypeOf(BreadcrumbsItem.prototype),"startUpdate",this).call(this);if(!this.properties.active){var a=document.createElement("a");this.framework().linkDOMNodeUpdate(this,a);this.element.children().appendTo(a);this.element.append(a)}return _get(Object.getPrototypeOf(BreadcrumbsItem.prototype),"finishUpdate",this).call(this)}}]);return BreadcrumbsItem}(ComponentWithChildren);BreadcrumbsItem.prettyName="Breadcrumbs Item";module.exports=BreadcrumbsItem},{"../base/ComponentWithChildren":40,"./Breadcrumbs":100,"./Span":151}]
});
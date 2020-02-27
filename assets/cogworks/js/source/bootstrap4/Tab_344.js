define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x3,_x4,_x5){var _again=true;_function:while(_again){var object=_x3,property=_x4,receiver=_x5;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x3=parent;_x4=property;_x5=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var TabBase=require("../bootstrap/Tab");var Anchor=require("./Anchor");var Tab=function(_TabBase){_inherits(Tab,_TabBase);function Tab(){_classCallCheck(this,Tab);_get(Object.getPrototypeOf(Tab.prototype),"constructor",this).apply(this,arguments)}_createClass(Tab,[{key:"initialize",value:function initialize(text,url){var active=arguments.length<=2||arguments[2]===undefined?false:arguments[2];var disabled=arguments.length<=3||arguments[3]===undefined?false:arguments[3];var link=new Anchor;link.initialize(text,url);link.fixate();this.insertFirst(link);this.properties.disabled=disabled;this.properties.active=active}},{key:"getType",value:function getType(){return this.parent.properties.type}},{key:"update",value:function update(){this.cssClasses.system.main="nav-item";this.children[0].cssClasses.parent="";if(this.properties.disabled){this.children[0].cssClasses.parent+=" disabled"}if(this.isActive()){this.children[0].cssClasses.parent+=" active"}this.children[0].attributes["role"]="tab";this.children[0].attributes["data-toggle"]=this.getType();return _get(Object.getPrototypeOf(Tab.prototype),"update",this).call(this)}}]);return Tab}(TabBase);module.exports=Tab},{"../bootstrap/Tab":152,"./Anchor":268}]
});
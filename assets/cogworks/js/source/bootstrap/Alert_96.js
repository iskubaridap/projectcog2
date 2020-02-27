define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x2,_x3,_x4){var _again=true;_function:while(_again){var object=_x2,property=_x3,receiver=_x4;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x2=parent;_x3=property;_x4=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Div=require("../base/Div");var Span=require("./Span");var Alert=function(_Div){_inherits(Alert,_Div);function Alert(){_classCallCheck(this,Alert);_get(Object.getPrototypeOf(Alert.prototype),"constructor",this).call(this);this.defineProperties([{id:"style",label:"Style",type:"select",value:"alert-success",options:this.possibleStyles},{id:"dismissable",label:"Dismissable",type:"checkbox",value:false}])}_createClass(Alert,[{key:"initialize",value:function initialize(){var txt=arguments.length<=0||arguments[0]===undefined?"<b>Alert</b> text.":arguments[0];var span=new Span;span.initialize(txt);span.blacklist=["link"];this.insertFirst(span)}},{key:"update",value:function update(){this.cssClasses.system.main="alert "+this.properties.style;this.attributes.role="alert";_get(Object.getPrototypeOf(Alert.prototype),"startUpdate",this).call(this);if(this.properties.dismissable){this.element.prepend('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>')}return _get(Object.getPrototypeOf(Alert.prototype),"finishUpdate",this).call(this)}},{key:"possibleStyles",get:function get(){return[]}}]);return Alert}(Div);Alert.description="Use this component to show a message to users of your web app. Usually it is displayed near the top of your page. It can have an optional dismiss button and you can choose one of several color themes.";module.exports=Alert},{"../base/Div":43,"./Span":151}]
});
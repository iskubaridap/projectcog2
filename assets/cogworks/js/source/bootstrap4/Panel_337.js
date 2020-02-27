define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Card=require("./Card");var CardHeader=require("./CardHeader");var CardBody=require("./CardBody");var Heading=require("./Heading");var Paragraph=require("../bootstrap/Paragraph");var Panel=function(_Card){_inherits(Panel,_Card);function Panel(){_classCallCheck(this,Panel);_get(Object.getPrototypeOf(Panel.prototype),"constructor",this).apply(this,arguments)}_createClass(Panel,[{key:"initialize",value:function initialize(){var header=new CardHeader;header.initialize();this.insertFirst(header);var title=new Heading;title.initialize("Heading");title.properties.type="h5";title.setOverride("/","class","mb-0");title.properties.cardStyle="card-title";header.insertLast(title);var body=new CardBody;body.initialize();this.insertLast(body);var text=new Paragraph;text.initialize("Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.");text.properties.cardStyle="card-text";body.insertLast(text)}}]);return Panel}(Card);Panel.description="Panels are a variation of the Bootstrap 4 Card component. They can include headers, footers and multiple color styles.";module.exports=Panel},{"../bootstrap/Paragraph":146,"./Card":277,"./CardBody":278,"./CardHeader":281,"./Heading":307}]
});
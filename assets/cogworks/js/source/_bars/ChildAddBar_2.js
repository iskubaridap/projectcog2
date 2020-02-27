define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentControlBar=require("./ComponentControlBar");var ChildAddBar=function(_ComponentControlBar){_inherits(ChildAddBar,_ComponentControlBar);function ChildAddBar(){_classCallCheck(this,ChildAddBar);_get(Object.getPrototypeOf(ChildAddBar.prototype),"constructor",this).apply(this,arguments)}_createClass(ChildAddBar,[{key:"initialize",value:function initialize(options){var that=this;this.options=options;this.weight=0;var conf={id:options.id,items:[{type:"label",text:"Add to "+this.component.getName()}]};options.children.forEach(function(Child){conf.items.push({type:"button",text:Child.getName(),onClick:function onClick(){that.addChild(Child)}})});if(options.injectBefore){var _conf$items;(_conf$items=conf.items).unshift.apply(_conf$items,_toConsumableArray(options.injectBefore))}if(options.injectAfter){var _conf$items2;(_conf$items2=conf.items).push.apply(_conf$items2,_toConsumableArray(options.injectAfter))}_get(Object.getPrototypeOf(ChildAddBar.prototype),"initialize",this).call(this,conf)}},{key:"addChild",value:function addChild(Child){var item=new Child;item.initialize();var component=this.component;if(this.options.target){component=this.options.target}component.insertLast(item);component.update();app.context.history.add({name:"Add "+Child.getName(),undo:function undo(){item.remove();component.update()},redo:function redo(){component.insertLast(item);component.update()}})}}]);return ChildAddBar}(ComponentControlBar);module.exports=ChildAddBar},{"./ComponentControlBar":4}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentWithChildren=require("../base/ComponentWithChildren");var Button=require("./Button");var Paragraph=require("./Paragraph");var Anchor=require("./Anchor");var NavBarBrand=require("./NavBarBrand");var NavBarToggle=require("./NavBarToggle");var NavBar=function(_ComponentWithChildren){_inherits(NavBar,_ComponentWithChildren);function NavBar(){_classCallCheck(this,NavBar);_get(Object.getPrototypeOf(NavBar.prototype),"constructor",this).call(this);this.element=$("<nav>");this.openedInCanvas=false}_createClass(NavBar,[{key:"injectOptions",value:function injectOptions(){_get(Object.getPrototypeOf(NavBar.prototype),"injectOptions",this).call(this);var navBarOptions=this.getMainOptionsGroup();navBarOptions.add(this.createCheckBoxForSubComponent("showBrand","Brand",NavBarBrand,function(parent,child){parent.insertFirst(child)}))}},{key:"isMenuCollapsed",value:function isMenuCollapsed(){return false}},{key:"isMenuOpen",value:function isMenuOpen(){return this.openedInCanvas}},{key:"openMenu",value:function openMenu(){this.openedInCanvas=!this.isMenuOpen();this.update()}},{key:"getOpenMenuToolbarOption",value:function getOpenMenuToolbarOption(){var that=this;return[{type:"label",text:"Navbar"},{type:"button",text:function text(){return that.isMenuOpen()?"Close":"Open"},onClick:that.openMenu.bind(this),isActive:function isActive(){return that.isMenuCollapsed()}},{type:"spacer"}]}},{key:"canTakeChild",value:function canTakeChild(component){return false}},{key:"childClean",value:function childClean(child){}},{key:"undrop",value:function undrop(component){this.childClean(component)}},{key:"resetNavCollapseID",value:function resetNavCollapseID(path){this.setOverride(path,"id",app.canvas.generateUniqueID("navcol"))}},{key:"addItemsToNavigation",value:function addItemsToNavigation(items){var Nav=require("./Nav");var nav=this.findChildrenOfType(Nav)[0];if(nav){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=items[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;nav.insertAt(item.component,item.index)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}}},{key:"removeItemsFromNavigation",value:function removeItemsFromNavigation(items){var Nav=require("./Nav");var nav=this.findChildrenOfType(Nav)[0];if(nav){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=items[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var item=_step2.value;nav.childAt(item.index).remove()}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2["return"]){_iterator2["return"]()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}}},{key:"possibleStyles",get:function get(){return[]}},{key:"possiblePositions",get:function get(){return[]}}]);return NavBar}(ComponentWithChildren);NavBar.prettyName="Navbar";NavBar.description="The Nav Bar is a fully featured Bootstrap component for building website navigation menus. It is fully responsive and supports a large number of options. Can be fixed to the top/bottom of the page or fluid.";module.exports=NavBar},{"../base/ComponentWithChildren":40,"./Anchor":97,"./Button":102,"./Nav":139,"./NavBarBrand":141,"./NavBarToggle":142,"./Paragraph":146}]
});
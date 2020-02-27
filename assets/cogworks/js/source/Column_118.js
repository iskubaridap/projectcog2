define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x4,_x5,_x6){var _again=true;_function:while(_again){var object=_x4,property=_x5,receiver=_x6;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x4=parent;_x5=property;_x6=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ComponentControlBar=require("../../bars/ComponentControlBar");var ColumnBase=require("../base/Column");var Column=function(_ColumnBase){_inherits(Column,_ColumnBase);function Column(){_classCallCheck(this,Column);_get(Object.getPrototypeOf(Column.prototype),"constructor",this).call(this)}_createClass(Column,[{key:"getDefaultValue",value:function getDefaultValue(prefix,id){var postfix=arguments.length<=2||arguments[2]===undefined?"":arguments[2];var def=arguments.length<=3||arguments[3]===undefined?0:arguments[3]}},{key:"canBeOffset",value:function canBeOffset(){return false}},{key:"canBeResized",value:function canBeResized(){return true}},{key:"canAddColumn",value:function canAddColumn(){return this.parent&&this.parent.canTakeChild(this)}},{key:"addColumnBefore",value:function addColumnBefore(comp){if(!this.canAddColumn())return;this.addColumnAction(this.parent.childIndex(this))}},{key:"addColumnAfter",value:function addColumnAfter(comp){if(!this.canAddColumn())return;this.addColumnAction(this.parent.childIndex(this)+1)}},{key:"addColumnEnd",value:function addColumnEnd(){if(!this.canAddColumn())return;this.addColumnAction()}},{key:"addColumnAction",value:function addColumnAction(){var index=arguments.length<=0||arguments[0]===undefined?null:arguments[0];var col=new this.constructor;col.initialize();var row=this.parent;if(index==null){index=row.children.length}row.insertAt(col,index);row.update();app.context.history.add({name:"Add Column",undo:function undo(){col.remove();row.update()},redo:function redo(){row.insertAt(col,index);row.update()}})}},{key:"createToolbar",value:function createToolbar(comp){if(comp!=this&&comp.parent!=this)return;var toolbar=new ComponentControlBar(this);var that=this;var items=[];if(this.canBeOffset()){items.push({type:"label",text:"Column Position"},{type:"button",title:"Move Left",classes:"icon",content:'<i class="material-icons">arrow_back</i>',onClick:this.moveLeftAction.bind(this)},{type:"button",title:"Move Right",classes:"icon",content:'<i class="material-icons">arrow_forward</i>',onClick:this.moveRightAction.bind(this)},{type:"spacer"})}if(this.canBeResized()){items.push({type:"label",text:"Column Size"},{type:"button",
title:"Make Wider",classes:["widen","icon"],content:'<i class="material-icons">keyboard_arrow_left</i><i class="material-icons">keyboard_arrow_right</i>',onClick:this.widenAction.bind(this)},{type:"button",title:"Make Narrower",classes:["narrow","icon"],content:'<i class="material-icons">keyboard_arrow_right</i><i class="material-icons">keyboard_arrow_left</i>',onClick:this.narrowAction.bind(this)},{type:"spacer"})}items.push({type:"label",text:"Add Column"},{type:"button",text:"Before",isActive:function isActive(){return that.canAddColumn()},onClick:function onClick(){that.addColumnBefore(app.getFocusedComponent())}},{type:"button",text:"After",isActive:function isActive(){return that.canAddColumn()},onClick:function onClick(){that.addColumnAfter(app.getFocusedComponent())}},{type:"button",text:"End",isActive:function isActive(){return that.canAddColumn()},onClick:function onClick(){that.addColumnEnd()}});toolbar.initialize({id:"column-control-bar",items:items});return toolbar}},{key:"moveLeftAction",value:function moveLeftAction(){var size=app.canvas.getBreakpoint();var column=this;var oldOffset=column.properties["col"+size+"Offset"];var offset=this.getDefaultValue("col",size,"Offset",0);if(offset==0){return}var newOffset=offset-1;column.properties["col"+size+"Offset"]=newOffset;column.update();app.context.history.add({name:"Change Column Offset",undo:function undo(){column.properties["col"+size+"Offset"]=oldOffset;column.update()},redo:function redo(){column.properties["col"+size+"Offset"]=newOffset;column.update()}})}},{key:"moveRightAction",value:function moveRightAction(){var size=app.canvas.getBreakpoint();var column=this;var oldOffset=column.properties["col"+size+"Offset"];var offset=this.getDefaultValue("col",size,"Offset",0);if(offset==this.maxOffset){return}var newOffset=offset+1;column.properties["col"+size+"Offset"]=newOffset;column.update();app.context.history.add({name:"Change Column Offset",undo:function undo(){column.properties["col"+size+"Offset"]=oldOffset;column.update()},redo:function redo(){column.properties["col"+size+"Offset"]=newOffset;column.update()}})}},{key:"widenAction",value:function widenAction(){var size=app.canvas.getBreakpoint();var column=this;var oldWidth=column.properties["col"+size];var width=this.getDefaultValue("col",size,"",12);if(width==12){return}var newWidth=width+1;column.properties["col"+size]=newWidth;column.update();app.context.history.add({name:"Change Column Width",undo:function undo(){column.properties["col"+size]=oldWidth;column.update()},redo:function redo(){column.properties["col"+size]=newWidth;column.update()}})}},{key:"narrowAction",value:function narrowAction(){var size=app.canvas.getBreakpoint();var column=this;var oldWidth=column.properties["col"+size];var width=this.getDefaultValue("col",size,"",12);if(width==1){return}var newWidth=width-1;column.properties["col"+size]=newWidth;column.update();app.context.history.add({name:"Change Column Width",undo:function undo(){column.properties["col"+size]=oldWidth;column.update()},redo:function redo(){column.properties["col"+size]=newWidth;column.update()}})}},{key:"maxOffset",get:function get(){return 12}}]);return Column}(ColumnBase);Column.description="This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel.";module.exports=Column},{"../../bars/ComponentControlBar":4,"../base/Column":38}]
});
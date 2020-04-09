define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true
;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x4,_x5,_x6){var _again=true;_function:while(_again){var object=_x4,property=_x5,receiver=_x6;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x4=parent;_x5=property;_x6=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var OptionItemWithChildren=require("./OptionItemWithChildren");var getSmartProp=require("../helpers/getSmartProp");var TextBoxOption=function(_OptionItemWithChildren){_inherits(TextBoxOption,_OptionItemWithChildren);function TextBoxOption(options){_classCallCheck(this,TextBoxOption);_get(Object.getPrototypeOf(TextBoxOption.prototype),"constructor",this).call(this,options);this.element=$('<div class="option textboxoption">'+'<label class="option-content">'+"<span>"+this._options.label+'<i class="caret"></i></span>'+'<div class="control">'+'<input type="text" value="" />'+'<span class="warning-badge"></span>'+"</div>"+"</label>"+'<div class="children"></div>'+"</div>");this.childHolder=this.element.find(".children");this.textInput=this.element.find("input[type=text]");this.caret=this.element.find(".caret");this.labelSpan=this.element.find("label span");this.control=this.element.find("label .control");this.warningBadge=this.element.find("label .warning-badge").hide();this.showIncrementHandle=options.showIncrementHandle||false;this.incrementStep=options.incrementStep||1;this.showColorPreview=options.showColorPreview||false;this.showButton=options.showButton||false;if(this.showIncrementHandle){this.element.addClass("has-addon");this.control.append('<span class="addon increment-handle"><i></i></span>')}this.isHandleDragged=false;if(this.showColorPreview){this.element.addClass("has-addon");this.control.append('<span class="addon color-preview"><i></i></span>')}this.colorPreview=this.element.find("> label .color-preview");if(this.showButton){var icon="add_circle";if(this._options.buttonIcon){icon=this._options.buttonIcon}this.element.addClass("has-addon");this.control.append('<span class="addon button-addon"><i class="material-icons">'+icon+"</i></span>");if(icon=="arrow_drop_down"){this.control.find(".button-addon i").css("font-size","18px")}}this.button=this.element.find("> label .button-addon");this._onChangePreviewCallback=this.onChangePreview.bind(this)}_createClass(TextBoxOption,[{key:"bindEventListeners",value:function bindEventListeners(){this.textInput.off(".tboption");this.textInput.on("focusout.tboption",this.focusout.bind(this));this.textInput.on("keydown.tboption",this.keydownHandler.bind(this));this.textInput.on("input.tboption",this.inputHandler.bind(this));this.labelSpan.off("click").on("click",this.clickLabelSpan.bind(this));var handle=this.element.find("> label .increment-handle");handle.off("mousedown").on("mousedown",this.incrementHandleMousedown.bind(this));this.colorPreview.off("click").on("click",this.colorPreviewClick.bind(this));this.button.off("click").on("click",this.buttonClick.bind(this))}},{key:"keydownHandler",value:function keydownHandler(e){_get(Object.getPrototypeOf(TextBoxOption.prototype),"keydownHandler",this).call(this,e);if(e.which==38||e.which==40){var direction=e.which==38?1:-1;if(/\d+/.test(e.target.value)){var pos=e.target.selectionStart;var oldLength=e.target.value.length;e.target.value=e.target.value.replace(/(-\d+\.\d+|\d+\.\d+|-\d+|\d+)(?:vw|vh|vmin|vmax|px|pt|pc|ex|em|rem|ch|cm|mm|in|deg|\b)\b/g,function(match,num,offset){if(pos<offset||pos>offset+match.length){return match}var numb=Number(num)+direction;var suffix=match.replace(num,"");if(e.ctrlKey){numb=Number(num)+direction*100}else if(e.shiftKey){numb=Number(num)+direction*10}else if(e.altKey){numb=(Number(num)*10+direction)/10}if(numb!=Math.round(numb)){return numb.toFixed(1)+suffix}return numb+suffix});var newLength=e.target.value.length;this.onChangePreview();var offset=Math.min(pos+newLength-oldLength,e.target.value.length);e.target.setSelectionRange(offset,offset);e.preventDefault()}}}},{key:"incrementHandleMousedown",value:function incrementHandleMousedown(e){var _this=this;e.preventDefault();if(this.isHandleDragged){return}if(document.activeElement){document.activeElement.blur()}var regex=/^(-\d+\.\d+|\d+\.\d+|-\d+|\d+)(.*)$/;var text=this.textInput.val().trim();if(!text.length&&this._options.defaultIncrementValue){text=this._options.defaultIncrementValue()}if(!text||!regex.test(text)){return}var matches=text.match(regex);var value=Number(matches[1]);var rest=matches[2];var originalPosition=app.mousePosition.clone();var floatingSanity=1;if(matches[1].indexOf(".")>-1){floatingSanity=Math.pow(10,matches[1].split(".")[1].length);value*=floatingSanity}this.isHandleDragged=true;bod.addClass("resizing-y");app.on("mousemove.textbox-option",function(){var diff=Math.floor((originalPosition.y-app.mousePosition.y)/2)*_this.incrementStep*floatingSanity;_this.textInput.val((value+diff)/floatingSanity+rest);_this.onChangePreview()});app.on("mouseup.textbox-option",function(e){_this.stopDragging();if(e.button==2){_this.discardChanges()}else{_this.commitChanges()}_this.unfocus()});var that=this;app.on("keydown.textbox-option",function(e){if(e.which==27){that.discardChanges()}},-10)}},{key:"getColorValue",value:function getColorValue(){var defaultValue=arguments.length<=0||arguments[0]===undefined?"":arguments[0];var colorValue=this.getValue();if(!colorValue){if(this._options.placeholder){colorValue=getSmartProp(this._options.placeholder,defaultValue)}else{colorValue=defaultValue}}return colorValue}},{key:"colorPreviewClick",value:function colorPreviewClick(e){e.preventDefault();var that=this;var colorValue=this.getColorValue("#ffffff");if(colorValue=="transparent"){colorValue="#ffffff"}app.colorPicker.open({color:colorValue,point:app.mousePosition,onChange:function onChange(color){that.textInput.val(color);that.updateColorPreview(color);that.onChangePreview()},onSelect:function onSelect(color){that.stopDragging();that.commitChanges();that.unfocus()},onCancel:function onCancel(){that.discardChanges()}})}},{key:"buttonClick",value:function buttonClick(e){e.preventDefault();this._options.buttonAction(this,e)}},{key:"inputHandler",value:function inputHandler(){this.scheduleOnChangePreview(100)}},{key:"commitChanges",value:function commitChanges(){this.clearChangePreview();_get(Object.getPrototypeOf(TextBoxOption.prototype),"commitChanges",this).call(this)}},{key:"discardChanges",value:function discardChanges(){_get(Object.getPrototypeOf(TextBoxOption.prototype),"discardChanges",this).call(this);this.stopDragging();this.textInput.val(this.getValue());this.onChangePreview();if(this.showColorPreview){this.updateColorPreview()}}},{key:"onChangePreview",value:function onChangePreview(){if(this._options.onChangePreview){this._options.onChangePreview(this.textInput.val())}}},{key:"clearChangePreview",value:function clearChangePreview(){if(this._options.onChangePreview){this._options.onChangePreview()}}},{key:"scheduleOnChangePreview",value:function scheduleOnChangePreview(){var time=arguments.length<=0||arguments[0]===undefined?20:arguments[0];clearTimeout(this._onChangePreviewTimer);this._onChangePreviewTimer=setTimeout(this._onChangePreviewCallback,time)}},{key:"stopDragging",value:function stopDragging(){this.isHandleDragged=false;app.off(".textbox-option");bod.removeClass("resizing-y")}},{key:"clickLabelSpan",value:function clickLabelSpan(e){if(!this.hasChildren()){return}e.preventDefault();this.toggleCollapse()}},{key:"destructor",value:function destructor(){if(this.isVisible()&&this.val()!=this.getValue()){try{this.changeHandler()}catch(e){}}if(this.isHandleDragged){this.stopDragging()}}},{key:"val",value:function val(v){if(v!==undefined){this.textInput.val(v);return}return this.textInput.val()}},{key:"focusout",value:function focusout(){try{this.changeHandler()}catch(e){return false}}},{key:"updateColorPreview",value:function updateColorPreview(){var val=arguments.length<=0||arguments[0]===undefined?"":arguments[0];this.colorPreview.find("i").css("background-color",val||this.getColorValue())}},{key:"update",value:function update(){_get(Object.getPrototypeOf(TextBoxOption.prototype),"update",this).call(this);this.childHolder.empty();this.childHolder.append(this.children.map(function(c){return c.item.update()}));this.textInput.val(this.getValue());this.textInput.attr("title",this.getValue());if(this.hasChildren()){this.caret.css("display","inline-block")}else{this.caret.hide()}if(this._options.placeholder){this.textInput.attr("placeholder",getSmartProp(this._options.placeholder,""))}this.warningBadge.hide();if(this._options.badge){var badgeResult=this._options.badge();if(badgeResult&&badgeResult.message){this.warningBadge[0].className="badge "+(badgeResult["class"]||"");this.warningBadge.show().html(badgeResult.content).attr("title",badgeResult.message)}}if(this.showColorPreview){this.updateColorPreview()}this.bindEventListeners();return this.element}}]);return TextBoxOption}(OptionItemWithChildren);module.exports=TextBoxOption},{"../helpers/getSmartProp":575,"./OptionItemWithChildren":1231}]
});
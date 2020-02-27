define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var OptionItem=require("./OptionItem");var InfoOption=function(_OptionItem){_inherits(InfoOption,_OptionItem);function InfoOption(options){_classCallCheck(this,InfoOption);_get(Object.getPrototypeOf(InfoOption.prototype),"constructor",this).call(this,options);this.element=$('<div class="info-option">\n\t\t\t<div class="margin">\n\t\t\t\t<div class="box-row blue">\n\t\t\t\t\t<span class="margin-top" title="Margin Top"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class="box-row middle">\n\t\t\t\t\t<div class="box-col blue">\n\t\t\t\t\t\t<span class="margin-left" title="Margin Left"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="box-col padding">\n\t\t\t\t\t\t<div class="box-row green">\n\t\t\t\t\t\t\t<span class="padding-top" title="Padding Top"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="box-row middle">\n\t\t\t\t\t\t\t<div class="box-col green">\n\t\t\t\t\t\t\t\t<span class="padding-left" title="Padding Left"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="box-col middle empty"></div>\n\t\t\t\t\t\t\t<div class="box-col green">\n\t\t\t\t\t\t\t\t<span class="padding-right" title="Padding Right"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="box-row green">\n\t\t\t\t\t\t\t<span class="padding-bottom" title="Padding Bottom"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="box-col blue">\n\t\t\t\t\t\t<span class="margin-right" title="Margin Right"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="box-row blue">\n\t\t\t\t\t<span class="margin-bottom" title="Margin Bottom"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="dimensions">\n\t\t\t\t<span class="size x"><i>X</i><b></b></span>\n\t\t\t\t<span class="size y"><i>Y</i><b></b></span>\n\t\t\t\t<span class="size width"><i>W</i><b></b></span>\n\t\t\t\t<span class="size height"><i>H</i><b></b></span>\n\t\t\t</div>\n\t\t</div>');this.xField=this.element.find(".x b");this.yField=this.element.find(".y b");this.wField=this.element.find(".width b");this.hField=this.element.find(".height b");this.mTop=this.element.find(".margin-top");this.mBottom=this.element.find(".margin-bottom");this.mLeft=this.element.find(".margin-left");this.mRight=this.element.find(".margin-right");this.pTop=this.element.find(".padding-top");this.pBottom=this.element.find(".padding-bottom");this.pLeft=this.element.find(".padding-left");this.pRight=this.element.find(".padding-right")}_createClass(InfoOption,[{key:"bindEventListeners",value:function bindEventListeners(){this.element.off("click").on("click",".size",this.clickB.bind(this))}},{key:"clickB",value:function clickB(e){e.preventDefault();var selection=window.getSelection();var range=document.createRange();range.selectNodeContents(e.currentTarget.querySelector("b"));selection.removeAllRanges();selection.addRange(range)}},{key:"updateInfo",value:function updateInfo(){this.xField.text(Math.round(this._options.component.computedX));this.yField.text(Math.round(this._options.component.computedY));this.wField.text(Math.round(this._options.component.width));this.hField.text(Math.round(this._options.component.height));var computedStyle=window.getComputedStyle(this._options.component.element[0]);this.mTop.text(parseInt(computedStyle.marginTop,10));this.mBottom.text(parseInt(computedStyle.marginBottom,10));this.mLeft.text(parseInt(computedStyle.marginLeft,10));this.mRight.text(parseInt(computedStyle.marginRight,10));this.pTop.text(parseInt(computedStyle.paddingTop,10));this.pBottom.text(parseInt(computedStyle.paddingBottom,10));this.pLeft.text(parseInt(computedStyle.paddingLeft,10));this.pRight.text(parseInt(computedStyle.paddingRight,10))}},{key:"update",value:function update(){_get(Object.getPrototypeOf(InfoOption.prototype),"update",this).call(this);this.updateInfo();this.bindEventListeners();return this.element}}]);return InfoOption}(OptionItem);module.exports=InfoOption},{"./OptionItem":1229}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x4,_x5,_x6){var _again=true;_function:while(_again){var object=_x4,property=_x5,receiver=_x6;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x4=parent;_x5=property;_x6=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Resource=require("./Resource")
;var restoreCSSList=require("../helpers/restoreCSSList");var escapeInlineStyleContent=require("../helpers/escapeInlineStyleContent");var CSSKeyframes=require("../base/CSSKeyframes");var parseCSS=require("../helpers/parseCSS");var createHash=require("../helpers/createHash");var CSSResource=function(_Resource){_inherits(CSSResource,_Resource);_createClass(CSSResource,null,[{key:"isNameValid",value:function isNameValid(name){return Resource.isNameValid(name)&&/\.css$/.test(name)}}]);function CSSResource(name){var blocks=arguments.length<=1||arguments[1]===undefined?[]:arguments[1];_classCallCheck(this,CSSResource);_get(Object.getPrototypeOf(CSSResource.prototype),"constructor",this).call(this,name);this.blocks=blocks;this.extension="css";this.linkElement=$("<link>");this.styleElement=$("<style>")}_createClass(CSSResource,[{key:"createEditor",value:function createEditor(){var CSSEditor=require("../editors/CSSEditor");return new CSSEditor(this)}},{key:"getHash",value:function getHash(context){return createHash(this.generateCSS(context))}},{key:"hasBlock",value:function hasBlock(bl){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.blocks[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var block=_step.value;if(block==bl)return true;if(block instanceof CSSKeyframes){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=block.blocks[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var block2=_step2.value;if(block2==bl)return true}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2["return"]){_iterator2["return"]()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}return false}},{key:"isEmpty",value:function isEmpty(){return this.blocks.length==0}},{key:"findIndexForCSSBlock",value:function findIndexForCSSBlock(block){return this.blocks.indexOf(block)}},{key:"deleteCSSBlock",value:function deleteCSSBlock(block){var index=this.findIndexForCSSBlock(block);if(index==-1){return false}this.blocks.splice(index,1);return true}},{key:"deleteCSSBlocksAtIndex",value:function deleteCSSBlocksAtIndex(index){var count=arguments.length<=1||arguments[1]===undefined?1:arguments[1];if(index==-1||index>=this.blocks.length){return false}this.blocks.splice(index,count);return true}},{key:"addCSSBlockAtIndex",value:function addCSSBlockAtIndex(block,index){this.blocks.splice(index,0,block)}},{key:"addCSSBlocksAtIndex",value:function addCSSBlocksAtIndex(blocks,index){this.blocks.splice.apply(this.blocks,[index,0].concat(blocks))}},{key:"getAllKeyframeAnimationNames",value:function getAllKeyframeAnimationNames(){var names=[];var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=this.blocks[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var block=_step3.value;if(block instanceof CSSKeyframes){names.push(block.name)}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3["return"]){_iterator3["return"]()}}finally{if(_didIteratorError3){throw _iteratorError3}}}return names}},{key:"generateCSS",value:function generateCSS(ctx){var depth=arguments.length<=1||arguments[1]===undefined?-1:arguments[1];var opt={};if(ctx.isDesign){opt.skipAnimationProperties=true}var css="",tmp;var blocks=this.blocks;for(var i=0;i<blocks.length;i++){tmp=blocks[i].toString(opt);if(tmp){css=css+tmp+"\n"}}if(depth==-1){depth=ctx.assets.css.getItemDepth(this)}return ctx.processGeneratedCSS(css,depth)}},{key:"toString",value:function toString(){var css="",tmp;var prop={};var blocks=this.blocks;for(var i=0;i<blocks.length;i++){tmp=blocks[i].toString(prop);if(tmp){css=css+tmp+"\n"}}return css.trimRight()}},{key:"importCSSString",value:function importCSSString(str){this.blocks.push.apply(this.blocks,parseCSS(str))}},{key:"updateOverride",value:function updateOverride(context){this.styleElement[0]["bs-tag-override"]={tag:"link",attributes:[{name:"rel",value:"stylesheet"},{name:"href",value:context.assets.css.getRelativePathForItem(this)}]}}},{key:"update",value:function update(context,depth){if(context.isDesign){this.styleElement.html(escapeInlineStyleContent(this.generateCSS(context)));this.updateOverride(context);return this.styleElement}var style=this.linkElement[0];style.rel="stylesheet";style.href=context.getURLForCSS(this,depth);return this.linkElement}},{key:"serialize",value:function serialize(){var obj=_get(Object.getPrototypeOf(CSSResource.prototype),"serialize",this).call(this);obj.blocks=this.blocks.map(function(b){return b.serialize()});return obj}},{key:"unserialize",value:function unserialize(obj){_get(Object.getPrototypeOf(CSSResource.prototype),"unserialize",this).call(this,obj);this.blocks=restoreCSSList(obj.blocks)}}]);return CSSResource}(Resource);module.exports=CSSResource},{"../base/CSSKeyframes":14,"../editors/CSSEditor":527,"../helpers/createHash":553,"../helpers/escapeInlineStyleContent":560,"../helpers/parseCSS":593,"../helpers/restoreCSSList":604,"./Resource":1256}]
});
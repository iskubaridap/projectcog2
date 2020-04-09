define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(_x4,_x5,_x6){var _again=true;_function:while(_again){var object=_x4,property=_x5,receiver=_x6;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{_x4=parent;_x5=property;_x6=receiver;_again=true;desc=parent=undefined;continue _function}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Dialog=require("./Dialog");var googleFonts=require("../config/google-fonts");var parse=require("url").parse;var googleFontRegex=/https?:\/\/fonts\.googleapis\.com\/css\?family=[^"'><\s]+/;var filter=require("fuzzaldrin").filter;var clone=require("clone");var deepEqual=require("deep-equal");var styleToName={100:"thin 100","100i":"thin 100 italic",200:"extra light 200","200i":"extra light 200 italic",300:"light 300","300i":"light 300 italic",400:"regular 400","400i":"regular 400 italic",500:"medium 500","500i":"medium 500 italic",600:"semi-bold 600","600i":"semi-bold 600 italic",700:"bold 700","700i":"bold 700 italic",800:"extra bold 800","800i":"extra bold 800 italic",900:"black 900","900i":"black 900 italic"};var setToName={"latin-ext":"Latin Extended","cyrillic-ext":"Cyrillic Extended","greek-ext":"Greek Extended"};var allSets=["arabic","bengali","cyrillic","cyrillic-ext","devanagari","greek","greek-ext","gujarati","gurmukhi","hebrew","kannada","khmer","latin","latin-ext","malayalam","myanmar","oriya","sinhala","tamil","telugu","thai","vietnamese"];var allCategories=["serif","sans-serif","display","handwriting","monospace"];var FontManagerDialog=function(_Dialog){_inherits(FontManagerDialog,_Dialog);function FontManagerDialog(elem){_classCallCheck(this,FontManagerDialog);_get(Object.getPrototypeOf(FontManagerDialog.prototype),"constructor",this).call(this,elem);this.okButton=elem.find(".button.ok");this.okButton.on("click",this.onOK.bind(this));this.googleFontList=elem.find(".google-font-list");this.searchInput=elem.find("input[type=search]");this.sortSelect=elem.find(".sorting");elem.find(".button.cancel").on("click",this.close.bind(this));this.offset=0;this.searchString="";this.sorting="name";this.fontCache=new Map;this.domToFont=new WeakMap;this.fonts=[];this.originalFonts=[];this.shownSets=[];this.shownCategories=[];this.previewText="";this.searchInput.on("input",this.searchFonts.bind(this));this.googleFontList.on("scroll",this.scrollFonts.bind(this));this.element.on("click",".font .has-options",this.showDropdown.bind(this));this.element.on("click",".font > .checkbox input",this.toggleSelected.bind(this));this.sortSelect.on("change",this.sortingChanged.bind(this));this.element.on("click",".secondary .set-filter",this.setFilter.bind(this));this.element.on("click",".secondary .category-filter",this.categoryFilter.bind(this));this.element.on("input","input[type=text]",this.textInput.bind(this));this.element.on("blur","input[type=text]",this.textBlur.bind(this))}_createClass(FontManagerDialog,[{key:"toggleSelected",value:function toggleSelected(e){var fontDOM=e.target.closest(".font");var font=this.domToFont.get(fontDOM);if(!font)return;font.toggleSelected();this.updateSaveButton()}},{key:"textInput",value:function textInput(e){this.previewText=e.target.value.trim();this.updateTextPreviewFields({except:e.target})}},{key:"textBlur",value:function textBlur(e){var input=e.target;input.value=this.previewText||this.domToFont.get(input).previewText}},{key:"updateTextPreviewFields",value:function updateTextPreviewFields(){var obj=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var inputs=this.element[0].querySelectorAll("input[type=text]");var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=inputs[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var input=_step.value;if(obj.except&&input==obj.except){continue}input.value=this.previewText||this.domToFont.get(input).previewText}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{key:"onOK",value:function onOK(){app.enableRequestMonitoring();var assetGroup=app.context.assets.fonts;var toInsert=this.fonts.filter(function(f){return f.isSelected()}).map(function(f){return assetGroup.createItem(f.family,f.toURL())});var removeOp=assetGroup.removeOp(app.context.getUserFonts());var addOp=assetGroup.addOp(toInsert);removeOp["do"]();addOp["do"]();app.trigger("resource-changed","font","mixed");app.context.history.add({name:"Change Design Fonts",undo:function undo(){removeOp.undo();addOp.undo();app.trigger("resource-changed","font","mixed")},redo:function redo(){removeOp["do"]();addOp["do"]();app.trigger("resource-changed","font","mixed")}});this.close()}},{key:"open",value:function open(options){this.searchString="";this.sorting="name";this.offset=0;this.fonts=[];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=googleFonts[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var font=_step2.value;var tmp=new FontObj;tmp.fromGoogleFont(font);this.fonts.push(tmp)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2["return"]){_iterator2["return"]()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=app.context.getUserFonts()[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var includedFont=_step3.value;var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=this.fonts[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var font=_step4.value;if(includedFont.name==font.family){font.applyFontURL(includedFont.url);font.setSelected(true);break}}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4["return"]){_iterator4["return"]()}}finally{if(_didIteratorError4){throw _iteratorError4}}}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3["return"]){_iterator3["return"]()}}finally{if(_didIteratorError3){throw _iteratorError3}}}this.originalFonts=clone(this.fonts.filter(function(f){return f.isSelected()}));this.fontView=this.fonts.slice();this.shownSets=allSets.slice();this.shownCategories=allCategories.slice();app.disableRequestMonitoring();_get(Object.getPrototypeOf(FontManagerDialog.prototype),"open",this).call(this,options);this.okButton.addClass("disable");this.searchInput.val("");this.sortSelect.val("name")}},{key:"afterClose",value:function afterClose(){this.fontCache.forEach(function(font){return font.remove()});this.fontCache.clear();this.fonts=[];app.enableRequestMonitoring()}},{key:"showDropdown",value:function showDropdown(e){var fontDOM=e.target.closest(".font");var font=this.domToFont.get(fontDOM);if(!font)return;var options=[];var target=$(e.target.closest(".has-options"));var offset=target.offset();if(e.target.classList.contains("styles")){var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=font.variants[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var variant=_step5.value;if(!(variant in styleToName)){continue}var isDefaultVariant=variant==font.getDefaultVariant();var style="font-family: '"+font.family+"', "+font.fallback+";";style+="font-weight:"+variant.replace("i","")+";";if(/i$/.test(variant)){style+="font-style: italic;"}options.push({name:styleToName[variant],action:function(variant,e,value){if(value){font.addUsedVariant(variant)}else{font.removeUsedVariant(variant)}var newDOM=this.renderFont(font);$(fontDOM).replaceWith(newDOM);fontDOM=newDOM;this.updateSaveButton();return false}.bind(this,variant),disabled:isDefaultVariant,checkbox:true,checkboxChecked:font.isVariantUsed(variant)||isDefaultVariant,style:style})}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5["return"]){_iterator5["return"]()}}finally{if(_didIteratorError5){throw _iteratorError5}}}}if(e.target.classList.contains("sets")){var subsets=font.subsets.slice();subsets.sort(function(a,b){return a.localeCompare(b)});var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=subsets[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var subset=_step6.value;var isDefaultSubset=subset==font.getDefaultSubset();options.push({name:subset in setToName?setToName[subset]:subset.slice(0,1).toUpperCase()+subset.slice(1),action:function(subset,e,value){if(value){font.addUsedSubset(subset)}else{font.removeUsedSubset(subset)}var newDOM=this.renderFont(font);$(fontDOM).replaceWith(newDOM);fontDOM=newDOM;this.updateSaveButton();return false}.bind(this,subset),disabled:isDefaultSubset,checkbox:true,checkboxChecked:font.isSubsetUsed(subset)||isDefaultSubset})}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6["return"]){_iterator6["return"]()}}finally{if(_didIteratorError6){throw _iteratorError6}}}}app.contextMenu.show(offset.left,offset.top,options)}},{key:"sortingChanged",value:function sortingChanged(e){this.sorting=e.target.value;this.update()}},{key:"setFilter",value:function setFilter(e){var options=[];var target=$(e.target);var offset=target.offset();options.push({name:"All",action:function(subset){this.shownSets=allSets.slice();this.update()}.bind(this)});var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=allSets[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var subset=_step7.value;options.push({name:subset in setToName?setToName[subset]:subset.slice(0,1).toUpperCase()+subset.slice(1),action:function(subset){this.shownSets=[subset];this.update()}.bind(this,subset)})}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7["return"]){_iterator7["return"]()}}finally{if(_didIteratorError7){throw _iteratorError7}}}app.contextMenu.show(offset.left,offset.top,options)}},{key:"categoryFilter",value:function categoryFilter(e){var options=[];var target=$(e.target);var offset=target.offset();options.push({name:"All",action:function(subset){this.shownCategories=allCategories.slice();this.update()}.bind(this)});var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=allCategories[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var category=_step8.value;options.push({name:category.slice(0,1).toUpperCase()+category.slice(1),action:function(category){this.shownCategories=[category];this.update()}.bind(this,category)})}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8["return"]){_iterator8["return"]()}}finally{if(_didIteratorError8){throw _iteratorError8}}}app.contextMenu.show(offset.left,offset.top,options)}},{key:"searchFonts",value:function searchFonts(e){this.searchString=e.target.value.trim();this.update()}},{key:"scrollFonts",value:function scrollFonts(e){var fromBottom=e.target.scrollHeight-e.target.scrollTop-e.target.offsetHeight;if(fromBottom<180){this.offset+=12;this.loadFontChunk(this.offset)}}},{key:"loadFontChunk",value:function loadFontChunk(){var offset=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var limit=arguments.length<=1||arguments[1]===undefined?12:arguments[1];var fonts=this.fontView.slice(offset,offset+limit);var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=fonts[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var font=_step9.value;var tmp=this.renderFont(font);this.googleFontList.append(tmp);var that=this;(function(elem){elem.find(".preview").css("font-family","'"+font.family+"', "+font.fallback);that.loadGoogleFont(font)})(tmp)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9["return"]){_iterator9["return"]()}}finally{if(_didIteratorError9){throw _iteratorError9}}}}},{key:"renderFont",value:function renderFont(font){var tmp=$('\n\t\t\t<div class="font">\n\t\t\t\t<div class="info">\n\t\t\t\t\t<span class="name">'+font.family+'</span>\n\t\t\t\t\t<span class="styles"></span>\n\t\t\t\t\t<span class="sets"></span>\n\t\t\t\t</div>\n\t\t\t\t<input type="text" class="preview" style="font-family:\''+font.family+"', "+font.fallback+'" value="" />\n\t\t\t\t<label class="checkbox">\n\t\t\t\t\t<b class="pretty-checkbox light"><input type="checkbox" class="enabled" /><i></i></b>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t');var variantsString=font.variants.length+" style"+(font.variants.length!=1?"s":"");if(font.usedVariants.length){variantsString+=" ("+(font.usedVariants.length+1)+")"}var previewTextBox=tmp.find(".preview");previewTextBox.val(this.previewText||font.previewText);tmp.find(".info .styles").text(variantsString).toggleClass("has-options",font.variants.length>1);var subsetsString=font.subsets.length+" set"+(font.subsets.length!=1?"s":"");if(font.usedSubsets.length){subsetsString+=" ("+(font.usedSubsets.length+1)+")"}tmp.find(".info .sets").text(subsetsString).toggleClass("has-options",font.subsets.length>1);if(font.isSelected()){tmp.find("> .checkbox input").prop("checked",font.isSelected())}this.domToFont.set(tmp[0],font);this.domToFont.set(previewTextBox[0],font);return tmp}},{key:"loadGoogleFont",value:function loadGoogleFont(font){if(this.fontCache.has(font)){
return Promise.resolve(this.fontCache.get(font))}var fontURL="https://fonts.googleapis.com/css?family="+font.family.replace(/\s/g,"+")+":"+font.variants.join(",");var link=$('<link href="'+fontURL+'" rel="stylesheet">');$(document.head).append(link);this.fontCache.set(font,link);return document.fonts.load("16px '"+font.family+"', "+font.fallback)}},{key:"haveFontsChanged",value:function haveFontsChanged(){return!deepEqual(this.fonts.filter(function(f){return f.isSelected()}),this.originalFonts)}},{key:"updateSaveButton",value:function updateSaveButton(){this.okButton.toggleClass("disable",!this.haveFontsChanged())}},{key:"update",value:function update(){var _this=this;this.fontView=this.fonts.slice();if(this.shownSets.length!=allSets.length){var tmp=[];var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=this.fontView[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var font=_step10.value;var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=font.subsets[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var set=_step11.value;if(this.shownSets.indexOf(set)>-1){tmp.push(font);break}}}catch(err){_didIteratorError11=true;_iteratorError11=err}finally{try{if(!_iteratorNormalCompletion11&&_iterator11["return"]){_iterator11["return"]()}}finally{if(_didIteratorError11){throw _iteratorError11}}}}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10["return"]){_iterator10["return"]()}}finally{if(_didIteratorError10){throw _iteratorError10}}}this.fontView=tmp}if(this.shownCategories.length!=allCategories.length){this.fontView=this.fontView.filter(function(f){return _this.shownCategories.indexOf(f.category)>-1})}if(this.searchString){this.fontView=filter(this.fontView,this.searchString,{key:"family"})}if(this.sorting=="name"){this.fontView.sort(function(a,b){return a.family.localeCompare(b.family)})}var firstPart=[],secondPart=[];var _iteratorNormalCompletion12=true;var _didIteratorError12=false;var _iteratorError12=undefined;try{for(var _iterator12=this.fontView[Symbol.iterator](),_step12;!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){var font=_step12.value;if(font.isSelected()){firstPart.push(font)}else{secondPart.push(font)}}}catch(err){_didIteratorError12=true;_iteratorError12=err}finally{try{if(!_iteratorNormalCompletion12&&_iterator12["return"]){_iterator12["return"]()}}finally{if(_didIteratorError12){throw _iteratorError12}}}this.fontView=firstPart.concat(secondPart);this.googleFontList.empty();if(!this.fontView.length){this.googleFontList.html('<div class="not-found">No matching fonts were found.</div>')}else{this.offset=0;this.loadFontChunk()}var setString="";if(this.shownSets.length==allSets.length){setString="All Sets"}else if(setToName[this.shownSets[0]]){setString=setToName[this.shownSets[0]]}else{setString=this.shownSets[0].slice(0,1).toUpperCase()+this.shownSets[0].slice(1)}var categoryString="";if(this.shownCategories.length==allCategories.length){categoryString="All Categories"}else{categoryString=this.shownCategories[0].slice(0,1).toUpperCase()+this.shownCategories[0].slice(1)}this.element.find(".secondary .set-filter").text(setString);this.element.find(".secondary .category-filter").text(categoryString);this.element.find(".secondary .number").text(this.fontView.length+" / "+this.fonts.length)}}]);return FontManagerDialog}(Dialog);var FontObj=function(){function FontObj(font){_classCallCheck(this,FontObj);this.family="";this.category="";this.variants=[];this.subsets=[];this.usedVariants=[];this.usedSubsets=[];this.selected=false;this.previewText="The quick brown fox jumps over a lazy dog."}_createClass(FontObj,[{key:"setSelected",value:function setSelected(status){this.selected=status}},{key:"toggleSelected",value:function toggleSelected(){this.selected=!this.selected}},{key:"isSelected",value:function isSelected(){return this.selected}},{key:"fromGoogleFont",value:function fromGoogleFont(googleFont){this.family=googleFont.family;this.category=googleFont.category;this.fallback=googleFont.fallback;this.variants=googleFont.variants.slice();this.subsets=googleFont.subsets.slice();if(googleFont.previewText){this.previewText=googleFont.previewText}}},{key:"getDefaultVariant",value:function getDefaultVariant(){if(this.variants.indexOf("400")>-1){return"400"}return this.variants[0]}},{key:"getDefaultSubset",value:function getDefaultSubset(){if(this.subsets.indexOf("latin")>-1){return"latin"}return this.subsets[0]}},{key:"addUsedVariant",value:function addUsedVariant(variant){if(this.getDefaultVariant()==variant){return false}if(this.usedVariants.indexOf(variant)>-1){return false}if(this.variants.indexOf(variant)==-1){return false}this.usedVariants.push(variant);return true}},{key:"isVariantUsed",value:function isVariantUsed(variant){return this.usedVariants.indexOf(variant)>-1}},{key:"removeUsedVariant",value:function removeUsedVariant(variant){if(this.getDefaultVariant()==variant){return false}this.usedVariants=this.usedVariants.filter(function(v){return v!=variant});return true}},{key:"addUsedSubset",value:function addUsedSubset(subset){if(this.getDefaultSubset()==subset){return false}if(this.usedSubsets.indexOf(subset)>-1){return false}if(this.subsets.indexOf(subset)==-1){return false}this.usedSubsets.push(subset);return true}},{key:"removeUsedSubset",value:function removeUsedSubset(subset){if(this.getDefaultSubset()==subset){return false}this.usedSubsets=this.usedSubsets.filter(function(s){return s!=subset});return true}},{key:"isSubsetUsed",value:function isSubsetUsed(subset){return this.usedSubsets.indexOf(subset)>-1}},{key:"applyFontURL",value:function applyFontURL(url){url=url.replace("&amp;","&");if(!googleFontRegex.test(url)){return}var parsed=parse(url,true);if(!parsed.query.family){return}var families=parsed.query.family.split("|");var _iteratorNormalCompletion13=true;var _didIteratorError13=false;var _iteratorError13=undefined;try{for(var _iterator13=families[Symbol.iterator](),_step13;!(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done);_iteratorNormalCompletion13=true){var family=_step13.value;var fam=family.split(":");if(fam.length!=2){continue}if(fam[0].replace(/\+/g," ")!=this.family){continue}var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=fam[1].split(",")[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var style=_step15.value;this.addUsedVariant(style)}}catch(err){_didIteratorError15=true;_iteratorError15=err}finally{try{if(!_iteratorNormalCompletion15&&_iterator15["return"]){_iterator15["return"]()}}finally{if(_didIteratorError15){throw _iteratorError15}}}}}catch(err){_didIteratorError13=true;_iteratorError13=err}finally{try{if(!_iteratorNormalCompletion13&&_iterator13["return"]){_iterator13["return"]()}}finally{if(_didIteratorError13){throw _iteratorError13}}}if(parsed.query.subset){var sets=parsed.query.subset.split(",");var _iteratorNormalCompletion14=true;var _didIteratorError14=false;var _iteratorError14=undefined;try{for(var _iterator14=sets[Symbol.iterator](),_step14;!(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done);_iteratorNormalCompletion14=true){var set=_step14.value;this.addUsedSubset(set)}}catch(err){_didIteratorError14=true;_iteratorError14=err}finally{try{if(!_iteratorNormalCompletion14&&_iterator14["return"]){_iterator14["return"]()}}finally{if(_didIteratorError14){throw _iteratorError14}}}}}},{key:"toURL",value:function toURL(){var url="https://fonts.googleapis.com/css?family="+this.family.replace(/\s/g,"+");if(this.usedVariants.length||this.getDefaultVariant()!="400"){var tmp=this.usedVariants.slice();tmp.push(this.getDefaultVariant());tmp.sort();url+=":"+tmp.join(",")}if(this.usedSubsets.length){url+="&subset="+this.usedSubsets.join(",")}return url}}]);return FontObj}();module.exports=FontManagerDialog},{"../config/google-fonts":369,"./Dialog":498,"clone":739,"deep-equal":971,"fuzzaldrin":1027,"url":1194}]
});
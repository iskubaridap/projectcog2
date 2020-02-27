define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var escapeRegexString=require("../helpers/escapeRegexString");var getWordAtCursor=require("../helpers/getWordAtCursor");var selectWordAtCursor=require("../helpers/selectWordAtCursor");var escapeHTML=require("escape-html");var SuggestionTooltip=function(){function SuggestionTooltip(textBox,suggestions){var options=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];_classCallCheck(this,SuggestionTooltip);if(!Array.isArray(suggestions)){suggestions=[suggestions]}this.textBox=textBox;this.suggestions=suggestions;this.filteredSuggestions=[];this.timeout=null;this.options=options;this.element=$('<div class="suggestion-tooltip">');this.element.hide().appendTo(document.body);this.chosenOption=-1;this.visible=false;textBox.on("keydown.tooltip",this.keyDown.bind(this));doc.on("scroll.tooltip resize.tooltip",this.hide.bind(this));this.element.on("mousedown",this.mouseDown.bind(this));this.activeSuggestionGroup=null}_createClass(SuggestionTooltip,[{key:"mouseDown",value:function mouseDown(e){var index=this.element.find(".result").index(e.target);if(index==-1)return false;this.insertSuggestion(this.filteredSuggestions[index]);this.destroy();this.textBox.focus();if(this.options.onSelect){this.options.onSelect(this.textBox.text(),"click",e)}e.preventDefault();e.stopPropagation()}},{key:"keyDown",value:function keyDown(e){var preventDefault=true;var update=false;if(e.which==38){if(this.visible){this.chosenOption--;if(this.chosenOption<0){this.chosenOption=this.filteredSuggestions.length-1}update=true;if(this.options.onPreview){this.options.onPreview(this.filteredSuggestions[this.chosenOption])}}}else if(e.which==40){if(this.visible){this.chosenOption++;if(this.chosenOption>=this.filteredSuggestions.length){this.chosenOption=0}update=true;if(this.options.onPreview){this.options.onPreview(this.filteredSuggestions[this.chosenOption])}}}else if(e.which==13||e.which==9){if(!this.isOptionChosen())return;var method="enter";if(e.which==9&&e.shiftKey){return}if(e.which==9){method="tab";preventDefault=false}if(this.visible){if(this.activeSuggestionGroup){this.insertSuggestion(this.filteredSuggestions[this.chosenOption])}this.hide();if(this.options.onSelect){this.options.onSelect(this.textBox.text(),method,e)}if(preventDefault){e.preventDefault();e.stopImmediatePropagation();return false}return}}else if(e.which==27){if(this.visible){this.hide();e.preventDefault();e.stopImmediatePropagation();return false}}else if(e.which==37||e.which==39||e.which==36||e.which==35){preventDefault=false}else{preventDefault=false;this.chosenOption=0;update=true}if(update){clearTimeout(this.timeout);this.timeout=setTimeout(function(){this.update()}.bind(this),50)}if(this.visible&&preventDefault){e.preventDefault();e.stopImmediatePropagation();return false}}},{key:"insertSuggestion",value:function insertSuggestion(str){if(this.activeSuggestionGroup.condition){var content=this.textBox.text().trim();var suggestion=str;var append=this.activeSuggestionGroup.appendAfterInsert||"";var newContent="";var tmp=content.match(this.activeSuggestionGroup.condition||new RegExp("^"+escapeRegexString(getWordAtCursor()||""),"i"));if(tmp&&tmp[1]&&tmp[1].trim().length){var regex=new RegExp(escapeRegexString(tmp[1])+"$");newContent=content.replace(regex,suggestion)+append}else{newContent=content+suggestion+append}var range=document.createRange();range.selectNodeContents(this.textBox[0]);var selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);document.execCommand("insertText",false,newContent)}else{selectWordAtCursor();document.execCommand("insertText",false,str)}}},{key:"isOptionChosen",value:function isOptionChosen(){return this.chosenOption>=0&&this.chosenOption<this.filteredSuggestions.length}},{key:"update",value:function update(){if(!this.visible&&this.textBox.text().length==0){this.chosenOption=-1}this.element.empty();this.filteredSuggestions=[];var textBoxContent=this.textBox.text().trim(),tmp=[],searchString="",searchRegex=/^/;for(var i=0;i<this.suggestions.length;i++){if(this.suggestions[i].condition){tmp=textBoxContent.match(this.suggestions[i].condition);if(tmp){if(tmp[1]){searchRegex=new RegExp("^"+escapeRegexString(tmp[1]),"i");searchString=tmp[1]}if(typeof this.suggestions[i].items=="function"){this.filteredSuggestions=this.suggestions[i].items()}else{this.filteredSuggestions=this.suggestions[i].items}this.activeSuggestionGroup=this.suggestions[i];break}}else{var currentWord=getWordAtCursor();if(currentWord){searchString=currentWord;searchRegex=new RegExp("^"+escapeRegexString(currentWord),"i");this.filteredSuggestions=this.suggestions[i].items;this.activeSuggestionGroup=this.suggestions[i];break}}}this.filteredSuggestions=this.filteredSuggestions.filter(function(p){return searchRegex.test(p)}).slice(0,10);if(this.filteredSuggestions.length==1&&this.filteredSuggestions[0]==searchString){this.filteredSuggestions=[]}var html=this.filteredSuggestions.map(function(r){return'<div class="result"> '+escapeHTML(r).replace(searchRegex,"<span>$&</span>")+" </div>"});this.element.html(html);if(this.filteredSuggestions.length){this.show()}else{this.hide()}if(this.isOptionChosen()){this.element.find("div").eq(this.chosenOption).addClass("selected")}var textBox=this.textBox[0],li=textBox.parentNode;if(!textBox||!textBox.parentNode){return}var winHeight=win.height(),winWidth=win.width();var rect=textBox.getBoundingClientRect();var left=rect.left;var sel=window.getSelection();if(sel.rangeCount){var range=sel.getRangeAt(0);left=range.getBoundingClientRect().left}if(winHeight-rect.bottom>=rect.top){this.element.css({top:rect.bottom+5,bottom:"auto"})}else{this.element.css({top:"auto",bottom:winHeight-rect.top+10})}if(this.element.width()+left>=winWidth){this.element.css({left:"auto",right:20})}else{this.element.css({left:left,right:"auto"})}return this.element}},{key:"show",value:function show(){if(!this.visible){this.visible=true;this.element.show()}}},{key:"hide",value:function hide(){if(this.visible){this.visible=false;this.element.hide()}}},{key:"destroy",value:function destroy(){doc.off(".tooltip");this.textBox.off(".tooltip");this.element.remove()}}]);return SuggestionTooltip}();module.exports=SuggestionTooltip},{"../helpers/escapeRegexString":561,"../helpers/getWordAtCursor":576,"../helpers/selectWordAtCursor":610,"escape-html":1021}]
});
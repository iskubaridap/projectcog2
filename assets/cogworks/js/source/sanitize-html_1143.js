define([],function(){
	return [function(require,module,exports){var htmlparser=require("htmlparser2");var extend=require("xtend");var quoteRegexp=require("lodash.escaperegexp");var cloneDeep=require("lodash.clonedeep");var isArray=require("lodash.isarray");var mergeWith=require("lodash.mergewith");var srcset=require("srcset");var postcss=require("postcss");function each(obj,cb){if(obj)Object.keys(obj).forEach(function(key){cb(obj[key],key)})}function has(obj,key){return{}.hasOwnProperty.call(obj,key)}function filter(a,cb){var n=[];each(a,function(v){if(cb(v)){n.push(v)}});return n}module.exports=sanitizeHtml;const VALID_HTML_ATTRIBUTE_NAME=/^[^\0\t\n\f\r \/<=>]+$/;function sanitizeHtml(html,options,_recursing){var result="";function Frame(tag,attribs){var that=this;this.tag=tag;this.attribs=attribs||{};this.tagPosition=result.length;this.text="";this.updateParentNodeText=function(){if(stack.length){var parentFrame=stack[stack.length-1];parentFrame.text+=that.text}}}if(!options){options=sanitizeHtml.defaults;options.parser=htmlParserDefaults}else{options=extend(sanitizeHtml.defaults,options);if(options.parser){options.parser=extend(htmlParserDefaults,options.parser)}else{options.parser=htmlParserDefaults}}var nonTextTagsArray=options.nonTextTags||["script","style","textarea"];var allowedAttributesMap;var allowedAttributesGlobMap;if(options.allowedAttributes){allowedAttributesMap={};allowedAttributesGlobMap={};each(options.allowedAttributes,function(attributes,tag){allowedAttributesMap[tag]=[];var globRegex=[];attributes.forEach(function(name){if(name.indexOf("*")>=0){globRegex.push(quoteRegexp(name).replace(/\\\*/g,".*"))}else{allowedAttributesMap[tag].push(name)}});allowedAttributesGlobMap[tag]=new RegExp("^("+globRegex.join("|")+")$")})}var allowedClassesMap={};each(options.allowedClasses,function(classes,tag){if(allowedAttributesMap){if(!has(allowedAttributesMap,tag)){allowedAttributesMap[tag]=[]}allowedAttributesMap[tag].push("class")}allowedClassesMap[tag]=classes});var transformTagsMap={};var transformTagsAll;each(options.transformTags,function(transform,tag){var transFun;if(typeof transform==="function"){transFun=transform}else if(typeof transform==="string"){transFun=sanitizeHtml.simpleTransform(transform)}if(tag==="*"){transformTagsAll=transFun}else{transformTagsMap[tag]=transFun}});var depth=0;var stack=[];var skipMap={};var transformMap={};var skipText=false;var skipTextDepth=0;var parser=new htmlparser.Parser({onopentag:function(name,attribs){if(skipText){skipTextDepth++;return}var frame=new Frame(name,attribs);stack.push(frame);var skip=false;var hasText=frame.text?true:false;var transformedTag;if(has(transformTagsMap,name)){transformedTag=transformTagsMap[name](name,attribs);frame.attribs=attribs=transformedTag.attribs;if(transformedTag.text!==undefined){frame.innerText=transformedTag.text}if(name!==transformedTag.tagName){frame.name=name=transformedTag.tagName;transformMap[depth]=transformedTag.tagName}}if(transformTagsAll){transformedTag=transformTagsAll(name,attribs);frame.attribs=attribs=transformedTag.attribs;if(name!==transformedTag.tagName){frame.name=name=transformedTag.tagName;transformMap[depth]=transformedTag.tagName}}if(options.allowedTags&&options.allowedTags.indexOf(name)===-1){skip=true;if(nonTextTagsArray.indexOf(name)!==-1){skipText=true;skipTextDepth=1}skipMap[depth]=true}depth++;if(skip){return}result+="<"+name;if(!allowedAttributesMap||has(allowedAttributesMap,name)||allowedAttributesMap["*"]){each(attribs,function(value,a){if(!VALID_HTML_ATTRIBUTE_NAME.test(a)){delete frame.attribs[a];return}var parsed;if(!allowedAttributesMap||has(allowedAttributesMap,name)&&allowedAttributesMap[name].indexOf(a)!==-1||allowedAttributesMap["*"]&&allowedAttributesMap["*"].indexOf(a)!==-1||has(allowedAttributesGlobMap,name)&&allowedAttributesGlobMap[name].test(a)||allowedAttributesGlobMap["*"]&&allowedAttributesGlobMap["*"].test(a)){if(a==="href"||a==="src"){if(naughtyHref(name,value)){delete frame.attribs[a];return}}if(a==="srcset"){try{var parsed=srcset.parse(value);each(parsed,function(value){if(naughtyHref("srcset",value.url)){value.evil=true}});parsed=filter(parsed,function(v){return!v.evil});if(!parsed.length){delete frame.attribs[a];return}else{value=srcset.stringify(filter(parsed,function(v){return!v.evil}));frame.attribs[a]=value}}catch(e){delete frame.attribs[a];return}}if(a==="class"){value=filterClasses(value,allowedClassesMap[name]);if(!value.length){delete frame.attribs[a];return}}if(a==="style"){try{var abstractSyntaxTree=postcss.parse(name+" {"+value+"}");var filteredAST=filterCss(abstractSyntaxTree,options.allowedStyles);value=stringifyStyleAttributes(filteredAST);if(value.length===0){delete frame.attribs[a];return}}catch(e){delete frame.attribs[a];return}}result+=" "+a;if(value.length){result+='="'+escapeHtml(value)+'"'}}else{delete frame.attribs[a]}})}if(options.selfClosing.indexOf(name)!==-1){result+=" />"}else{result+=">";if(frame.innerText&&!hasText&&!options.textFilter){result+=frame.innerText}}},ontext:function(text){if(skipText){return}var lastFrame=stack[stack.length-1];var tag;if(lastFrame){tag=lastFrame.tag;text=lastFrame.innerText!==undefined?lastFrame.innerText:text}if(tag==="script"||tag==="style"){result+=text}else{var escaped=escapeHtml(text);if(options.textFilter){result+=options.textFilter(escaped)}else{result+=escaped}}if(stack.length){var frame=stack[stack.length-1];frame.text+=text}},onclosetag:function(name){if(skipText){skipTextDepth--;if(!skipTextDepth){skipText=false}else{return}}var frame=stack.pop();if(!frame){return}skipText=false;depth--;if(skipMap[depth]){delete skipMap[depth];frame.updateParentNodeText();return}if(transformMap[depth]){name=transformMap[depth];delete transformMap[depth]}if(options.exclusiveFilter&&options.exclusiveFilter(frame)){result=result.substr(0,frame.tagPosition);return}frame.updateParentNodeText();if(options.selfClosing.indexOf(name)!==-1){return}result+="</"+name+">"}},options.parser);parser.write(html);parser.end();return result;function escapeHtml(s){if(typeof s!=="string"){s=s+""}return s.replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;")}function naughtyHref(name,href){href=href.replace(/[\x00-\x20]+/g,"");href=href.replace(/<\!\-\-.*?\-\-\>/g,"");var matches=href.match(/^([a-zA-Z]+)\:/);if(!matches){if(href.match(/^[\/\\]{2}/)){return!options.allowProtocolRelative}return false}var scheme=matches[1].toLowerCase();if(has(options.allowedSchemesByTag,name)){return options.allowedSchemesByTag[name].indexOf(scheme)===-1}return!options.allowedSchemes||options.allowedSchemes.indexOf(scheme)===-1}function filterCss(abstractSyntaxTree,allowedStyles){if(!allowedStyles){return abstractSyntaxTree}var filteredAST=cloneDeep(abstractSyntaxTree);var astRules=abstractSyntaxTree.nodes[0];var selectedRule;if(allowedStyles[astRules.selector]&&allowedStyles["*"]){selectedRule=mergeWith(cloneDeep(allowedStyles[astRules.selector]),allowedStyles["*"],function(objValue,srcValue){if(isArray(objValue)){return objValue.concat(srcValue)}})}else{selectedRule=allowedStyles[astRules.selector]||allowedStyles["*"]}if(selectedRule){filteredAST.nodes[0].nodes=astRules.nodes.reduce(filterDeclarations(selectedRule),[])}return filteredAST}function stringifyStyleAttributes(filteredAST){return filteredAST.nodes[0].nodes.reduce(function(extractedAttributes,attributeObject){extractedAttributes.push(attributeObject.prop+":"+attributeObject.value+";");return extractedAttributes},[]).join("")}function filterDeclarations(selectedRule){return function(allowedDeclarationsList,attributeObject){if(selectedRule.hasOwnProperty(attributeObject.prop)){var matchesRegex=selectedRule[attributeObject.prop].some(function(regularExpression){return regularExpression.test(attributeObject.value)});if(matchesRegex){allowedDeclarationsList.push(attributeObject)}}return allowedDeclarationsList}}function filterClasses(classes,allowed){if(!allowed){return classes}classes=classes.split(/\s+/);return classes.filter(function(clss){return allowed.indexOf(clss)!==-1}).join(" ")}}var htmlParserDefaults={decodeEntities:true};sanitizeHtml.defaults={allowedTags:["h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre"],allowedAttributes:{a:["href","name","target"],img:["src"]},selfClosing:["img","br","hr","area","base","basefont","input","link","meta"],allowedSchemes:["http","https","ftp","mailto"],allowedSchemesByTag:{},allowProtocolRelative:true};sanitizeHtml.simpleTransform=function(newTagName,newAttribs,merge){merge=merge===undefined?true:merge;newAttribs=newAttribs||{};return function(tagName,attribs){var attrib;if(merge){for(attrib in newAttribs){attribs[attrib]=newAttribs[attrib]}}else{attribs=newAttribs}return{tagName:newTagName,attribs:attribs}}}},{"htmlparser2":1053,"lodash.clonedeep":1068,"lodash.escaperegexp":1069,"lodash.isarray":1070,"lodash.mergewith":1071,"postcss":1102,"srcset":1166,"xtend":1202}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");var clone=require("clone");var navToggle={children:[{children:[{link:false,underline:false,strike:false,italic:false,bold:false,char:"T",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"o",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"g",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"g",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"l",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"e",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:" ",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"n",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"a",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"v",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"i",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"g",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"a",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"t",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"i",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"o",class:"InlineCharacter"},{link:false,underline:false,strike:false,italic:false,bold:false,char:"n",class:"InlineCharacter"}],properties:{"sr-only":true,"contextual-background":"","contextual-color":"","text-transformation":""},flags:{canBePackaged:true,canBeEdited:true,canBeDuplicated:true,canBeDeleted:true,canBeMoved:true},overrides:{ids:{},css:{}},cssClasses:{parent:"",system:{}},class:"Span"},{children:[],properties:{"contextual-background":"","contextual-color":"","text-transformation":""},flags:{canBePackaged:true,canBeEdited:true,canBeDuplicated:true,canBeDeleted:true,canBeMoved:true},overrides:{ids:{},css:{"/":"icon-bar"}},cssClasses:{parent:"",system:""},class:"Span"},{children:[],properties:{"contextual-background":"","contextual-color":"","text-transformation":""},flags:{canBePackaged:true,canBeEdited:true,canBeDuplicated:true,canBeDeleted:true,canBeMoved:true},overrides:{ids:{},css:{"/":"icon-bar"}},cssClasses:{parent:"",system:""},class:"Span"},{children:[],properties:{"contextual-background":"","contextual-color":"","text-transformation":""},flags:{canBePackaged:true,canBeEdited:true,canBeDuplicated:true,canBeDeleted:true,canBeMoved:true},overrides:{ids:{},css:{"/":"icon-bar"}},cssClasses:{parent:"",system:""},class:"Span"}],properties:{},flags:{canBePackaged:false,canBeEdited:false,canBeDuplicated:false,canBeDeleted:false,canBeMoved:false},overrides:{ids:{},css:{}},cssClasses:{parent:"",system:"navbar-toggle collapsed"},class:"NavBarToggle"};module.exports=function navBarAddToggle(tree){walk(tree,function(component){if(component["class"]!="NavBar")return;if(component.children[0]["class"]=="NavBarBrand"){component.children.splice(1,0,clone(navToggle))}else{component.children.splice(0,0,clone(navToggle))}})}},{"../helpers/walk":418,"clone":739}]
});
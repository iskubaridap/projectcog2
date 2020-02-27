define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");var clone=require("clone");var dropdownMenu={class:"DropdownMenu",cssClasses:{system:"dropdown-menu",parent:""},overrides:{},flags:{canBeMoved:false,canBeDeleted:false,canBeDuplicated:false,canBeEdited:false,canBePackaged:false,canBeCopied:false},properties:{},children:[]};module.exports=function addMenuToDropdownAndSplitButton(tree){walk(tree,function(component){if(component["class"]!="Dropdown"&&component["class"]!="SplitButton")return;var dropDownChildren=[],originalChildren=[];var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=component.children[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var child=_step.value;if(child["class"]=="DropdownMenuItem"||child["class"]=="DropdownDivider"||child["class"]=="DropdownHeader"){child.flags.canBeMoved=true;dropDownChildren.push(child)}else{child.flags.canBeCopied=false;child.flags.canBeDeleted=false;child.flags.canBeDuplicated=false;child.flags.canBeMoved=false;child.flags.canBePackaged=false;originalChildren.push(child)}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}component.children=originalChildren;var newMenu=clone(dropdownMenu);newMenu.children=dropDownChildren;component.children.push(newMenu)})}},{"../helpers/walk":418,"clone":739}]
});
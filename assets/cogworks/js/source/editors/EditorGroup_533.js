define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var EditorGroup=function(){function EditorGroup(){_classCallCheck(this,EditorGroup);this.items=[];this.activeEditor=null;this.active=false}_createClass(EditorGroup,[{key:"activate",value:function activate(){this.active=true;this.activeEditor&&this.activeEditor.activate()}},{key:"deactivate",value:function deactivate(){this.active=false;this.activeEditor&&this.activeEditor.deactivate()}},{key:"isActive",value:function isActive(){return this.active}},{key:"activateEditor",value:function activateEditor(editor){if(!editor){editor=this.items[0]||null}if(this.activeEditor){this.activeEditor.deactivate()}this.activeEditor=editor;editor&&editor.activate()}},{key:"destructEditors",value:function destructEditors(){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.items[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var editor=_step.value;editor.destructor()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{key:"set",value:function set(items){this.items=items}},{key:"has",value:function has(editor){return this.items.indexOf(editor)!==-1}},{key:"findIndexFor",value:function findIndexFor(editor){return this.items.indexOf(editor)}},{key:"findByTarget",value:function findByTarget(tar){for(var i=0;i<this.items.length;i++){if(this.items[i].target==tar)return this.items[i]}return null}},{key:"get",value:function get(index){return this.items[index]}},{key:"getAll",value:function getAll(){return this.items.slice()}},{key:"isEditorActive",value:function isEditorActive(editor){return!!editor&&this.activeEditor===editor}},{key:"add",value:function add(editors){if(!Array.isArray(editors)){editors=[editors]}this.items.push.apply(this.items,editors);if(!this.activeEditor){this.activateEditor()}}},{key:"remove",value:function remove(editor){var index=this.findIndexFor(editor);if(index==-1)return;this.items.splice(index,1);if(this.isEditorActive(editor)){this.activateEditor()}return editor}},{key:"update",value:function update(){if(this.activeEditor){return this.activeEditor.update()}return document.createDocumentFragment()}},{key:"scheduleUpdate",value:function scheduleUpdate(){if(this.activeEditor){return this.activeEditor.scheduleUpdate()}return document.createDocumentFragment()}},{key:"length",get:function get(){return this.items.length}}]);return EditorGroup}();module.exports=EditorGroup},{}]
});
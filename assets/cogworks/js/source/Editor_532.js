define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Editor=function(){function Editor(name){_classCallCheck(this,Editor);this.element=$("<div>");this._name=name;this.system=false;this.target=null;this.overEditor=false;this.supportsMultiSelection=false;this.active=false;this.eventsBound=false;this.scrollTop=0;this.resource=null;this._updateTimer=null;this._updateFunc=function(){var args=arguments.length<=0||arguments[0]===undefined?null:arguments[0];this.update(args)}.bind(this);this.applicationClickListener=this.applicationClick.bind(this)}_createClass(Editor,[{key:"destructor",value:function destructor(){}},{key:"getName",value:function getName(){return this._name}},{key:"targetExists",value:function targetExists(){return false}},{key:"activate",value:function activate(){this.active=true;if(!this.eventsBound){this.bindEventListeners();this.eventsBound=true}}},{key:"deactivate",value:function deactivate(){this.active=false;this.eventsBound=false;this.unbindEventListeners()}},{key:"saveScrollOffset",value:function saveScrollOffset(){var that=this;clearTimeout(this.scrollTimeout);this.scrollTimeout=setTimeout(function(){that.scrollTop=that.element.find(".content")[0].scrollTop},25)}},{key:"restoreScrollOffset",value:function restoreScrollOffset(){this.element.find(".content")[0].scrollTop=this.scrollTop}},{key:"bindEventListeners",value:function bindEventListeners(){this.element.find(".content").on("scroll",this.saveScrollOffset.bind(this));this.element.on("mouseenter",this.mouseenterPanel.bind(this));this.element.on("mouseleave",this.mouseleavePanel.bind(this));if(this.supportsMultiSelection){app.on("mousedown",this.applicationClickListener)}}},{key:"unbindEventListeners",value:function unbindEventListeners(){this.element.find(".content").off("scroll");this.element.off("mouseenter");this.element.off("mouseleave");if(this.supportsMultiSelection){app.off("mousedown",this.applicationClickListener)}}},{key:"applicationClick",value:function applicationClick(){if(app.isDialogShown()||app.isContextMenuShown()){return}if(!this.overEditor&&this.hasMultipleSelection()){this.clearSelection();this.scheduleUpdate()}}},{key:"mouseenterPanel",value:function mouseenterPanel(){this.overEditor=true}},{key:"mouseleavePanel",value:function mouseleavePanel(){this.overEditor=false}},{key:"isActive",value:function isActive(){return this.active}},{key:"hasTextSelection",value:function hasTextSelection(){return false}},{key:"scheduleUpdate",value:function scheduleUpdate(){var time=arguments.length<=0||arguments[0]===undefined?50:arguments[0];var args=arguments.length<=1||arguments[1]===undefined?null:arguments[1];clearTimeout(this._updateTimer);this._updateTimer=setTimeout(this._updateFunc,time,args);return this.element}},{key:"update",value:function update(){return this.element}}]);return Editor}();module.exports=Editor},{}]
});
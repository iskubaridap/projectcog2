define([],function(){
	return [function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Plugin=function(){function Plugin(options){_classCallCheck(this,Plugin)}_createClass(Plugin,[{key:"initialize",value:function initialize(){return this.initializeFrameworks()}},{key:"registerPanels",value:function registerPanels(){}},{key:"initializeFrameworks",value:function initializeFrameworks(){var frameworkPromises=[];var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.frameworks[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var framework=_step.value;var f=new framework;frameworkPromises.push(f.initialize());app.availableFrameworks[f.version]=f}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}return Promise.all(frameworkPromises)}},{key:"frameworks",get:function get(){return[]}}]);return Plugin}();module.exports=Plugin},{}]
});
define([],function(){
	return [function(require,module,exports){"use strict";var walk=require("../helpers/walk");module.exports=function overridesEnableAllAttributes(tree){walk(tree,function(component){var currentOverrides={};if(!component.overrides)return;for(var path in component.overrides.css){if(!component.overrides.css[path])continue;currentOverrides[path]={class:component.overrides.css[path]}}for(path in component.overrides.ids){if(!component.overrides.ids[path])continue;if(!(path in currentOverrides))currentOverrides[path]={};currentOverrides[path].id=component.overrides.ids[path]}component.overrides=currentOverrides})}},{"../helpers/walk":418}]
});
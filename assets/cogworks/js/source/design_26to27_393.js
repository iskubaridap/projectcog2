define([],function(){
	return [function(require,module,exports){"use strict";var walkDesignComponents=require("../helpers/walkDesignComponents");var op=require("../operations/fixSpanCSSClasses");module.exports=function convert(json){var id=json.design.settings.theme;var version=json.design.framework;var framework=app.availableFrameworks[version];var theme=framework.getThemeById(id)||framework.getDefaultTheme();json.design.settings.theme=theme.createDescriptor();walkDesignComponents(json.design.pages,op);json.version=27;return json}},{"../helpers/walkDesignComponents":420,"../operations/fixSpanCSSClasses":441}]
});
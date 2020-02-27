define([], function () {
	return [function (require, module, exports) {
		"use strict";
		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if ("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor)
				}
			}
			return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);
				if (staticProps) defineProperties(Constructor, staticProps);
				return Constructor
			}
		}();
		var _get = function get(_x2, _x3, _x4) {
			var _again = true;
			_function: while (_again) {
				var object = _x2,
					property = _x3,
					receiver = _x4;
				_again = false;
				if (object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if (desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if (parent === null) {
						return undefined
					} else {
						_x2 = parent;
						_x3 = property;
						_x4 = receiver;
						_again = true;
						desc = parent = undefined;
						continue _function
					}
				} else if ("value" in desc) {
					return desc.value
				} else {
					var getter = desc.get;
					if (getter === undefined) {
						return undefined
					}
					return getter.call(receiver)
				}
			}
		};

		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
				return arr2
			} else {
				return Array.from(arr)
			}
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function")
			}
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value: subClass,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
			if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
		}
		var Bootstrap = require("./Bootstrap");
		var BuiltinTheme = require("../../base/BuiltinTheme");
		var HTML = require("../../components/base/HTML");
		var Body = require("../../components/base/Body");
		var CustomCode = require("../../components/base/CustomCode");
		var Dialog = require("../../dialogs/Dialog");
		var InputGroup = require("../../components/bootstrap3/InputGroup");
		var Form = require("../../components/base/Form");
		var InputBase = require("../../components/base/InputBase");
		var InputColor = require("../../components/base/InputColor");
		var InputFile = require("../../components/base/InputFile");
		var InputRadioCheckBase = require("../../components/base/InputRadioCheckBase");
		var InputRange = require("../../components/base/InputRange");
		var InputDateAndTime = require("../../components/base/InputDateAndTime");
		var InputNumber = require("../../components/base/InputNumber");
		var InputText = require("../../components/base/InputText");
		var InputTextarea = require("../../components/base/InputTextarea");
		var Select = require("../../components/base/Select");
		var SplitButton = require("../../components/bootstrap3/SplitButton");
		var Pagination = require("../../components/bootstrap3/Pagination");
		var Pager = require("../../components/bootstrap3/Pager");
		var Clearfix = require("../../components/bootstrap3/Clearfix");
		var Button = require("../../components/bootstrap3/Button");
		var Alert = require("../../components/bootstrap3/Alert");
		var Panel = require("../../components/bootstrap3/Panel");
		var PanelHeading = require("../../components/bootstrap3/PanelHeading");
		var AccordionItem = require("../../components/bootstrap3/AccordionItem");
		var Thumbnail = require("../../components/bootstrap3/Thumbnail");
		var Well = require("../../components/bootstrap3/Well");
		var NavBar = require("../../components/bootstrap3/NavBar");
		var Badge = require("../../components/bootstrap3/Badge");
		var Label = require("../../components/bootstrap3/Label");
		var Breadcrumbs = require("../../components/bootstrap3/Breadcrumbs");
		var GroupOption = require("../../panels/GroupOption");
		var CheckBoxOption = require("../../panels/CheckBoxOption");
		var components = require("../../components/bootstrap3/");
		var ui = require("../../components/bootstrap3/ui.json");
		var themes = require("../../config/bootstrap3-themes");
		var icons = require("../../config/bootstrap3-icons");
		var readFileAsBase64 = require("../../helpers/readFileAsBase64");
		var Bootstrap3 = function (_Bootstrap) {
			_inherits(Bootstrap3, _Bootstrap);

			function Bootstrap3() {
				_classCallCheck(this, Bootstrap3);
				_get(Object.getPrototypeOf(Bootstrap3.prototype), "constructor", this).call(this);
				this.name = "Bootstrap 3.3";
				this.version = "3";
				this.fullVersion = "3.3.7";
				this.jQueryVersions = [{
					short: 1,
					full: "1.12.4"
				}, {
					short: 2,
					full: "2.2.4"
				}, {
					short: 3,
					full: "3.2.1"
				}];
				this.hasTemplates = true
			}
			_createClass(Bootstrap3, [{
				key: "getDeviceIcons",
				value: function getDeviceIcons() {
					return [{
						name: "xs",
						icon: "phone_iphone"
					}, {
						name: "sm",
						icon: "tablet_mac"
					}, {
						name: "md",
						icon: "laptop_mac"
					}, {
						name: "lg",
						icon: "desktop_windows"
					}]
				}
			}, {
				key: "getBreakpoints",
				value: function getBreakpoints() {
					return [{
						name: "xs",
						size: 360,
						min: 0,
						max: 767
					}, {
						name: "sm",
						size: 768,
						min: 768,
						max: 991
					}, {
						name: "md",
						size: 1024,
						min: 992,
						max: 1199
					}, {
						name: "lg",
						size: 1200,
						min: 1200,
						max: Infinity
					}]
				}
			}, {
				key: "getMediaQueryForSize",
				value: function getMediaQueryForSize(size) {
					if (size < 768) {
						return "(max-width: 767px)"
					}
					if (size < 992) {
						return "(max-width: 991px)"
					}
					if (size < 1200) {
						return "(max-width: 1199px)"
					}
					return "(min-width: 1200px)"
				}
			}, {
				key: "getComponentDefinition",
				value: function getComponentDefinition() {
					return components
				}
			}, {
				key: "getUIDefinition",
				value: function getUIDefinition() {
					return ui
				}
			}, {
				key: "getIconFontDefinition",
				value: function getIconFontDefinition() {
					var frameworkIcons = _get(Object.getPrototypeOf(Bootstrap3.prototype), "getIconFontDefinition", this).call(this);
					frameworkIcons.unshift.apply(frameworkIcons, _toConsumableArray(icons));
					return frameworkIcons
				}
			}, {
				key: "getSystemThemes",
				value: function getSystemThemes() {
					return themes.map(function (t) {
						var theme = new BuiltinTheme;
						theme.unserialize(t);
						return theme
					})
				}
			}, {
				key: "injectFileMenuOptions",
				value: function injectFileMenuOptions() {
					var that = this;
					return [{
						label: "Convert to Bootstrap 4",
						click: function click() {
							that.convertBootstrap4Confirmation()
						}
					}]
				}
			}, {
				key: "convertBootstrap4Confirmation",
				value: function convertBootstrap4Confirmation() {
					var that = this;
					app.confirmDialog.open({
						title: "Bootstrap 4 Conversion",
						width: 520,
						message: "This tool will create a new Cog design, copy everything over, and recreate your pages with Bootstrap 4 components. Not everything is converted - your CSS, JS and Custom Code is not touched. Your old design will remain intact.",
						okButton: "Convert",
						onOK: function onOK(dialog) {
							var converted = that.convertDesignToCog4(app.context);
							app.openContext(converted, true);
							Dialog.closeAll()
						}
					})
				}
			}, {
				key: "convertDesignToCog4",
				value: function convertDesignToCog4(context) {
					var theme = themeConversionTo4[context.settings.theme] || context.settings.theme;
					var bs4 = app.getFrameworkByVersion("4");
					if (!bs4.themeExists(theme)) {
						theme = bs4.getDefaultTheme()
					}
					var upgraded = context.clone();
					upgraded.regenerateID();
					upgraded.path = "";
					upgraded.name += " (Cog 4)";
					upgraded.settings.theme = theme;
					upgraded.pages.loop(function (page) {
						page.setHTML(page.html.convertUp())
					});
					upgraded.componentLinks.clear();
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (var _iterator = upgraded.pages.getAll()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var page = _step.value;
							upgraded.scanTreeForLinkedComponents(page.html.body)
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]()
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError
							}
						}
					}
					upgraded.changeFramework("4");
					return upgraded
				}
			}, {
				key: "updateHTMLBody",
				value: function updateHTMLBody(html) {
					if (html.body.context().isDesign) {
						if (!html.body.modalBackdrop) {
							html.body.modalBackdrop = $('<div class="modal-backdrop fade in" bs-hidden bs-system-element>')
						}
					}
					_get(Object.getPrototypeOf(Bootstrap3.prototype), "updateHTMLBody", this).call(this, html)
				}
			}, {
				key: "shouldAddTheFormControlClass",
				value: function shouldAddTheFormControlClass(component) {
					if (!(component instanceof InputBase)) {
						return false
					}
					if (component instanceof InputColor || component instanceof InputFile || component instanceof InputRadioCheckBase || component instanceof InputRange) {
						return false
					}
					return component.hasParent(Form) || component.parent instanceof InputGroup
				}
			}, {
				key: "startComponentUpdate",
				value: function startComponentUpdate(component) {
					_get(Object.getPrototypeOf(Bootstrap3.prototype), "startComponentUpdate", this).call(this, component);
					if (this.componentSupportsTextOptions(component)) {
						this.textComponentUpdate(component)
					}
					if (this.shouldAddTheFormControlClass(component)) {
						component.element[0].classList.add("form-control")
					}
					if (this.componentSupportsInputSize(component)) {
						if (component.properties.size) {
							component.element[0].classList.add("input-" + component.properties.size)
						}
					}
					for (var i = 0; i < accessibilityClasses.length; i++) {
						var cls = accessibilityClasses[i];
						if (component.properties[cls]) {
							component.element[0].classList.add(cls)
						}
					}
					for (var i = 0; i < responsiveVisibilityClasses.length; i++) {
						var cls = responsiveVisibilityClasses[i];
						if (component.properties[cls]) {
							component.element[0].classList.add(cls)
						}
					}
				}
			}, {
				key: "buildComponentOptions",
				value: function buildComponentOptions(component) {
					_get(Object.getPrototypeOf(Bootstrap3.prototype), "buildComponentOptions", this).call(this, component);
					if (this.componentSupportsTextOptions(component)) {
						this.injectTextOptions(component)
					}
					var settingsTab = app.getPanel("settings");
					if (this.componentSupportsInputSize(component)) {
						var inputMain = app.framework.getOptionsGroupByID("input-main");
						inputMain.add(this.propertyToOptionItem(component, {
							id: "size",
							label: "Size",
							type: "select",
							value: "",
							options: possibleInputSizes
						}), -1)
					}
					if (this.componentSupportsResponsiveVisibility(component)) {
						var rv = new GroupOption({
							id: "responsive-visibility",
							label: "Responsive Visibility",
							collapsed: true
						});
						settingsTab.add(rv, 70);
						responsiveVisibilityClasses.forEach(function (cls) {
							rv.add(new CheckBoxOption({
								label: cls,
								value: [component.properties, cls],
								component: component,
								history: "Modify " + component.getName() + " Visibility"
							}))
						})
					}
					if (this.componentSupportsAccessibility(component)) {
						var acc = new GroupOption({
							id: "accessibility",
							label: "Accessibility",
							collapsed: true
						});
						settingsTab.add(acc, 80);
						accessibilityClasses.forEach(function (cls) {
							acc.add(new CheckBoxOption({
								label: cls,
								value: [component.properties, cls],
								component: component,
								history: "Modify " + component.getName() + " Accessibility"
							}))
						})
					}
				}
			}, {
				key: "injectTextOptions",
				value: function injectTextOptions(component, properties) {
					properties = Object.assign({
						includeColor: true,
						includeAlignment: true,
						includeNowrap: true,
						includeTextTransformations: true
					}, properties);
					var settingsTab = app.getPanel("settings");
					var textOptions = new GroupOption({
						id: "text-options",
						label: "Text Options"
					});
					settingsTab.add(textOptions);
					if (properties.includeAlignment) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "text-alignment",
							label: "Alignment",
							type: "button-group",
							value: "",
							options: possibleAlignments
						}))
					}
					if (properties.includeNowrap) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "text-nowrap",
							label: "No Wrap",
							type: "checkbox",
							value: false
						}))
					}
					if (properties.includeTextTransformations) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "text-transformation",
							label: "Transformations",
							type: "select",
							value: "",
							options: possibleTransformations
						}))
					}
					if (this.componentSupportsColorOptions(component)) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "contextual-color",
							label: "Color",
							type: "select",
							value: "",
							options: possibleContextualColors
						}));
						textOptions.add(this.propertyToOptionItem(component, {
							id: "contextual-background",
							label: "Background",
							type: "select",
							value: "",
							options: possibleContextualBackgrounds
						}))
					}
				}
			}, {
				key: "textComponentUpdate",
				value: function textComponentUpdate(component) {
					var elem = component.element[0];
					if (component.properties["text-nowrap"]) {
						elem.classList.add("text-nowrap")
					}
					if (component.properties["text-transformation"]) {
						elem.classList.add(component.properties["text-transformation"])
					}
					if (component.properties["text-alignment"]) {
						elem.classList.add(component.properties["text-alignment"])
					}
					if (component.properties["contextual-color"]) {
						elem.classList.add(component.properties["contextual-color"])
					}
					if (component.properties["contextual-background"]) {
						elem.classList.add(component.properties["contextual-background"])
					}
				}
			}, {
				key: "componentSupportsResponsiveVisibility",
				value: function componentSupportsResponsiveVisibility(component) {
					return !(component instanceof HTML || component instanceof Body || component instanceof CustomCode)
				}
			}, {
				key: "componentSupportsAccessibility",
				value: function componentSupportsAccessibility(component) {
					return !(component instanceof HTML || component instanceof Body || component instanceof CustomCode)
				}
			}, {
				key: "componentSupportsInputSize",
				value: function componentSupportsInputSize(component) {
					return component instanceof InputDateAndTime || component instanceof InputNumber || component instanceof InputText || component instanceof InputTextarea || component instanceof Select
				}
			}, {
				key: "componentSupportsTextOptions",
				value: function componentSupportsTextOptions(component) {
					return _get(Object.getPrototypeOf(Bootstrap3.prototype), "componentSupportsTextOptions", this).call(this, component) && !(component instanceof Pagination || component instanceof Pager || component instanceof Clearfix || component instanceof SplitButton)
				}
			}, {
				key: "componentSupportsColorOptions",
				value: function componentSupportsColorOptions(component) {
					return _get(Object.getPrototypeOf(Bootstrap3.prototype), "componentSupportsColorOptions", this).call(this, component) && !(component instanceof Button || component instanceof Alert || component instanceof Panel || component instanceof PanelHeading || component instanceof AccordionItem || component instanceof Thumbnail || component instanceof Well || component instanceof NavBar || component instanceof Badge || component instanceof Label || component instanceof Breadcrumbs)
				}
			}, {
				key: "getUsedIconFontResources",
				value: function getUsedIconFontResources(context) {
					var usedIconFonts = _get(Object.getPrototypeOf(Bootstrap3.prototype), "getUsedIconFontResources", this).call(this, context);
					return usedIconFonts.filter(function (f) {
						return f.name != "Glyphicons"
					})
				}
			}, {
				key: "isGlyphiconsUsed",
				value: function isGlyphiconsUsed(context) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
					try {
						for (var _iterator2 = _get(Object.getPrototypeOf(Bootstrap3.prototype), "getUsedIconFontResources", this).call(this, context)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var font = _step2.value;
							if (font.name == "Glyphicons") return true
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]()
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2
							}
						}
					}
					return false
				}
			}, {
				key: "injectExportItems",
				value: function injectExportItems(context, options) {
					var inject = {
						operations: [],
						files: {}
					};
					if (this.isContextThemeUserMade(context) && this.isGlyphiconsUsed(context) && options.useCDN) {
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;
						try {
							for (var _iterator3 = this.getIconFontPathsByName(context, "Glyphicons")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var path = _step3.value;
								inject.operations.push({
									path: "assets/" + path.destination,
									op: readFileAsBase64("./embed/" + path.source),
									type: "base64"
								})
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
									_iterator3["return"]()
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3
								}
							}
						}
					}
					return inject
				}
			}, {
				key: "isCompatibleWith",
				value: function isCompatibleWith(framework) {
					if (typeof framework == "String") {
						framework = app.getFrameworkByVersion(framework)
					}
					if (framework.version == "4") {
						return true
					}
					return _get(Object.getPrototypeOf(Bootstrap3.prototype), "isCompatibleWith", this).call(this, framework)
				}
			}, {
				key: "convertUpFromTo",
				value: function convertUpFromTo(original, upgraded) {
					var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
					if (original.properties["text-alignment"]) {
						upgraded.properties["text-alignment"] = textAlignmentPropsTo4[original.properties["text-alignment"]]
					}
					for (var prop in original.properties) {
						if (prop in propertyConversionTo4) {
							delete upgraded.properties[prop];
							upgraded[propertyConversionTo4[prop].property] = propertyConversionTo4[prop].value
						}
					}
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;
					try {
						for (var _iterator4 = copyOverPropertiesTo4[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var prop = _step4.value;
							if (prop in original.properties) {
								upgraded.properties[prop] = original.properties[prop]
							}
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
								_iterator4["return"]()
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4
							}
						}
					}
					if (original.properties.hidden) {
						delete upgraded.properties.hidden;
						upgraded.properties["display"] = "none"
					}
					if (original.properties.show) {
						delete upgraded.properties.show;
						upgraded.properties["visibility"] = "visible"
					}
					if (original.properties["sr-only"]) {
						upgraded.properties["sr-only"] = original.properties["sr-only"]
					}
					if (this.componentSupportsInputSize(original)) {
						upgraded.properties.size = original.properties.size
					}
					if (original.properties.navbarAlignment === "navbar-right") {
						upgraded.properties["margin-auto"] = "l"
					}
					return _get(Object.getPrototypeOf(Bootstrap3.prototype), "convertUpFromTo", this).call(this, original, upgraded, options)
				}
			}, {
				key: "getScreenshotHeadIncludes",
				value: function getScreenshotHeadIncludes() {
					return ["../assets/cogworks/embed/bootstrap/3/default/bootstrap.min.css", "../assets/cogworks/embed/fonts/fontawesome-all.min.css", "../assets/cogworks/embed/fonts/font-awesome.min.css", "../assets/cogworks/embed/fonts/line-awesome.min.css", "../assets/cogworks/embed/fonts/ionicons.min.css", "../assets/cogworks/embed/fonts/material-icons.min.css", "../assets/cogworks/embed/fonts/simple-line-icons.min.css", "../assets/cogworks/embed/fonts/typicons.min.css"]
				}
			}]);
			return Bootstrap3
		}(Bootstrap);
		var responsiveVisibilityClasses = ["visible-xs-block", "visible-sm-block", "visible-md-block", "visible-lg-block", "visible-xs-inline", "visible-sm-inline", "visible-md-inline", "visible-lg-inline", "visible-xs-inline-block", "visible-sm-inline-block", "visible-md-inline-block", "visible-lg-inline-block", "hidden-xs", "hidden-sm", "hidden-md", "hidden-lg"];
		var accessibilityClasses = ["show", "hidden", "sr-only"];
		var possibleAlignments = [{
			label: "Default",
			value: "",
			icon: "close"
		}, {
			label: "Left",
			value: "text-left",
			icon: "format_align_left"
		}, {
			label: "Center",
			value: "text-center",
			icon: "format_align_center"
		}, {
			label: "Right",
			value: "text-right",
			icon: "format_align_right"
		}, {
			label: "Justify",
			value: "text-justify",
			icon: "format_align_justify"
		}];
		var possibleTransformations = [{
			label: "None",
			value: ""
		}, {
			label: "Lowercase",
			value: "text-lowercase"
		}, {
			label: "Uppercase",
			value: "text-uppercase"
		}, {
			label: "Capitalize",
			value: "text-capitalize"
		}];
		var possibleContextualColors = [{
			label: "Default",
			value: ""
		}, {
			label: "Muted",
			value: "text-muted"
		}, {
			label: "Primary",
			value: "text-primary"
		}, {
			label: "Success",
			value: "text-success"
		}, {
			label: "Info",
			value: "text-info"
		}, {
			label: "Warning",
			value: "text-warning"
		}, {
			label: "Danger",
			value: "text-danger"
		}];
		var possibleContextualBackgrounds = [{
			label: "Default",
			value: ""
		}, {
			label: "Primary",
			value: "bg-primary"
		}, {
			label: "Success",
			value: "bg-success"
		}, {
			label: "Info",
			value: "bg-info"
		}, {
			label: "Warning",
			value: "bg-warning"
		}, {
			label: "Danger",
			value: "bg-danger"
		}];
		var possibleInputSizes = [{
			label: "Default",
			value: ""
		}, {
			label: "Large",
			value: "lg"
		}, {
			label: "Small",
			value: "sm"
		}];
		var textAlignmentPropsTo4 = {
			"text-left": "left",
			"text-center": "center",
			"text-right": "right",
			"text-justify": "justify"
		};
		var propertyConversionTo4 = {
			"visible-xs-block": {
				property: "display",
				value: "block"
			},
			"visible-sm-block": {
				property: "display-sm",
				value: "block"
			},
			"visible-md-block": {
				property: "display-md",
				value: "block"
			},
			"visible-lg-block": {
				property: "display-lg",
				value: "block"
			},
			"visible-xs-inline": {
				property: "display",
				value: "inline"
			},
			"visible-sm-inline": {
				property: "display-sm",
				value: "inline"
			},
			"visible-md-inline": {
				property: "display-md",
				value: "inline"
			},
			"visible-lg-inline": {
				property: "display-lg",
				value: "inline"
			},
			"visible-xs-inline-block": {
				property: "display",
				value: "inline-block"
			},
			"visible-sm-inline-block": {
				property: "display-sm",
				value: "inline-block"
			},
			"visible-md-inline-block": {
				property: "display-md",
				value: "inline-block"
			},
			"visible-lg-inline-block": {
				property: "display-lg",
				value: "inline-block"
			},
			"hidden-xs": {
				property: "display",
				value: "none"
			},
			"hidden-sm": {
				property: "display-sm",
				value: "none"
			},
			"hidden-md": {
				property: "display-md",
				value: "none"
			},
			"hidden-lg": {
				property: "display-lg",
				value: "none"
			}
		};
		var copyOverPropertiesTo4 = ["contextual-color", "contextual-background", "text-nowrap", "text-transformation"];
		var themeConversionTo4 = {
			paper: "materia"
		};
		module.exports = Bootstrap3
	}, {
		"../../base/BuiltinTheme": 11,
		"../../components/base/Body": 34,
		"../../components/base/CustomCode": 42,
		"../../components/base/Form": 49,
		"../../components/base/HTML": 50,
		"../../components/base/InputBase": 58,
		"../../components/base/InputColor": 60,
		"../../components/base/InputDateAndTime": 61,
		"../../components/base/InputFile": 63,
		"../../components/base/InputNumber": 65,
		"../../components/base/InputRadioCheckBase": 68,
		"../../components/base/InputRange": 69,
		"../../components/base/InputText": 72,
		"../../components/base/InputTextarea": 73,
		"../../components/base/Select": 84,
		"../../components/bootstrap3/": 259,
		"../../components/bootstrap3/AccordionItem": 161,
		"../../components/bootstrap3/Alert": 166,
		"../../components/bootstrap3/Badge": 168,
		"../../components/bootstrap3/Breadcrumbs": 171,
		"../../components/bootstrap3/Button": 173,
		"../../components/bootstrap3/Clearfix": 185,
		"../../components/bootstrap3/InputGroup": 206,
		"../../components/bootstrap3/Label": 212,
		"../../components/bootstrap3/NavBar": 225,
		"../../components/bootstrap3/Pager": 229,
		"../../components/bootstrap3/Pagination": 233,
		"../../components/bootstrap3/Panel": 235,
		"../../components/bootstrap3/PanelHeading": 238,
		"../../components/bootstrap3/SplitButton": 244,
		"../../components/bootstrap3/Thumbnail": 257,
		"../../components/bootstrap3/Well": 258,
		"../../components/bootstrap3/ui.json": 260,
		"../../config/bootstrap3-icons": 361,
		"../../config/bootstrap3-themes": 362,
		"../../dialogs/Dialog": 498,
		"../../helpers/readFileAsBase64": 600,
		"../../panels/CheckBoxOption": 1213,
		"../../panels/GroupOption": 1222,
		"./Bootstrap": 538
	}]
});
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
		var _get = function get(_x7, _x8, _x9) {
			var _again = true;
			_function: while (_again) {
				var object = _x7,
					property = _x8,
					receiver = _x9;
				_again = false;
				if (object === null) object = Function.prototype;
				var desc = Object.getOwnPropertyDescriptor(object, property);
				if (desc === undefined) {
					var parent = Object.getPrototypeOf(object);
					if (parent === null) {
						return undefined
					} else {
						_x7 = parent;
						_x8 = property;
						_x9 = receiver;
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
		var TemplateTheme = require("../../base/TemplateTheme");
		var ComponentWithInlineEditing = require("../../components/base/ComponentWithInlineEditing");
		var Form = require("../../components/base/Form");
		var InputBase = require("../../components/base/InputBase");
		var InputColor = require("../../components/base/InputColor");
		var InputFile = require("../../components/base/InputFile");
		var InputRadioCheckBase = require("../../components/base/InputRadioCheckBase");
		var InputRange = require("../../components/base/InputRange");
		var InputPlain = require("../../components/bootstrap4/InputPlain");
		var InputGroup = require("../../components/bootstrap4/InputGroup");
		var InputDateAndTime = require("../../components/base/InputDateAndTime");
		var InputNumber = require("../../components/base/InputNumber");
		var InputText = require("../../components/base/InputText");
		var InputTextarea = require("../../components/base/InputTextarea");
		var InputRadio = require("../../components/base/InputRadio");
		var InputCheckbox = require("../../components/base/InputCheckbox");
		var Select = require("../../components/base/Select");
		var Hr = require("../../components/base/Hr");
		var Card = require("../../components/bootstrap4/Card");
		var Row = require("../../components/bootstrap4/Row");
		var Column = require("../../components/bootstrap4/Column");
		var ColumnHelper = require("../../components/bootstrap4/ColumnHelper");
		var SplitButton = require("../../components/bootstrap4/SplitButton");
		var HTML = require("../../components/base/HTML");
		var Body = require("../../components/base/Body");
		var CustomCode = require("../../components/base/CustomCode");
		var GroupOption = require("../../panels/GroupOption");
		var CheckBoxOption = require("../../panels/CheckBoxOption");
		var ButtonGroupOption = require("../../panels/ButtonGroupOption");
		var SelectOption = require("../../panels/SelectOption");
		var FlexOption = require("../../panels/FlexOption");
		var readFileAsBase64 = require("../../helpers/readFileAsBase64");
		var components = require("../../components/bootstrap4/");
		var ui = require("../../components/bootstrap4/ui.json");
		var themes = require("../../config/bootstrap4-themes");
		var templateThemes = require("../../config/bootstrap4-templates");
		var classSuggestions = require("../../config/bootstrap4-classes");
		var Bootstrap4 = function (_Bootstrap) {
			_inherits(Bootstrap4, _Bootstrap);

			function Bootstrap4() {
				_classCallCheck(this, Bootstrap4);
				_get(Object.getPrototypeOf(Bootstrap4.prototype), "constructor", this).call(this);
				this.name = "Bootstrap 4.1";
				this.version = "4";
				this.fullVersion = "4.1.3";
				this.jQueryVersions = [{
					short: 3,
					full: "3.3.1"
				}];
				this.defaultBreakpoint = "lg"
			}
			_createClass(Bootstrap4, [{
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
						icon: "tablet"
					}, {
						name: "lg",
						icon: "laptop_mac"
					}, {
						name: "xl",
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
						max: 575
					}, {
						name: "sm",
						size: 576,
						min: 576,
						max: 767
					}, {
						name: "md",
						size: 768,
						min: 768,
						max: 991
					}, {
						name: "lg",
						size: 992,
						min: 992,
						max: 1199
					}, {
						name: "xl",
						size: 1200,
						min: 1200,
						max: Infinity
					}]
				}
			}, {
				key: "getClassSuggestions",
				value: function getClassSuggestions() {
					return classSuggestions
				}
			}, {
				key: "getMediaQueryForSize",
				value: function getMediaQueryForSize(size) {
					if (size >= 1200) {
						return "(min-width: 1200px)"
					}
					if (size >= 992) {
						return "(min-width: 992px)"
					}
					if (size >= 768) {
						return "(min-width: 768px)"
					}
					if (size >= 576) {
						return "(min-width: 576px)"
					}
					return "(min-width: 300px)"
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
				key: "getSystemThemes",
				value: function getSystemThemes() {
					return themes.map(function (t) {
						var theme = new BuiltinTheme;
						theme.unserialize(t);
						return theme
					})
				}
			}, {
				key: "getTemplateThemes",
				value: function getTemplateThemes() {
					return templateThemes.map(function (t) {
						var theme = new TemplateTheme;
						theme.unserialize(t);
						return theme
					})
				}
			}, {
				key: "getURLForBootstrapJS",
				value: function getURLForBootstrapJS(context) {
					var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
					if (context.isExport && context.exportOptions && context.exportOptions.useCDN) {
						return "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/" + this.fullVersion + "/js/bootstrap.bundle.min.js"
					}
					return _get(Object.getPrototypeOf(Bootstrap4.prototype), "getURLForBootstrapJS", this).call(this, context, depth)
				}
			}, {
				key: "updateHTMLBody",
				value: function updateHTMLBody(html) {
					if (html.body.context().isDesign) {
						if (!html.body.modalBackdrop) {
							html.body.modalBackdrop = $('<div class="modal-backdrop fade show" bs-hidden bs-system-element>')
						}
					}
					_get(Object.getPrototypeOf(Bootstrap4.prototype), "updateHTMLBody", this).call(this, html)
				}
			}, {
				key: "startComponentUpdate",
				value: function startComponentUpdate(component) {
					_get(Object.getPrototypeOf(Bootstrap4.prototype), "startComponentUpdate", this).call(this, component);
					var elem = component.element[0];
					if (this.componentSupportsTextOptions(component)) {
						this.textComponentUpdate(component)
					}
					if (this.componentSupportsDecorationOptions(component)) {
						this.decorationComponentUpdate(component)
					}
					if (this.shouldAddTheFormControlClass(component)) {
						component.element[0].classList.add("form-control")
					}
					if (this.componentSupportsInputSize(component)) {
						if (component.properties.size) {
							component.element[0].classList.add("form-control-" + component.properties.size)
						}
					}
					if (component.properties["display"]) {
						elem.classList.add("d-" + component.properties["display"])
					}
					if (component.properties["display-print"]) {
						elem.classList.add("d-print-" + component.properties["display-print"])
					}
					if (component.properties["float"]) {
						elem.classList.add("float-" + component.properties["float"])
					}
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (var _iterator = propertyBreakpoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var breakpoint = _step.value;
							if (component.properties["display-" + breakpoint]) {
								elem.classList.add("d-" + breakpoint + "-" + component.properties["display-" + breakpoint])
							}
							if (component.properties["float-" + breakpoint]) {
								elem.classList.add("float-" + breakpoint + "-" + component.properties["float-" + breakpoint])
							}
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
					if (component.properties["flex-container"]) {
						elem.classList.add("d-" + component.properties["flex-container"])
					}
					if (component.properties["flex-direction"]) {
						elem.classList.add("flex-" + component.properties["flex-direction"])
					}
					if (component.properties["flex-grow"]) {
						elem.classList.add("flex-grow-" + component.properties["flex-grow"])
					}
					if (component.properties["flex-shrink"]) {
						elem.classList.add("flex-shrink-" + component.properties["flex-shrink"])
					}
					if (component.properties["flex-fill"]) {
						elem.classList.add("flex-fill")
					}
					if (component.properties["flex-justify-content"]) {
						elem.classList.add("justify-content-" + component.properties["flex-justify-content"])
					}
					if (component.properties["flex-align-items"]) {
						elem.classList.add("align-items-" + component.properties["flex-align-items"])
					}
					if (component.properties["flex-align-content"]) {
						elem.classList.add("align-content-" + component.properties["flex-align-content"])
					}
					if (component.properties["flex-align-self"]) {
						elem.classList.add("align-self-" + component.properties["flex-align-self"])
					}
					if (component.properties["flex-wrap"]) {
						elem.classList.add("flex-" + component.properties["flex-wrap"])
					}
					if (component.properties["flex-order"]) {
						elem.classList.add("order-" + component.properties["flex-order"])
					}
					if (component.properties["margin-auto"]) {
						var tmp = component.properties["margin-auto"];
						if (tmp == "all") {
							tmp = ""
						}
						elem.classList.add("m" + tmp + "-auto")
					}
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
					try {
						for (var _iterator2 = propertyBreakpoints[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var breakpoint = _step2.value;
							if (component.properties["flex-" + breakpoint + "-container"]) {
								elem.classList.add("d-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-container"])
							}
							if (component.properties["flex-" + breakpoint + "-direction"]) {
								elem.classList.add("flex-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-direction"])
							}
							if (component.properties["flex-" + breakpoint + "-grow"]) {
								elem.classList.add("flex-" + breakpoint + "-grow-" + component.properties["flex-" + breakpoint + "-grow"])
							}
							if (component.properties["flex-" + breakpoint + "-shrink"]) {
								elem.classList.add("flex-" + breakpoint + "-shrink-" + component.properties["flex-" + breakpoint + "-shrink"])
							}
							if (component.properties["flex-" + breakpoint + "-fill"]) {
								elem.classList.add("flex-" + breakpoint + "-fill")
							}
							if (component.properties["flex-" + breakpoint + "-justify-content"]) {
								elem.classList.add("justify-content-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-justify-content"])
							}
							if (component.properties["flex-" + breakpoint + "-align-items"]) {
								elem.classList.add("align-items-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-align-items"])
							}
							if (component.properties["flex-" + breakpoint + "-align-content"]) {
								elem.classList.add("align-content-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-align-content"])
							}
							if (component.properties["flex-" + breakpoint + "-align-self"]) {
								elem.classList.add("align-self-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-align-self"])
							}
							if (component.properties["flex-" + breakpoint + "-wrap"]) {
								elem.classList.add("flex-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-wrap"])
							}
							if (component.properties["flex-" + breakpoint + "-order"]) {
								elem.classList.add("order-" + breakpoint + "-" + component.properties["flex-" + breakpoint + "-order"])
							}
							if (component.properties["margin-" + breakpoint + "-auto"]) {
								var tmp = component.properties["margin-" + breakpoint + "-auto"];
								if (tmp == "all") {
									tmp = ""
								}
								elem.classList.add("m" + tmp + "-" + breakpoint + "-auto")
							}
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
					if (component.properties["sr-only"]) {
						elem.classList.add("sr-only")
					}
					if (component.properties["visibility"]) {
						elem.classList.add(component.properties["visibility"])
					}
				}
			}, {
				key: "buildComponentOptions",
				value: function buildComponentOptions(component) {
					var _this = this;
					_get(Object.getPrototypeOf(Bootstrap4.prototype), "buildComponentOptions", this).call(this, component);
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
					if (this.componentSupportsTextOptions(component)) {
						this.injectTextOptions(component)
					}
					if (this.componentSupportsDecorationOptions(component)) {
						this.injectDecorationOptions(component)
					}
					if (this.componentSupportsResponsiveDisplay(component)) {
						var responsiveDisplay = new GroupOption({
							id: "responsive-display",
							label: "Responsive Display",
							collapsed: true
						});
						settingsTab.add(responsiveDisplay, 70);
						var display = this.propertyToOptionItem(component, {
							id: "display",
							label: "Display",
							type: "select",
							value: "",
							options: responsiveDisplayProperties,
							collapsed: true
						});
						responsiveDisplay.add(display);
						var float = this.propertyToOptionItem(component, {
							id: "float",
							label: "Float",
							type: "select",
							value: "",
							options: responsiveFloatProperties,
							collapsed: true
						});
						responsiveDisplay.add(float);
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;
						try {
							for (var _iterator3 = propertyBreakpoints[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var breakpoint = _step3.value;
								var label = breakpoint.toUpperCase();
								display.add(this.propertyToOptionItem(component, {
									id: "display-" + breakpoint,
									label: label,
									type: "select",
									value: "",
									options: responsiveDisplayProperties
								}));
								float.add(this.propertyToOptionItem(component, {
									id: "float-" + breakpoint,
									label: label,
									type: "select",
									value: "",
									options: responsiveFloatProperties
								}))
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
						display.add(this.propertyToOptionItem(component, {
							id: "display-print",
							label: "Print",
							type: "select",
							value: "",
							options: responsivePrintDisplayProperties
						}))
					}
					if (this.componentSupportsFlexbox(component)) {
						var flexbox = new GroupOption({
							id: "flexbox",
							label: "Flexbox",
							collapsed: true
						});
						settingsTab.add(flexbox, 70);
						var flexAlignVertical = this.createFlexAlignmentControl(component, "vertical");
						var flexAlignHorizontal = this.createFlexAlignmentControl(component, "horizontal");
						flexbox.add(flexAlignVertical);
						flexbox.add(flexAlignHorizontal);
						var flexContainer = new SelectOption({
							id: "flex-container",
							label: "Flex Container",
							valueOp: function valueOp(val) {
								var oldValue = component.properties["display"];
								if (val == undefined) {
									var options = flexContainerProperties.map(function (opt) {
										return opt.value
									});
									if (options.indexOf(oldValue) !== -1) {
										return oldValue
									}
									return ""
								} else {
									return {
										do: function _do() {
											component.properties["display"] = val
										},
										undo: function undo() {
											component.properties["display"] = oldValue
										}
									}
								}
							},
							options: flexContainerProperties,
							component: component,
							history: "Change " + component.getName() + " " + this.label,
							collapsed: true
						});
						flexbox.add(flexContainer);
						var flexDirection = this.propertyToOptionItem(component, {
							id: "flex-direction",
							label: "Direction",
							type: "select",
							value: "",
							options: flexDirectionProperties,
							collapsed: true
						});
						flexbox.add(flexDirection);
						var flexGrow = this.propertyToOptionItem(component, {
							id: "flex-grow",
							label: "Grow",
							type: "select",
							value: "",
							options: flexGrowProperties,
							collapsed: true
						});
						flexbox.add(flexGrow);
						var flexShrink = this.propertyToOptionItem(component, {
							id: "flex-shrink",
							label: "Shrink",
							type: "select",
							value: "",
							options: flexShrinkProperties,
							collapsed: true
						});
						flexbox.add(flexShrink);
						var flexFill = this.propertyToOptionItem(component, {
							id: "flex-fill",
							label: "Fill",
							type: "select",
							value: "",
							options: flexFillProperties,
							collapsed: true
						});
						flexbox.add(flexFill);
						var flexJustifyContent = this.propertyToOptionItem(component, {
							id: "flex-justify-content",
							label: "Justify Content",
							type: "select",
							value: "",
							options: flexJustifyContentProperties,
							collapsed: true
						});
						flexbox.add(flexJustifyContent);
						var flexAlignItems = this.propertyToOptionItem(component, {
							id: "flex-align-items",
							label: "Align Items",
							type: "select",
							value: "",
							options: flexAlignItemsProperties,
							collapsed: true
						});
						flexbox.add(flexAlignItems);
						var flexAlignContent = this.propertyToOptionItem(component, {
							id: "flex-align-content",
							label: "Align Content",
							type: "select",
							value: "",
							options: flexAlignContentProperties,
							collapsed: true
						});
						flexbox.add(flexAlignContent);
						var flexWrap = this.propertyToOptionItem(component, {
							id: "flex-wrap",
							label: "Wrap",
							type: "select",
							value: "",
							options: flexWrapProperties,
							collapsed: true
						});
						flexbox.add(flexWrap);
						var flexAlignSelf = this.propertyToOptionItem(component, {
							id: "flex-align-self",
							label: "Align Self",
							type: "select",
							value: "",
							options: flexAlignSelfProperties,
							collapsed: true
						});
						flexbox.add(flexAlignSelf);
						var flexOrder = this.propertyToOptionItem(component, {
							id: "flex-order",
							label: "Order",
							type: "select",
							value: "",
							options: flexOrderProperties,
							collapsed: true
						});
						flexbox.add(flexOrder);
						var marginAuto = this.propertyToOptionItem(component, {
							id: "margin-auto",
							label: "Margin Auto",
							type: "select",
							value: "",
							options: marginAutoProperties,
							collapsed: true
						});
						flexbox.add(marginAuto);
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;
						try {
							var _loop = function () {
								var breakpoint = _step4.value;
								label = breakpoint.toUpperCase();
								flexContainer.add(new SelectOption({
									id: "flex-" + breakpoint + "-container",
									label: label,
									valueOp: function valueOp(val) {
										var propertyName = "display-" + breakpoint;
										var oldValue = component.properties[propertyName];
										if (val == undefined) {
											var options = flexContainerProperties.map(function (opt) {
												return opt.value
											});
											if (options.indexOf(oldValue) !== -1) {
												return oldValue
											}
											return ""
										} else {
											return {
												do: function _do() {
													component.properties[propertyName] = val
												},
												undo: function undo() {
													component.properties[propertyName] = oldValue
												}
											}
										}
									},
									options: flexContainerProperties,
									component: component,
									history: "Change " + component.getName() + " " + _this.label,
									collapsed: true
								}));
								flexDirection.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-direction",
									label: label,
									type: "select",
									value: "",
									options: flexDirectionProperties
								}));
								flexGrow.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-grow",
									label: label,
									type: "select",
									value: "",
									options: flexGrowProperties
								}));
								flexShrink.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-shrink",
									label: label,
									type: "select",
									value: "",
									options: flexShrinkProperties
								}));
								flexFill.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-fill",
									label: label,
									type: "select",
									value: "",
									options: flexFillProperties
								}));
								flexJustifyContent.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-justify-content",
									label: label,
									type: "select",
									value: "",
									options: flexJustifyContentProperties
								}));
								flexAlignItems.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-align-items",
									label: label,
									type: "select",
									value: "",
									options: flexAlignItemsProperties
								}));
								flexAlignContent.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-align-content",
									label: label,
									type: "select",
									value: "",
									options: flexAlignContentProperties
								}));
								flexWrap.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-wrap",
									label: label,
									type: "select",
									value: "",
									options: flexWrapProperties
								}));
								flexOrder.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-order",
									label: label,
									type: "select",
									value: "",
									options: flexOrderProperties
								}));
								flexAlignSelf.add(_this.propertyToOptionItem(component, {
									id: "flex-" + breakpoint + "-align-self",
									label: label,
									type: "select",
									value: "",
									options: flexAlignSelfProperties
								}));
								marginAuto.add(_this.propertyToOptionItem(component, {
									id: "margin-" + breakpoint + "-auto",
									label: label,
									type: "select",
									value: "",
									options: marginAutoProperties
								}))
							};
							for (var _iterator4 = propertyBreakpoints[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var label;
								_loop()
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
					}
					if (this.componentSupportsAccessibility(component)) {
						var accessibility = new GroupOption({
							id: "accessibility",
							label: "Accessibility",
							collapsed: true
						});
						settingsTab.add(accessibility, 70);
						accessibility.add(this.propertyToOptionItem(component, {
							id: "visibility",
							label: "Visibility",
							type: "select",
							value: "",
							options: visibilityProperties
						}));
						accessibility.add(this.propertyToOptionItem(component, {
							id: "sr-only",
							label: "Screenreader Only",
							type: "checkbox",
							value: false
						}))
					}
				}
			}, {
				key: "createFlexAlignmentControl",
				value: function createFlexAlignmentControl(component, type) {
					var buttonToProperties = {};
					var propertiesToButton = {};
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;
					try {
						for (var _iterator5 = flexDirectionProperties[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var direction = _step5.value;
							buttonToProperties[direction.value] = new Map;
							propertiesToButton[direction.value] = new Map;
							var _iteratorNormalCompletion8 = true;
							var _didIteratorError8 = false;
							var _iteratorError8 = undefined;
							try {
								for (var _iterator8 = flexAlignmentButtons[type][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
									var button = _step8.value;
									var result = {};
									var property = flexAlignmentProperties[type][direction.value];
									result[property] = getValueForProperty(property, button.value, direction.value);
									buttonToProperties[direction.value].set(button.value, result);
									propertiesToButton[direction.value].set(JSON.stringify(result), button.value)
								}
							} catch (err) {
								_didIteratorError8 = true;
								_iteratorError8 = err
							} finally {
								try {
									if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
										_iterator8["return"]()
									}
								} finally {
									if (_didIteratorError8) {
										throw _iteratorError8
									}
								}
							}
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
								_iterator5["return"]()
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5
							}
						}
					}

					function getValueForProperty(property, value, direction) {
						var possibleValues = ["start", "center", "end"];
						var reverse = direction && direction.match("reverse");
						var propertyJustify = property.match("justify-content");
						value = reverse && propertyJustify ? -value : value;
						return possibleValues[value + 1]
					}

					function getPropertyName() {
						var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
						var property = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
						var breakpoint = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];
						var nameArray = [];
						if (prefix.length) {
							nameArray.push(prefix)
						}
						if (propertyBreakpoints.includes(breakpoint)) {
							nameArray.push(breakpoint)
						}
						if (property.length) {
							nameArray.push(property)
						}
						return nameArray.join("-")
					}

					function getDisplayedValue(property, currentBreakpoint) {
						var values = getAllValues(property, currentBreakpoint);
						values.reverse();
						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;
						try {
							for (var _iterator6 = values[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var value = _step6.value;
								if (value.value.length) {
									return value
								}
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
									_iterator6["return"]()
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6
								}
							}
						}
						return {}
					}

					function getAllValues(property, currentBreakpoint) {
						var breakpoints = propertyBreakpoints.slice(0, propertyBreakpoints.indexOf(currentBreakpoint) + 1);
						var result = [];
						breakpoints.unshift("xs");
						var _iteratorNormalCompletion7 = true;
						var _didIteratorError7 = false;
						var _iteratorError7 = undefined;
						try {
							for (var _iterator7 = breakpoints[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
								var breakpoint = _step7.value;
								result.push({
									breakpoint: breakpoint,
									value: component.properties[getPropertyName.apply(undefined, _toConsumableArray(property).concat([breakpoint]))] || ""
								})
							}
						} catch (err) {
							_didIteratorError7 = true;
							_iteratorError7 = err
						} finally {
							try {
								if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
									_iterator7["return"]()
								}
							} finally {
								if (_didIteratorError7) {
									throw _iteratorError7
								}
							}
						}
						return result
					}

					function isDisplay(type) {
						var container = getDisplayedValue(["display", ""], app.canvas.getBreakpoint()).value;
						return container && container.match(type)
					}
					return new FlexOption({
						id: "flexbox-alignment-" + type,
						valueOp: function valueOp(newButton, oldButton) {
							var alignmentValues = {};
							var currentBreakpoint = app.canvas.getBreakpoint();
							var direction = getDisplayedValue(["flex", "direction"], currentBreakpoint).value || "";
							var property = flexAlignmentProperties[type][direction];
							var currentProperties = getAllValues(["flex", property], currentBreakpoint);
							var displayedProperty = getDisplayedValue(["flex", property], currentBreakpoint);
							alignmentValues[property] = displayedProperty.value;
							if (newButton == undefined) {
								if (!isDisplay("flex")) {
									return {}
								}
								return propertiesToButton[direction].get(JSON.stringify(alignmentValues))
							} else {
								var oldValues = {};
								var newValues = {};
								var containerProperty;
								var breakpointToSet = displayedProperty.breakpoint;
								var valueToSet;
								if (!isDisplay("flex")) {
									containerProperty = getPropertyName("display", "", currentBreakpoint)
								}
								if (newButton !== oldButton) {
									breakpointToSet = currentBreakpoint;
									valueToSet = buttonToProperties[direction].get(newButton)[property];
									if (containerProperty) {
										newValues[containerProperty] = "flex"
									}
								}
								var propertyName = getPropertyName("flex", property, breakpointToSet);
								newValues[propertyName] = valueToSet;
								var oldValue = currentProperties.find(function (i) {
									return i.breakpoint === breakpointToSet
								});
								oldValues[propertyName] = oldValue ? oldValue.value : "";
								if (containerProperty) {
									oldValues[containerProperty] = component.properties[containerProperty]
								}
								return {
									do: function _do() {
										for (var property in newValues) {
											component.properties[property] = newValues[property]
										}
									},
									undo: function undo() {
										for (var property in oldValues) {
											component.properties[property] = oldValues[property]
										}
									}
								}
							}
						},
						options: flexAlignmentButtons[type],
						updateOnResize: true,
						resetOnClick: true,
						flat: true,
						inline: true,
						component: component,
						history: history,
						collapsed: false
					})
				}
			}, {
				key: "componentSupportsFlexbox",
				value: function componentSupportsFlexbox(component) {
					return !(component instanceof HTML || component instanceof Body || component instanceof CustomCode)
				}
			}, {
				key: "componentSupportsResponsiveDisplay",
				value: function componentSupportsResponsiveDisplay(component) {
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
					return _get(Object.getPrototypeOf(Bootstrap4.prototype), "componentSupportsTextOptions", this).call(this, component) && !(component instanceof SplitButton || component instanceof ColumnHelper)
				}
			}, {
				key: "componentSupportsColorOptions",
				value: function componentSupportsColorOptions(component) {
					return _get(Object.getPrototypeOf(Bootstrap4.prototype), "componentSupportsColorOptions", this).call(this, component) && !(component instanceof Card)
				}
			}, {
				key: "componentSupportsDecorationOptions",
				value: function componentSupportsDecorationOptions(component) {
					return this.componentSupportsOptions(component) && !(component instanceof HTML || component instanceof Body || component instanceof Row || component instanceof Column || component instanceof ColumnHelper || component instanceof InputCheckbox || component instanceof InputRadio || component instanceof Hr)
				}
			}, {
				key: "shouldAddTheFormControlClass",
				value: function shouldAddTheFormControlClass(component) {
					if (!(component instanceof InputBase)) {
						return false
					}
					if (component instanceof InputColor || component instanceof InputFile || component instanceof InputRadioCheckBase || component instanceof InputPlain || component instanceof InputRange) {
						return false
					}
					return component.hasParent(Form) || component.parent instanceof InputGroup
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
					settingsTab.add(textOptions, 60);
					if (properties.includeAlignment) {
						var alignment = this.propertyToOptionItem(component, {
							id: "text-alignment",
							label: "Alignment",
							type: "button-group",
							value: "",
							options: possibleAlignments,
							collapsed: true
						});
						var _iteratorNormalCompletion9 = true;
						var _didIteratorError9 = false;
						var _iteratorError9 = undefined;
						try {
							for (var _iterator9 = propertyBreakpoints[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
								var breakpoint = _step9.value;
								alignment.add(this.propertyToOptionItem(component, {
									id: "text-" + breakpoint + "-alignment",
									label: breakpoint.toUpperCase(),
									type: "button-group",
									value: "",
									options: possibleAlignments.slice(0, -1)
								}))
							}
						} catch (err) {
							_didIteratorError9 = true;
							_iteratorError9 = err
						} finally {
							try {
								if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
									_iterator9["return"]()
								}
							} finally {
								if (_didIteratorError9) {
									throw _iteratorError9
								}
							}
						}
						textOptions.add(alignment)
					}
					if (properties.includeColor) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "contextual-color",
							label: "Color",
							type: "select",
							value: "",
							options: possibleContextualColors
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
					textOptions.add(this.propertyToOptionItem(component, {
						id: "text-monospace",
						label: "Monospace",
						type: "checkbox",
						value: false
					}));
					if (properties.includeNowrap) {
						textOptions.add(this.propertyToOptionItem(component, {
							id: "text-nowrap",
							label: "No Wrap",
							type: "checkbox",
							value: false
						}));
						textOptions.add(this.propertyToOptionItem(component, {
							id: "text-truncate",
							label: "Truncate",
							type: "checkbox",
							value: false
						}))
					}
				}
			}, {
				key: "textComponentUpdate",
				value: function textComponentUpdate(component) {
					var elem = component.element[0];
					if (component.properties["text-monospace"]) {
						elem.classList.add("text-monospace")
					}
					if (component.properties["text-nowrap"]) {
						elem.classList.add("text-nowrap")
					}
					if (component.properties["text-truncate"]) {
						elem.classList.add("text-truncate")
					}
					if (component.properties["text-transformation"]) {
						elem.classList.add(component.properties["text-transformation"])
					}
					if (component.properties["text-alignment"]) {
						elem.classList.add("text-" + component.properties["text-alignment"])
					}
					var _iteratorNormalCompletion10 = true;
					var _didIteratorError10 = false;
					var _iteratorError10 = undefined;
					try {
						for (var _iterator10 = propertyBreakpoints[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
							var breakpoint = _step10.value;
							if (component.properties["text-" + breakpoint + "-alignment"]) {
								elem.classList.add("text-" + breakpoint + "-" + component.properties["text-" + breakpoint + "-alignment"])
							}
						}
					} catch (err) {
						_didIteratorError10 = true;
						_iteratorError10 = err
					} finally {
						try {
							if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
								_iterator10["return"]()
							}
						} finally {
							if (_didIteratorError10) {
								throw _iteratorError10
							}
						}
					}
					if (component.properties["contextual-color"]) {
						elem.classList.add(component.properties["contextual-color"])
					}
				}
			}, {
				key: "injectColorOptions",
				value: function injectColorOptions(component) {
					var properties = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
					var weight = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
					properties = Object.assign({
						includeColor: true,
						includeBackground: true,
						includeBorderColor: true
					}, properties);
					var optionsGroup = component.getMainOptionsGroup();
					if (properties.includeColor) {
						optionsGroup.add(this.propertyToOptionItem(component, {
							id: "contextual-color",
							label: "Color",
							type: "select",
							value: "",
							options: possibleContextualColors
						}), weight)
					}
					if (properties.includeBackground) {
						optionsGroup.add(this.propertyToOptionItem(component, {
							id: "contextual-background",
							label: "Background",
							type: "select",
							value: "",
							options: possibleContextualBackgrounds
						}), weight)
					}
					if (properties.includeBorderColor) {
						optionsGroup.add(this.propertyToOptionItem(component, {
							id: "contextual-border-color",
							label: "Border Color",
							type: "select",
							value: "",
							options: possibleContextualBorderColors
						}), weight)
					}
				}
			}, {
				key: "colorComponentUpdate",
				value: function colorComponentUpdate(component) {
					delete component.cssClasses.system.contextualColor;
					delete component.cssClasses.system.contextualBackground;
					delete component.cssClasses.system.contextualBorderColor;
					if (component.properties["contextual-color"]) {
						component.cssClasses.system.contextualColor = component.properties["contextual-color"]
					}
					if (component.properties["contextual-background"]) {
						component.cssClasses.system.contextualBackground = component.properties["contextual-background"]
					}
					if (component.properties["contextual-border-color"]) {
						component.cssClasses.system.contextualBorderColor = component.properties["contextual-border-color"]
					}
				}
			}, {
				key: "injectDecorationOptions",
				value: function injectDecorationOptions(component, properties) {
					properties = Object.assign({
						includeBackground: true,
						includeBorder: true,
						includeShadow: true
					}, properties);
					var settingsTab = app.getPanel("settings");
					var decorations = new GroupOption({
						id: "decorations",
						label: "Decorations",
						collapsed: true
					});
					settingsTab.add(decorations, 60);
					if (properties.includeBorder) {
						decorations.add(this.propertyToOptionItem(component, {
							id: "contextual-border",
							label: "Border",
							type: "button-group",
							value: "",
							options: possibleContextualBorders,
							collapsed: true
						}));
						decorations.add(this.propertyToOptionItem(component, {
							id: "contextual-border-color",
							label: "Border Color",
							type: "select",
							value: "",
							options: possibleContextualBorderColors
						}))
					}
					if (properties.includeShadow) {
						decorations.add(this.propertyToOptionItem(component, {
							id: "shadow",
							label: "Shadow",
							type: "select",
							value: "",
							options: possibleShadows
						}))
					}
					if (this.componentSupportsColorOptions(component)) {
						decorations.add(this.propertyToOptionItem(component, {
							id: "contextual-background",
							label: "Background",
							type: "select",
							value: "",
							options: possibleContextualBackgrounds,
							collapsed: true
						}))
					}
				}
			}, {
				key: "decorationComponentUpdate",
				value: function decorationComponentUpdate(component) {
					var elem = component.element[0];
					if (component.properties["contextual-background"]) {
						elem.classList.add(component.properties["contextual-background"])
					}
					if (component.properties["contextual-border"]) {
						var _elem$classList;
						(_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(component.properties["contextual-border"].split(" ")))
					}
					if (component.properties["contextual-border-color"]) {
						elem.classList.add(component.properties["contextual-border-color"])
					}
					if (component.properties.shadow) {
						elem.classList.add(component.properties.shadow)
					}
				}
			}, {
				key: "injectExportItems",
				value: function injectExportItems(context, options) {
					var inject = {
						operations: [],
						files: {}
					};
					return inject
				}
			}, {
				key: "getIframeStyles",
				value: function getIframeStyles() {
					var styles = _get(Object.getPrototypeOf(Bootstrap4.prototype), "getIframeStyles", this).call(this);
					styles += '\n\n\t\tdiv[class*="col-"]:empty,\t\t\n\t\tdiv.col:empty{\n\t\t\tdisplay:flex;\n\t\t}\n\n\t\tdiv[class*="col-"]:empty:before,\n\t\tform:empty:before,\n\t\t.row:empty:before,\n\t\t.form-row:empty:before,\n\t\t.container:empty:before, \n\t\t.container-fluid:empty:before{\n\t\t\twidth: 100%;\n\t\t}\n\n\t\tdiv.col:empty:before{\n\t\t\tbackground-color:#eee;\n\t\t\tcontent:\'Empty Column\';\n\t\t\tline-height:40px;\n\t\t\ttext-align: center;\n\t\t\tdisplay:block;\n\t\t\tline-height:80px;\n\t\t\tfont-size:24px;\n\t\t\tcolor:#aaa;\n\t\t\tfont-weight:bold;\n\t\t\twidth:100%;\n\t\t}\n\t\t';
					return styles
				}
			}, {
				key: "getScreenshotHeadIncludes",
				value: function getScreenshotHeadIncludes() {
					return ["../assets/cogworks/embed/bootstrap/4/default/bootstrap.min.css", "../assets/cogworks/embed/fonts/fontawesome-all.min.css", "../assets/cogworks/embed/fonts/font-awesome.min.css", "../assets/cogworks/embed/fonts/line-awesome.min.css", "../assets/cogworks/embed/fonts/ionicons.min.css", "../assets/cogworks/embed/fonts/material-icons.min.css", "../assets/cogworks/embed/fonts/simple-line-icons.min.css", "../assets/cogworks/embed/fonts/typicons.min.css"]
				}
			}]);
			return Bootstrap4
		}(Bootstrap);
		var propertyBreakpoints = ["sm", "md", "lg", "xl"];
		var flexAlignmentProperties = {
			horizontal: {
				"": "justify-content",
				row: "justify-content",
				"row-reverse": "justify-content",
				column: "align-items",
				"column-reverse": "align-items"
			},
			vertical: {
				"": "align-items",
				row: "align-items",
				"row-reverse": "align-items",
				column: "justify-content",
				"column-reverse": "justify-content"
			}
		};
		var iconHTML = '<span class="horizontal"></span><span class="vertical"></span>';
		var flexAlignmentButtons = {
			horizontal: [{
				label: "Left",
				value: -1,
				iconClass: "flex-alignment-icon horizontal center-y left",
				iconHTML: '<span class="vertical"></span>'
			}, {
				label: "Center",
				value: 0,
				iconClass: "flex-alignment-icon horizontal center-y center-x",
				iconHTML: '<span class="vertical"></span>'
			}, {
				label: "Right",
				value: 1,
				iconClass: "flex-alignment-icon horizontal center-y right",
				iconHTML: '<span class="vertical"></span>'
			}],
			vertical: [{
				label: "Top",
				value: -1,
				iconClass: "flex-alignment-icon vertical center-x top",
				iconHTML: '<span class="horizontal"></span>'
			}, {
				label: "Center",
				value: 0,
				iconClass: "flex-alignment-icon vertical center-x center-y",
				iconHTML: '<span class="horizontal"></span>'
			}, {
				label: "Bottom",
				value: 1,
				iconClass: "flex-alignment-icon vertical center-x bottom",
				iconHTML: '<span class="horizontal"></span>'
			}]
		};
		var flexContainerProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Flex",
			value: "flex"
		}, {
			label: "Inline Flex",
			value: "inline-flex"
		}];
		var flexDirectionProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Row",
			value: "row"
		}, {
			label: "Row Reverse",
			value: "row-reverse"
		}, {
			label: "Column",
			value: "column"
		}, {
			label: "Column Reverse",
			value: "column-reverse"
		}];
		var flexGrowProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Yes",
			value: "1"
		}, {
			label: "No",
			value: "0"
		}];
		var flexShrinkProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Yes",
			value: "1"
		}, {
			label: "No",
			value: "0"
		}];
		var flexFillProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Yes",
			value: "1"
		}];
		var flexJustifyContentProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Start",
			value: "start"
		}, {
			label: "End",
			value: "end"
		}, {
			label: "Center",
			value: "center"
		}, {
			label: "Between",
			value: "between"
		}, {
			label: "Around",
			value: "around"
		}];
		var flexAlignItemsProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Start",
			value: "start"
		}, {
			label: "End",
			value: "end"
		}, {
			label: "Center",
			value: "center"
		}, {
			label: "Baseline",
			value: "baseline"
		}, {
			label: "Stretch",
			value: "stretch"
		}];
		var flexAlignContentProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Start",
			value: "start"
		}, {
			label: "End",
			value: "end"
		}, {
			label: "Center",
			value: "center"
		}, {
			label: "Around",
			value: "around"
		}, {
			label: "Stretch",
			value: "stretch"
		}];
		var flexAlignSelfProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Start",
			value: "start"
		}, {
			label: "End",
			value: "end"
		}, {
			label: "Center",
			value: "center"
		}, {
			label: "Baseline",
			value: "baseline"
		}, {
			label: "Stretch",
			value: "stretch"
		}];
		var flexWrapProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Nowrap",
			value: "nowrap"
		}, {
			label: "Wrap",
			value: "wrap"
		}, {
			label: "Wrap Reverse",
			value: "wrap-reverse"
		}];
		var flexOrderProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "1",
			value: "1"
		}, {
			label: "2",
			value: "2"
		}, {
			label: "3",
			value: "3"
		}, {
			label: "4",
			value: "4"
		}, {
			label: "5",
			value: "5"
		}, {
			label: "6",
			value: "6"
		}, {
			label: "7",
			value: "7"
		}, {
			label: "8",
			value: "8"
		}, {
			label: "9",
			value: "9"
		}, {
			label: "10",
			value: "10"
		}, {
			label: "11",
			value: "11"
		}, {
			label: "12",
			value: "12"
		}];
		var marginAutoProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "All",
			value: "all"
		}, {
			label: "Horizontal",
			value: "x"
		}, {
			label: "Vertical",
			value: "y"
		}, {
			label: "Left",
			value: "l"
		}, {
			label: "Right",
			value: "r"
		}, {
			label: "Top",
			value: "t"
		}, {
			label: "Bottom",
			value: "b"
		}];
		var responsiveDisplayProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "None",
			value: "none"
		}, {
			label: "Inline",
			value: "inline"
		}, {
			label: "Inline Block",
			value: "inline-block"
		}, {
			label: "Block",
			value: "block"
		}, {
			label: "Table",
			value: "table"
		}, {
			label: "Table Cell",
			value: "table-cell"
		}, {
			label: "Table Row",
			value: "table-row"
		}, {
			label: "Flex",
			value: "flex"
		}, {
			label: "Inline Flex",
			value: "inline-flex"
		}];
		var responsivePrintDisplayProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "None",
			value: "none"
		}, {
			label: "Inline",
			value: "inline"
		}, {
			label: "Inline Block",
			value: "inline-block"
		}, {
			label: "Block",
			value: "block"
		}, {
			label: "Table",
			value: "table"
		}, {
			label: "Table Cell",
			value: "table-cell"
		}, {
			label: "Table Row",
			value: "table-row"
		}, {
			label: "Flex",
			value: "flex"
		}, {
			label: "Inline Flex",
			value: "inline-flex"
		}];
		var responsiveFloatProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Left",
			value: "left"
		}, {
			label: "Right",
			value: "right"
		}, {
			label: "None",
			value: "none"
		}];
		var visibilityProperties = [{
			label: "Default",
			value: ""
		}, {
			label: "Visible",
			value: "visible"
		}, {
			label: "Invisible",
			value: "invisible"
		}];
		var possibleAlignments = [{
			label: "Default",
			value: "",
			icon: "close"
		}, {
			label: "Left",
			value: "left",
			icon: "format_align_left"
		}, {
			label: "Center",
			value: "center",
			icon: "format_align_center"
		}, {
			label: "Right",
			value: "right",
			icon: "format_align_right"
		}, {
			label: "Justify",
			value: "justify",
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
			label: "Primary",
			value: "text-primary"
		}, {
			label: "Secondary",
			value: "text-secondary"
		}, {
			label: "Success",
			value: "text-success"
		}, {
			label: "Danger",
			value: "text-danger"
		}, {
			label: "Warning",
			value: "text-warning"
		}, {
			label: "Info",
			value: "text-info"
		}, {
			label: "Muted",
			value: "text-muted"
		}, {
			label: "Light",
			value: "text-light"
		}, {
			label: "Dark",
			value: "text-dark"
		}, {
			label: "White",
			value: "text-white"
		}, {
			label: "Body Color",
			value: "text-body"
		}, {
			label: "Semi-Black",
			value: "text-black-50"
		}, {
			label: "Semi-White",
			value: "text-white-50"
		}];
		var possibleContextualBackgrounds = [{
			label: "Default",
			value: ""
		}, {
			label: "Primary",
			value: "bg-primary"
		}, {
			label: "Secondary",
			value: "bg-secondary"
		}, {
			label: "Success",
			value: "bg-success"
		}, {
			label: "Danger",
			value: "bg-danger"
		}, {
			label: "Warning",
			value: "bg-warning"
		}, {
			label: "Info",
			value: "bg-info"
		}, {
			label: "Light",
			value: "bg-light"
		}, {
			label: "Dark",
			value: "bg-dark"
		}, {
			label: "White",
			value: "bg-white"
		}];
		var possibleContextualBorders = [{
			label: "Default",
			value: "",
			icon: "close"
		}, {
			label: "Regular",
			value: "border rounded-0",
			iconClass: "border-regular"
		}, {
			label: "Rounded",
			value: "border rounded",
			iconClass: "border-rounded"
		}, {
			label: "Circle",
			value: "border rounded-circle",
			icon: "panorama_fish_eye"
		}];
		var possibleContextualBorderColors = [{
			label: "Default",
			value: ""
		}, {
			label: "Primary",
			value: "border-primary"
		}, {
			label: "Secondary",
			value: "border-secondary"
		}, {
			label: "Success",
			value: "border-success"
		}, {
			label: "Danger",
			value: "border-danger"
		}, {
			label: "Warning",
			value: "border-warning"
		}, {
			label: "Info",
			value: "border-info"
		}, {
			label: "Light",
			value: "border-light"
		}, {
			label: "Dark",
			value: "border-dark"
		}, {
			label: "White",
			value: "border-white"
		}];
		var possibleShadows = [{
			label: "Default",
			value: ""
		}, {
			label: "Small",
			value: "shadow-sm"
		}, {
			label: "Regular",
			value: "shadow"
		}, {
			label: "Large",
			value: "shadow-lg"
		}, {
			label: "None",
			value: "shadow-none"
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
		module.exports = Bootstrap4
	}, {
		"../../base/BuiltinTheme": 11,
		"../../base/TemplateTheme": 26,
		"../../components/base/Body": 34,
		"../../components/base/ComponentWithInlineEditing": 41,
		"../../components/base/CustomCode": 42,
		"../../components/base/Form": 49,
		"../../components/base/HTML": 50,
		"../../components/base/Hr": 54,
		"../../components/base/InputBase": 58,
		"../../components/base/InputCheckbox": 59,
		"../../components/base/InputColor": 60,
		"../../components/base/InputDateAndTime": 61,
		"../../components/base/InputFile": 63,
		"../../components/base/InputNumber": 65,
		"../../components/base/InputRadio": 67,
		"../../components/base/InputRadioCheckBase": 68,
		"../../components/base/InputRange": 69,
		"../../components/base/InputText": 72,
		"../../components/base/InputTextarea": 73,
		"../../components/base/Select": 84,
		"../../components/bootstrap4/": 356,
		"../../components/bootstrap4/Card": 277,
		"../../components/bootstrap4/Column": 293,
		"../../components/bootstrap4/ColumnHelper": 294,
		"../../components/bootstrap4/InputGroup": 312,
		"../../components/bootstrap4/InputPlain": 316,
		"../../components/bootstrap4/Row": 342,
		"../../components/bootstrap4/SplitButton": 343,
		"../../components/bootstrap4/ui.json": 357,
		"../../config/bootstrap4-classes": 363,
		"../../config/bootstrap4-templates": 364,
		"../../config/bootstrap4-themes": 365,
		"../../helpers/readFileAsBase64": 600,
		"../../panels/ButtonGroupOption": 1211,
		"../../panels/CheckBoxOption": 1213,
		"../../panels/FlexOption": 1221,
		"../../panels/GroupOption": 1222,
		"../../panels/SelectOption": 1238,
		"./Bootstrap": 538
	}]
});
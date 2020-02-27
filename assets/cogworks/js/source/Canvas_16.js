define([], function () {
	return [function (require, module, exports) {
		"use strict";
		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key]
					}
				}
			}
			return target
		};
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
		var deepEqual = require("deep-equal");
		var Point = require("../base/Point");
		var Box = require("./Box");
		var Row = require("../components/base/Row");
		var Column = require("../components/base/Column");
		var CustomCode = require("../components/base/CustomCode");
		var Resource = require("../resources/Resource");
		var dragScroll = require("../helpers/dragScroll");
		var isContextClick = require("../helpers/isContextClick");
		var isSelectionClick = require("../helpers/isSelectionClick");
		var _generateUniqueID = require("../helpers/generateUniqueID");
		var clientRectsEqual = require("../helpers/clientRectsEqual");
		var resizeHandler = require("../helpers/resizeHandler");
		var getDimensions = require("../helpers/getDimensions");
		var escapeInlineStyleContent = require("../helpers/escapeInlineStyleContent");
		var ImageResource = require("../resources/ImageResource");
		var devices = require("../config/devices");
		var Canvas = function () {
			function Canvas(elem) {
				var _this2 = this;
				_classCallCheck(this, Canvas);
				this.element = elem;
				this.viewWrapper = elem.find(".view-wrapper");
				this.uiContainer = elem.find(".ui-offset");
				this.uiOverlay = elem.find(".ui-overlay");
				this.iframe = $("<iframe>");
				this.iframe.on("load", this.initIframe.bind(this));
				this.iframe.prop("src", "../assets/cogworks/html/iframe.html");
				this.iframeDoc = null;
				this.iframeWin = null;
				this.uiContainer.prepend(this.iframe);
				this.isResizing = false;
				this.gridContainer = this.element.find(".grid");
				this.highlights = this.element.find(".highlights");
				this.focusBarContainer = this.element.find(".focus-bar-container");
				this.line = this.element.find(".line");
				this.mousePosition = new Point;
				this.drawLine = null;
				this.html = null;
				this.iframeOffset = null;
				this.dimensions = {};
				this.pendingLinkChecks = new Set;
				this._linkCheckTimer = null;
				this._linkCheckTimerFn = function () {
					this.checkLinkedComponents()
				}.bind(this);
				this._updateTimer = null;
				this._updateTimerFn = function () {
					this.update()
				}.bind(this);
				var that = this;
				this.element.on("scroll", function (e) {
					that.updateIframeOffset();
					that.saveScrollPosition()
				});
				app.on("context-activated", function () {
					that.updateIframeOffset();
					that.restoreScrollPosition()
				});
				this.element.on("mousedown", ".move-handle", function (e) {
					e.preventDefault();
					e.stopPropagation();
					var components = app.context.page.getFlatSelectedComponentsInTreeOrder();
					if (components.length == 1) {
						var component = components[0];
						if (isContextClick(e)) {
							component.showContextMenu();
							return
						}
						app.dragStart({
							components: components,
							historyTitle: "Move " + component.getName(),
							origin: {
								top: component.y * app.context.canvasDimensions.zoom + that.iframeOffset.top,
								left: component.x * app.context.canvasDimensions.zoom + that.iframeOffset.left,
								width: component.width * app.context.canvasDimensions.zoom,
								height: component.height * app.context.canvasDimensions.zoom
							},
							operation: component.moveOp()
						})
					} else {
						if (isContextClick(e)) {
							app.context.page.showSelectionContextMenu();
							return
						}
						var rect = app.context.page.getSelectionRect();
						rect.top += that.iframeOffset.top;
						rect.left += that.iframeOffset.left;
						app.dragStart({
							components: components,
							historyTitle: "Move Components",
							origin: rect,
							operation: app.context.page.moveSelectionOp()
						})
					}
				});
				app.on("drag-end", function (components) {
					var _this = this;
					setTimeout(function () {
						_this.scrollToComponent(components[0])
					}, 10);
					this.hideLine()
				}.bind(this));
				app.on("mouseup", this.mouseup.bind(this));
				app.on("mousedown", this.mousedown.bind(this));
				app.on("mousemove", this.mousemove.bind(this));
				app.on("context-activated page-activated", this.setUpCanvas.bind(this));
				app.on("context-closed", this.contextClosed.bind(this));
				app.on("component-updated", this.componentUpdated.bind(this));
				app.on("component-dimensions-updated", this.componentDimensionsUpdated.bind(this));
				app.on("component-inlineediting-start component-inlineediting-end", this.inlineEditableStatusChange.bind(this));
				app.on("component-selected component-unselected", this.selectionChanged.bind(this));
				app.on("interface-zoom-factor-change", this.interfaceZoomFactorChange.bind(this));
				app.on("context-css-changed", this.contextCSSChanged.bind(this));
				app.on("context-sass-changed", this.contextSASSChanged.bind(this));
				app.on("context-meta-changed", function () {
					return _this2.schedulePartialUpdate({
						head: true
					})
				});
				app.on("resource-changed", this.resourceChanged.bind(this));
				app.on("resize panel-resize panel-resizing", this.updateDimensions.bind(this));
				this.element.on("mouseenter", this.updateDimensions.bind(this));
				this.element.on("scroll", this.onScroll.bind(this));
				app.on("context-activated page-activated component-unselected", this.resetCSSOverride.bind(this));
				app.on("context-theme-changed", this.themeChanged.bind(this));
				app.on("drag-start", this.dragStart.bind(this));
				app.on("drag-end", this.dragEnd.bind(this));
				this.element.on("mousedown", ".handle.resize-canvas", function (e) {
					e.preventDefault();
					var handle = $(e.target);
					var handleType = handle.data("type");
					resizeHandler({
						type: handleType,
						dimensions: {
							scaleX: 2 / app.context.canvasDimensions.zoom,
							scaleY: 2 / app.context.canvasDimensions.zoom,
							width: app.context.canvasDimensions.width,
							height: app.context.canvasDimensions.height,
							minWidth: 340,
							maxWidth: 5e3,
							minHeight: 300
						},
						onResize: function onResize(_ref) {
							var width = _ref.width;
							var height = _ref.height;
							_this2.isResizing = true;
							_this2.resize({
								width: Math.round(width),
								height: Math.round(height)
							}, {
								delayUIUpdate: 200
							})
						},
						onResizeEnd: function onResizeEnd() {
							_this2.isResizing = false;
							var scrollBottom = _this2.element[0].scrollHeight - _this2.element[0].clientHeight - _this2.element[0].scrollTop;
							var scrollRight = _this2.element[0].scrollWidth - _this2.element[0].clientWidth - _this2.element[0].scrollLeft;
							_this2.resize();
							if (handleType.match(/n|s/)) {
								_this2.element[0].scrollTop = _this2.element[0].scrollHeight - _this2.element[0].clientHeight - scrollBottom - 8
							}
							if (handleType.match(/e|w/)) {
								_this2.element[0].scrollLeft = _this2.element[0].scrollWidth - _this2.element[0].clientWidth - scrollRight - 8
							}
						}
					})
				})
			}
			_createClass(Canvas, [{
				key: "initIframe",
				value: function initIframe() {
					var that = this;
					var iframe = this.iframe[0];
					var iframeDoc = this.iframeDoc = $(this.iframe.prop("contentDocument"));
					var iframeWin = this.iframeWin = $(this.iframe.prop("contentWindow"));
					app.userCSSElement = iframeDoc.find("#user-css");
					iframeDoc.on("click", false);
					iframeDoc.on("submit", false);
					iframeDoc.on("contextmenu", false);
					iframeWin[0].addEventListener("scroll", this.iframeScroll.bind(this), true);
					iframeDoc.on("mousemove", function (e) {
						if (!app.hasActiveContext()) return false;
						if (app.canvas.ignoreIframeEvents()) {
							return
						}
						var scrollTop = that.iframeScrollTop;
						var scrollLeft = that.iframeScrollLeft;
						app.canvas.mousePosition.x = e.pageX - scrollLeft;
						app.canvas.mousePosition.y = e.pageY - scrollTop;
						app.mousePosition.x = e.pageX * app.context.canvasDimensions.zoom + app.canvas.iframeOffset.left - scrollLeft * app.context.canvasDimensions.zoom;
						app.mousePosition.y = e.pageY * app.context.canvasDimensions.zoom + app.canvas.iframeOffset.top - scrollTop * app.context.canvasDimensions.zoom;
						app.onMousemove(e)
					});
					iframeDoc.on("mousedown", function (e) {
						var component = app.context.page.findComponentForElement(e.target);
						if (component && !component.flags.canBeEdited) {
							e.preventDefault()
						}
						app.onMousedown(e)
					});
					iframeDoc.on("keydown", function (e) {
						app.trigger("keydown", e)
					});
					iframeDoc.on("input", function (e) {
						app.trigger("input", e)
					});
					iframeDoc.on("selectionchange", function (e) {
						app.trigger("selectionchange", e)
					});
					iframeDoc.on("paste", function (e) {
						app.trigger("paste", e)
					});
					iframeDoc.on("mouseup", app.onMouseup.bind(app));
					iframeDoc.on("mousewheel", function (e) {
						app.onBrowserZoom(e);
						app.scroll(e)
					});
					iframeDoc.on("drop", function (e) {
						app.processDroppedFiles(e);
						e.preventDefault();
						e.stopPropagation()
					});
					iframeDoc.on("dragstart", function (e) {
						e.preventDefault()
					});
					iframeDoc.on("dragover", function (e) {
						e.preventDefault();
						e.stopPropagation()
					});
					iframeDoc.on("mouseleave", function () {
						app.aboveCanvas = false;
						if (!app.hasActiveContext()) {
							return false
						}
						that.removeHighlight();
						that.hideLine()
					}).on("mouseenter", function () {
						app.aboveCanvas = true;
						that.updateIframeOffset()
					});
					iframeDoc.on("mouseover", function (e) {
						if (!app.hasActiveContext() || app.canvas.ignoreIframeEvents()) return false;
						app.context.page.hoveredComponent = app.context.page.findComponentForElement(e.target)
					});
					iframeWin[0].onerror = window.onerror
				}
			}, {
				key: "ignoreIframeEvents",
				value: function ignoreIframeEvents() {
					return this.isResizing
				}
			}, {
				key: "setCSSOverride",
				value: function setCSSOverride() {
					var cssString = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
					this.hideSystemUI();
					this.html.fillOverrideStylesheet(cssString)
				}
			}, {
				key: "resetCSSOverride",
				value: function resetCSSOverride() {
					if (!this.html) return;
					this.showSystemUI(20);
					this.html.fillOverrideStylesheet("")
				}
			}, {
				key: "resourceChanged",
				value: function resourceChanged(type, action, res) {
					if (type == "css" || type == "font" || type == "scss") {
						this.schedulePartialUpdate({
							head: true,
							ui: true
						})
					}
					if (type == "image" || type == "folder" && res.containsInstanceOf(ImageResource)) {
						app.context.page.findInTree([CustomCode]).forEach(function (ch) {
							return ch.invalidateCache()
						});
						this.scheduleUpdate()
					}
					if (type == "page" && res == app.context.page) {
						this.scheduleUpdate()
					}
				}
			}, {
				key: "themeChanged",
				value: function themeChanged() {
					if (!app.hasActiveContext()) return;
					this.hideSystemUI();
					this.scheduleUpdate();
					setTimeout(function () {
						app.canvas.partialUpdate({
							ui: true
						})
					}, 500)
				}
			}, {
				key: "updateDimensions",
				value: function updateDimensions() {
					var newDimensions = this.element[0].getBoundingClientRect();
					if (!clientRectsEqual(newDimensions, this.dimensions)) {
						this.dimensions = newDimensions;
						app.trigger("canvas-dimensions-changed")
					}
				}
			}, {
				key: "selectionChanged",
				value: function selectionChanged() {
					var components = app.context.page.getSelectedComponents();
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
					try {
						for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var comp = _step.value;
							if (comp.isInlineEditingActivated) {
								comp.commit()
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
					this.redrawHighlights()
				}
			}, {
				key: "contextCSSChanged",
				value: function contextCSSChanged(context, resources, block) {
					if (context !== app.context) return;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
					try {
						for (var _iterator2 = resources[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var resource = _step2.value;
							if (!app.context.hasResource(resource)) continue;
							resource.update(app.context)
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
					this.redrawHighlights();
					this.partialUpdate({
						ui: true
					})
				}
			}, {
				key: "contextSASSChanged",
				value: function contextSASSChanged(context) {
					if (context !== app.context) return;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;
					try {
						for (var _iterator3 = app.context.assets.css.getAllVisibleSCSS()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var scss = _step3.value;
							scss.update(app.context)
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
					this.redrawHighlights();
					this.partialUpdate({
						ui: true
					})
				}
			}, {
				key: "inlineEditableStatusChange",
				value: function inlineEditableStatusChange(e) {
					app.context.page.highlightedComponent = null;
					this.partialUpdate({
						ui: true
					})
				}
			}, {
				key: "interfaceZoomFactorChange",
				value: function interfaceZoomFactorChange(e) {
					this.schedulePartialUpdate({
						ui: true
					})
				}
			}, {
				key: "isNodeInVisibleCanvas",
				value: function isNodeInVisibleCanvas(node) {
					if (node.ownerDocument != this.iframeDoc[0]) return false;
					var rect = node.getBoundingClientRect();
					var zoom = app.context.canvasDimensions.zoom;
					var top = this.iframeOffset.top + rect.top * zoom,
						left = this.iframeOffset.left + rect.left * zoom,
						right = this.iframeOffset.left + rect.right * zoom,
						bottom = this.iframeOffset.top + rect.bottom * zoom;
					var canvasRect = this.element[0].getBoundingClientRect();
					return !(top > canvasRect.bottom - 40 || bottom < canvasRect.top + 40 || left > canvasRect.right - 40 || right < canvasRect.left + 40)
				}
			}, {
				key: "scrollToNode",
				value: function scrollToNode(node) {
					if (this.isNodeInVisibleCanvas(node)) return;
					var rect = node.getBoundingClientRect();
					if (rect.width == 0 || rect.height == 0) return;
					var iframeRect = this.iframe[0].getBoundingClientRect();
					var canvasRect = this.element[0].getBoundingClientRect();
					var zoom = app.context.canvasDimensions.zoom;
					var iframeScrollTop = this.iframeScrollTop;
					var iframeScrollLeft = this.iframeScrollLeft;
					var newIframeScrollLeft, newIframeScrollTop;
					var newCanvasScrollLeft, newCanvasScrollTop;
					if (rect.height * zoom > iframeRect.height) {
						newIframeScrollTop = iframeScrollTop + rect.top - 20;
						if (iframeRect.height > canvasRect.height) {
							newCanvasScrollTop = 0
						}
					}
					if (rect.width * zoom > iframeRect.width) {
						newIframeScrollLeft = iframeScrollLeft + rect.left - 20;
						if (iframeRect.width > canvasRect.width) {
							newCanvasScrollLeft = 0
						}
					}
					if (newIframeScrollTop == undefined) {
						newIframeScrollTop = iframeScrollTop + rect.top - (iframeRect.height / zoom - rect.height) / 2;
						if (iframeRect.height > canvasRect.height) {
							newCanvasScrollTop = (iframeRect.height / zoom - rect.height) / 2
						}
					}
					if (newIframeScrollLeft == undefined) {
						newIframeScrollLeft = iframeScrollLeft + rect.left - (iframeRect.width / zoom - rect.width) / 2;
						if (iframeRect.width > canvasRect.width) {
							newCanvasScrollLeft = (iframeRect.width / zoom - rect.width) / 2
						}
					}
					this.iframeWin[0].scrollTo(newIframeScrollLeft, newIframeScrollTop);
					this.element[0].scrollLeft = newCanvasScrollLeft;
					this.element[0].scrollTop = newCanvasScrollTop
				}
			}, {
				key: "scrollToComponent",
				value: function scrollToComponent(comp) {
					this.scrollToNode(comp.element[0])
				}
			}, {
				key: "componentUpdated",
				value: function componentUpdated(component) {
					var _this3 = this;
					if (app.context.page.activeModal && !app.context.page.activeModal.exists()) {
						this.hideModal()
					}
					var linkedParent = component.findLinkedParent();
					if (linkedParent) {
						this.pendingLinkChecks.add(linkedParent)
					} else if (component.linkID) {
						this.pendingLinkChecks.add(component)
					}
					this.scheduleLinkCheck();
					app.canvas.schedulePartialUpdate({
						ui: true
					});
					if (component.isFocused()) {
						setTimeout(function () {
							_this3.redrawHighlights()
						}, 0)
					}
				}
			}, {
				key: "componentDimensionsUpdated",
				value: function componentDimensionsUpdated(comp) {
					if (comp.flags.canBeEdited && comp.isInlineEditingActivated) {
						app.canvas.schedulePartialUpdate({
							ui: true
						})
					}
				}
			}, {
				key: "contains",
				value: function contains(DOMNode) {
					return this.iframeDoc[0].contains(DOMNode)
				}
			}, {
				key: "preloadFont",
				value: function preloadFont(name) {
					return this.iframeDoc[0].fonts.load("10px '" + name + "'")
				}
			}, {
				key: "mouseup",
				value: function mouseup(e) {
					if (app.aboveCanvas) {
						var component = app.context.page.hoveredComponent;
						component && component.onMouseup(e)
					}
				}
			}, {
				key: "mousedown",
				value: function mousedown(e) {
					var canvasBoundingRect = this.element[0].getBoundingClientRect();
					if (app.mousePosition.y > canvasBoundingRect.bottom - 10 || app.mousePosition.x > canvasBoundingRect.right - 10) {
						return
					}
					if (this.isWithinIframeScrollbar(app.mousePosition)) {
						return
					}
					if (e.target == this.element[0]) {
						if (app.context.page.hasSelection()) {
							app.context.page.clearSelection()
						}
					}
					if (!app.aboveCanvas) {
						return
					}
					this.html.startHitTesting();
					var component = app.context.page.findComponentForElement(this.iframeDoc[0].elementFromPoint(this.mousePosition.x, this.mousePosition.y));
					this.html.stopHitTesting();
					if (!component) {
						return
					}
					if (isSelectionClick(e)) {
						var diff = app.context.page.getSelection().click(component, e);
						var target = null;
						app.getPanel("overview").expandSelection();
						app.getPanel("overview").scheduleUpdate();
						if (diff.added.length) {
							diff.added.forEach(function (o) {
								return o.onSelect()
							});
							app.trigger("component-selected", diff.added)
						}
						if (diff.removed.length) {
							diff.removed.forEach(function (o) {
								return o.onUnselect()
							});
							app.trigger("component-unselected", diff.removed)
						}
						return
					}
					component.onMousedown(e)
				}
			}, {
				key: "isModalVisible",
				value: function isModalVisible() {
					var modal = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
					if (!app.context.page) return false;
					if (modal) {
						return app.context.page.activeModal == modal
					}
					return !!app.context.page.activeModal
				}
			}, {
				key: "showModal",
				value: function showModal(modal) {
					if (this.isModalVisible()) {
						this.hideModal()
					}
					app.context.page.activeModal = modal;
					this.html.body.element.append(this.html.body.modalBackdrop);
					modal.showInCanvas();
					modal.update()
				}
			}, {
				key: "hideModal",
				value: function hideModal() {
					var modal = app.context.page.activeModal;
					if (!modal) return;
					app.context.page.activeModal = null;
					this.html.body.modalBackdrop.remove();
					modal.hideInCanvas();
					modal.update()
				}
			}, {
				key: "schedulePartialUpdate",
				value: function schedulePartialUpdate(options) {
					var timeout = arguments.length <= 1 || arguments[1] === undefined ? 20 : arguments[1];
					clearTimeout(this._partialTimer);
					this._partialTimer = setTimeout(this.partialUpdate.bind(this, options), timeout)
				}
			}, {
				key: "scheduleUpdate",
				value: function scheduleUpdate() {
					var timeout = arguments.length <= 0 || arguments[0] === undefined ? 20 : arguments[0];
					clearTimeout(this._updateTimer);
					this._updateTimer = setTimeout(this._updateTimerFn, timeout)
				}
			}, {
				key: "scheduleLinkCheck",
				value: function scheduleLinkCheck() {
					var timeout = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
					clearTimeout(this._linkCheckTimer);
					this._linkCheckTimer = setTimeout(this._linkCheckTimerFn, timeout)
				}
			}, {
				key: "checkLinkedComponents",
				value: function checkLinkedComponents() {
					this.pendingLinkChecks.forEach(function (c) {
						return c.updateLinkedComponents()
					});
					this.pendingLinkChecks.clear()
				}
			}, {
				key: "setUpCanvas",
				value: function setUpCanvas() {
					this.setHTML(app.context.page.html);
					this.update();
					this.resize({
						width: app.context.canvasDimensions.width,
						height: app.context.canvasDimensions.height
					})
				}
			}, {
				key: "contextClosed",
				value: function contextClosed(ctx) {
					if (ctx.isActive()) {
						this.html = null;
						this.removeHighlights()
					}
				}
			}, {
				key: "findDOMNodesBySelector",
				value: function findDOMNodesBySelector(selector) {
					var doc = this.iframeDoc[0];
					var matchedElements = [];
					try {
						matchedElements = [].concat(_toConsumableArray(doc.querySelectorAll(selector)))
					} catch (err) {
						console.error(err)
					}
					return matchedElements
				}
			}, {
				key: "findDOMNodeWithId",
				value: function findDOMNodeWithId(id) {
					return this.html.body.element[0].querySelector("#" + id)
				}
			}, {
				key: "isThereDOMNodeWithID",
				value: function isThereDOMNodeWithID(id) {
					return this.findDOMNodeWithId(id) !== null
				}
			}, {
				key: "generateUniqueID",
				value: function generateUniqueID(prefix) {
					var _this4 = this;
					var id = _generateUniqueID(function (i) {
						return _this4.isThereDOMNodeWithID(prefix + "-" + i)
					});
					return id ? prefix + "-" + id : ""
				}
			}, {
				key: "update",
				value: function update() {
					this.html.update()
				}
			}, {
				key: "updateOverlayDimensions",
				value: function updateOverlayDimensions() {
					this.uiOverlay.css({
						width: this.html.element[0].clientWidth * app.context.canvasDimensions.zoom,
						height: this.html.element[0].clientHeight * app.context.canvasDimensions.zoom
					})
				}
			}, {
				key: "mousemove",
				value: function mousemove(e) {
					if (app.isMouseOverPanel()) {
						dragScroll.reset(this.element[0]);
						dragScroll.reset(this.iframeDoc[0].body);
						return
					}
					if (app.isDragging) {
						dragScroll.scroll(this.element[0], this.dimensions, this.dimensions, app.mousePosition, {
							topOffset: 60,
							leftOffset: 60,
							rightOffset: 60,
							bottomOffset: 60,
							speedUpScrolling: true
						});
						dragScroll.scroll(this.iframeDoc[0].body, app.context.canvasDimensions, app.context.canvasDimensions, app.mousePosition, {
							speedUpScrolling: true
						})
					} else {
						dragScroll.reset(this.element[0]);
						dragScroll.reset(this.iframeDoc[0].body)
					}
					if (!app.aboveCanvas) {
						return
					}
					var component = app.context.page.hoveredComponent;
					if (app.isDragging) {
						this.drawLine = null;
						if (component) {
							component.hoverDrag(0)
						}
						this.renderLine()
					} else {
						if (component && !app.isInlineEditingActive()) {
							this.highlight(component)
						}
					}
				}
			}, {
				key: "setHTML",
				value: function setHTML(html) {
					this.html = html;
					this.hideLine();
					this.removeHighlights();
					this.hideGrid();
					this.iframeDoc.find("html").replaceWith(html.element)
				}
			}, {
				key: "dragStart",
				value: function dragStart(components) {
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;
					try {
						for (var _iterator4 = components[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var comp = _step4.value;
							this.markAsDragged(comp)
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
			}, {
				key: "dragEnd",
				value: function dragEnd(components) {
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;
					try {
						for (var _iterator5 = components[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var comp = _step5.value;
							this.markAsNotDragged(comp)
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
				}
			}, {
				key: "markAsDragged",
				value: function markAsDragged(component) {
					if (!component.isVisible()) {
						return
					}
					component.element.attr("bs-dragged", 1)
				}
			}, {
				key: "markAsNotDragged",
				value: function markAsNotDragged(component) {
					component.element.removeAttr("bs-dragged")
				}
			}, {
				key: "partialUpdate",
				value: function partialUpdate() {
					var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					if (options.css) {
						app.context.assets.css.getAll().forEach(function (css) {
							return css.update(app.context)
						})
					}
					if (options.head) {
						this.html.updateHead()
					}
					if (options.ui) {
						if (!app.hasActiveContext()) return;
						this.html.updateDimensions();
						this.updateOverlayDimensions();
						this.hideLine();
						this.hideGrid();
						if (app.getUISetting("visualizeGrid") && !app.isInlineEditingActive()) {
							this.redrawGrid()
						}
						this.redrawHighlights();
						this.showSystemUI()
					}
				}
			}, {
				key: "hideLine",
				value: function hideLine() {
					this.drawLine = null;
					this._lastDrawLine = null;
					this.line.hide()
				}
			}, {
				key: "drawHorizontalLine",
				value: function drawHorizontalLine(x, y, width) {
					var decoration = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];
					this.drawLine = {
						x: x,
						y: y,
						width: width,
						height: 1,
						decoration: decoration
					}
				}
			}, {
				key: "drawVerticalLine",
				value: function drawVerticalLine(x, y, height) {
					var decoration = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];
					this.drawLine = {
						x: x,
						y: y,
						height: height,
						width: 1,
						decoration: decoration
					}
				}
			}, {
				key: "renderLine",
				value: function renderLine() {
					if (!this.drawLine) {
						if (this._lastDrawLine) {
							this.hideLine()
						}
						return
					}
					if (deepEqual(this._lastDrawLine, this.drawLine)) {
						return
					}
					var zoom = app.context.canvasDimensions.zoom;
					this._lastDrawLine = Object.assign({}, this.drawLine);
					this.line.show();
					this.line.width(Math.max(1, this.drawLine.width * zoom));
					this.line.height(Math.max(1, this.drawLine.height * zoom));
					this.line.css({
						top: this.drawLine.y * zoom,
						left: this.drawLine.x * zoom
					});
					this.line.attr("class", "line " + this.drawLine.decoration)
				}
			}, {
				key: "redrawGrid",
				value: function redrawGrid() {
					var self = this;
					var zoom = app.context.canvasDimensions.zoom;
					var rowsAndCols = app.context.page.findInTree([Row, Column]);
					for (var i = 0; i < rowsAndCols.length; i++) {
						if (rowsAndCols[i].width * zoom - 2 < 3 || rowsAndCols[i].height * zoom - 2 < 3) {
							continue
						}
						self.gridContainer.append($('<div class="grid-rect">').css({
							width: rowsAndCols[i].width * zoom - 2,
							height: rowsAndCols[i].height * zoom - 2,
							top: rowsAndCols[i].y * zoom,
							left: rowsAndCols[i].x * zoom
						}))
					}
				}
			}, {
				key: "hideGrid",
				value: function hideGrid() {
					this.gridContainer.empty()
				}
			}, {
				key: "redrawHighlights",
				value: function redrawHighlights() {
					this.removeHighlights();
					if (app.context.page.hasFocusedComponent()) {
						if (app.isInlineEditingActive()) {
							return
						} else {
							this.drawHighlight({
								type: "focus",
								component: app.context.page.getFocusedComponent(),
								actions: app.context.page.getFocusedComponent().getFocusActions()
							})
						}
					}
					var selector = app.context.page.highlightedSelector;
					if (selector) {
						if (!selector.match(/\*/g)) {
							var elements = this.findDOMNodesBySelector(selector);
							this.drawHighlight(elements.map(function (elem) {
								return {
									type: "box",
									element: elem
								}
							}))
						}
					}
					var selectedComponents = app.context.page.getSelectedComponents();
					if (app.context.page.areMultipleComponentsSelected()) {
						this.drawHighlight(selectedComponents.map(function (c) {
							return {
								type: "line",
								component: c
							}
						}));
						var rect = app.context.page.getSelectionRect();
						this.drawHighlight({
							type: "focus",
							x: rect.left,
							y: rect.top,
							width: rect.width,
							height: rect.height,
							actions: app.context.page.getSelectionActions()
						})
					}
					var highlighted = app.context.page.highlightedComponent;
					if (highlighted && selectedComponents.indexOf(highlighted) == -1) {
						var type = app.getUISetting("visualizeElementBoxes") ? "box" : "line-with-label";
						if (app.isDragging) {
							type = "line-with-label"
						}
						this.drawHighlight({
							type: type,
							component: app.context.page.highlightedComponent
						})
					}
					var highlightedElem = app.context.page.highlightedElement;
					if (highlightedElem) {
						var compElem = app.context.page.findComponentForElement(highlightedElem);
						if (compElem && (compElem.element[0] !== highlightedElem || selectedComponents.indexOf(compElem) == -1)) {
							this.drawHighlight({
								type: "box",
								element: highlightedElem
							})
						}
					}
				}
			}, {
				key: "removeHighlights",
				value: function removeHighlights() {
					var node = this.highlights[0];
					while (node.firstChild) {
						node.removeChild(node.firstChild)
					}
					node = this.focusBarContainer[0];
					while (node.firstChild) {
						node.removeChild(node.firstChild)
					}
				}
			}, {
				key: "drawHighlight",
				value: function drawHighlight(arr) {
					if (!Array.isArray(arr)) {
						arr = [arr]
					}
					var zoom = app.context.canvasDimensions.zoom;
					var x, y, width, height, box, styles, element;
					var marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft, borderTop, borderRight, borderBottom, borderLeft;
					var fragment = document.createDocumentFragment();
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;
					try {
						for (var _iterator6 = arr[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var highlight = _step6.value;
							x = highlight.x;
							y = highlight.y;
							width = highlight.width;
							height = highlight.height;
							element = highlight.element;
							if (highlight.component) {
								element = highlight.component.element[0]
							}
							if (element) {
								box = element.getBoundingClientRect();
								y = box.top;
								x = box.left;
								width = box.width;
								height = box.height
							}
							x *= zoom;
							y *= zoom;
							width *= zoom;
							height *= zoom;
							if (!this.isRectVisible(x, y, width, height)) continue;
							if (highlight.type == "line") {
								fragment.appendChild(generateRect("highlight-line", x, y, width, height, 1, 1, 1, 1))
							}
							if (highlight.type == "line-with-label") {
								var newX = Math.max(0, x);
								var newY = Math.max(0, y);
								var focus = generateRect("highlight-line", x, y, width, height, 1, 1, 1, 1);
								var focusBar = document.createElement("div");
								focusBar.classList.add("focus-bar");
								focusBar.style.top = newY + "px";
								focusBar.style.left = newX + "px";
								var span = document.createElement("span");
								span.classList.add("component-name");
								span.innerText = highlight.component.getName();
								if (highlight.component.hasLabel()) {
									var label = document.createElement("span");
									label.classList.add("component-label");
									label.innerText = highlight.component.getLabel();
									span.appendChild(label)
								}
								focusBar.appendChild(span);
								this.focusBarContainer[0].appendChild(focusBar);
								fragment.appendChild(focus)
							}
							if (highlight.type == "focus") {
								var newX = Math.max(0, x);
								var newY = Math.max(0, y);
								var focus = generateRect("focus", x, y, width, height, 1, 1, 1, 1);
								var focusBar = document.createElement("div");
								focusBar.classList.add("focus-bar");
								focusBar.style.top = newY + "px";
								focusBar.style.left = newX + "px";
								var _iteratorNormalCompletion7 = true;
								var _didIteratorError7 = false;
								var _iteratorError7 = undefined;
								try {
									for (var _iterator7 = highlight.actions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
										var opt = _step7.value;
										var span = document.createElement("span");
										span.title = opt.label;
										if (opt.id == "move") {
											span.className = "move-handle"
										}
										var i = document.createElement("i");
										i.className = "material-icons";
										i.appendChild(document.createTextNode(opt.icon));
										span.appendChild(i);
										span.addEventListener("click", opt.action);
										focusBar.appendChild(span)
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
								this.focusBarContainer[0].appendChild(focusBar);
								fragment.appendChild(focus)
							}
							if (highlight.type == "box") {
								styles = window.getComputedStyle(element);
								marginTop = calcSize(styles.marginTop), marginRight = calcSize(styles.marginRight), marginBottom = calcSize(styles.marginBottom), marginLeft = calcSize(styles.marginLeft), paddingTop = calcSize(styles.paddingTop), paddingRight = calcSize(styles.paddingRight), paddingBottom = calcSize(styles.paddingBottom), paddingLeft = calcSize(styles.paddingLeft), borderTop = calcSize(styles.borderTop), borderRight = calcSize(styles.borderRight), borderBottom = calcSize(styles.borderBottom), borderLeft = calcSize(styles.borderLeft);
								fragment.appendChild(generateRect("border", x, y, width, height, borderTop, borderRight, borderBottom, borderLeft));
								fragment.appendChild(generateRect("padding", x + borderLeft, y + borderTop, width - (borderLeft + borderRight), height - (borderTop + borderBottom), paddingTop, paddingRight, paddingBottom, paddingRight));
								fragment.appendChild(generateRect("main", x + borderLeft + paddingLeft, y + borderTop + paddingTop, width - (paddingLeft + paddingRight + borderLeft + borderRight), height - (paddingTop + paddingBottom + borderTop + borderBottom), 0, 0, 0, 0));
								fragment.appendChild(generateRect("margin", x - marginLeft, y - marginTop, width + marginLeft + marginRight, height + marginTop + marginBottom, marginTop, marginRight, marginBottom, marginLeft))
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
					this.highlights[0].appendChild(fragment)
				}
			}, {
				key: "isRectVisible",
				value: function isRectVisible(x, y, width, height) {
					return x + width > 0 && x < app.context.canvasDimensions.width && y + height > 0 && y < app.context.canvasDimensions.height
				}
			}, {
				key: "highlightDOMElement",
				value: function highlightDOMElement(element) {
					if (app.context.page.highlightedElement == element) {
						return
					}
					app.context.page.highlightedElement = element;
					this.redrawHighlights()
				}
			}, {
				key: "removeDOMHighlight",
				value: function removeDOMHighlight() {
					if (!app.context.page.highlightedElement) {
						return
					}
					app.context.page.highlightedElement = null;
					this.redrawHighlights()
				}
			}, {
				key: "highlight",
				value: function highlight(component) {
					if (app.context.page.highlightedComponent == component) {
						return
					}
					app.context.page.highlightedComponent = component;
					this.redrawHighlights()
				}
			}, {
				key: "removeHighlight",
				value: function removeHighlight() {
					if (!app.context.page.highlightedComponent) {
						return
					}
					app.context.page.highlightedComponent = null;
					this.redrawHighlights()
				}
			}, {
				key: "highlightCSSSelector",
				value: function highlightCSSSelector(selector) {
					if (app.context.page.highlightedSelector == selector) {
						return
					}
					app.context.page.highlightedSelector = selector;
					app.canvas.redrawHighlights();
					this.redrawHighlights()
				}
			}, {
				key: "removeCSSSelectorHighlight",
				value: function removeCSSSelectorHighlight() {
					if (!app.context.page.highlightedSelector) {
						return
					}
					app.context.page.highlightedSelector = null;
					this.redrawHighlights()
				}
			}, {
				key: "resize",
				value: function resize() {
					var dimensions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
					var width = dimensions.width || app.context.canvasDimensions.width;
					var height = dimensions.height || app.context.canvasDimensions.height;
					var zoom = dimensions.zoom || app.context.canvasDimensions.zoom;
					var animation = options.animation || false;
					var delayUIUpdate = options.delayUIUpdate || 0;
					var oldScrollTop = this.element[0].scrollTop;
					var newScrollTop = (oldScrollTop - 50) * (zoom / app.context.canvasDimensions.zoom) + 50;
					var haveResized = false,
						haveZoomed = false;
					if (width != app.context.canvasDimensions.width || height != app.context.canvasDimensions.height) {
						haveResized = true
					}
					if (zoom != app.context.canvasDimensions.zoom) {
						haveZoomed = true
					}
					if (!haveResized && !haveZoomed) {
						animation = false
					}
					if (haveZoomed) {
						animation = false;
						var scrollbarWidth = 7;
						var newWidth = scrollbarWidth / zoom;
						var scrollbarHeight = 7;
						var newHeight = scrollbarHeight / zoom;
						var scrollbarStyle = "\n\t\t\t\thtml::-webkit-scrollbar {\n\t\t\t\t\twidth: " + newWidth + "px;\n\t\t\t\t\theight: " + newHeight + "px;\n\t\t\t\t}\n\t\t\t";
						this.html.iframeStylesheet.html(escapeInlineStyleContent(app.framework.getIframeStyles() + scrollbarStyle))
					}
					var that = this;
					if (animation) {
						this.iframe.addClass("animated");
						this.uiContainer.addClass("animated");
						this.viewWrapper.addClass("animated");
						this.hideSystemUI();
						this.iframe.css({
							transform: "scale(" + zoom + ")",
							width: width,
							height: height
						});
						this.uiContainer.css({
							width: width * zoom,
							height: height * zoom,
							marginTop: -(height * zoom) / 2,
							marginLeft: -(width * zoom) / 2
						});
						this.uiOverlay.css({
							width: width * zoom,
							height: height * zoom
						});
						if (!this.isResizing) {
							this.viewWrapper.css({
								width: width * zoom,
								height: height * zoom
							})
						}
						setTimeout(function () {
							that.iframe.removeClass("animated");
							that.uiContainer.removeClass("animated");
							that.schedulePartialUpdate({
								ui: true
							}, 0);
							updateAndNotify()
						}, 300)
					} else {
						this.hideSystemUI();
						this.iframe.css({
							transform: "scale(" + zoom + ")",
							width: width,
							height: height
						});
						this.uiContainer.css({
							width: width * zoom,
							height: height * zoom,
							marginTop: -(height * zoom) / 2,
							marginLeft: -(width * zoom) / 2
						});
						this.uiOverlay.css({
							width: width * zoom,
							height: height * zoom
						});
						if (!this.isResizing) {
							this.viewWrapper.css({
								width: width * zoom,
								height: height * zoom
							})
						}
						if (haveZoomed) {
							this.element[0].scrollTop = newScrollTop
						}
						this.schedulePartialUpdate({
							ui: true
						}, delayUIUpdate);
						updateAndNotify()
					}

					function updateAndNotify() {
						var dim = getDimensions(that.iframe[0]);
						app.context.canvasDimensions = {
							width: width,
							height: height,
							zoom: zoom,
							top: dim.top,
							left: dim.left,
							bottom: dim.bottom,
							right: dim.right
						};
						that.updateIframeOffset();
						if (haveResized) {
							app.trigger("canvas-resized")
						}
						if (haveZoomed) {
							app.trigger("canvas-zoomed")
						}
					}
				}
			}, {
				key: "zoomIn",
				value: function zoomIn() {
					var animation = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
					var zoom = app.context.canvasDimensions.zoom;
					zoom += .25;
					if (zoom > 2) {
						zoom = 2
					}
					this.resize({
						zoom: zoom
					}, {
						animation: animation
					})
				}
			}, {
				key: "zoomOut",
				value: function zoomOut() {
					var animation = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
					var zoom = app.context.canvasDimensions.zoom;
					zoom -= .25;
					if (zoom < .25) {
						zoom = .25
					}
					this.resize({
						zoom: zoom
					}, {
						animation: animation
					})
				}
			}, {
				key: "resetZoom",
				value: function resetZoom() {
					var animation = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
					this.resize({
						zoom: 1
					}, {
						animation: animation
					})
				}
			}, {
				key: "hideSystemUI",
				value: function hideSystemUI() {
					clearTimeout(this._pendingUITimeout);
					this.element.addClass("hide-sui")
				}
			}, {
				key: "showSystemUI",
				value: function showSystemUI() {
					var timeout = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
					var that = this;
					if (timeout) {
						this._pendingUITimeout = setTimeout(function () {
							that.element.removeClass("hide-sui")
						}, timeout)
					} else {
						this.element.removeClass("hide-sui")
					}
				}
			}, {
				key: "onScroll",
				value: function onScroll() {
					var rect = getDimensions(this.iframe[0]);
					app.context.canvasDimensions = _extends({}, app.context.canvasDimensions, {
						top: rect.top,
						left: rect.left,
						bottom: rect.bottom,
						right: rect.right
					})
				}
			}, {
				key: "iframeScroll",
				value: function iframeScroll() {
					this.saveScrollPosition();
					if (app.hasActiveContext()) {
						app.context.page.hoveredComponent = null;
						this.removeHighlight()
					}
					this.hideLine();
					this.hideSystemUI();
					this.schedulePartialUpdate({
						ui: true
					}, 200)
				}
			}, {
				key: "getIframeBox",
				value: function getIframeBox() {
					return this.iframe[0].getBoundingClientRect()
				}
			}, {
				key: "isWithinIframe",
				value: function isWithinIframe(point) {
					var iframe = this.getIframeBox();
					return point.x >= iframe.left && point.x <= iframe.right && point.y >= iframe.top && point.y <= iframe.bottom
				}
			}, {
				key: "isWithinIframeScrollbar",
				value: function isWithinIframeScrollbar(point) {
					var iframe = this.getIframeBox();
					var scrollbarWidth = iframe.width - this.html.element[0].clientWidth;
					var scrollbarHeight = iframe.height - this.html.element[0].clientHeight;
					scrollbarWidth += scrollbarWidth > 0 ? 3 : 0;
					scrollbarHeight += scrollbarHeight > 0 ? 3 : 0;
					return this.isWithinIframe(point) && (point.y >= iframe.bottom - scrollbarHeight || point.x >= iframe.right - scrollbarWidth)
				}
			}, {
				key: "updateIframeOffset",
				value: function updateIframeOffset() {
					var offset = getDimensions(this.iframe[0]);
					this.iframeOffset = {
						top: offset.top,
						left: offset.left
					}
				}
			}, {
				key: "getBreakpoint",
				value: function getBreakpoint() {
					return app.framework.getBreakpointForSize(app.context.canvasDimensions.width)
				}
			}, {
				key: "getDevices",
				value: function getDevices() {
					return devices
				}
			}, {
				key: "saveScrollPosition",
				value: function saveScrollPosition() {
					var _this5 = this;
					if (this.scrollTimeout) {
						clearTimeout(this.scrollTimeout)
					}
					this.scrollTimeout = setTimeout(function () {
						_this5.storeScrollPosition()
					}, 25)
				}
			}, {
				key: "storeScrollPosition",
				value: function storeScrollPosition() {
					if (app.context) {
						app.context.scrollPosition.iframe.x = this.iframeDoc[0].body.scrollLeft;
						app.context.scrollPosition.iframe.y = this.iframeDoc[0].body.scrollTop;
						app.context.scrollPosition.canvas.x = this.element[0].scrollLeft;
						app.context.scrollPosition.canvas.y = this.element[0].scrollTop
					}
				}
			}, {
				key: "restoreScrollPosition",
				value: function restoreScrollPosition() {
					if (app.context) {
						this.iframeDoc[0].body.scrollLeft = app.context.scrollPosition.iframe.x;
						this.iframeDoc[0].body.scrollTop = app.context.scrollPosition.iframe.y;
						this.element[0].scrollLeft = app.context.scrollPosition.canvas.x;
						this.element[0].scrollTop = app.context.scrollPosition.canvas.y
					}
				}
			}, {
				key: "iframeScrollLeft",
				get: function get() {
					return this.iframeWin[0].scrollX
				}
			}, {
				key: "iframeScrollTop",
				get: function get() {
					return this.iframeWin[0].scrollY
				}
			}]);
			return Canvas
		}();

		function generateRect(className, x, y, width, height) {
			var top = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
			var right = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
			var bottom = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
			var left = arguments.length <= 8 || arguments[8] === undefined ? 0 : arguments[8];
			var div = document.createElement("div");
			div.className = className;
			div.style.width = width + "px";
			div.style.height = height + "px";
			div.style.top = y + "px";
			div.style.left = x + "px";
			div.style.borderWidth = [top, right, bottom, left].join("px ") + "px";
			return div
		}

		function calcSize(size) {
			var tmp = parseInt(size, 10) * app.context.canvasDimensions.zoom;
			if (tmp > 0 && tmp < 1) {
				tmp = 1
			}
			return Math.floor(tmp)
		}
		module.exports = Canvas
	}, {
		"../base/Point": 24,
		"../components/base/Column": 38,
		"../components/base/CustomCode": 42,
		"../components/base/Row": 82,
		"../config/devices": 368,
		"../helpers/clientRectsEqual": 549,
		"../helpers/dragScroll": 558,
		"../helpers/escapeInlineStyleContent": 560,
		"../helpers/generateUniqueID": 568,
		"../helpers/getDimensions": 569,
		"../helpers/isContextClick": 584,
		"../helpers/isSelectionClick": 585,
		"../helpers/resizeHandler": 603,
		"../resources/ImageResource": 1252,
		"../resources/Resource": 1256,
		"./Box": 10,
		"deep-equal": 971
	}]
});
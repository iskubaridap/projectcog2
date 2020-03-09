define([], function() {
    return [function(require, module, exports) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor
            }
        }();
        var _get = function get(_x16, _x17, _x18) {
            var _again = true;
            _function: while (_again) {
                var object = _x16,
                    property = _x17,
                    receiver = _x18;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x16 = parent;
                        _x17 = property;
                        _x18 = receiver;
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
        var Box = require("../../base/Box");
        var CSSBlockStyle = require("../../base/CSSBlockStyle");
        var clone = require("clone");
        var getSmartProp = require("../../helpers/getSmartProp");
        var getHTMLForNode = require("../../helpers/getHTMLForNode");
        var getDimensions = require("../../helpers/getDimensions");
        var canParentTakeChildren = require("../../helpers/canParentTakeChildren");
        var isContextClick = require("../../helpers/isContextClick");
        var quickParseCSSRules = require("../../helpers/quickParseCSSRules");
        var cssPath = require("../../helpers/cssPath");
        var LinkResource = require("../../resources/LinkResource");
        var Component = function(_Box) {
            _inherits(Component, _Box);

            function Component() {
                var _this = this;
                _classCallCheck(this, Component);
                _get(Object.getPrototypeOf(Component.prototype), "constructor", this).call(this);
                this.parent = null;
                this.element = null;
                this.inline = false;
                this.flags = {
                    canBeMoved: true,
                    canBeDeleted: true,
                    canBeDuplicated: true,
                    canBeEdited: false,
                    canBePackaged: true,
                    canBeCopied: true
                };
                this.cssClasses = {
                    system: {},
                    parent: ""
                };
                this.label = "";
                this.focusNodePath = null;
                this.overrides = {};
                this.attributes = {};
                this.attributesMask = {};
                this.properties = {};
                this.overrideBlacklist = [];
                this._styleCache = new Map;
                this._instanceOptionGroups = [];
                this._instanceOptionProperties = [];
                this._instanceActions = [];
                this.defineActions([{
                    id: "move",
                    label: "Move",
                    icon: "open_with",
                    visible: [this.flags, "canBeMoved"],
                    showInFocusBar: true,
                    weight: 0
                }, {
                    label: "Select Parent",
                    action: this.focusParent.bind(this),
                    visible: function visible() {
                        return !!_this.parent
                    },
                    icon: "arrow_upward",
                    showInFocusBar: true,
                    weight: 0
                }, {
                    label: "Label..",
                    action: this.labelAction.bind(this),
                    visible: function visible() {
                        return !_this.isLocked()
                    },
                    showInContextMenu: true,
                    weight: 92
                }, {
                    label: "Copy",
                    action: this.copyAction.bind(this),
                    visible: [this.flags, "canBeCopied"],
                    showInContextMenu: true,
                    weight: 92
                }, {
                    label: "Copy to",
                    options: this.getCopyToTargets.bind(this),
                    visible: [this.flags, "canBeCopied"],
                    showInContextMenu: true,
                    weight: 93
                }, {
                    label: "Add to What Nots",
                    action: this.addToLibraryAction.bind(this),
                    visible: [this.flags, "canBePackaged"],
                    showInContextMenu: true,
                    showInApplicationMenu: true,
                    weight: 95
                }, {
                    label: "Convert to HTML",
                    action: this.convertToHTMLAction.bind(this),
                    visible: this.canBeConvertedToHTML.bind(this),
                    showInContextMenu: true,
                    showInApplicationMenu: true,
                    weight: 96
                }, {
                    label: "Duplicate",
                    icon: "content_copy",
                    action: this.duplicateAction.bind(this),
                    visible: [this.flags, "canBeDuplicated"],
                    showInFocusBar: true,
                    showInContextMenu: true,
                    showInApplicationMenu: true,
                    accelerator: "CmdOrCtrl+D",
                    weight: 98
                }, {
                    label: "Unlink",
                    action: this.unlink.bind(this),
                    visible: [this, "linkID"],
                    showInContextMenu: true,
                    showInApplicationMenu: true,
                    weight: 98
                }, {
                    label: "Delete",
                    icon: "delete",
                    action: this.deleteAction.bind(this),
                    visible: [this.flags, "canBeDeleted"],
                    showInFocusBar: true,
                    showInContextMenu: true,
                    showInApplicationMenu: true,
                    accelerator: "Delete",
                    weight: 99
                }]);
                this.defaultGroup = null
            }
            _createClass(Component, [{
                key: "initialize",
                value: function initialize() {}
            }, {
                key: "fixate",
                value: function fixate() {
                    this.flags.canBeMoved = false;
                    this.flags.canBeDeleted = false;
                    this.flags.canBeDuplicated = false;
                    this.flags.canBePackaged = false;
                    this.flags.canBeCopied = false
                }
            }, {
                key: "freeze",
                value: function freeze() {
                    this.fixate();
                    this.flags.canBeEdited = false
                }
            }, {
                key: "deleteOp",
                value: function deleteOp() {
                    var that = this;
                    var parent = that.parent;
                    var index;
                    return {
                        do: function _do() {
                            index = that.parent.childIndex(that);
                            that.remove()
                        },
                        undo: function undo() {
                            parent.insertAt(that, index)
                        },
                        update: function update() {
                            parent.update()
                        }
                    }
                }
            }, {
                key: "duplicateOp",
                value: function duplicateOp(parent, index) {
                    var clone = this.clone();
                    if (parent === undefined) {
                        parent = this.parent
                    }
                    if (index === undefined) {
                        index = this.parent.childIndex(this) + 1
                    }
                    this.context().scanTreeForLinkedComponents(clone);
                    return {
                        do: function _do() {
                            parent.insertAt(clone, index)
                        },
                        undo: function undo() {
                            clone.remove()
                        },
                        update: function update() {
                            parent.update()
                        }
                    }
                }
            }, {
                key: "moveOp",
                value: function moveOp() {
                    var component = this;
                    var parent = component.parent;
                    var index = parent.childIndex(component);
                    return {
                        do: function _do() {
                            var insertAction = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                            insertAction && insertAction()
                        },
                        undo: function undo() {
                            parent.insertAt(component, index)
                        }
                    }
                }
            }, {
                key: "getName",
                value: function getName() {
                    return this.constructor.getName()
                }
            }, {
                key: "getFullName",
                value: function getFullName() {
                    return this.getName() + (this.id ? "#" + this.id : "")
                }
            }, {
                key: "hasLabel",
                value: function hasLabel() {
                    return this.getLabel().length > 0
                }
            }, {
                key: "getLabel",
                value: function getLabel() {
                    if (this.label) return this.label;
                    if (this.getID()) {
                        return "#" + this.getID()
                    }
                    return this.label || ""
                }
            }, {
                key: "setLabel",
                value: function setLabel() {
                    var label = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                    this.label = label.trim().slice(0, 50)
                }
            }, {
                key: "getDragLabel",
                value: function getDragLabel() {
                    if (this.hasLabel()) {
                        return this.getName() + " " + this.getLabel()
                    }
                    return this.getName()
                }
            }, {
                key: "isLocked",
                value: function isLocked() {
                    return !this.flags.canBeMoved
                }
            }, {
                key: "getStyleTarget",
                value: function getStyleTarget() {
                    var context = this.context();
                    var target = context.styleTargetMap.get(this);
                    if (!target || !context.assets.css.containsCSSBlock(target)) {
                        target = this.getMatchingUserCSS()[0] || null
                    }
                    return target
                }
            }, {
                key: "setStyleTarget",
                value: function setStyleTarget(block) {
                    this.context().styleTargetMap.set(this, block)
                }
            }, {
                key: "linkTo",
                value: function linkTo(component) {
                    if (this.linkID) return;
                    app.context.linkComponents(component, this);
                    app.trigger("component-linked", this, this.linkID)
                }
            }, {
                key: "unlink",
                value: function unlink() {
                    var linkID = this.linkID;
                    if (!linkID) return;
                    this.context().unlinkComponent(this);
                    app.trigger("component-unlinked", this, linkID)
                }
            }, {
                key: "unlinkAll",
                value: function unlinkAll() {
                    this.unlink()
                }
            }, {
                key: "softUnlink",
                value: function softUnlink() {
                    var linkID = this.linkID;
                    if (!linkID) return;
                    this.context().softUnlinkComponent(this)
                }
            }, {
                key: "softUnlinkAll",
                value: function softUnlinkAll() {
                    this.softUnlink()
                }
            }, {
                key: "createCacheString",
                value: function createCacheString() {
                    return JSON.stringify(this.serialize())
                }
            }, {
                key: "hasChangesSinceLastUpdate",
                value: function hasChangesSinceLastUpdate() {
                    if (!this.linkID) return false;
                    if (!this._changeCache) return false;
                    return this.createCacheString() != this._changeCache
                }
            }, {
                key: "recordChangesForUpdate",
                value: function recordChangesForUpdate() {
                    if (!this.linkID) return false;
                    this._changeCache = this.createCacheString()
                }
            }, {
                key: "clearChangeCache",
                value: function clearChangeCache() {
                    delete this._changeCache
                }
            }, {
                key: "hasChangeCache",
                value: function hasChangeCache() {
                    return this._changeCache != undefined
                }
            }, {
                key: "getParentsByType",
                value: function getParentsByType(type) {
                    var parentChain = [];
                    var parent = this;
                    while (parent = parent.parent) {
                        if (parent instanceof type) {
                            parentChain.push(parent)
                        }
                    }
                    return parentChain
                }
            }, {
                key: "findLinkedParent",
                value: function findLinkedParent() {
                    var parent = this;
                    while (parent = parent.parent) {
                        if (parent.linkID) {
                            return parent
                        }
                    }
                    return null
                }
            }, {
                key: "hasLinkedParent",
                value: function hasLinkedParent() {
                    return !!this.findLinkedParent()
                }
            }, {
                key: "exists",
                value: function exists() {
                    return !!this.closest(require("./HTML")) && this.page() && this.page().exists()
                }
            }, {
                key: "overwrite",
                value: function overwrite(json) {
                    this.unserialize(json);
                    this.clearChangeCache()
                }
            }, {
                key: "getProperties",
                value: function getProperties() {
                    return this._instanceOptionProperties
                }
            }, {
                key: "defineProperties",
                value: function defineProperties(arr) {
                    if (!Array.isArray(arr)) {
                        arr = [arr]
                    }
                    for (var i = 0; i < arr.length; i++) {
                        this.properties[arr[i].id] = arr[i].value;
                        this._instanceOptionProperties.push(arr[i])
                    }
                }
            }, {
                key: "deleteProperties",
                value: function deleteProperties(arr) {
                    if (!Array.isArray(arr)) {
                        arr = [arr]
                    }
                    for (var i = 0; i < arr.length; i++) {
                        var index = -1;
                        for (var j = 0; j < this._instanceOptionProperties.length; j++) {
                            if (arr[i] == this._instanceOptionProperties[j].id) {
                                index = j;
                                break
                            }
                        }
                        if (index >= 0) {
                            this._instanceOptionProperties.splice(index, 1);
                            delete this.properties[arr[i]]
                        }
                    }
                }
            }, {
                key: "clearProperties",
                value: function clearProperties() {
                    for (var i = 0; i < this._instanceOptionProperties.length; i++) {
                        var prop = this._instanceOptionProperties[i].id;
                        delete this.properties[prop]
                    }
                    this._instanceOptionProperties.length = []
                }
            }, {
                key: "getGroups",
                value: function getGroups() {
                    return this._instanceOptionGroups
                }
            }, {
                key: "defineGroups",
                value: function defineGroups(arr) {
                    if (!Array.isArray(arr)) {
                        arr = [arr]
                    }
                    Array.prototype.push.apply(this._instanceOptionGroups, arr)
                }
            }, {
                key: "defineActions",
                value: function defineActions(arr) {
                    if (!Array.isArray(arr)) {
                        arr = [arr]
                    }
                    Array.prototype.push.apply(this._instanceActions, arr);
                    this._instanceActions.sort(function(a, b) {
                        return (a.weight || 0) - (b.weight || 0)
                    })
                }
            }, {
                key: "getVisibleActions",
                value: function getVisibleActions() {
                    var filter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                    var allActions = this._instanceActions;
                    if (filter) {
                        allActions = allActions.filter(function(a) {
                            return !!a[filter]
                        })
                    }
                    return allActions.filter(function(a) {
                        return getSmartProp(a.visible, true)
                    })
                }
            }, {
                key: "getCopyToTargets",
                value: function getCopyToTargets() {
                    return this.page().getCopyToTargets(this)
                }
            }, {
                key: "labelAction",
                value: function labelAction() {
                    var that = this;
                    app.labelDialog.open({
                        label: this.label,
                        onSave: function onSave(newLabel) {
                            var oldLabel = that.label;
                            if (oldLabel == newLabel) return;
                            that.setLabel(newLabel);
                            that.update();
                            app.context.history.add({
                                name: "Change Component Label",
                                undo: function undo() {
                                    that.setLabel(oldLabel);
                                    that.update()
                                },
                                redo: function redo() {
                                    that.setLabel(newLabel);
                                    that.update()
                                }
                            })
                        }
                    })
                }
            }, {
                key: "copyAction",
                value: function copyAction() {
                    if (!this.flags.canBeCopied) return;
                    var data = app.context.page.buildClipboardRepresentation(this);
                    electron.clipboardSet(data.text, data.html)
                }
            }, {
                key: "addToLibraryAction",
                value: function addToLibraryAction() {
                    var UserPackage = require("../../packages/UserPackage");
                    var component = this;
                    app.componentToPackageDialog.open({
                        component: this,
                        onSubmit: function onSubmit(obj) {
                            var pkg = new UserPackage;
                            pkg.initialize(app.context.framework.version);
                            pkg.name = app.userPackages.generateUniqueFreeName(obj.name);
                            pkg.css = obj.css.map(function(c) {
                                if (c instanceof LinkResource) {
                                    return c.serialize()
                                }
                                var clone = c.clone();
                                return clone.serialize()
                            });
                            pkg.js = obj.js.map(function(j) {
                                return j.serialize()
                            });
                            pkg.fonts = obj.fonts.map(function(f) {
                                return f.serialize()
                            });
                            pkg.images = obj.images.serialize();
                            var componentClone = component.clone().cleanup();
                            pkg.component = componentClone.serialize();
                            pkg.generatePreview(function(data) {
                                pkg.preview = data;
                                var op = app.userPackages.addOp(pkg);
                                op["do"]();
                                app.trigger("package-tree-changed", "create", [pkg]);
                                app.context.history.add({
                                    name: "Add Component To Library",
                                    undo: function undo() {
                                        op.undo();
                                        app.trigger("package-tree-changed", "delete", [pkg])
                                    },
                                    redo: function redo() {
                                        op["do"]();
                                        app.trigger("package-tree-changed", "create", [pkg])
                                    }
                                });
                                app.getPanel("whatNots").scheduleHighlightItem(pkg);
                                app.addPackage(pkg);
                                cogworks.loadingScreen("dynamic","Adding " + obj.name + " to your What Nots pane","fadeIn");
                            })
                        }
                    })
                }
            }, {
                key: "convertToHTMLAction",
                value: function convertToHTMLAction() {
                    if (!this.canBeConvertedToHTML()) return;
                    var CustomCode = require("./CustomCode");
                    var html = new CustomCode;
                    html.initialize(getHTMLForNode(this.element[0], this.page()));
                    var parent = this.parent;
                    var op = this.replaceWithOperation(html);
                    op["do"]();
                    parent.update();
                    app.context.history.add({
                        name: "Convert Component To HTML",
                        undo: function undo() {
                            op.undo();
                            parent.update()
                        },
                        redo: function redo() {
                            op["do"]();
                            parent.update()
                        }
                    })
                }
            }, {
                key: "canBeConvertedToHTML",
                value: function canBeConvertedToHTML() {
                    if (!this.flags.canBeDeleted) return false;
                    var CustomCode = require("./CustomCode");
                    return !(this instanceof CustomCode) && this.exists() && canParentTakeChildren(this.parent, new CustomCode)
                }
            }, {
                key: "duplicateAction",
                value: function duplicateAction() {
                    var op = this.duplicateOp();
                    op["do"]();
                    op.update();
                    app.context.history.add({
                        name: "Duplicate Component",
                        undo: function undo() {
                            op.undo();
                            op.update()
                        },
                        redo: function redo() {
                            op["do"]();
                            op.update()
                        }
                    })
                }
            }, {
                key: "deleteAction",
                value: function deleteAction() {
                    var op = this.deleteOp();
                    op["do"]();
                    op.update();
                    app.context.history.add({
                        name: "Delete Component",
                        undo: function undo() {
                            op.undo();
                            op.update()
                        },
                        redo: function redo() {
                            op["do"]();
                            op.update()
                        }
                    })
                }
            }, {
                key: "getID",
                value: function getID() {
                    var over = this.getOverride("/", "id");
                    if (over) return over;
                    return ""
                }
            }, {
                key: "updateID",
                value: function updateID() {
                    var newID = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                    var path = arguments.length <= 1 || arguments[1] === undefined ? "/" : arguments[1];
                    if (this.isIDValid(newID)) {
                        this.setOverride(path, "id", newID)
                    }
                }
            }, {
                key: "isIDValid",
                value: function isIDValid() {
                    var newID = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                    return !/^[_-]|[^_a-zA-Z0-9-]/.test(String(newID).trim())
                }
            }, {
                key: "setUniqueID",
                value: function setUniqueID(prefix) {
                    if (!prefix) {
                        prefix = this.constructor.name.toLowerCase().replace(/[auoe]/g, "").slice(0, 6)
                    }
                    this.updateID(app.canvas.generateUniqueID(prefix))
                }
            }, {
                key: "context",
                value: function context() {
                    var page = this.page();
                    if (!page) return;
                    return page.context
                }
            }, {
                key: "framework",
                value: function framework() {
                    return this.context().framework
                }
            }, {
                key: "page",
                value: function page() {
                    if (this.parent) {
                        var page = this.parent.page();
                        if (page) {
                            return page
                        }
                    }
                    return app.context.page
                }
            }, {
                key: "hoverDrag",
                value: function hoverDrag() {
                    var offset = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
                    if (this.parent) {
                        return this.parent.hoverDrag(offset)
                    }
                    return false
                }
            }, {
                key: "onDoubleClick",
                value: function onDoubleClick() {
                    return false
                }
            }, {
                key: "onOverviewDoubleClick",
                value: function onOverviewDoubleClick() {
                    this.onDoubleClick()
                }
            }, {
                key: "onMouseup",
                value: function onMouseup(e) {
                    return false
                }
            }, {
                key: "onMousedown",
                value: function onMousedown(e) {
                    if (!this.isFocused()) {
                        this.focus()
                    }
                    if (isContextClick(e)) {
                        this.onRightClick();
                        return
                    }
                    var now = Date.now();
                    if (this._lastClickTime && now - this._lastClickTime < 500) {
                        this.onDoubleClick(e)
                    } else {
                        this._lastClickTime = now
                    }
                }
            }, {
                key: "onRightClick",
                value: function onRightClick() {
                    this.showContextMenu();
                    if (!this.isSelected()) {
                        this.focus()
                    }
                }
            }, {
                key: "onKeydown",
                value: function onKeydown(e) {}
            }, {
                key: "onInput",
                value: function onInput(e) {}
            }, {
                key: "isChildElementBlacklisted",
                value: function isChildElementBlacklisted(node) {
                    var path = this.getPathForChildElement(node);
                    if (!path) return false;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = this.overrideBlacklist[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var black = _step.value;
                            if (path == black || path.indexOf(black) === 0) {
                                return true
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
                    return false
                }
            }, {
                key: "findChildElementByPath",
                value: function findChildElementByPath(path) {
                    var node = this.element[0],
                        context = this.context(),
                        page = this.page(),
                        index, selector;
                    var reg = /\/(\d*)/g;
                    var indexRegex = /^\/(\d+)$/;
                    var parsed = path.match(reg);
                    if (parsed.length == 1 && parsed[0] == "/") return node;
                    for (var i = 0; i < parsed.length; i++) {
                        index = parsed[i].match(indexRegex)[1];
                        selector = null;
                        if (!node.children || !node.children[index]) {
                            return null
                        }
                        if (page.domToComponent.has(node.children[index])) {
                            return null
                        }
                        node = node.children[index]
                    }
                    return node
                }
            }, {
                key: "getPathForChildElement",
                value: function getPathForChildElement(element) {
                    var comp = this.page().findComponentForElement(element);
                    if (!comp || comp !== this) return null;
                    var indexes = [],
                        current = 0;
                    var node = element;
                    while (true) {
                        if (node == this.element[0] || !node) break;
                        if (node.previousSibling) {
                            node = node.previousSibling;
                            current++
                        } else {
                            indexes.unshift(current);
                            current = 0;
                            node = node.parentNode
                        }
                    }
                    return "/" + indexes.join("/")
                }
            }, {
                key: "getMatchingCSS",
                value: function getMatchingCSS() {
                    var path = arguments.length <= 0 || arguments[0] === undefined ? "/" : arguments[0];
                    var context = this.context();
                    var element = this.findChildElementByPath(path);
                    var matching = context.getMatchingCSSBlocks(element).map(function(r) {
                        return r.block
                    });
                    if (this.canPathHaveStyle(path)) {
                        matching.unshift(this.getPathStyleAsCSSBlock(path))
                    }
                    return matching
                }
            }, {
                key: "getMatchingUserCSS",
                value: function getMatchingUserCSS() {
                    return this.getMatchingCSS().filter(function(block) {
                        return !block.isLocked()
                    })
                }
            }, {
                key: "getMatchingSystemCSS",
                value: function getMatchingSystemCSS() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var path = "/";
                    var context = this.context();
                    var element = this.findChildElementByPath(path);
                    var matching = context.getMatchingCSSBlocks(element);
                    var systemCSS = matching.filter(function(r) {
                        return r.block.system
                    });
                    if (options.ignorePseudoAndState) {
                        systemCSS = systemCSS.filter(function(r) {
                            return !r.result.isPseudo && !r.result.isState
                        })
                    }
                    return systemCSS.map(function(r) {
                        return r.block
                    })
                }
            }, {
                key: "showContextMenu",
                value: function showContextMenu() {
                    if (!this.parent) return;
                    var pos = app.mousePosition;
                    var opt = this.getVisibleActions().filter(function(a) {
                        return a.showInContextMenu
                    });
                    var options = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = opt[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var o = _step2.value;
                            if (o.options) {
                                options.push({
                                    name: o.label,
                                    options: getSmartProp(o.options, [])
                                })
                            } else {
                                options.push({
                                    name: o.label,
                                    action: o.action
                                })
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
                    options.unshift({
                        name: "Select Parent",
                        action: this.focusParent.bind(this)
                    });
                    options.unshift({
                        name: this.getName(),
                        type: "heading"
                    });
                    app.contextMenu.show(pos.x, pos.y, options)
                }
            }, {
                key: "getMainOptionsGroup",
                value: function getMainOptionsGroup() {
                    return app.framework.getMainOptionsGroupFor(this)
                }
            }, {
                key: "isSelected",
                value: function isSelected() {
                    return this.exists() && this.page().isSelected(this)
                }
            }, {
                key: "isFocused",
                value: function isFocused() {
                    return this.isSelected() && this.page().isSingleComponentSelected()
                }
            }, {
                key: "hasNextSibling",
                value: function hasNextSibling() {
                    return !!(this.parent && this.parent.findNextComponentChild(this))
                }
            }, {
                key: "hasPreviousSibling",
                value: function hasPreviousSibling() {
                    return !!(this.parent && this.parent.findPreviousComponentChild(this))
                }
            }, {
                key: "focusParent",
                value: function focusParent() {
                    if (this.parent) {
                        this.parent.focus()
                    }
                }
            }, {
                key: "focusNextSibling",
                value: function focusNextSibling() {
                    if (this.parent) {
                        var next = this.parent.findNextComponentChild(this);
                        next && next.focus()
                    }
                }
            }, {
                key: "focusPreviousSibling",
                value: function focusPreviousSibling() {
                    if (this.parent) {
                        var prev = this.parent.findPreviousComponentChild(this);
                        prev && prev.focus()
                    }
                }
            }, {
                key: "setFocusNode",
                value: function setFocusNode(node) {
                    if (node == this.element[0]) {
                        this.focusNodePath = null
                    } else {
                        this.focusNodePath = cssPath(node, this.element[0])
                    }
                }
            }, {
                key: "getFocusedNode",
                value: function getFocusedNode() {
                    if (this.focusNodePath) {
                        return this.element[0].querySelector(this.focusNodePath) || this.element[0]
                    }
                    return this.element[0]
                }
            }, {
                key: "resetFocusNode",
                value: function resetFocusNode() {
                    this.focusNodePath = null
                }
            }, {
                key: "isChildNodeFocused",
                value: function isChildNodeFocused() {
                    return this.getFocusedNode() != this.element[0]
                }
            }, {
                key: "getFocusActions",
                value: function getFocusActions() {
                    var actions = [];
                    for (var i = 0; i < this._instanceActions.length; i++) {
                        var obj = this._instanceActions[i];
                        if (obj.showInFocusBar && getSmartProp(obj.visible, true)) {
                            actions.push(obj)
                        }
                    }
                    actions.sort(function(a, b) {
                        return (a.weight || 1) - (b.weight || 1)
                    });
                    return actions
                }
            }, {
                key: "select",
                value: function select() {
                    var selection = this.page().getSelection();
                    selection.add(this);
                    this.onSelect();
                    app.trigger("component-selected", [this])
                }
            }, {
                key: "focus",
                value: function focus() {
                    var _this2 = this;
                    var page = this.page();
                    var selection = page.getSelection();
                    var others = selection.getSelectedItems().filter(function(comp) {
                        return comp != _this2
                    });
                    selection.clear();
                    if (others.length) {
                        others.forEach(function(o) {
                            return o.onUnselect()
                        });
                        app.trigger("component-unselected", others)
                    }
                    this.select()
                }
            }, {
                key: "injectOptions",
                value: function injectOptions() {}
            }, {
                key: "createToolbar",
                value: function createToolbar() {
                    return null
                }
            }, {
                key: "canPathHaveStyle",
                value: function canPathHaveStyle(path) {
                    var node = this.findChildElementByPath(path);
                    if (!node) return false;
                    return !this.isChildElementBlacklisted(node)
                }
            }, {
                key: "getPathStyleAsCSSBlock",
                value: function getPathStyleAsCSSBlock() {
                    var path = arguments.length <= 0 || arguments[0] === undefined ? "/" : arguments[0];
                    if (this._styleCache.has(path)) {
                        return this._styleCache.get(path)
                    }
                    var style = this.getOverride(path, "style");
                    if (!style) {
                        var tmp = new CSSBlockStyle([], this, path);
                        this._styleCache.set(path, tmp);
                        return tmp
                    }
                    var tmp = new CSSBlockStyle(quickParseCSSRules(style), this, path);
                    this._styleCache.set(path, tmp);
                    return tmp
                }
            }, {
                key: "getPathStyle",
                value: function getPathStyle(path) {
                    return this.getOverride(path, "style", "")
                }
            }, {
                key: "setPathStyle",
                value: function setPathStyle(path, str) {
                    if (!this.canPathHaveStyle(path)) {
                        return
                    }
                    if (str) {
                        this.setOverride(path, "style", str)
                    } else {
                        this.removeOverride(path, "style")
                    }
                }
            }, {
                key: "previewPathStyle",
                value: function previewPathStyle(path, str, opt) {
                    if (!this.canPathHaveStyle(path)) {
                        return
                    }
                    var context = this.context();
                    var depth = context.pages.getItemDepth(this.page());
                    var node = this.findChildElementByPath(path);
                    node.setAttribute("style", context.processStyleString(str, depth, opt))
                }
            }, {
                key: "getSystemClasses",
                value: function getSystemClasses() {
                    var systemClasses = "";
                    for (var k in this.cssClasses.system)
                        if (this.cssClasses.system.hasOwnProperty(k)) {
                            systemClasses += this.cssClasses.system[k] + " "
                        }
                    return (systemClasses + " " + this.cssClasses.parent).trim().replace(/\s+/g, " ")
                }
            }, {
                key: "extractSystemClasses",
                value: function extractSystemClasses() {
                    var path = arguments.length <= 0 || arguments[0] === undefined ? "/" : arguments[0];
                    var cls = "";
                    var node = this.findChildElementByPath(path);
                    if (node.hasAttribute("class")) {
                        cls = node.getAttribute("class").trim()
                    }
                    var userCSS = this.getUserClasses(path);
                    if (userCSS) {
                        cls = cls.slice(0, cls.lastIndexOf(userCSS))
                    }
                    return cls.trim()
                }
            }, {
                key: "getUserClasses",
                value: function getUserClasses() {
                    var path = arguments.length <= 0 || arguments[0] === undefined ? "/" : arguments[0];
                    return this.getOverride(path, "class", "").trim()
                }
            }, {
                key: "getAllUserClassNames",
                value: function getAllUserClassNames() {
                    var classNames = [];
                    var reg = /\s+/;
                    for (var path in this.overrides) {
                        if ("class" in this.overrides[path]) {
                            classNames.push.apply(classNames, _toConsumableArray(this.overrides[path]["class"].trim().split(reg)))
                        }
                    }
                    return classNames
                }
            }, {
                key: "getOverride",
                value: function getOverride(path, attribute) {
                    var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                    attribute = attribute.toLowerCase();
                    if (this.overrides.hasOwnProperty(path) && this.overrides[path].hasOwnProperty(attribute)) {
                        return this.overrides[path][attribute]
                    }
                    return defaultValue
                }
            }, {
                key: "getOverrides",
                value: function getOverrides(path) {
                    return this.overrides[path] || {}
                }
            }, {
                key: "setOverride",
                value: function setOverride(path, attribute, value) {
                    attribute = attribute.toLowerCase();
                    if (!this.overrides.hasOwnProperty(path)) {
                        this.overrides[path] = {}
                    }
                    this.overrides[path][attribute] = value
                }
            }, {
                key: "removeAllOverrides",
                value: function removeAllOverrides(path) {
                    for (var key in this.overrides[path]) {
                        delete this.overrides[path][key]
                    }
                }
            }, {
                key: "setOverrides",
                value: function setOverrides(path, obj) {
                    for (var key in obj) {
                        if (!obj.hasOwnProperty(key)) continue;
                        this.setOverride(path, key, obj[key])
                    }
                }
            }, {
                key: "removeOverride",
                value: function removeOverride(path, attribute) {
                    attribute = attribute.toLowerCase();
                    if (this.overrides.hasOwnProperty(path)) {
                        delete this.overrides[path][attribute];
                        if (!Object.keys(this.overrides).length) {
                            delete this.overrides[path]
                        }
                    }
                }
            }, {
                key: "setOrRemoveOverride",
                value: function setOrRemoveOverride(path, property, value) {
                    if (value.length) {
                        this.setOverride(path, property, value)
                    } else {
                        this.removeOverride(path, property)
                    }
                }
            }, {
                key: "handleOverrideProperty",
                value: function handleOverrideProperty(path, property, value) {
                    if (value === undefined) {
                        return this.getOverride(path, property) || ""
                    } else {
                        return this.setOverridePropertyOp(path, property, value)
                    }
                }
            }, {
                key: "setOverridePropertyOp",
                value: function setOverridePropertyOp(path, property, value) {
                    var _this3 = this;
                    var oldValue = this.getOverride(path, property) || "";
                    var newValue = value;
                    return {
                        do: function _do() {
                            _this3.setOrRemoveOverride(path, property, newValue)
                        },
                        undo: function undo() {
                            _this3.setOrRemoveOverride(path, property, oldValue)
                        }
                    }
                }
            }, {
                key: "stripImagePaths",
                value: function stripImagePaths(imagePaths) {}
            }, {
                key: "unselect",
                value: function unselect() {
                    var selection = this.page().getSelection();
                    selection["delete"](this);
                    this.onUnselect();
                    app.trigger("component-unselected", [this])
                }
            }, {
                key: "onSelect",
                value: function onSelect() {}
            }, {
                key: "onUnselect",
                value: function onUnselect() {
                    this.resetFocusNode()
                }
            }, {
                key: "remove",
                value: function remove() {
                    if (!this.parent) return;
                    this.redirectFocus();
                    this.unlinkAll();
                    this.parent.removeChild(this)
                }
            }, {
                key: "redirectFocus",
                value: function redirectFocus() {
                    if (this.isSelected()) {
                        if (this.hasNextSibling()) {
                            this.focusNextSibling()
                        } else if (this.hasPreviousSibling()) {
                            this.focusPreviousSibling()
                        } else {
                            this.parent.focus()
                        }
                    }
                }
            }, {
                key: "replaceWithOperation",
                value: function replaceWithOperation(component) {
                    var parent = this.parent;
                    var index = this.parent.childIndex(this);
                    var original = this;
                    return {
                        do: function _do() {
                            original.remove();
                            parent.insertAt(component, index)
                        },
                        undo: function undo() {
                            component.remove();
                            parent.insertAt(original, index)
                        }
                    }
                }
            }, {
                key: "cleanup",
                value: function cleanup() {
                    if (this.linkID) {
                        delete this.linkID
                    }
                    return this
                }
            }, {
                key: "isChildOf",
                value: function isChildOf(component) {
                    var parent = this;
                    while (parent = parent.parent) {
                        if (parent == component) {
                            return true
                        }
                    }
                    return false
                }
            }, {
                key: "closest",
                value: function closest(type) {
                    if (this instanceof type) return this;
                    var parent = this;
                    while (parent = parent.parent) {
                        if (parent instanceof type) {
                            return parent
                        }
                    }
                    return null
                }
            }, {
                key: "hasParent",
                value: function hasParent(type) {
                    var parent = this;
                    while (parent = parent.parent) {
                        if (parent instanceof type) {
                            return true
                        }
                    }
                    return false
                }
            }, {
                key: "hasChild",
                value: function hasChild() {
                    return false
                }
            }, {
                key: "beforeUpdate",
                value: function beforeUpdate() {}
            }, {
                key: "afterUpdate",
                value: function afterUpdate() {
                    var linkedParent = this.findLinkedParent();
                    if (this.linkID && linkedParent) {
                        this.unlink()
                    }
                    if (this.linkID && !this.hasChangeCache()) {
                        this.recordChangesForUpdate()
                    }
                    var context = this.context();
                    var page = this.page();
                    if (context && context.isDesign) {
                        app.trigger("component-updated", this)
                    }
                    if (page) {
                        page.domToComponent.set(this.element[0], this)
                    }
                    this._styleCache.clear()
                }
            }, {
                key: "update",
                value: function update() {
                    this.startUpdate();
                    return this.finishUpdate()
                }
            }, {
                key: "startUpdate",
                value: function startUpdate() {
                    this.beforeUpdate();
                    this.element.removeAttr("class");
                    var cssClasses = this.getSystemClasses();
                    if (cssClasses) {
                        this.element.attr("class", cssClasses)
                    }
                    this.framework().startComponentUpdate(this);
                    this.parent && this.parent.onChildUpdate(this)
                }
            }, {
                key: "finishUpdate",
                value: function finishUpdate() {
                    var atts = [];
                    for (var i = 0; i < this.element[0].attributes.length; i++) {
                        atts.push(this.element[0].attributes[i].name)
                    }
                    for (var i = 0; i < atts.length; i++) {
                        if (atts[i] == "class") continue;
                        if (!this.attributes.hasOwnProperty(atts[i])) {
                            this.element[0].removeAttribute(atts[i])
                        }
                    }
                    for (var prop in this.attributes)
                        if (this.attributes.hasOwnProperty(prop)) {
                            if (this.element[0].getAttribute(prop) != this.attributes[prop]) {
                                this.element[0].setAttribute(prop, this.attributes[prop])
                            }
                        }
                    this.framework().finishComponentUpdate(this);
                    var context = this.context();
                    var depth = context.pages.getItemDepth(this.page());
                    var value, node, tmp, eventRegex = /^on.*$/i;
                    var nameBlacklistRegex = /[\t\n\f \/><"'=]+/g;
                    for (var path in this.overrides) {
                        for (var attr in this.overrides[path]) {
                            value = this.overrides[path][attr];
                            node = this.findChildElementByPath(path);
                            if (!node) continue;
                            attr = attr.replace(nameBlacklistRegex, "");
                            if ((attr == "class" || attr == "id" || attr == "style") && !value) {
                                continue
                            }
                            if (eventRegex.test(attr)) continue;
                            if (context.isDesign && (attr == "dir" || attr == "contenteditable")) {
                                continue
                            }
                            if (attr == "class") {
                                tmp = node.getAttribute("class");
                                if (tmp) {
                                    value = tmp + " " + value
                                }
                                node.setAttribute("class", value.replace(/\s+/g, " ").trim());
                                continue
                            }
                            if (attr == "style") {
                                node.setAttribute("style", context.processStyleString(value, depth));
                                node["bs-style-override"] = value
                            } else if (attr == "srcset") {
                                node.setAttribute("srcset", context.replaceImageURLsInSrcset(value, depth));
                                node["bs-srcset-override"] = value
                            } else {
                                setAttr(node, attr.trim().replace(/\s+/g, "-"), value)
                            }
                        }
                    }
                    this.afterUpdate();
                    return this.element
                }
            }, {
                key: "updateLinkedComponents",
                value: function updateLinkedComponents() {
                    if (!this.linkID) return;
                    if (this.hasChangesSinceLastUpdate()) {
                        var linkedComponents = this.context().getComponentsLinkedTo(this);
                        var json = this.serialize();
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;
                        try {
                            for (var _iterator3 = linkedComponents[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var comp = _step3.value;
                                if (!comp.exists()) {
                                    continue
                                }
                                comp.overwrite(json);
                                comp.update()
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
                        this.recordChangesForUpdate()
                    }
                }
            }, {
                key: "updateDimensions",
                value: function updateDimensions() {
                    var box = getDimensions(this.element[0]);
                    if (this.x == box.left && this.y == box.top && this.width == box.width && this.height == box.height) {
                        return
                    }
                    this.computedX = box.left + app.canvas.iframeScrollLeft;
                    this.computedY = box.top + app.canvas.iframeScrollTop;
                    _get(Object.getPrototypeOf(Component.prototype), "updateDimensions", this).call(this, box.left, box.top, box.width, box.height);
                    app.trigger("component-dimensions-updated", this)
                }
            }, {
                key: "cloneBox",
                value: function cloneBox() {
                    return Box.prototype.clone.call(this)
                }
            }, {
                key: "equalToBox",
                value: function equalToBox(box) {
                    return Box.prototype.equalTo.call(this, box)
                }
            }, {
                key: "clone",
                value: function clone() {
                    var clone = this.page().restoreComponentTree(this.serialize(), this.parent);
                    if (this.parent && this.parent.childClean) {
                        this.parent.childClean(clone)
                    }
                    return clone
                }
            }, {
                key: "convertUp",
                value: function convertUp() {
                    var parent = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                    return null
                }
            }, {
                key: "transferCommonPropsTo",
                value: function transferCommonPropsTo(component) {
                    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    component.overrides = clone(this.overrides);
                    if (options.transferFlags !== false) {
                        Object.assign(component.flags, this.flags)
                    }
                    component.label = this.label;
                    if (this.linkID) {
                        component.linkID = this.linkID
                    }
                }
            }, {
                key: "transferDefinedPropsTo",
                value: function transferDefinedPropsTo(component) {
                    for (var i = 0; i < this._instanceOptionProperties.length; i++) {
                        var prop = this._instanceOptionProperties[i].id;
                        component.properties[prop] = this.properties[prop]
                    }
                }
            }, {
                key: "serialize",
                value: function serialize() {
                    var obj = {};
                    obj["class"] = this.constructor.name;
                    obj.cssClasses = clone(this.cssClasses);
                    obj.overrides = clone(this.overrides);
                    obj.flags = clone(this.flags);
                    obj.properties = clone(this.properties);
                    obj.label = this.label;
                    if (this.linkID) {
                        obj.linkID = this.linkID
                    }
                    return obj
                }
            }, {
                key: "unserialize",
                value: function unserialize(obj) {
                    if (obj.cssClasses) {
                        this.cssClasses = clone(obj.cssClasses)
                    }
                    if (obj.overrides) {
                        this.overrides = clone(obj.overrides)
                    }
                    if (obj.flags) {
                        for (var k in obj.flags) {
                            this.flags[k] = obj.flags[k]
                        }
                    }
                    if (obj.properties) {
                        this.properties = clone(obj.properties)
                    }
                    this.setLabel(obj.label);
                    if (obj.linkID) {
                        this.linkID = obj.linkID
                    }
                }
            }, {
                key: "canBeDroppedIn",
                value: function canBeDroppedIn(component) {
                    return component != this && !component.isChildOf(this)
                }
            }, {
                key: "canTakeChild",
                value: function canTakeChild(component) {
                    return false
                }
            }, {
                key: "canTakeChildren",
                value: function canTakeChildren(components) {
                    return false
                }
            }, {
                key: "isVisible",
                value: function isVisible() {
                    return this.parent && this.x + this.width > 0 && this.x < app.context.canvasDimensions.width && this.y + this.height > 0 && this.y < app.context.canvasDimensions.height && (this.width > 0 || this.height > 0)
                }
            }, {
                key: "findUsedImages",
                value: function findUsedImages() {
                    var images = [];
                    var context = this.context();
                    var overrides = this.getOverrides("/");
                    if (overrides.srcset) {
                        context.matchSrcset(overrides.srcset, addSourcePath)
                    }
                    if (overrides.style) {
                        context.matchImageURLsInStyle(overrides.style, addSourcePath)
                    }

                    function addSourcePath(path) {
                        var image = context.assets.images.getItemByRelativePath(path);
                        if (image && !images.includes(image)) {
                            images.push(image)
                        }
                    }
                    return images
                }
            }, {
                key: "replaceTemplatePlaceholders",
                value: function replaceTemplatePlaceholders(placeholders) {}
            }, {
                key: "domNode",
                get: function get() {
                    return this.element[0]
                }
            }], [{
                key: "getName",
                value: function getName() {
                    if (this.prettyName) {
                        return this.prettyName
                    }
                    return this.name
                }
            }, {
                key: "canBeInsertedIn",
                value: function canBeInsertedIn(parent) {
                    return canParentTakeChildren(parent, new this)
                }
            }, {
                key: "canCreate",
                value: function canCreate(page) {
                    return true
                }
            }, {
                key: "create",
                value: function create(page) {
                    var instance = new this;
                    instance.initialize();
                    return instance
                }
            }, {
                key: "insertOp",
                value: function insertOp(component) {
                    return {
                        do: function _do(insertAction) {
                            insertAction && insertAction()
                        },
                        undo: function undo() {
                            component.remove()
                        }
                    }
                }
            }]);
            return Component
        }(Box);

        function setAttr(node, attr, value) {
            try {
                node.setAttribute(attr, value)
            } catch (e) {}
        }
        module.exports = Component
    }, {
        "../../base/Box": 10,
        "../../base/CSSBlockStyle": 13,
        "../../helpers/canParentTakeChildren": 547,
        "../../helpers/cssPath": 554,
        "../../helpers/getDimensions": 569,
        "../../helpers/getHTMLForNode": 573,
        "../../helpers/getSmartProp": 575,
        "../../helpers/isContextClick": 584,
        "../../helpers/quickParseCSSRules": 599,
        "../../packages/UserPackage": 1208,
        "../../resources/LinkResource": 1255,
        "./CustomCode": 42,
        "./HTML": 50,
        "clone": 739
    }]
});
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
        var _get = function get(_x3, _x4, _x5) {
            var _again = true;
            _function: while (_again) {
                var object = _x3,
                    property = _x4,
                    receiver = _x5;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x3 = parent;
                        _x4 = property;
                        _x5 = receiver;
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
        var Panel = require("./Panel");
        var smartEditableElement = require("../helpers/smartEditableElement");
        var mimeTypes = require("../config/mime-types");
        var parsePath = require("../helpers/parsePath");
        var callFuncArray = require("../helpers/callFuncArray");
        var parseCSS = require("../helpers/parseCSS");
        var isContextClick = require("../helpers/isContextClick");
        var isSelectionClick = require("../helpers/isSelectionClick");
        var multipleTreeSelection = require("../helpers/multipleTreeSelection");
        var CustomCode = require("../components/base/CustomCode");
        var Resource = require("../resources/Resource");
        var SCSSResource = require("../resources/SCSSResource");
        var Page = require("../base/Page");
        var Tooltip = require("../base/Tooltip");
        var TreeFolder = require("../tree/TreeFolder");
        var JSResourceTreeGroup = require("../tree/JSResourceTreeGroup");
        var FontResourceTreeGroup = require("../tree/FontResourceTreeGroup");
        var prettierBytes = require("prettier-bytes");
        var DesignPanel = function(_Panel) {
            _inherits(DesignPanel, _Panel);

            function DesignPanel() {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                _classCallCheck(this, DesignPanel);
                _get(Object.getPrototypeOf(DesignPanel.prototype), "constructor", this).call(this, options);
                this.id = "design";
                this.name = "Design";
                this.icon = "folder";
                this.element.addClass("tree-holder design-panel");
                this.supportsMultiSelection = true;
                this.domToCategory = new WeakMap;
                this.domToGroup = new WeakMap;
                this.domToItem = new WeakMap;
                this.itemToDOM = new WeakMap;
                this.itemToCategory = new WeakMap;
                this.assetCategories = [{
                    name: "Pages",
                    actions: [{
                        name: "Create Page",
                        action: [this, "createNewPageAndRename"],
                        arg: [app, "context", "pages", "getGroup"]
                    }, {
                        name: "Create Template Page",
                        action: [this, "createNewPageFromTemplate"],
                        excludeFromFolders: true,
                        condition: [app, "context", "usesTemplate"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "pages", "getGroup"]
                    }, {
                        name: "Import HTML File",
                        action: [this, "importHTMLAction"],
                        arg: [app, "context", "pages", "getGroup"]
                    }],
                    groups: [{
                        tree: [app, "context", "pages", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Open",
                            action: [this, "openPage"],
                            condition: [this, "canPageBeOpened"]
                        }, {
                            name: "Copy to",
                            options: [this, "pageCopyToOptions"]
                        }, {
                            name: "Copy Path",
                            action: [this, "copyResourcePath"],
                            condition: [this, "canResourcePathBeCopied"]
                        }, {
                            name: "Duplicate",
                            action: [this, "duplicatePage"]
                        }, {
                            name: "Rename",
                            action: [this, "renameResourceAction"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }, {
                            name: "Properties",
                            action: [this, "pageProperties"]
                        }, {
                            name: "Delete",
                            action: [this, "pageDeleteAction"],
                            condition: [this, "canPageBeDeleted"]
                        }],
                        dbclick: [this, "dbClickPage"]
                    }]
                }, {
                    name: "Styles",
                    actions: [{
                        name: "Create CSS",
                        action: [this, "createNewCSSFileAndRename"],
                        arg: [app, "context", "assets", "css", "getGroup"]
                    }, {
                        name: "Create SCSS",
                        action: [this, "createNewSCSSFileAndRename"],
                        arg: [app, "context", "assets", "css", "getGroup"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "assets", "css", "getGroup"]
                    }, {
                        name: "Import Stylesheet",
                        action: [this, "importCSSAction"],
                        arg: [app, "context", "assets", "css", "getGroup"]
                    }, {
                        name: "Link External CSS",
                        action: [this, "linkCSSAction"],
                        arg: [app, "context", "assets", "css", "getGroup"]
                    }, {
                        name: "Include Order..",
                        action: [this, "changeCSSIncludeOrder"],
                        excludeFromFolders: true,
                        enabled: [this, "canChangeCSSIncludeOrder"]
                    }],
                    groups: [{
                        tree: [app, "context", "assets", "css", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Open",
                            action: [this, "openResource"],
                            condition: [this, "canResourceBeOpened"]
                        }, {
                            name: "Edit",
                            action: [this, "editLinkedCSS"],
                            condition: [this, "isResourceLinked"]
                        }, {
                            name: "Refresh",
                            action: [this, "refreshLinkedResource"],
                            condition: [this, "isResourceLinked"]
                        }, {
                            name: "Copy to",
                            options: [this, "cssCopyToOptions"]
                        }, {
                            name: "Copy Path",
                            action: [this, "copyResourcePath"],
                            condition: [this, "canResourcePathBeCopied"]
                        }, {
                            name: "Duplicate",
                            action: [this, "duplicateCSS"],
                            condition: [this, "canResourceBeDuplicated"]
                        }, {
                            name: "Rename",
                            action: [this, "renameResourceAction"],
                            condition: [this, "canResourceBeRenamed"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }, {
                            name: "Convert to SCSS",
                            action: [this, "convertToSCSS"],
                            condition: [this, "canConvertToSCSS"]
                        }, {
                            name: "Delete",
                            action: [this, "cssDeleteAction"]
                        }],
                        dbclick: [this, "dbClickCSS"]
                    }]
                }, {
                    name: "JavaScript",
                    actions: [{
                        name: "Create JS",
                        action: [this, "createNewJSFileAndRename"],
                        arg: [app, "context", "assets", "js", "getGroup"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "assets", "js", "getGroup"]
                    }, {
                        name: "Import JS File",
                        action: [this, "importJSAction"],
                        arg: [app, "context", "assets", "js", "getGroup"]
                    }, {
                        name: "Link External JS",
                        action: [this, "linkJSAction"],
                        arg: [app, "context", "assets", "js", "getGroup"]
                    }, {
                        name: "Include Order..",
                        action: [this, "changeJSIncludeOrder"],
                        excludeFromFolders: true,
                        enabled: [this, "canChangeJSIncludeOrder"]
                    }],
                    groups: [{
                        tree: [this, "getDefaultJS"],
                        locked: true
                    }, {
                        tree: [app, "context", "assets", "js", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Open",
                            action: [this, "openResource"],
                            condition: [this, "canResourceBeOpened"]
                        }, {
                            name: "Edit",
                            action: [this, "editLinkedJS"],
                            condition: [this, "isResourceLinked"]
                        }, {
                            name: "Copy to",
                            options: [this, "jsCopyToOptions"]
                        }, {
                            name: "Copy Path",
                            action: [this, "copyResourcePath"],
                            condition: [this, "canResourcePathBeCopied"]
                        }, {
                            name: "Duplicate",
                            action: [this, "duplicateJS"],
                            condition: [this, "canResourceBeDuplicated"]
                        }, {
                            name: "Rename",
                            action: [this, "renameResourceAction"],
                            condition: [this, "canResourceBeRenamed"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }, {
                            name: "Delete",
                            action: [this, "jsDeleteAction"]
                        }],
                        dbclick: [this, "dbClickJS"]
                    }]
                }, {
                    name: "Fonts",
                    actions: [{
                        name: "Manage Fonts",
                        action: [this, "importFontAction"],
                        arg: [app, "context", "assets", "fonts", "getGroup"]
                    }],
                    groups: [{
                        tree: [this, "getSystemFonts"],
                        locked: true
                    }, {
                        tree: [app, "context", "assets", "fonts", "getGroup"],
                        actions: [{
                            name: "Copy to",
                            options: [this, "fontCopyToOptions"]
                        }, {
                            name: "Delete",
                            action: [this, "fontDeleteAction"]
                        }]
                    }]
                }, {
                    name: "Images",
                    actions: [{
                        name: "Import Image",
                        action: [this, "importImageAction"],
                        arg: [app, "context", "assets", "images", "getGroup"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "assets", "images", "getGroup"]
                    }],
                    groups: [{
                        tree: [app, "context", "assets", "images", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Copy to",
                            options: [this, "imageCopyToOptions"]
                        }, {
                            name: "Copy Path",
                            action: [this, "copyResourcePath"],
                            condition: [this, "canResourcePathBeCopied"]
                        }, {
                            name: "Rename",
                            action: [this, "renameResourceAction"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }, {
                            name: "Delete",
                            action: [this, "imageDeleteAction"]
                        }],
                        mouseenter: [this, "mouseenterImage"],
                        mouseleave: [this, "mouseleaveImage"],
                        mousedown: [this, "mousedownImage"]
                    }]
                }, {
                    name: "Audio",
                    actions: [{
                        name: "Import Audio",
                        action: [this, "importAudioAction"],
                        arg: [app, "context", "assets", "audio", "getGroup"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "assets", "audio", "getGroup"]
                    }],
                    groups: [{
                        tree: [app, "context", "assets", "audio", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Delete",
                            action: [this, "audioDeleteAction"]
                        }, {
                            name: "Rename",
                            action: [this, "renameAudioAction"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }]
                    }]
                }, {
                    name: "PDF",
                    actions: [{
                        name: "Import PDF",
                        action: [this, "importPDFAction"],
                        arg: [app, "context", "assets", "pdf", "getGroup"]
                    }, {
                        name: "Create Folder",
                        action: [this, "createNewFolderAndRename"],
                        arg: [app, "context", "assets", "pdf", "getGroup"]
                    }],
                    groups: [{
                        tree: [app, "context", "assets", "pdf", "getGroup"],
                        save: [this, "saveAction"],
                        actions: [{
                            name: "Delete",
                            action: [this, "pdfDeleteAction"]
                        }, {
                            name: "Rename",
                            action: [this, "renamePDFAction"]
                        }, {
                            name: "Move to Folder",
                            options: [this, "moveToFolderOptions"]
                        }]
                    }]
                }];
                this.smartEditable = smartEditableElement({
                    element: this.element,
                    onStartEdit: this.assetStartSmartEdit.bind(this),
                    onStopEdit: this.assetStopSmartEdit.bind(this),
                    onCommit: this.assetCommitSmartEdit.bind(this),
                    onCancel: this.assetCancelSmartEdit.bind(this)
                });
                this.tooltip = new Tooltip({
                    class: "image-preview"
                });
                this.mouseDownImage = false;
                this.editResourceAfterUpdate = null;
                app.on("context-activated", this.contextActivated.bind(this));
                app.on("resource-changed package-inserted package-removed page-activated context-theme-changed", this.scheduleUpdate.bind(this));
                this.panelReady()
            }
            _createClass(DesignPanel, [{
                key: "bindEventListeners",
                value: function bindEventListeners() {
                    _get(Object.getPrototypeOf(DesignPanel.prototype), "bindEventListeners", this).call(this);
                    this.element.off(".design-panel");
                    this.element.on("click.design-panel", ".asset-group", this.clickAssetCategory.bind(this));
                    this.element.on("mouseup.design-panel", ".asset-group", this.mouseupAssetCategory.bind(this));
                    this.element.on("click.design-panel", ".asset-folder", this.clickAssetFolder.bind(this));
                    this.element.on("mouseup.design-panel", ".asset-folder", this.mouseupAssetFolder.bind(this));
                    this.element.on("mousedown.design-panel", ".asset-item", this.mousedownResource.bind(this));
                    this.element.on("mouseup.design-panel", ".asset-item", this.mouseupResource.bind(this));
                    this.element.on("mouseenter.design-panel", ".asset-item", this.mouseenterResource.bind(this));
                    this.element.on("mouseleave.design-panel", ".asset-item", this.mouseleaveResource.bind(this));
                    this.element.on("dblclick.design-panel", ".asset-item", this.dbclickResource.bind(this))
                }
            }, {
                key: "assetStartSmartEdit",
                value: function assetStartSmartEdit() {
                    this.tooltip.disable()
                }
            }, {
                key: "assetStopSmartEdit",
                value: function assetStopSmartEdit() {
                    this.tooltip.enable()
                }
            }, {
                key: "assetCancelSmartEdit",
                value: function assetCancelSmartEdit() {
                    setTimeout(function() {
                        this.update()
                    }.bind(this), 10)
                }
            }, {
                key: "assetCommitSmartEdit",
                value: function assetCommitSmartEdit(item, newName) {
                    var obj = this.domToItem.get(item[0]);
                    var oldName = "";
                    var category = this.domToCategory.get(item[0]);
                    var group = this.domToGroup.get(item[0]);
                    var result = null;
                    var dID = '';
                    var userID = '';
                    if (!obj || !category || !group) return;
                    oldName = obj.name;
                    newName = newName.trim();
                    if (!(obj instanceof TreeFolder)) {
                        newName = obj.applyExtensionToName(newName);
                        dID = app.context.id;
                        userID = app.user;
                        
                        if((category.name).toLowerCase() == "audio")
                        {
                            $.post('../cogworks/main-tool-backend/rename/asset', {oldName: oldName, newName: newName, designID: dID, user: userID, asset: 'audio'}, function(data){
                                app.context.history.stackID += 1;
                                $("#menu").find(".save").toggleClass("active");
                                app.trigger("context-changed", app.context);
                            }).fail(function() {
                                cogworks.loadingScreen("alert","<p>Failed to rename " + oldName + " into " + newName + ".</p><p>Report error ID: 049 to the admin if issue persist.</p>","show");
                            }).error(function() {
                                cogworks.loadingScreen("alert","<p>Failed to rename " + oldName + " into " + newName + ".</p><p>Report error ID: 050 to the admin if issue persist.</p>","show");
                            });
                        }
                        else if((category.name).toLowerCase() == "pdf")
                        {
                            $.post('../cogworks/main-tool-backend/rename/asset', {oldName: oldName, newName: newName, designID: dID, user: userID, asset: 'pdf'}, function(data){
                                app.context.history.stackID += 1;
                                $("#menu").find(".save").toggleClass("active");
                                app.trigger("context-changed", app.context);
                            }).fail(function() {
                                cogworks.loadingScreen("alert","<p>Failed to rename " + oldName + " into " + newName + ".</p><p>Report error ID: 051 to the admin if issue persist.</p>","show");
                            }).error(function() {
                                cogworks.loadingScreen("alert","<p>Failed to rename " + oldName + " into " + newName + ".</p><p>Report error ID: 052 to the admin if issue persist.</p>","show");
                            });
                        }
                    }
                    var result = callFuncArray(group.save, [obj, newName]);
                    
                    if (result == false) {
                        setTimeout(function() {
                            this.update()
                        }.bind(this), 10)
                    }
                }
            }, {
                key: "createMultipleSelectionForTree",
                value: function createMultipleSelectionForTree(tree) {
                    var options = {
                        rootCanBeSelected: false
                    };
                    if (tree == app.context.pages) {
                        options.startSelected = app.context.pages.findWrapperForItemRecursive(app.context.page)
                    }
                    return multipleTreeSelection(tree, options)
                }
            }, {
                key: "multipleDeleteAction",
                value: function multipleDeleteAction(items, tree) {
                    var type = this.getResourceCategoryName(items[0]);
                    var allItems = [];
                    var ops = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;
                            ops.push(tree.getFolderForEntry(item).removeOp(item));
                            if (item instanceof Page) {
                                item.html.body.unlinkAll()
                            }
                            if (item instanceof TreeFolder) {
                                allItems.push.apply(allItems, _toConsumableArray(item.getAll()))
                            } else {
                                allItems.push(item)
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
                    ops.forEach(function(op) {
                        return op["do"]()
                    });
                    app.trigger("resource-changed", type, "delete", allItems);
                    app.context.history.add({
                        name: "Remove Item" + (allItems.length != 1 ? "s" : ""),
                        undo: function undo() {
                            ops.forEach(function(op) {
                                return op.undo()
                            });
                            app.trigger("resource-changed", type, "create", allItems)
                        },
                        redo: function redo() {
                            ops.forEach(function(op) {
                                return op["do"]()
                            });
                            app.trigger("resource-changed", type, "delete", allItems)
                        }
                    })
                }
            }, {
                key: "hasMultipleSelection",
                value: function hasMultipleSelection() {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = this.assetCategories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var c = _step2.value;
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;
                            try {
                                for (var _iterator3 = c.groups[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var g = _step3.value;
                                    var group = callFuncArray(g.tree);
                                    if (this.hasMultipleSelectionForTree(group)) {
                                        return true
                                    }
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
                key: "contextActivated",
                value: function contextActivated() {
                    this.scheduleUpdate()
                }
            }, {
                key: "dragStart",
                value: function dragStart() {
                    this.smartEditable.focusout()
                }
            }, {
                key: "mouseenterImage",
                value: function mouseenterImage(image, e) {
                    var target = e.target.closest(".asset-item");
                    var rect = target.getBoundingClientRect();
                    this.tooltip.showDelay(target, {
                        x: rect.right,
                        y: rect.top + rect.height / 2,
                        render: this.renderImageTooltip.bind(this),
                        position: "right"
                    })
                }
            }, {
                key: "mouseleaveImage",
                value: function mouseleaveImage(image, e) {
                    this.tooltip.hideDelay()
                }
            }, {
                key: "clickAssetCategory",
                value: function clickAssetCategory(e) {
                    if (isContextClick(e)) return;
                    var category = this.domToCategory.get(e.currentTarget);
                    if (!category) return;
                    this.expandContractCategory(category.name)
                }
            }, {
                key: "mouseupAssetCategory",
                value: function mouseupAssetCategory(e) {
                    var category = this.domToCategory.get(e.currentTarget);
                    if (!category) return;
                    if (isContextClick(e)) {
                        var pos = app.mousePosition;
                        var options = [];
                        if (category.actions && category.actions.length) {
                            var visibleActions = category.actions.filter(function(a) {
                                return a.condition ? callFuncArray(a.condition) : true
                            });
                            options = visibleActions.map(function(a) {
                                return {
                                    name: a.name,
                                    action: function action() {
                                        if (a.arg) {
                                            callFuncArray(a.action, callFuncArray(a.arg))
                                        } else {
                                            callFuncArray(a.action, category)
                                        }
                                    },
                                    disabled: a.enabled ? !callFuncArray(a.enabled) : false
                                }
                            })
                        }
                        app.contextMenu.show(pos.x, pos.y, options)
                    }
                }
            }, {
                key: "clickAssetFolder",
                value: function clickAssetFolder(e) {
                    if (isContextClick(e)) return;
                    if (e.currentTarget.matches(".editing")) {
                        return
                    }
                    var folder = this.domToItem.get(e.currentTarget);
                    if (!folder) return;
                    if (isSelectionClick(e)) {
                        if (!this.hasMultipleSelectionForTree(folder.getGroup())) {
                            this.clearSelections()
                        }
                        var multiSelect = this.getMultipleSelectionForTree(folder.getGroup());
                        multiSelect.click(folder, e);
                        this.update();
                        return
                    }
                    this.expandContractFolder(folder)
                }
            }, {
                key: "mouseupAssetFolder",
                value: function mouseupAssetFolder(e) {
                    var folder = this.domToItem.get(e.currentTarget);
                    if (!folder) return;
                    var category = this.domToCategory.get(e.currentTarget);
                    if (!category) return;
                    var group = folder.getGroup();
                    if (isContextClick(e)) {
                        var that = this;
                        var canDelete = true;
                        var selection = null;
                        var options = [];
                        if (this.hasMultipleSelectionForTree(group)) {
                            selection = this.getMultipleSelectionForTree(group)
                        }
                        if (selection && selection.isItemSelected(folder)) {
                            var flatSelection = selection.getFlatSelection().map(function(i) {
                                return i instanceof TreeFolder ? i : i.item
                            });
                            if (group == app.context.pages && selection.areAllItemsSelected()) {
                                canDelete = false
                            }
                            options.push({
                                name: "Copy to",
                                options: this.generateCopyToOptions(flatSelection, group)
                            }, {
                                name: "Move to Folder",
                                options: this.generateMoveToOptions(flatSelection, group)
                            }, {
                                name: "Delete",
                                action: function action() {
                                    that.multipleDeleteAction(flatSelection, group)
                                },
                                disabled: !canDelete
                            });
                            app.contextMenu.show(app.mousePosition.x, app.mousePosition.y, options);
                            return
                        }
                        if (group == app.context.pages && group.getAll().length == folder.getAll().length) {
                            canDelete = false
                        }
                        var options = [];
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;
                        try {
                            for (var _iterator4 = category.actions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var action = _step4.value;
                                if (action.excludeFromFolders) continue;
                                options.push({
                                    name: action.name,
                                    action: function() {
                                        callFuncArray(this.action, folder)
                                    }.bind(action)
                                })
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
                        options.push({
                            name: "Rename",
                            action: function action() {
                                that.renameResourceAction(folder)
                            }
                        }, {
                            name: "Copy to",
                            options: this.generateCopyToOptions(folder, group)
                        }, {
                            name: "Move to Folder",
                            options: this.generateMoveToOptions(folder, group)
                        }, {
                            name: "Delete",
                            action: function action() {
                                that.folderDeleteAction(folder)
                            },
                            disabled: !canDelete
                        });
                        app.contextMenu.show(app.mousePosition.x, app.mousePosition.y, options)
                    }
                }
            }, {
                key: "dbclickResource",
                value: function dbclickResource(e) {
                    var node = e.currentTarget;
                    if (node.classList.contains("editing")) return;
                    var group = this.domToGroup.get(node);
                    if (!group) return;
                    var item = this.domToItem.get(node);
                    if (!item) return;
                    if (group.dbclick) {
                        callFuncArray(group.dbclick, [item, e])
                    }
                }
            }, {
                key: "mousedownResource",
                value: function mousedownResource(e) {
                    var node = e.currentTarget;
                    if (node.classList.contains("editing")) return;
                    var group = this.domToGroup.get(node);
                    if (!group) return;
                    var item = this.domToItem.get(node);
                    if (!item) return;
                    if (isContextClick(e)) {
                        return
                    }
                    if (isSelectionClick(e) && !group.locked && !app.context.assets.fonts.contains(item)) {
                        var tree = callFuncArray(group.tree);
                        if (!this.hasMultipleSelectionForTree(tree)) {
                            this.clearSelections()
                        }
                        var multiSelect = this.getMultipleSelectionForTree(tree);
                        multiSelect.click(tree.findWrapperForItemRecursive(item), e);
                        this.update();
                        return
                    }
                    if (group.tree) {
                        var tree = callFuncArray(group.tree);
                        if (this.hasMultipleSelectionForTree(tree) && this.getMultipleSelectionForTree(tree).isItemSelected(tree.findWrapperForItemRecursive(item))) {
                            return
                        }
                    }
                    if (group.mousedown) {
                        callFuncArray(group.mousedown, [item, e])
                    }
                }
            }, {
                key: "mouseupResource",
                value: function mouseupResource(e) {
                    var node = e.currentTarget;
                    var group = this.domToGroup.get(node);
                    if (!group) return;
                    var item = this.domToItem.get(node);
                    if (!item) return;
                    if (isContextClick(e)) {
                        var pos = app.mousePosition;
                        var options = [];
                        var canDelete = true;
                        var selection = null;
                        var that = this;
                        var tree = callFuncArray(group.tree);
                        if (this.hasMultipleSelectionForTree(tree)) {
                            selection = this.getMultipleSelectionForTree(tree)
                        }
                        if (selection && selection.isItemSelected(tree.findWrapperForItemRecursive(item)) && selection.getSelectionCount() > 1) {
                            var flatSelection = selection.getFlatSelection().map(function(i) {
                                return i instanceof TreeFolder ? i : i.item
                            });
                            if (tree == app.context.pages && selection.areAllItemsSelected()) {
                                canDelete = false
                            }
                            options.push({
                                name: "Copy to",
                                options: this.generateCopyToOptions(flatSelection, tree)
                            }, {
                                name: "Move to Folder",
                                options: this.generateMoveToOptions(flatSelection, tree)
                            }, {
                                name: "Delete",
                                action: function action() {
                                    that.multipleDeleteAction(flatSelection, tree)
                                },
                                disabled: !canDelete
                            });
                            app.contextMenu.show(app.mousePosition.x, app.mousePosition.y, options);
                            return
                        }
                        if (group.actions && group.actions.length) {
                            var visibleActions = group.actions.filter(function(a) {
                                return a.condition ? callFuncArray(a.condition, [item]) : true
                            });
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;
                            try {
                                for (var _iterator5 = visibleActions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var a = _step5.value;
                                    (function(a) {
                                        if (a.action) {
                                            options.push({
                                                name: a.name,
                                                action: function action() {
                                                    callFuncArray(a.action, [item, group])
                                                }
                                            })
                                        } else if (a.options) {
                                            options.push({
                                                name: a.name,
                                                options: callFuncArray(a.options, [item, group])
                                            })
                                        }
                                    })(a)
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
                        app.contextMenu.show(pos.x, pos.y, options)
                    }
                }
            }, {
                key: "mouseenterResource",
                value: function mouseenterResource(e) {
                    var node = e.currentTarget;
                    var group = this.domToGroup.get(node);
                    if (!group) return;
                    var item = this.domToItem.get(node);
                    if (!item) return;
                    if (group.mouseenter) {
                        callFuncArray(group.mouseenter, [item, e])
                    }
                }
            }, {
                key: "mouseleaveResource",
                value: function mouseleaveResource(e) {
                    var node = e.currentTarget;
                    var group = this.domToGroup.get(node);
                    if (!group) return;
                    var item = this.domToItem.get(node);
                    if (!item) return;
                    if (group.mouseleave) {
                        callFuncArray(group.mouseleave, [item, e])
                    }
                }
            }, {
                key: "getDefaultJS",
                value: function getDefaultJS() {
                    var tree = new JSResourceTreeGroup;
                    tree.addOp(tree.createItem("jquery.min.js"))["do"]();
                    tree.addOp(tree.createItem("bootstrap.min.js"))["do"]();
                    return tree
                }
            }, {
                key: "getSystemFonts",
                value: function getSystemFonts() {
                    var tree = new FontResourceTreeGroup;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;
                    try {
                        for (var _iterator6 = app.context.getSystemFonts()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var font = _step6.value;
                            tree.addOp(tree.createItem(font.name))["do"]()
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
                    return tree
                }
            }, {
                key: "renderImageTooltip",
                value: function renderImageTooltip(target) {
                    var image = this.domToItem.get(target);
                    if (!image) return;
                    var div = document.createElement("div");
                    image.calculateDimensions(function(x, y) {
                        var size = "";
                        if (image.fileSize) {
                            size = ", " + prettierBytes(image.fileSize)
                        }
                        var dimensions = x + "x" + y + size;
                        var preview = document.createElement("div");
                        preview.className = "preview";
                        preview.style.backgroundImage = "url(" + image.blobURL + ")";
                        var dim = document.createElement("div");
                        dim.className = "dimensions";
                        dim.textContent = dimensions;
                        div.appendChild(preview);
                        div.appendChild(dim)
                    });
                    return div
                }
            }, {
                key: "mousedownImage",
                value: function mousedownImage(item, e) {
                    var target = $(e.currentTarget);
                    var offset = target.offset();
                    e.preventDefault();
                    var imageItem = target.closest(".asset-item");
                    var Image = app.framework.getComponent("Image");
                    var img = new Image;
                    img.initialize();
                    img.properties.src = app.context.assets.images.getRelativePathForItem(item);
                    app.dragStart({
                        components: [img],
                        historyTitle: "Add Image",
                        origin: {
                            top: offset.top,
                            left: offset.left,
                            width: target.outerWidth(),
                            height: target.outerHeight()
                        },
                        operation: Image.insertOp(img)
                    })
                }
            }, {
                key: "moveToFolderOptions",
                value: function moveToFolderOptions(item, group) {
                    return this.generateMoveToOptions(item, callFuncArray(group.tree))
                }
            }, {
                key: "pageCopyToOptions",
                value: function pageCopyToOptions(items) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var PageResourceTreeGroup = require("../tree/PageResourceTreeGroup");
                    return this.genericCopyToOptions(function(ctx) {
                        var tree = new PageResourceTreeGroup(ctx);
                        tree.addOp(items.map(function(i) {
                            return i.clone()
                        }))["do"]();
                        tree.getAll().forEach(function(p) {
                            return p.html.cleanup()
                        });
                        return {
                            collection: ctx.pages,
                            tree: tree
                        }
                    }, "page", "Insert Pages")
                }
            }, {
                key: "cssCopyToOptions",
                value: function cssCopyToOptions(items) {
                    var type = "css";
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var CSSResourceTreeGroup = require("../tree/CSSResourceTreeGroup");
                    return this.genericCopyToOptions(function(ctx) {
                        var tree = CSSResourceTreeGroup.fromArray(items.map(function(i) {
                            return i.serialize()
                        }));
                        tree = tree.filterTree(function(c) {
                            return !ctx.assets.css.hasResourceCSS(c)
                        });
                        return {
                            collection: ctx.assets.css,
                            tree: tree
                        }
                    }, type, "Insert Stylesheets")
                }
            }, {
                key: "jsCopyToOptions",
                value: function jsCopyToOptions(items) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var JSResourceTreeGroup = require("../tree/JSResourceTreeGroup");
                    return this.genericCopyToOptions(function(ctx) {
                        var tree = JSResourceTreeGroup.fromArray(items.map(function(i) {
                            return i.serialize()
                        }));
                        tree = tree.filterTree(function(j) {
                            return !ctx.assets.js.hasResourceJS(j)
                        });
                        return {
                            collection: ctx.assets.js,
                            tree: tree
                        }
                    }, "js", "Insert JS")
                }
            }, {
                key: "fontCopyToOptions",
                value: function fontCopyToOptions(items) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var FontResourceTreeGroup = require("../tree/FontResourceTreeGroup");
                    return this.genericCopyToOptions(function(ctx) {
                        var tree = FontResourceTreeGroup.fromArray(items.map(function(i) {
                            return i.serialize()
                        }));
                        tree = tree.filterTree(function(f) {
                            return !ctx.assets.fonts.hasResourceFont(f)
                        });
                        return {
                            collection: ctx.assets.fonts,
                            tree: tree
                        }
                    }, "font", "Insert Font")
                }
            }, {
                key: "imageCopyToOptions",
                value: function imageCopyToOptions(items) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var ImageResourceTreeGroup = require("../tree/ImageResourceTreeGroup");
                    return this.genericCopyToOptions(function(ctx) {
                        return {
                            collection: ctx.assets.images,
                            tree: ImageResourceTreeGroup.fromArray(items.map(function(i) {
                                return i.serialize()
                            }))
                        }
                    }, "image", "Insert Images")
                }
            }, {
                key: "genericCopyToOptions",
                value: function genericCopyToOptions(copyToDesignFn, type, title) {
                    var options = [];
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;
                    try {
                        for (var _iterator7 = app.openedContexts[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var ctx = _step7.value;
                            if (ctx == app.context) continue;
                            if (type == "page" && app.framework != ctx.framework) {
                                continue
                            }
                            options.push({
                                name: ctx.name,
                                action: contextClick.bind(this, ctx)
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
                    var that = this;
                    options.push({
                        name: "New Design",
                        action: function action() {
                            var newDesign = app.createBlankDesign(app.framework);
                            app.openContext(newDesign);
                            var target = copyToDesignFn(newDesign);
                            if (!target) return;
                            var op = target.collection.insertTreeOp(target.tree, {
                                addDuplicates: true
                            });
                            op["do"]();
                            if (type == "page") {
                                newDesign.claimAllPages()
                            }
                            if (type === "css" || type === "scss") {
                                var SCSSResource = require("../resources/SCSSResource");
                                var items = target.tree.getAll();
                                var _iteratorNormalCompletion8 = true;
                                var _didIteratorError8 = false;
                                var _iteratorError8 = undefined;
                                try {
                                    for (var _iterator8 = items[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                        var item = _step8.value;
                                        if (item instanceof SCSSResource) {
                                            newDesign.needsSCSSCompilation = true;
                                            break
                                        }
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
                            newDesign.history.add({
                                name: title,
                                undo: function undo() {
                                    op.undo();
                                    app.trigger("resource-changed", type, "delete", target.tree.getAll())
                                },
                                redo: function redo() {
                                    op["do"]();
                                    if (type == "page") {
                                        newDesign.claimAllPages()
                                    }
                                    app.trigger("resource-changed", type, "create", target.tree.getAll())
                                }
                            })
                        }
                    });

                    function contextClick(ctx) {
                        var target = copyToDesignFn(ctx);
                        if (!target) return;
                        var op = target.collection.insertTreeOp(target.tree, {
                            addDuplicates: true
                        });
                        op["do"]();
                        if (type == "page") {
                            ctx.claimAllPages()
                        }
                        if (type === "css" || type === "scss") {
                            var SCSSResource = require("../resources/SCSSResource");
                            var items = target.tree.getAll();
                            var _iteratorNormalCompletion9 = true;
                            var _didIteratorError9 = false;
                            var _iteratorError9 = undefined;
                            try {
                                for (var _iterator9 = items[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    var item = _step9.value;
                                    if (item instanceof SCSSResource) {
                                        ctx.needsSCSSCompilation = true;
                                        break
                                    }
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
                        }
                        ctx.history.add({
                            name: title,
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", type, "delete", target.tree.getAll())
                            },
                            redo: function redo() {
                                op["do"]();
                                if (type == "page") {
                                    ctx.claimAllPages()
                                }
                                app.trigger("resource-changed", type, "create", target.tree.getAll())
                            }
                        })
                    }
                    return options
                }
            }, {
                key: "copyResourcePath",
                value: function copyResourcePath(resource, def) {
                    electron.clipboardSetText(callFuncArray(def.tree).getRelativePathForItem(resource))
                }
            }, {
                key: "createNewFolderAndRename",
                value: function createNewFolderAndRename(parent) {
                    var folder = parent.createFolder();
                    folder.name = parent.generateUniqueFreeName("New Folder");
                    var op = parent.addOp(folder);
                    op["do"]();
                    app.trigger("resource-changed", "folder", "create", folder);
                    this.editResourceAfterUpdate = folder;
                    parent.expanded = true;
                    app.context.history.add({
                        name: "Create Folder",
                        undo: function undo() {
                            op.undo();
                            app.trigger("resource-changed", "folder", "delete", folder)
                        },
                        redo: function redo() {
                            op["do"]();
                            parent.ensureChildUniqueName(folder);
                            app.trigger("resource-changed", "folder", "create", folder)
                        }
                    })
                }
            }, {
                key: "createNewPage",
                value: function createNewPage(folder) {
                    if (!folder) folder = app.context.pages;
                    return this.genericCreateResource(folder, folder.createUniqueItem(), "page", "Create New Page")
                }
            }, {
                key: "createNewPageAndRename",
                value: function createNewPageAndRename(folder) {
                    if (!folder) folder = app.context.pages;
                    this.editResourceAfterUpdate = this.createNewPage(folder);
                    folder.expanded = true
                }
            }, {
                key: "createNewPageFromTemplate",
                value: function createNewPageFromTemplate() {
                    if (!app.template) return;
                    app.newTemplatePageDialog.open({
                        framework: app.context.framework,
                        onSave: function onSave(_ref) {
                            var pagePaths = _ref.pagePaths;
                            var navPaths = _ref.navPaths;
                            var result = app.template.insertInto(app.context, {
                                pagePaths: pagePaths,
                                navPaths: navPaths
                            });
                            result.op["do"]();
                            app.trigger("resource-changed", "page", "create", result.pages);
                            app.activatePage(result.pages[0]);
                            app.context.history.add({
                                name: "Create Template Page",
                                undo: function undo() {
                                    result.op.undo();
                                    app.trigger("resource-changed", "page", "delete", result.pages)
                                },
                                redo: function redo() {
                                    result.op["do"]();
                                    app.trigger("resource-changed", "page", "create", result.pages)
                                }
                            })
                        }
                    })
                }
            }, {
                key: "createNewCSSFile",
                value: function createNewCSSFile(folder) {
                    if (!folder) folder = app.context.assets.css;
                    return this.genericCreateResource(folder, app.context.assets.css.createUniqueItem(folder, "css"), "css", "Create New Stylesheet")
                }
            }, {
                key: "createNewSCSSFile",
                value: function createNewSCSSFile(folder) {
                    if (!folder) folder = app.context.assets.css;
                    return this.genericCreateResource(folder, app.context.assets.css.createUniqueItem(folder, "scss"), "scss", "Create New SCSS File")
                }
            }, {
                key: "createNewCSSFileAndRename",
                value: function createNewCSSFileAndRename(folder) {
                    if (!folder) folder = app.context.assets.css;
                    this.editResourceAfterUpdate = this.createNewCSSFile(folder);
                    folder.expanded = true
                }
            }, {
                key: "createNewSCSSFileAndRename",
                value: function createNewSCSSFileAndRename(folder) {
                    if (!folder) folder = app.context.assets.css;
                    this.editResourceAfterUpdate = this.createNewSCSSFile(folder);
                    folder.expanded = true
                }
            }, {
                key: "createNewJSFile",
                value: function createNewJSFile(folder) {
                    if (!folder) folder = app.context.assets.js;
                    return this.genericCreateResource(folder, folder.createUniqueItem(), "js", "Create New JS File")
                }
            }, {
                key: "createNewJSFileAndRename",
                value: function createNewJSFileAndRename(folder) {
                    if (!folder) folder = app.context.assets.js;
                    this.editResourceAfterUpdate = this.createNewJSFile(folder);
                    folder.expanded = true
                }
            }, {
                key: "genericCreateResource",
                value: function genericCreateResource(folder, item, type, title) {
                    var op = folder.addOp(item);
                    op["do"]();
                    app.trigger("resource-changed", type, "create", item);
                    app.context.history.add({
                        name: title,
                        undo: function undo() {
                            op.undo();
                            app.trigger("resource-changed", type, "delete", item)
                        },
                        redo: function redo() {
                            op["do"]();
                            app.trigger("resource-changed", type, "create", item)
                        }
                    });
                    return item
                }
            }, {
                key: "importFontAction",
                value: function importFontAction(folder) {
                    var that = this;
                    if (!folder) {
                        folder = app.context.assets.fonts
                    }
                    app.fontManagerDialog.open()
                }
            }, {
                key: "linkCSSAction",
                value: function linkCSSAction(folder) {
                    folder.expanded = true;
                    this.genericEditLinked(app.cssLinkDialog, function(url) {
                        return app.context.assets.css.createLink(url)
                    }, "css", "Stylesheet", folder, null)
                }
            }, {
                key: "editLinkedCSS",
                value: function editLinkedCSS(css) {
                    var folder = app.context.assets.css.findParentFolderForItem(css);
                    this.genericEditLinked(app.cssLinkDialog, function(url) {
                        return app.context.assets.css.createLink(url)
                    }, "css", "Stylesheet", folder, css)
                }
            }, {
                key: "linkJSAction",
                value: function linkJSAction(folder) {
                    folder.expanded = true;
                    this.genericEditLinked(app.jsLinkDialog, function(url) {
                        return app.context.assets.js.createLink(url)
                    }, "js", "JavaScript File", folder, null)
                }
            }, {
                key: "editLinkedJS",
                value: function editLinkedJS(js, folder) {
                    var folder = app.context.assets.js.findParentFolderForItem(js);
                    this.genericEditLinked(app.jsLinkDialog, function(url) {
                        return app.context.assets.js.createLink(url)
                    }, "js", "JavaScript File", folder, js)
                }
            }, {
                key: "genericEditLinked",
                value: function genericEditLinked(dialog, createfn, type, name, folder, resource) {
                    dialog.open({
                        url: resource ? resource.url : "",
                        buttonText: resource ? "Update" : "Import",
                        onSave: function onSave(url) {
                            if (folder.has(url)) return;
                            if (!resource) {
                                resource = createfn(url);
                                var op = folder.addOp(resource);
                                op["do"]();
                                app.trigger("resource-changed", type, "create", resource);
                                app.context.history.add({
                                    name: "Link " + name,
                                    undo: function undo() {
                                        op.undo();
                                        app.trigger("resource-changed", type, "delete", resource)
                                    },
                                    redo: function redo() {
                                        op["do"]();
                                        app.trigger("resource-changed", type, "create", resource)
                                    }
                                });
                                app.notifications.create({
                                    title: "A linked " + name.toLowerCase() + " was added",
                                    description: "You can see it in the Design panel."
                                }).show()
                            } else {
                                var oldURL = resource.url;
                                resource.setURL(url);
                                resource.update();
                                app.trigger("resource-changed", type, "edit", resource);
                                app.context.history.add({
                                    name: "Edit Linked " + name,
                                    undo: function undo() {
                                        resource.setURL(oldURL);
                                        resource.update();
                                        app.trigger("resource-changed", type, "edit", resource)
                                    },
                                    redo: function redo() {
                                        resource.setURL(url);
                                        resource.update();
                                        app.trigger("resource-changed", type, "edit", resource)
                                    }
                                })
                            }
                        }
                    })
                }
            }, {
                key: "refreshLinkedResource",
                value: function refreshLinkedResource(resource) {
                    resource.updateCacheToken();
                    resource.update(app.context)
                }
            }, {
                key: "canChangeCSSIncludeOrder",
                value: function canChangeCSSIncludeOrder() {
                    var paths = app.context.assets.css.getAllItemPaths();
                    return paths.length > 1
                }
            }, {
                key: "changeCSSIncludeOrder",
                value: function changeCSSIncludeOrder() {
                    this.changeResourceIncludeOrder(app.context.assets.css, "css")
                }
            }, {
                key: "canChangeJSIncludeOrder",
                value: function canChangeJSIncludeOrder() {
                    var paths = app.context.assets.js.getAllItemPaths();
                    return paths.length > 1
                }
            }, {
                key: "changeJSIncludeOrder",
                value: function changeJSIncludeOrder() {
                    this.changeResourceIncludeOrder(app.context.assets.js, "js", ["jquery.min.js", "bootstrap.min.js"])
                }
            }, {
                key: "changeResourceIncludeOrder",
                value: function changeResourceIncludeOrder(collection, type) {
                    var fixed = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
                    var items = collection.getAllByPriority();
                    app.resourceOrderDialog.open({
                        reorder: items,
                        fixed: fixed,
                        collection: collection,
                        onSave: function onSave(newOrder) {
                            var oldPriorities = new Map;
                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;
                            try {
                                for (var _iterator10 = items[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var item = _step10.value;
                                    oldPriorities.set(item, item.priority)
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
                            for (var i = 0; i < newOrder.length; i++) {
                                var item = newOrder[i];
                                item.priority = newOrder.length - i
                            }
                            app.trigger("resource-changed", type, "reorder", items);
                            app.context.history.add({
                                name: "Change Include Order",
                                undo: function undo() {
                                    var _iteratorNormalCompletion11 = true;
                                    var _didIteratorError11 = false;
                                    var _iteratorError11 = undefined;
                                    try {
                                        for (var _iterator11 = items[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                            var item = _step11.value;
                                            item.priority = oldPriorities.get(item)
                                        }
                                    } catch (err) {
                                        _didIteratorError11 = true;
                                        _iteratorError11 = err
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
                                                _iterator11["return"]()
                                            }
                                        } finally {
                                            if (_didIteratorError11) {
                                                throw _iteratorError11
                                            }
                                        }
                                    }
                                    app.trigger("resource-changed", type, "reorder", items)
                                },
                                redo: function redo() {
                                    for (var i = 0; i < newOrder.length; i++) {
                                        var item = newOrder[i];
                                        item.priority = newOrder.length - i
                                    }
                                    app.trigger("resource-changed", type, "reorder", items)
                                }
                            })
                        }
                    })
                }
            }, {
				key: "importAudioAction",
				value: function importAudioAction(folder) {
                    app.uploadAudioFileDialog.getFolder(folder);
                    app.uploadAudioFileDialog.open();
				}
			}, {
                key: "audioDeleteAction",
                value: function audioDeleteAction(item) {
                    this.genericResourceDeleteAction(item, "audio", app.context.assets.audio.getFolderForEntry(item), "Remove Audio Asset")
                }
            }, {
				key: "importPDFAction",
				value: function importPDFAction(folder) {
                    app.uploadPDFFileDialog.getFolder(folder);
                    app.uploadPDFFileDialog.open();
				}
			}, {
                key: "pdfDeleteAction",
                value: function pdfDeleteAction(item) {
                    this.genericResourceDeleteAction(item, "pdf", app.context.assets.pdf.getFolderForEntry(item), "Remove PDF Asset")
                }
            }, {
				key: "importImageAction",
				value: function importImageAction(folder) {
					app.uploadImageFileDialog.getFolder(folder);
                    app.uploadImageFileDialog.open();
				}
			}, {
				key: "importHTMLAction",
				value: function importHTMLAction(folder) {
					app.uploadHTMLFileDialog.getFolder(folder);
					app.uploadHTMLFileDialog.open();
				}
			}, {
				key: "importCSSAction",
				value: function importCSSAction(folder) {
					app.uploadCSSDialog.getFolder(folder);
					app.uploadCSSDialog.open();
				}
			}, {
				key: "importJSAction",
				value: function importJSAction(folder) {
					app.uploadJsFileDialog.getFolder(folder);
					app.uploadJsFileDialog.open();
				}
			}, {
                key: "renameAudioAction",
                value: function renameAudioAction(item) {
                    var node = $(this.itemToDOM.get(item));
                    this.smartEditable.startEditing(node, true);
                }
            }, {
                key: "playAudioAction",
                value: function playAudioAction(item) {
                    /*var node = $(this.itemToDOM.get(item));
                    this.smartEditable.startEditing(node, true);
                    
                    console.log(item);
                    console.log(app.context);*/
                }
            }, {
                key: "renamePDFAction",
                value: function renamePDFAction(item) {
                    var node = $(this.itemToDOM.get(item));
                    this.smartEditable.startEditing(node, true);
                }
            }, {
                key: "renameResourceAction",
                value: function renameResourceAction(item) {
                    var node = $(this.itemToDOM.get(item));
                    this.smartEditable.startEditing(node, true)
                }
            }, {
                key: "duplicatePage",
                value: function duplicatePage(page) {
                    var folder = app.context.pages.findParentFolderForItem(page);
                    var newName = folder.generateUniqueFreeName(page.getNameWithoutExtension(), "html");
                    var clone = app.context.pages.createItem(newName, page.serialize());
                    app.context.scanTreeForLinkedComponents(clone.html.body);
                    this.genericResourceDuplicateAction(clone, "page", folder, "Duplicate Page")
                }
            }, {
                key: "duplicateCSS",
                value: function duplicateCSS(item) {
                    var folder = app.context.assets.css.findParentFolderForItem(item);
                    var type = item instanceof SCSSResource ? "scss" : "css";
                    var newName = folder.generateUniqueFreeName(item.getNameWithoutExtension(), type);
                    var clone = app.context.assets.css.createItem(newName, item.serialize(), type);
                    this.genericResourceDuplicateAction(clone, type, folder, type == "css" ? "Duplicate Stylesheet" : "Duplicate SASS")
                }
            }, {
                key: "duplicateJS",
                value: function duplicateJS(script) {
                    var folder = app.context.assets.js.findParentFolderForItem(script);
                    var newName = folder.generateUniqueFreeName(script.getNameWithoutExtension(), "js");
                    var clone = app.context.assets.js.createItem(newName, script.serialize());
                    this.genericResourceDuplicateAction(clone, "js", folder, "Duplicate Script")
                }
            }, {
                key: "genericResourceDuplicateAction",
                value: function genericResourceDuplicateAction(clone, type, collection, title) {
                    var op = collection.addOp(clone);
                    op["do"]();
                    app.trigger("resource-changed", type, "create", clone);
                    app.context.history.add({
                        name: title,
                        undo: function undo() {
                            op.undo();
                            app.trigger("resource-changed", type, "delete", clone)
                        },
                        redo: function redo() {
                            op["do"]();
                            app.trigger("resource-changed", type, "create", clone)
                        }
                    })
                }
            }, {
                key: "isResourceLinked",
                value: function isResourceLinked(res) {
                    return !!res.linked
                }
            }, {
                key: "canResourcePathBeCopied",
                value: function canResourcePathBeCopied(res) {
                    return !res.linked
                }
            }, {
                key: "canResourceBeOpened",
                value: function canResourceBeOpened(res) {
                    if (!res.canBeOpened) return false;
                    return !app.editorPanel.isBeingEdited(res)
                }
            }, {
                key: "canResourceBeRenamed",
                value: function canResourceBeRenamed(res) {
                    return res.canBeRenamed
                }
            }, {
                key: "canResourceBeDuplicated",
                value: function canResourceBeDuplicated(res) {
                    return res.canBeDuplicated
                }
            }, {
                key: "canPageBeOpened",
                value: function canPageBeOpened(page) {
                    return !page.isActive()
                }
            }, {
                key: "openPage",
                value: function openPage(page) {
                    if (page.isActive()) return;
                    app.activatePage(page)
                }
            }, {
                key: "dbClickPage",
                value: function dbClickPage(page) {
                    this.openPage(page)
                }
            }, {
                key: "dbClickCSS",
                value: function dbClickCSS(res) {
                    if (res.linked) {
                        return this.editLinkedCSS(res)
                    }
                    if (!res.canBeOpened) return false;
                    app.editorPanel.openForEditing(res)
                }
            }, {
                key: "dbClickJS",
                value: function dbClickJS(res) {
                    if (res.linked) {
                        return this.editLinkedJS(res)
                    }
                    if (!res.canBeOpened) return false;
                    app.editorPanel.openForEditing(res)
                }
            }, {
                key: "openResource",
                value: function openResource(res) {
                    if (!res.canBeOpened) return false;
                    app.editorPanel.openForEditing(res)
                }
            }, {
                key: "dbClickEditableResource",
                value: function dbClickEditableResource(res) {
                    this.openResource(res)
                }
            }, {
                key: "canConvertToSCSS",
                value: function canConvertToSCSS(res) {
                    if (res.linked || res instanceof SCSSResource) {
                        return false
                    }
                    return true
                }
            }, {
                key: "convertToSCSS",
                value: function convertToSCSS(res) {
                    var item = app.context.assets.css.createUniqueItem(res.parent, "scss");
                    item.value = res.toString();
                    var parent = app.context.assets.css.findParentFolderForItem(res);
                    var op1 = parent.removeOp(res);
                    var op2 = parent.addOp(item);
                    op1["do"]();
                    op2["do"]();
                    var newName = res.getName().replace(/\.css$/, ".scss");
                    if (parent.canItemBeRenamedTo(item, newName)) {
                        parent.renameOp(item, newName)["do"]()
                    }
                    app.trigger("resource-changed", "css", "convert", [res, item]);
                    app.context.history.add({
                        name: "Convert to SCSS",
                        undo: function undo() {
                            op2.undo();
                            op1.undo();
                            app.trigger("resource-changed", "css", "convert", [res, item])
                        },
                        redo: function redo() {
                            op1["do"]();
                            op2["do"]();
                            app.trigger("resource-changed", "css", "convert", [res, item])
                        }
                    })
                }
            }, {
                key: "canPageBeDeleted",
                value: function canPageBeDeleted(page) {
                    return app.context.pages.length > 1
                }
            }, {
                key: "pageDeleteAction",
                value: function pageDeleteAction(item) {
                    if (app.context.pages.length < 2) return;
                    item.html.body.unlinkAll();
                    this.genericResourceDeleteAction(item, "page", app.context.pages.getFolderForEntry(item), "Remove Page")
                }
            }, {
                key: "cssDeleteAction",
                value: function cssDeleteAction(item) {
                    var type = item instanceof SCSSResource ? "scss" : "css";
                    this.genericResourceDeleteAction(item, type, app.context.assets.css.getFolderForEntry(item), type == "css" ? "Remove Stylesheet" : "Remove SASS")
                }
            }, {
                key: "jsDeleteAction",
                value: function jsDeleteAction(item) {
                    this.genericResourceDeleteAction(item, "js", app.context.assets.js.getFolderForEntry(item), "Remove JS File")
                }
            }, {
                key: "imageDeleteAction",
                value: function imageDeleteAction(item) {
                    this.genericResourceDeleteAction(item, "image", app.context.assets.images.getFolderForEntry(item), "Remove Image Asset")
                }
            }, {
                key: "fontDeleteAction",
                value: function fontDeleteAction(item) {
                    this.genericResourceDeleteAction(item, "font", app.context.assets.fonts.getFolderForEntry(item), "Remove Font Asset")
                }
            }, {
                key: "folderDeleteAction",
                value: function folderDeleteAction(item) {
                    var type = this.getResourceCategoryName(item);
                    var op = item.parent.removeOp(item);
                    op["do"]();
                    app.trigger("resource-changed", type, "delete", item.getAll());
                    app.context.history.add({
                        name: "Remove Folder",
                        undo: function undo() {
                            op.undo();
                            app.trigger("resource-changed", type, "create", item.getAll())
                        },
                        redo: function redo() {
                            op["do"]();
                            app.trigger("resource-changed", type, "delete", item.getAll())
                        }
                    })
                }
            }, {
                key: "genericResourceDeleteAction",
                value: function genericResourceDeleteAction(item, type, parentFolder, title) {
                    var op = parentFolder.removeOp(item);
                    op["do"]();
                    app.trigger("resource-changed", type, "delete", item);
                    var dID = app.context.id;
                    var userID = app.user;
                    if(type == "audio")
                    {
                        $.post('../cogworks/main-tool-backend/remove/asset', {file: item.name, designID: dID, user: userID, asset: 'audio'}, function(data){
                            app.context.history.stackID += 1;
                            $("#menu").find(".save").toggleClass("active");
                            app.trigger("context-changed", app.context);
                        }).fail(function() {
                            cogworks.loadingScreen("alert","<p>Failed to delete " + item.name + ".</p><p>Report error ID: 052 to the admin if issue persist.</p>","show");
                        }).error(function() {
                            cogworks.loadingScreen("alert","<p>Failed to delete " + item.name + ".</p><p>Report error ID: 053 to the admin if issue persist.</p>","show");
                        });
                    }
                    else if(type == "pdf")
                    {
                        $.post('../cogworks/main-tool-backend/remove/asset', {file: item.name, designID: dID, user: userID, asset: 'pdf'}, function(data){
                            app.context.history.stackID += 1;
                            $("#menu").find(".save").toggleClass("active");
                            app.trigger("context-changed", app.context);
                        }).fail(function() {
                            cogworks.loadingScreen("alert","<p>Failed to delete " + item.name + ".</p><p>Report error ID: 054 to the admin if issue persist.</p>","show");
                        }).error(function() {
                            cogworks.loadingScreen("alert","<p>Failed to delete " + item.name + ".</p><p>Report error ID: 055 to the admin if issue persist.</p>","show");
                        });
                    }
                    else
                    {
                        app.context.history.add({
                            name: title,
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", type, "create", item)
                            },
                            redo: function redo() {
                                op["do"]();
                                app.trigger("resource-changed", type, "delete", item)
                            }
                        })
                    }
                }
            }, {
                key: "pageProperties",
                value: function pageProperties(page) {
                    app.pagePropertiesDialog.open({
                        placeholder: app.context.name,
                        page: page,
                        onSave: function onSave(props, meta) {
                            var oldProperties = page.properties;
                            var oldMeta = page.meta;
                            var newProperties = Object.assign({}, page.properties, props);
                            var newMeta = meta;
                            page.setProperties(newProperties);
                            page.meta = newMeta;
                            app.trigger("resource-changed", "page", "edit", page);
                            app.context.history.add({
                                name: "Page Properties Changed",
                                undo: function undo() {
                                    page.setProperties(oldProperties);
                                    page.meta = oldMeta;
                                    app.trigger("resource-changed", "page", "edit", page)
                                },
                                redo: function redo() {
                                    page.setProperties(newProperties);
                                    page.meta = newMeta;
                                    app.trigger("resource-changed", "page", "edit", page)
                                }
                            })
                        }
                    })
                }
            }, {
                key: "saveAction",
                value: function saveAction(item, newName) {
                    var title = "",
                        parentFolder = null,
                        type = "";
                    if (item instanceof TreeFolder) {
                        type = "folder";
                        title = "Rename Folder";
                        parentFolder = item.parent
                    } else if (app.context.pages.contains(item)) {
                        type = "page";
                        title = "Rename Page";
                        parentFolder = app.context.pages.findParentFolderForItem(item)
                    } else if (app.context.assets.css.contains(item)) {
                        type = "css";
                        title = "Rename Stylesheet";
                        parentFolder = app.context.assets.css.findParentFolderForItem(item)
                    } else if (app.context.assets.js.contains(item)) {
                        type = "js";
                        title = "Rename JS File";
                        parentFolder = app.context.assets.js.findParentFolderForItem(item)
                    } else if (app.context.assets.images.contains(item)) {
                        type = "image";
                        title = "Rename Image";
                        parentFolder = app.context.assets.images.findParentFolderForItem(item)
                    } else if (app.context.assets.audio.contains(item)) {
                        type = "audio";
                        title = "Rename Audio";
                        parentFolder = app.context.assets.audio.findParentFolderForItem(item)
                    } else if (app.context.assets.pdf.contains(item)) {
                        type = "pdf";
                        title = "Rename PDF";
                        parentFolder = app.context.assets.pdf.findParentFolderForItem(item)
                    }
                    if (!parentFolder) return;
                    if (!parentFolder.canItemBeRenamedTo(item, newName)) {
                        return false
                    }
                    var op = parentFolder.renameOp(item, newName);
                    var context = app.context;
                    item.update(context);
                    if (type == "folder") {
                        this.updateOverridesForFolder(item)
                    }
                    op["do"]();
                    app.trigger("resource-changed", type, "edit", item);
                    if(type != "audio" || type != "pdf")
                    {
                        var that = this;
                        app.context.history.add({
                            name: title,
                            undo: function undo() {
                                op.undo();
                                item.update(context);
                                if (type == "folder") {
                                    that.updateOverridesForFolder(item)
                                }
                                app.trigger("resource-changed", type, "edit", item)
                            },
                            redo: function redo() {
                                op["do"]();
                                item.update(context);
                                if (type == "folder") {
                                    that.updateOverridesForFolder(item)
                                }
                                app.trigger("resource-changed", type, "edit", item)
                            }
                        })
                    }
                }
            }, {
                key: "importHTMLFilesByPaths",
                value: function importHTMLFilesByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var pages = [];
                    var operations = [];
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;
                    try {
                        for (var _iterator12 = paths[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var path = _step12.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            if (ext != "html" && ext != "htm") continue;
                            //operations.push(electron.readFile(path));
                            operations.push(app.htmlContentRead);
                            var name = Resource.sanitizeName(parsed.basename.replace(/.html?$/, ""));
                            name = folder.generateUniqueFreeName(name, "html", pages.map(function(p) {
                                return p.getName()
                            }));
                            pages.push(app.context.pages.createItem(name))
                        }
                    } catch (err) {
                        _didIteratorError12 = true;
                        _iteratorError12 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
                                _iterator12["return"]()
                            }
                        } finally {
                            if (_didIteratorError12) {
                                throw _iteratorError12
                            }
                        }
                    }
                    if (!pages.length) return;
                    Promise.all(operations).then(function(operations) {
                        for (var i = 0; i < operations.length; i++) {
                            var parser = new DOMParser;
                            var doc = parser.parseFromString(operations[i], "text/html");
                            var content = doc.querySelector("body").innerHTML.trim();
                            var code = new CustomCode;
                            code.initialize(content);
                            pages[i].html.body.insertLast(code);
                            if (doc.title) {
                                pages[i].setProperties({
                                    title: doc.title
                                })
                            }
                        }
                        var op = folder.addOp(pages);
                        op["do"]();
                        app.trigger("resource-changed", "page", "create", pages);
                        app.context.history.add({
                            name: "Page Import",
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", "page", "delete", pages)
                            },
                            redo: function redo() {
                                op["do"]();
                                app.trigger("resource-changed", "page", "create", pages)
                            }
                        });
                        /*app.notifications.create({
                            title: pages.length == 1 ? "A html page was imported" : pages.length + " html pages were imported",
                            description: "You can see " + (pages.length == 1 ? "it" : "them") + " in the Design panel."
                        }).show()*/
                    })["catch"](function(err) {
                        app.notifications.create({
                            type: "error",
                            title: "Can't import page",
                            description: "An error occured while importing."
                        }).show();
                        console.error(err)
                    })
                    
                    //$("#upload-html-file-dialog .button.htmlCancel").trigger("click");
					app.uploadHTMLFileDialog.removeHTML(paths[0]);
					folder.expanded = true;
                    //app.getPanel("design").instantExpandCategory("Pages")
                }
            }, {
                key: "importStylesheetsByPaths",
                value: function importStylesheetsByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var stylesheets = [];
                    var operations = [];
                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;
                    try {
                        for (var _iterator13 = paths[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                            var path = _step13.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            if (ext == "css") {
                                operations.push(app.cssContentRead);
                                var name = Resource.sanitizeName(parsed.basename);
                                name = folder.generateUniqueFreeName(name.replace(/\.css$/, ""), "css", stylesheets.map(function(s) {
                                    return s.getName()
                                }));
                                stylesheets.push(app.context.assets.css.createItem(name))
                            }
                            if (ext == "scss") {
                                operations.push(electron.readFile(path));
                                var name = Resource.sanitizeName(parsed.basename);
                                name = folder.generateUniqueFreeName(name.replace(/\.scss$/, ""), "scss", stylesheets.map(function(s) {
                                    return s.getName()
                                }));
                                stylesheets.push(app.context.assets.css.createItem(name, null, "scss"))
                            }
                        }
                    } catch (err) {
                        _didIteratorError13 = true;
                        _iteratorError13 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
                                _iterator13["return"]()
                            }
                        } finally {
                            if (_didIteratorError13) {
                                throw _iteratorError13
                            }
                        }
                    }
                    if (!stylesheets.length) return;
                    Promise.all(operations).then(function(operations) {
                        for (var i = 0; i < stylesheets.length; i++) {
                            if (stylesheets[i] instanceof SCSSResource) {
                                stylesheets[i].value = operations[i]
                            } else {
                                stylesheets[i].addCSSBlocksAtIndex(parseCSS(operations[i]), 0)
                            }
                        }
                        var op = folder.addOp(stylesheets);
                        op["do"]();
                        app.trigger("resource-changed", "css", "create", stylesheets);
                        app.context.history.add({
                            name: "Stylesheet Import",
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", "css", "delete", stylesheets)
                            },
                            redo: function redo() {
                                op["do"]();
                                app.trigger("resource-changed", "css", "create", stylesheets)
                            }
                        });
                        /*app.notifications.create({
                            title: stylesheets.length == 1 ? "A stylesheet was imported" : stylesheets.length + " stylesheets were imported",
                            description: "You can see " + (stylesheets.length == 1 ? "it" : "them") + " in the Design panel."
                        }).show()*/
                    })["catch"](function(err) {
                        app.notifications.create({
                            type: "error",
                            title: "Stylesheet Import Failed",
                            description: "Click to learn more.",
                            action: function action(notif) {
                                app.openURLInBrowser("https://cogworks.io/tutorials/importing-css#errors");
                                notif.hide()
                            },
                            timeout: 8e3
                        }).show();
                        console.error(err)
                    });
                    
                    //$("#upload-css-dialog .button.cancel").trigger("click");
                    app.uploadCSSDialog.removeCSS(paths[0]);
                    folder.expanded = true;
                    //app.getPanel("design").instantExpandCategory("Styles")
                }
            }, {
                key: "importJSFilesByPaths",
                value: function importJSFilesByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var js = [];
                    var operations = [];
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;
                    try {
                        for (var _iterator14 = paths[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var path = _step14.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            if (ext != "js") continue;
                            operations.push(app.jsContentRead);
                            var name = Resource.sanitizeName(parsed.basename);
                            name = folder.generateUniqueFreeName(name.replace(/\.js$/, ""), "js", js.map(function(j) {
                                return j.getName()
                            }));
                            js.push(app.context.assets.js.createItem(name))
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
                                _iterator14["return"]()
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14
                            }
                        }
                    }
                    if (!js.length) return;
                    Promise.all(operations).then(function(operations) {
                        for (var i = 0; i < js.length; i++) {
                            js[i].value = operations[i]
                        }
                        var op = folder.addOp(js);
                        op["do"]();
                        app.trigger("resource-changed", "js", "create", js);
                        app.context.history.add({
                            name: "JS Import",
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", "js", "delete", js)
                            },
                            redo: function redo() {
                                op["do"]();
                                app.trigger("resource-changed", "js", "create", js)
                            }
                        });
                        /*app.notifications.create({
                            title: js.length == 1 ? "A JavaScript file was imported" : js.length + " JavaScript files were imported",
                            description: "You can see " + (js.length == 1 ? "it" : "them") + " in the Design panel."
                        }).show()*/
                    })["catch"](function(err) {
                        app.notifications.create({
                            type: "error",
                            title: "Can't import JavaScript",
                            description: "An error occured while importing."
                        }).show();
                        console.error(err)
                    });
                    
                    //$("#upload-js-file-dialog .button.jsCancel").trigger("click");
					app.uploadJsFileDialog.removeJs(paths[0]);
					folder.expanded = true;
                    //app.getPanel("design").instantExpandCategory("JavaScript")
                }
            }, {
                key: "importAudioFilesByPaths",
                value: function importAudioFilesByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var audio = [];
                    var operations = [];
                    var _iteratorNormalCompletion141 = true;
                    var _didIteratorError141 = false;
                    var _iteratorError141 = undefined;
                    try {
                        for (var _iterator141 = paths[Symbol.iterator](), _step141; !(_iteratorNormalCompletion141 = (_step141 = _iterator141.next()).done); _iteratorNormalCompletion141 = true) {
                            var path = _step141.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            if (ext != "mp3") continue;
                            operations.push(app.audioContentRead);
                            var name = Resource.sanitizeName(parsed.basename);
                            name = folder.generateUniqueFreeName(name.replace(/\.mp3$/, ""), "mp3", audio.map(function(j) {
                                return j.getName()
                            }));
                            audio.push(app.context.assets.audio.createItem(name, "mp3"))
                        }
                    } catch (err) {
                        _didIteratorError141 = true;
                        _iteratorError141 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion141 && _iterator141["return"]) {
                                _iterator141["return"]()
                            }
                        } finally {
                            if (_didIteratorError141) {
                                throw _iteratorError141
                            }
                        }
                    }
                    if (!audio.length) return;
                    Promise.all(operations).then(function(operations) {
                        for (var i = 0; i < audio.length; i++) {
                            audio[i].value = operations[i]
                        }
                        var op = folder.addOp(audio);
                        op["do"]();
                        app.trigger("resource-changed", "audio", "create", audio);
                        app.context.history.stackID += 1;
                        $("#menu").find(".save").toggleClass("active");
                        app.trigger("context-changed", app.context);
                        /*app.notifications.create({
                            title: audio.length == 1 ? "A Audio file was imported" : audio.length + " Audio files were imported",
                            description: "You can see " + (audio.length == 1 ? "it" : "them") + " in the Design panel."
                        }).show()*/
                    })["catch"](function(err) {
                        app.notifications.create({
                            type: "error",
                            title: "Can't import Audio",
                            description: "An error occured while importing."
                        }).show();
                        console.error(err)
                    });
                    
					folder.expanded = true;
                }
            }, {
                key: "importPDFFilesByPaths",
                value: function importPDFFilesByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var pdf = [];
                    var operations = [];
                    var _iteratorNormalCompletion142 = true;
                    var _didIteratorError142 = false;
                    var _iteratorError142 = undefined;
                    try {
                        for (var _iterator142 = paths[Symbol.iterator](), _step142; !(_iteratorNormalCompletion142 = (_step142 = _iterator142.next()).done); _iteratorNormalCompletion142 = true) {
                            var path = _step142.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            if (ext != "pdf") continue;
                            operations.push(app.pdfContentRead);
                            var name = Resource.sanitizeName(parsed.basename);
                            name = folder.generateUniqueFreeName(name.replace(/\.pdf$/, ""), "pdf", pdf.map(function(j) {
                                return j.getName()
                            }));
                            pdf.push(app.context.assets.pdf.createItem(name, "pdf"))
                        }
                    } catch (err) {
                        _didIteratorError142 = true;
                        _iteratorError142 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion142 && _iterator142["return"]) {
                                _iterator142["return"]()
                            }
                        } finally {
                            if (_didIteratorError142) {
                                throw _iteratorError142
                            }
                        }
                    }
                    if (!pdf.length) return;
                    Promise.all(operations).then(function(operations) {
                        for (var i = 0; i < pdf.length; i++) {
                            pdf[i].value = operations[i]
                        }
                        var op = folder.addOp(pdf);
                        op["do"]();
                        app.trigger("resource-changed", "pdf", "create", pdf);
                        app.context.history.stackID += 1;
                        $("#menu").find(".save").toggleClass("active");
                        app.trigger("context-changed", app.context);
                        /*app.notifications.create({
                            title: pdf.length == 1 ? "A PDF file was imported" : audio.length + " PDF files were imported",
                            description: "You can see " + (pdf.length == 1 ? "it" : "them") + " in the Design panel."
                        }).show()*/
                    })["catch"](function(err) {
                        app.notifications.create({
                            type: "error",
                            title: "Can't import PDF",
                            description: "An error occured while importing."
                        }).show();
                        console.error(err)
                    });
                    
					folder.expanded = true;
                }
            }, {
                key: "importImagesByPaths",
                value: function importImagesByPaths(paths, folder) {
                    if (!Array.isArray(paths)) return;
                    var images = [];
                    var operations = [];
                    var duplicates = [];
                    var numberToImport = 0;
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;
                    try {
                        for (var _iterator15 = paths[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var path = _step15.value;
                            var parsed = parsePath(path);
                            var ext = parsed.extname.toLowerCase().replace(".", "");
                            var name = Resource.sanitizeName(parsed.basename);
                            if (name.toLowerCase() == ext) {
                                name = "image." + ext
                            }
                            var type = mimeTypes[ext];
                            if (!type) {
                                continue
                            }
                            if (folder.hasEntry(name)) {
                                duplicates.push(name)
                            }
                            numberToImport++
                        }
                    } catch (err) {
                        _didIteratorError15 = true;
                        _iteratorError15 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
                                _iterator15["return"]()
                            }
                        } finally {
                            if (_didIteratorError15) {
                                throw _iteratorError15
                            }
                        }
                    }
                    if (duplicates.length) {
                        if (app.settings.imageOverwrite) {
                            removeDuplicateImages()
                        } else if (app.settings.imageOverwrite == null) {
                            var message = "Some of the images you are importing already exist in your library. Would you like to replace them?";
                            if (duplicates.length == 1) {
                                if (numberToImport == 1) {
                                    message = "There already is an image in your library with this name. Would you like to replace it?"
                                } else {
                                    message = "One of the images you are importing already exists in your library. Would you like to replace it?"
                                }
                            }
                            app.choiceDialog.open({
                                title: "Replace Image" + (duplicates.length > 1 ? "s" : "") + "?",
                                message: message,
                                remember: false,
                                choices: [{
                                    name: "Replace",
                                    value: "replace"
                                }, {
                                    name: "Keep",
                                    value: "keep"
                                }],
                                onChoice: function onChoice(choice, remember) {
                                    if (remember) {
                                        app.settings.imageOverwrite = choice == "replace"
                                    }
                                    if (choice == "replace") {
                                        removeDuplicateImages()
                                    }
                                    processImages()
                                }
                            });
                            return
                        }
                    }
                    processImages();

                    function removeDuplicateImages() {
                        var items = [];
                        var _iteratorNormalCompletion16 = true;
                        var _didIteratorError16 = false;
                        var _iteratorError16 = undefined;
                        try {
                            for (var _iterator16 = duplicates[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                var dup = _step16.value;
                                var tmp = folder.get(dup);
                                if (tmp) items.push(tmp)
                            }
                        } catch (err) {
                            _didIteratorError16 = true;
                            _iteratorError16 = err
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
                                    _iterator16["return"]()
                                }
                            } finally {
                                if (_didIteratorError16) {
                                    throw _iteratorError16
                                }
                            }
                        }
                        if (!items.length) {
                            return
                        }
                        var op = folder.removeOp(items);
                        op["do"]();
                        app.trigger("resource-changed", "image", "delete", items);
                        app.context.history.add({
                            name: "Remove Duplicate Images",
                            undo: function undo() {
                                op.undo();
                                app.trigger("resource-changed", "image", "create", items)
                            },
                            redo: function redo() {
                                op["do"]();
                                app.trigger("resource-changed", "image", "delete", items)
                            }
                        })
                    }

                    function processImages() {
                        var _iteratorNormalCompletion17 = true;
                        var _didIteratorError17 = false;
                        var _iteratorError17 = undefined;
                        try {
                            for (var _iterator17 = paths[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                                var path = _step17.value;
                                var parsed = parsePath(path);
                                var ext = parsed.extname.toLowerCase().replace(".", "");
                                var type = mimeTypes[ext];
                                if (!type) {
                                    continue
                                }
                                operations.push(app.imageContentRead);
                                var name = Resource.sanitizeName(parsed.basename);
                                if (name.toLowerCase() == ext) {
                                    name = "image." + ext
                                }
                                name = folder.generateUniqueFreeName(name.slice(0, -(ext.length + 1)), ext, images.map(function(i) {
                                    return i.getName()
                                }));
                                var img = app.context.assets.images.createItem(name, ext);
                                img.timestamp = Date.now();
                                img.fileSize = electron.getFileSize(path);
                                images.push(img)
                            }
                        } catch (err) {
                            _didIteratorError17 = true;
                            _iteratorError17 = err
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
                                    _iterator17["return"]()
                                }
                            } finally {
                                if (_didIteratorError17) {
                                    throw _iteratorError17
                                }
                            }
                        }
                        Promise.all(operations).then(function(operations) {
                            for (var i = 0; i < images.length; i++) {
                                images[i].data = "data:" + mimeTypes[images[i].extension] + ";base64," + operations[i]
                            }
                            if (!images.length) return;
                            var op = folder.addOp(images);
                            op["do"]();
                            app.trigger("resource-changed", "image", "create", images);
                            app.context.history.add({
                                name: "Image Import",
                                undo: function undo() {
                                    op.undo();
                                    app.trigger("resource-changed", "image", "delete", images)
                                },
                                redo: function redo() {
                                    op["do"]();
                                    app.trigger("resource-changed", "image", "create", images)
                                }
                            });
                            /*app.notifications.create({
                                title: images.length == 1 ? "An image was imported" : images.length + " images were imported",
                                description: "You can see " + (images.length == 1 ? "it" : "them") + " in the Design panel."
                            }).show()*/
                        })["catch"](function(err) {
                            app.notifications.create({
                                type: "error",
                                title: "Can't Import Image",
                                description: "An error occured while importing."
                            }).show();
                            console.error(err)
                        });
                        
                        //$("#upload-image-file-dialog .button.imageCancel").trigger("click");
                        app.uploadImageFileDialog.removeImage(paths[0]);
                        folder.expanded = true;
                        //app.getPanel("design").instantExpandCategory("Images")
                    }
                }
            }, {
                key: "renderAssetCategory",
                value: function renderAssetCategory(def) {
                    var fragment = document.createDocumentFragment();
                    var tmp = document.createElement("span");
                    tmp.className = "asset-group";
                    var b = document.createElement("b");
                    b.className = "name";
                    b.appendChild(document.createTextNode(def.name));
                    var i = document.createElement("i");
                    tmp.appendChild(i);
                    tmp.appendChild(b);
                    fragment.appendChild(tmp);
                    var groupsHolder = document.createElement("div");
                    groupsHolder.className = "subtree " + def.name.toLowerCase() + "-group";
                    var tree = undefined;
                    var _iteratorNormalCompletion18 = true;
                    var _didIteratorError18 = false;
                    var _iteratorError18 = undefined;
                    try {
                        for (var _iterator18 = def.groups[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                            var g = _step18.value;
                            tree = callFuncArray(g.tree);
                            groupsHolder.appendChild(this.renderAssetTree(tree, g, def));
                            var _iteratorNormalCompletion19 = true;
                            var _didIteratorError19 = false;
                            var _iteratorError19 = undefined;
                            try {
                                for (var _iterator19 = tree.getAllFolders()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                    var folder = _step19.value;
                                    if (folder.expanded) {
                                        this.instantExpandFolder(folder)
                                    }
                                }
                            } catch (err) {
                                _didIteratorError19 = true;
                                _iteratorError19 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
                                        _iterator19["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError19) {
                                        throw _iteratorError19
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError18 = true;
                        _iteratorError18 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
                                _iterator18["return"]()
                            }
                        } finally {
                            if (_didIteratorError18) {
                                throw _iteratorError18
                            }
                        }
                    }
                    fragment.appendChild(groupsHolder);
                    this.domToCategory.set(tmp, def);
                    return fragment
                }
            }, {
                key: "renderAssetTree",
                value: function renderAssetTree(tree, group, def) {
                    if (!tree.children.length) {
                        return document.createDocumentFragment()
                    }
                    var groupElem = document.createElement("div");
                    groupElem.className = "subtree";
                    var multiSelect = null;
                    if (this.hasMultipleSelectionForTree(tree.getGroup())) {
                        multiSelect = this.getMultipleSelectionForTree(tree.getGroup())
                    }
                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;
                    try {
                        for (var _iterator20 = tree.children[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var child = _step20.value;
                            var item = document.createElement("span");
                            if (child instanceof TreeFolder) {
                                item.className = "asset-folder smart-editable";
                                var b = document.createElement("b");
                                b.className = "name";
                                b.title = child.getName();
                                b.appendChild(document.createTextNode(child.getName()));
                                if (multiSelect && multiSelect.isItemSelected(child)) {
                                    b.classList.add("selected")
                                }
                                var i = document.createElement("i");
                                item.appendChild(i);
                                item.appendChild(b);
                                var t = document.createElement("input");
                                t.type = "text";
                                item.appendChild(t);
                                groupElem.appendChild(item);
                                groupElem.appendChild(this.renderAssetTree(child, group, def))
                            } else {
                                var wrapper = child;
                                child = child.item;
                                item.className = "asset-item smart-editable";
                                var _b = document.createElement("b");
                                var icon = document.createElement("u");
                                icon.classList.add("icon");
                                item.appendChild(icon);
                                if (!multiSelect && child instanceof Page && child.isActive()) {
                                    _b.classList.add("active")
                                }
                                if (multiSelect && multiSelect.isItemSelected(wrapper)) {
                                    _b.classList.add("selected")
                                }
                                var container = document.createElement("div");
                                container.classList.add("name-container");
                                var n = document.createElement("a");
                                n.className = "name";
                                n.dataset.editable = 1;
                                n.textContent = child.getNameWithoutExtension();
                                n.title = child.getName();
                                container.append(n);
                                if (child.extension) {
                                    var ext = document.createElement("em");
                                    ext.appendChild(document.createTextNode("." + child.extension));
                                    container.appendChild(ext)
                                }
                                _b.appendChild(container);
                                item.appendChild(_b);
                                if (group.locked) {
                                    item.className += " locked";
                                    var l = document.createElement("u");
                                    l.className = "material-icons lock";
                                    l.textContent = "lock_outline";
                                    item.appendChild(l)
                                }
                                groupElem.appendChild(item)
                            }
                            this.domToItem.set(item, child);
                            this.itemToDOM.set(child, item);
                            this.itemToCategory.set(child, def);
                            this.domToCategory.set(item, def);
                            this.domToGroup.set(item, group)
                        }
                    } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
                                _iterator20["return"]()
                            }
                        } finally {
                            if (_didIteratorError20) {
                                throw _iteratorError20
                            }
                        }
                    }
                    return groupElem
                }
            }, {
                key: "expandContractCategory",
                value: function expandContractCategory(name) {
                    var status = app.context.uiState[name];
                    if (status) {
                        this.contractCategory(name)
                    } else {
                        this.expandCategory(name)
                    }
                }
            }, {
                key: "expandCategory",
                value: function expandCategory(name) {
                    var subtree = this.element.find("." + name.toLowerCase() + "-group");
                    subtree.slideDown("fast");
                    subtree.prev(".asset-group").find("i").addClass("down");
                    app.context.uiState[name] = true
                }
            }, {
                key: "instantExpandCategory",
                value: function instantExpandCategory(name) {
                    var subtree = this.element.find("." + name.toLowerCase() + "-group");
                    subtree.show();
                    subtree.prev(".asset-group").find("i").addClass("down");
                    app.context.uiState[name] = true
                }
            }, {
                key: "contractCategory",
                value: function contractCategory(name) {
                    var subtree = this.element.find("." + name.toLowerCase() + "-group");
                    subtree.slideUp("fast");
                    subtree.prev(".asset-group").find("i").removeClass("down");
                    app.context.uiState[name] = false
                }
            }, {
                key: "expandContractFolder",
                value: function expandContractFolder(folder) {
                    if (folder.expanded) {
                        this.contractFolder(folder)
                    } else {
                        this.expandFolder(folder)
                    }
                }
            }, {
                key: "expandFolder",
                value: function expandFolder(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").slideDown("fast");
                    span.find("i").addClass("down");
                    folder.expanded = true
                }
            }, {
                key: "instantExpandFolder",
                value: function instantExpandFolder(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").show();
                    span.find("i").addClass("down");
                    folder.expanded = true
                }
            }, {
                key: "contractFolder",
                value: function contractFolder(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").slideUp("fast");
                    span.find("i").removeClass("down");
                    folder.expanded = false
                }
            }, {
                key: "generateMoveToOptions",
                value: function generateMoveToOptions(items, group) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var allFolders = group.generatePossibleMoveTargets(items);
                    var parentFolders = items.map(function(i) {
                        return group.getFolderForEntry(i)
                    });
                    var that = this;
                    var options = [];
                    var categoryName = this.getResourceCategoryName(items[0]);
                    var _iteratorNormalCompletion21 = true;
                    var _didIteratorError21 = false;
                    var _iteratorError21 = undefined;
                    try {
                        for (var _iterator21 = allFolders[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                            var folder = _step21.value;
                            options.push({
                                name: "/" + folder.getRelativePath(group),
                                action: function(folder) {
                                    if (items.length > 1) {
                                        var _iteratorNormalCompletion22 = true;
                                        var _didIteratorError22 = false;
                                        var _iteratorError22 = undefined;
                                        try {
                                            for (var _iterator22 = items[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                                                var item = _step22.value;
                                                var name = item.getName();
                                                if (folder.hasEntry(name)) {
                                                    app.alertDialog.open({
                                                        title: "Unable to Move",
                                                        message: 'The target folder already contains an item named "' + name.slice(0, 40) + '".'
                                                    });
                                                    return
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError22 = true;
                                            _iteratorError22 = err
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
                                                    _iterator22["return"]()
                                                }
                                            } finally {
                                                if (_didIteratorError22) {
                                                    throw _iteratorError22
                                                }
                                            }
                                        }
                                    } else {
                                        var name = items[0].getName();
                                        if (group == app.context.pages && folder.hasEntry(name) && folder.getEntry(name) instanceof TreeFolder && group.getAll().length == folder.getEntry(name).getAll().length) {
                                            app.alertDialog.open({
                                                title: "Unable to Move",
                                                message: "The target folder already contains a folder with this name."
                                            });
                                            return
                                        }
                                        if (folder.hasEntry(name)) {
                                            app.confirmDialog.open({
                                                title: "Replace Item",
                                                message: 'The target folder already contains an item named "' + name + '". Do you want to replace it?',
                                                okButton: "Replace",
                                                onOK: function onOK() {
                                                    var originalItem = folder.get(name);
                                                    var op1 = folder.removeOp(folder.getEntry(name));
                                                    var op2 = group.moveOp(items[0], folder);
                                                    op1["do"]();
                                                    op2["do"]();
                                                    that.updateOverridesForFolder(folder);
                                                    app.trigger("resource-changed", categoryName, "move", items[0]);
                                                    if (originalItem) {
                                                        app.trigger("resource-changed", categoryName, "delete", originalItem)
                                                    }
                                                    app.context.history.add({
                                                        name: "Move Item",
                                                        undo: function undo() {
                                                            op1.undo();
                                                            op2.undo();
                                                            parentFolders[0].ensureChildUniqueName(items[0]);
                                                            that.updateOverridesForFolder(parentFolders[0]);
                                                            app.trigger("resource-changed", categoryName, "move", items[0]);
                                                            if (originalItem) {
                                                                app.trigger("resource-changed", categoryName, "create", originalItem)
                                                            }
                                                        },
                                                        redo: function redo() {
                                                            op1["do"]();
                                                            op2["do"]();
                                                            folder.ensureChildUniqueName(items[0]);
                                                            that.updateOverridesForFolder(folder);
                                                            app.trigger("resource-changed", categoryName, "move", items[0]);
                                                            if (originalItem) {
                                                                app.trigger("resource-changed", categoryName, "delete", originalItem)
                                                            }
                                                        }
                                                    })
                                                }
                                            });
                                            return
                                        }
                                    }
                                    var ops = items.map(function(i) {
                                        return group.moveOp(i, folder)
                                    });
                                    ops.forEach(function(op) {
                                        return op["do"]()
                                    });
                                    that.updateOverridesForFolder(folder);
                                    app.trigger("resource-changed", categoryName, "move", items);
                                    app.context.history.add({
                                        name: "Move Item" + (items.length != 1 ? "s" : ""),
                                        undo: function undo() {
                                            ops.forEach(function(op) {
                                                return op.undo()
                                            });
                                            for (var i = 0; i < items.length; i++) {
                                                parentFolders[i].ensureChildUniqueName(items[i]);
                                                that.updateOverridesForFolder(parentFolders[i])
                                            }
                                            app.trigger("resource-changed", categoryName, "move", items)
                                        },
                                        redo: function redo() {
                                            ops.forEach(function(op) {
                                                return op["do"]()
                                            });
                                            for (var i = 0; i < items.length; i++) {
                                                folder.ensureChildUniqueName(items[i])
                                            }
                                            that.updateOverridesForFolder(folder);
                                            app.trigger("resource-changed", categoryName, "move", items)
                                        }
                                    })
                                }.bind(this, folder)
                            })
                        }
                    } catch (err) {
                        _didIteratorError21 = true;
                        _iteratorError21 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
                                _iterator21["return"]()
                            }
                        } finally {
                            if (_didIteratorError21) {
                                throw _iteratorError21
                            }
                        }
                    }
                    options.push({
                        name: "New Folder",
                        action: function action() {
                            var folder = parentFolders[0].createFolder();
                            folder.name = parentFolders[0].generateUniqueFreeName("New Folder");
                            folder.expanded = true;
                            that.editResourceAfterUpdate = folder;
                            var createFolderOp = parentFolders[0].addOp(folder);
                            createFolderOp["do"]();
                            var moveOps = items.map(function(i) {
                                return group.moveOp(i, folder)
                            });
                            moveOps.forEach(function(op) {
                                return op["do"]()
                            });
                            that.updateOverridesForFolder(folder);
                            app.trigger("resource-changed", categoryName, "move", items);
                            app.context.history.add({
                                name: "Create Folder And Move",
                                undo: function undo() {
                                    moveOps.forEach(function(op) {
                                        return op.undo()
                                    });
                                    createFolderOp.undo();
                                    that.updateOverridesForFolder(parentFolders[0]);
                                    app.trigger("resource-changed", categoryName, "move", items)
                                },
                                redo: function redo() {
                                    createFolderOp["do"]();
                                    moveOps.forEach(function(op) {
                                        return op["do"]()
                                    });
                                    parentFolders[0].ensureChildUniqueName(folder);
                                    that.updateOverridesForFolder(folder);
                                    app.trigger("resource-changed", categoryName, "move", items)
                                }
                            })
                        }
                    });
                    return options
                }
            }, {
                key: "generateCopyToOptions",
                value: function generateCopyToOptions(items, group) {
                    if (!Array.isArray(items)) {
                        items = [items]
                    }
                    var ImageResourceTreeGroup = require("../tree/ImageResourceTreeGroup");
                    var PageResourceTreeGroup = require("../tree/PageResourceTreeGroup");
                    var FontResourceTreeGroup = require("../tree/FontResourceTreeGroup");
                    var CSSResourceTreeGroup = require("../tree/CSSResourceTreeGroup");
                    var JSResourceTreeGroup = require("../tree/JSResourceTreeGroup");
                    if (group instanceof ImageResourceTreeGroup) {
                        return this.imageCopyToOptions(items)
                    }
                    if (group instanceof PageResourceTreeGroup) {
                        return this.pageCopyToOptions(items)
                    }
                    if (group instanceof FontResourceTreeGroup) {
                        return this.fontCopyToOptions(items)
                    }
                    if (group instanceof CSSResourceTreeGroup) {
                        return this.cssCopyToOptions(items)
                    }
                    if (group instanceof JSResourceTreeGroup) {
                        return this.jsCopyToOptions(items)
                    }
                }
            }, {
                key: "updateOverridesForFolder",
                value: function updateOverridesForFolder(folder) {
                    folder.getAll().forEach(function(i) {
                        return i.updateOverride(app.context)
                    })
                }
            }, {
                key: "getResourceCategoryName",
                value: function getResourceCategoryName(res) {
                    if (app.context.pages.contains(res)) return "page";
                    if (app.context.assets.css.contains(res)) return "css";
                    if (app.context.assets.js.contains(res)) return "js";
                    if (app.context.assets.images.contains(res)) return "image";
                    if (app.context.assets.fonts.contains(res)) return "font";
                    if (app.context.assets.audio.contains(res)) return "audio";
                    if (app.context.assets.pdf.contains(res)) return "pdf";
                    return null
                }
            }, {
                key: "buildPanelContent",
                value: function buildPanelContent() {
                    if (!app.context) return;
                    var fragment = document.createDocumentFragment();
                    var _iteratorNormalCompletion23 = true;
                    var _didIteratorError23 = false;
                    var _iteratorError23 = undefined;
                    try {
                        for (var _iterator23 = this.assetCategories[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                            var c = _step23.value;
                            var cat = this.renderAssetCategory(c);
                            fragment.appendChild(cat)
                        }
                    } catch (err) {
                        _didIteratorError23 = true;
                        _iteratorError23 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
                                _iterator23["return"]()
                            }
                        } finally {
                            if (_didIteratorError23) {
                                throw _iteratorError23
                            }
                        }
                    }
                    this.scrollable.html(fragment);
                    for (var c in app.context.uiState) {
                        if (app.context.uiState[c] === true) {
                            this.instantExpandCategory(c)
                        }
                    }
                    if (this.editResourceAfterUpdate) {
                        var category = this.itemToCategory.get(this.editResourceAfterUpdate);
                        this.instantExpandCategory(category.name);
                        this.renameResourceAction(this.editResourceAfterUpdate);
                        this.editResourceAfterUpdate = null
                    }
                }
            }]);
            return DesignPanel
        }(Panel);
        module.exports = DesignPanel
    }, {
        "../base/Page": 23,
        "../base/Tooltip": 28,
        "../components/base/CustomCode": 42,
        "../config/mime-types": 370,
        "../helpers/callFuncArray": 546,
        "../helpers/isContextClick": 584,
        "../helpers/isSelectionClick": 585,
        "../helpers/multipleTreeSelection": 589,
        "../helpers/parseCSS": 593,
        "../helpers/parsePath": 595,
        "../helpers/smartEditableElement": 614,
        "../resources/Resource": 1256,
        "../resources/SCSSResource": 1257,
        "../tree/CSSResourceTreeGroup": 1258,
        "../tree/FontResourceTreeGroup": 1260,
        "../tree/ImageResourceTreeGroup": 1261,
        "../tree/JSResourceTreeGroup": 1262,
        "../tree/PageResourceTreeGroup": 1266,
        "../tree/TreeFolder": 1271,
        "./Panel": 1234,
        "prettier-bytes": 1126
    }]
});
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
        var _get = function get(_x6, _x7, _x8) {
            var _again = true;
            _function: while (_again) {
                var object = _x6,
                    property = _x7,
                    receiver = _x8;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x6 = parent;
                        _x7 = property;
                        _x8 = receiver;
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
        var Panel = require("./Panel.js");
        var filter = require("./fuzzaldrin").filter;
        var smartEditableElement = require("../helpers/smartEditableElement");
        var enforceFileExtension = require("../helpers/enforceFileExtension");
        var parsePath = require("../helpers/parsePath");
        var isContextClick = require("../helpers/isContextClick");
        var isSelectionClick = require("../helpers/isSelectionClick");
        var linkify = require("../helpers/linkify");
        var PackageTreeGroup = require("../tree/PackageTreeGroup");
        var TreeFolder = require("../tree/TreeFolder");
        var TreeWrapper = require("../tree/TreeWrapper");
        var Package = require("../packages/Package");
        var UserPackage = require("../packages/UserPackage");
        var DownloadedPackage = require("../packages/DownloadedPackage");
        var LibraryPackage = require("../packages/LibraryPackage");
        var Tooltip = require("../base/Tooltip");
        var OnlineResult = require("./OnlineResult");
        var ComponentPanel = function(_Panel) {
            _inherits(ComponentPanel, _Panel);

            function ComponentPanel() {
                var _this = this;
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                _classCallCheck(this, ComponentPanel);
                _get(Object.getPrototypeOf(ComponentPanel.prototype), "constructor", this).call(this, options);
                this.element.addClass("tree-holder component-panel");
                this.supportsMultiSelection = true;
                this.domToItem = new WeakMap;
                this.domToGroup = new WeakMap;
                this.itemToDOM = new WeakMap;
                this.content.prepend('<div class="search">\n\t\t\t\t<form autocomplete="off"><input type="search" required placeholder="Search components" autocomplete="off"/></form>\n\t\t\t\t<i class="material-icons search-icon">search</i>\n\t\t\t</div>\n\t\t\t');
                this.suggestedHolder = $('<div class="suggested">\n\t\t\t\t<hr>\n\t\t\t\t<div class="name"><span>Suggested</span> <span class="collapse"></span></div>\n\t\t\t\t<div class="suggested-list"></div>\n\t\t\t</div>\n\t\t\t');
                this.content.append(this.suggestedHolder);
                this.editAfterUpdate = null;
                this.uiGroup = null;
                this.searchString = "";
                this.searchInput = this.element.find(".search input");
                this.suggestedComponents = [];
                this.pendingScrollToItem = null;
                this.shouldFocusSearchInput = false;
                this.smartEditable = smartEditableElement({
                    element: this.element,
                    onStartEdit: this.startSmartEdit.bind(this),
                    onStopEdit: this.stopSmartEdit.bind(this),
                    onCommit: this.componentEdit.bind(this),
                    onDelete: this.componentDelete.bind(this)
                });
                this.tooltip = new Tooltip({
                    class: "component-tooltip",
                    showDelayTime: 500,
                    hideDelayTime: 100
                });
                var self = this;
                app.on("framework-switched", function() {
                    self.scheduleUpdate()
                });
                app.on("context-activated component-selected component-unselected", function() {
                    self.suggestedComponents = [];
                    console.log(app.context.page);
                    if (app.context.page.hasFocusedComponent()) {
                        self.suggestedComponents = app.context.page.getFocusedComponent().constructor.suggestedComponents || []
                    }
                    self.scheduleSuggestedUpdate();
                });
                app.on("package-tree-changed", function(op) {
                    var items = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
                    if ((op == "delete" || op == "uninstall") && items[0] == self.pendingScrollToItem) {
                        self.removeBadge();
                        self.pendingScrollToItem = null;
                        self.container.scheduleUpdate()
                    }
                });
                app.on("component-search-changed", this.onSearchChanged.bind(this));
                app.on("component-suggested-expansion", function(expand) {
                    _this.suggestedHolder.toggleClass("collapsed", !expand)
                });
                this.panelReady()
            }
            _createClass(ComponentPanel, [{
                key: "bindEventListeners",
                value: function bindEventListeners() {
                    _get(Object.getPrototypeOf(ComponentPanel.prototype), "bindEventListeners", this).call(this);
                    this.element.off(".component-panel");
                    this.element.on("input.component-panel", ".search input", this.onSearch.bind(this));
                    this.element.on("mousedown.component-panel", ".item", this.mousedown.bind(this));
                    this.element.on("mouseup.component-panel", ".item, .item-folder", this.mouseup.bind(this));
                    this.element.on("mouseenter.component-panel", ".item", this.mouseenter.bind(this));
                    this.element.on("mouseleave.component-panel", ".item", this.mouseleave.bind(this));
                    this.element.on("click.component-panel", ".item-folder", this.groupNameClick.bind(this));
                    this.element.on("click.component-panel", ".suggested .name", this.suggestedToggle.bind(this))
                }
            }, {
                key: "activate",
                value: function activate() {
                    _get(Object.getPrototypeOf(ComponentPanel.prototype), "activate", this).call(this);
                    this.shouldFocusSearchInput = true
                }
            }, {
                key: "dragStart",
                value: function dragStart(components) {
                    this.smartEditable.focusout()
                }
            }, {
                key: "groupNameClick",
                value: function groupNameClick(e) {
                    if (isContextClick(e)) return;
                    if (e.target.closest(".item-folder").classList.contains("editing")) {
                        return
                    }
                    var folder = this.domToItem.get(e.target.closest(".item-folder"));
                    if (isSelectionClick(e)) {
                        var tree = null;
                        if (app.userPackages.contains(folder)) {
                            tree = app.userPackages
                        } else if (app.downloadedPackages.contains(folder)) {
                            tree = app.downloadedPackages
                        }
                        if (tree) {
                            if (!this.hasMultipleSelectionForTree(tree)) {
                                this.clearSelections()
                            }
                            var multiSelect = this.getMultipleSelectionForTree(tree);
                            multiSelect.click(folder, e);
                            this.update();
                            return
                        }
                    }
                    this.expandContract(folder)
                }
            }, {
                key: "isSearching",
                value: function isSearching() {
                    return this.searchString.trim().length > 0
                }
            }, {
                key: "clearSearch",
                value: function clearSearch() {
                    this.searchString = "";
                    this.searchInput.val("")
                }
            }, {
                key: "scheduleHighlightItem",
                value: function scheduleHighlightItem(item) {
                    setTimeout(function() {
                        if (this.isActive()) {
                            if (this.isSearching()) {
                                this.clearSearch();
                                this.update()
                            }
                            this.highlightItem(item)
                        } else {
                            this.showBadge();
                            this.pendingScrollToItem = item;
                            this.container.scheduleUpdate()
                        }
                    }.bind(this), 100)
                }
            }, {
                key: "highlightItem",
                value: function highlightItem(item) {
                    var elem = this.itemToDOM.get(item);
                    if (!elem) return;
                    var wrapper = null;
                    if (app.userPackages.contains(item)) {
                        wrapper = app.userPackages.findWrapperForItemRecursive(item)
                    } else if (app.downloadedPackages.contains(item)) {
                        wrapper = app.downloadedPackages.findWrapperForItemRecursive(item)
                    }
                    if (wrapper) {
                        this.expandAllToItem(wrapper)
                    }
                    var newScrollTop = Math.max(elem.offsetTop - this.scrollable.height() / 2 + 18, 0);
                    this.scrollable.animate({
                        scrollTop: newScrollTop
                    }, 300, highlightComponent);
                    this.storeScrollPosition();

                    function highlightComponent() {
                        elem.classList.add("highlighted");
                        setTimeout(function() {
                            elem.classList.remove("highlighted")
                        }, 2e3)
                    }
                }
            }, {
                key: "startSmartEdit",
                value: function startSmartEdit() {
                    this.tooltip.disable()
                }
            }, {
                key: "stopSmartEdit",
                value: function stopSmartEdit() {
                    this.tooltip.enable()
                }
            }, {
                key: "componentEdit",
                value: function componentEdit(elem, newName) {
                    var that = this;
                    if (!newName.trim().length) {
                        return false
                    }
                    var item = this.domToItem.get(elem[0]);
                    if (item instanceof TreeFolder) {
                        var parentFolder = item.parent;
                        if (!parentFolder) return;
                        if (!parentFolder.canItemBeRenamedTo(item, newName)) {
                            return
                        }
                        var op = parentFolder.renameOp(item, newName);
                        op["do"]();
                        app.trigger("package-tree-changed", "rename", [item], parentFolder);
                        app.context.history.add({
                            name: "Rename Folder",
                            undo: function undo() {
                                op.undo();
                                parentFolder.ensureChildUniqueName(item);
                                app.trigger("package-tree-changed", "rename", [item], parentFolder)
                            },
                            redo: function redo() {
                                op["do"]();
                                parentFolder.ensureChildUniqueName(item);
                                app.trigger("package-tree-changed", "rename", [item], parentFolder)
                            }
                        })
                    } else {
                        var group = this.domToGroup.get(elem[0]);
                        var parentFolder = group.getFolderForEntry(item);
                        if (!parentFolder) return;
                        if (!parentFolder.canItemBeRenamedTo(item, newName)) {
                            return
                        }
                        var op = parentFolder.renameOp(item, newName);
                        op["do"]();
                        app.trigger("package-tree-changed", "rename", [item]);
                        app.context.history.add({
                            name: "Rename Component",
                            undo: function undo() {
                                op.undo();
                                parentFolder.ensureChildUniqueName(item);
                                app.trigger("package-tree-changed", "rename", [item])
                            },
                            redo: function redo() {
                                op["do"]();
                                parentFolder.ensureChildUniqueName(item);
                                app.trigger("package-tree-changed", "rename", [item])
                            }
                        })
                    }
                }
            }, {
                key: "componentDelete",
                value: function componentDelete(elem) {
                    var item = this.domToItem.get(elem[0]);
                    var group = this.domToGroup.get(elem[0]);
                    var parentFolder = group.getFolderForEntry(item);
                    if (!parentFolder) return;
                    var op = parentFolder.removeOp(item);
                    op["do"]();
                    app.trigger("package-tree-changed", "delete", [item]);
                    app.context.history.add({
                        name: "Delete Component",
                        undo: function undo() {
                            op.undo();
                            parentFolder.ensureChildUniqueName(item);
                            app.trigger("package-tree-changed", "create", [item])
                        },
                        redo: function redo() {
                            op["do"]();
                            app.trigger("package-tree-changed", "delete", [item])
                        }
                    })
                }
            }, {
                key: "multipleDeleteAction",
                value: function multipleDeleteAction(items, tree) {
                    var allItems = [];
                    var ops = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;
                            ops.push(tree.getFolderForEntry(item).removeOp(item));
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
                    app.trigger("package-tree-changed", "delete", allItems);
                    app.context.history.add({
                        name: "Delete Component" + (allItems.length != 1 ? "s" : ""),
                        undo: function undo() {
                            ops.forEach(function(op) {
                                return op.undo()
                            });
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;
                            try {
                                for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var item = _step2.value;
                                    tree.getFolderForEntry(item).ensureChildUniqueName(item)
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
                            app.trigger("package-tree-changed", "create", allItems)
                        },
                        redo: function redo() {
                            ops.forEach(function(op) {
                                return op["do"]()
                            });
                            app.trigger("package-tree-changed", "delete", allItems)
                        }
                    })
                }
            }, {
                key: "hasMultipleSelection",
                value: function hasMultipleSelection() {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;
                    try {
                        for (var _iterator3 = app.framework.getComponentGroups()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var group = _step3.value;
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
                    return false
                }
            }, {
                key: "scheduleSuggestedUpdate",
                value: function scheduleSuggestedUpdate() {
                    clearTimeout(this._suggestedUpdateTimeout);
                    var that = this;
                    this._suggestedUpdateTimeout = setTimeout(function() {
                        that.updateSuggested();
                        //that.updatePodsList();
                    }, 30)
                }
            }, {
                key: "onSearchChanged",
                value: function onSearchChanged(searchString) {
                    this.searchString = searchString
                }
            }, {
                key: "onSearch",
                value: function onSearch(e) {
                    if (this.searchString === e.currentTarget.value) return;
                    app.trigger("component-search-changed", e.currentTarget.value);
                    this.scheduleUpdate(100);
                    this.clearSelections()
                }
            }, {
                key: "mouseup",
                value: function mouseup(e) {
                    if (!isContextClick(e)) return;
                    var item = this.domToItem.get(e.target.closest("span"));
                    var pos = app.mousePosition;
                    var options = [];
                    var editable = $(e.target).closest(".smart-editable");
                    var that = this;
                    var userCreated = false;
                    var targetGroup = null;
                    var moveEntry = null;
                    if (app.userPackages.contains(item)) {
                        userCreated = true;
                        targetGroup = app.userPackages
                    } else if (app.downloadedPackages.contains(item)) {
                        userCreated = true;
                        targetGroup = app.downloadedPackages
                    }
                    if (userCreated) {
                        var selection = null;
                        if (this.hasMultipleSelectionForTree(targetGroup)) {
                            selection = this.getMultipleSelectionForTree(targetGroup)
                        }
                        var wrapper = item;
                        if (!(item instanceof TreeFolder)) {
                            wrapper = targetGroup.findWrapperForItemRecursive(item)
                        }
                        if (selection && selection.isItemSelected(wrapper) && selection.getSelectionCount() > 1) {
                            app.contextMenu.show(pos.x, pos.y, this.generateMultipleSelectionOptions(item, selection, targetGroup));
                            return
                        }
                        var allFolders = targetGroup.generatePossibleMoveTargets(item);
                        var parentFolder = targetGroup.getFolderForEntry(item);
                        moveEntry = {
                            name: "Move to Folder",
                            options: [],
                            visible: function visible() {
                                return !that.isSearching()
                            }
                        };
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;
                        try {
                            for (var _iterator4 = allFolders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var folder = _step4.value;
                                moveEntry.options.push({
                                    name: "/" + folder.getRelativePath(targetGroup),
                                    action: function(folder) {
                                        if (folder.hasEntry(item.getName())) {
                                            app.confirmDialog.open({
                                                title: "Replace Item",
                                                message: 'The target folder already contains an item named "' + item.getName() + '". Do you want to replace it?',
                                                okButton: "Replace",
                                                onOK: function onOK() {
                                                    var op1 = folder.removeOp(folder.getEntry(item.getName()));
                                                    var op2 = targetGroup.moveOp(item, folder);
                                                    op1["do"]();
                                                    op2["do"]();
                                                    app.trigger("package-tree-changed", "move", [item], parentFolder, folder);
                                                    app.context.history.add({
                                                        name: "Move Item",
                                                        undo: function undo() {
                                                            op1.undo();
                                                            op2.undo();
                                                            parentFolder.ensureChildUniqueName(item);
                                                            app.trigger("package-tree-changed", "move", [item], parentFolder, folder)
                                                        },
                                                        redo: function redo() {
                                                            op1["do"]();
                                                            op2["do"]();
                                                            folder.ensureChildUniqueName(item);
                                                            app.trigger("package-tree-changed", "move", [item], parentFolder, folder)
                                                        }
                                                    })
                                                }
                                            });
                                            return
                                        }
                                        var op = targetGroup.moveOp(item, folder);
                                        op["do"]();
                                        app.trigger("package-tree-changed", "move", [item], parentFolder, folder);
                                        app.context.history.add({
                                            name: "Move Item",
                                            undo: function undo() {
                                                op.undo();
                                                parentFolder.ensureChildUniqueName(item);
                                                app.trigger("package-tree-changed", "move", [item], parentFolder, folder)
                                            },
                                            redo: function redo() {
                                                op["do"]();
                                                folder.ensureChildUniqueName(item);
                                                app.trigger("package-tree-changed", "move", [item], parentFolder, folder)
                                            }
                                        })
                                    }.bind(this, folder)
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
                        moveEntry.options.push({
                            name: "New Folder",
                            action: function action() {
                                var folder = parentFolder.createFolder();
                                folder.name = parentFolder.generateUniqueFreeName("New Folder");
                                folder.expanded = true;
                                that.editAfterUpdate = folder;
                                var op1 = parentFolder.addOp(folder);
                                op1["do"]();
                                var op2 = targetGroup.moveOp(item, folder);
                                op2["do"]();
                                app.trigger("package-tree-changed", "create", [folder]);
                                app.context.history.add({
                                    name: "Create Folder And Move",
                                    undo: function undo() {
                                        op1.undo();
                                        op2.undo();
                                        app.trigger("package-tree-changed", "delete", [folder])
                                    },
                                    redo: function redo() {
                                        op1["do"]();
                                        op2["do"]();
                                        parentFolder.ensureChildUniqueName(folder);
                                        app.trigger("package-tree-changed", "create", [folder])
                                    }
                                })
                            }
                        })
                    }
                    if (item instanceof TreeFolder) {
                        if (item == app.userPackages || item == app.downloadedPackages || userCreated) {
                            options.push({
                                name: "Create Folder",
                                action: function action() {
                                    var folder = item.createFolder();
                                    folder.name = item.generateUniqueFreeName("New Folder");
                                    var op = item.addOp(folder);
                                    op["do"]();
                                    app.trigger("package-tree-changed", "create", [folder], item);
                                    that.editAfterUpdate = folder;
                                    app.context.history.add({
                                        name: "Create Folder",
                                        undo: function undo() {
                                            op.undo();
                                            app.trigger("package-tree-changed", "delete", [folder], item)
                                        },
                                        redo: function redo() {
                                            op["do"]();
                                            item.ensureChildUniqueName(folder);
                                            app.trigger("package-tree-changed", "create", [folder], item)
                                        }
                                    })
                                }
                            })
                        }
                        if (userCreated) {
                            options.push({
                                name: "Rename",
                                action: function action() {
                                    that.smartEditable.startEditing(editable, true)
                                }
                            })
                        }
                        if (item == app.userPackages) {
                            options.push({
                                name: "Import",
                                action: function action() {
                                    app.openPackageDialog()
                                }
                            })
                        }
                        if (item == app.userPackages || app.userPackages.contains(item)) {
                            options.push({
                                name: "Export",
                                action: function action(ev) {
                                    electron.showFileOpenDialog({
                                        title: "Export Destination",
                                        properties: ["openDirectory", "createDirectory"],
                                        defaultPath: electron.readSetting("lastDesignPath") ? electron.readSetting("lastDesignPath") + electron.pathSeparator : ""
                                    }, function(path) {
                                        if (!Array.isArray(path)) return;
                                        var wrappers = item.getAllWrappers();
                                        var packages = wrappers.map(function(wrapper) {
                                            return wrapper.item
                                        });
                                        var paths = [];
                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;
                                        try {
                                            for (var _iterator5 = wrappers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                var wrapper = _step5.value;
                                                paths.push(path[0] + electron.pathSeparator + wrapper.getRelativePath(item));
                                                electron.mkdirSync(parsePath(paths[paths.length - 1]).dirname)
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
                                        that.exportPackagesToDisk(packages, paths, electron.development && ev.ctrlKey);
                                        electron.saveSetting("lastDesignPath", path[0])
                                    })
                                }
                            })
                        }
                        if (userCreated) {
                            options.push(moveEntry);
                            options.push({
                                name: "Delete",
                                action: function action() {
                                    var parentFolder = item.parent;
                                    var op = parentFolder.removeOp(item);
                                    op["do"]();
                                    app.trigger("package-tree-changed", "delete", [item], parentFolder);
                                    app.context.history.add({
                                        name: "Delete Folder",
                                        undo: function undo() {
                                            op.undo();
                                            parentFolder.ensureChildUniqueName(item);
                                            app.trigger("package-tree-changed", "create", [item], parentFolder)
                                        },
                                        redo: function redo() {
                                            op["do"]();
                                            app.trigger("package-tree-changed", "delete", [item], parentFolder)
                                        }
                                    })
                                }
                            })
                        }
                    } else if (item instanceof OnlineResult) {
                        return
                    } else {
                        var targetComponent = app.getFocusedComponent() || app.context.page.html.body;
                        options.push({
                            name: "Insert Into " + targetComponent.getName(),
                            action: this.insertComponentInto.bind(this, item, targetComponent),
                            disabled: !item.canBeInsertedIn(targetComponent)
                        });
                        if (item instanceof UserPackage || item instanceof DownloadedPackage) {
                            options.push({
                                name: "Rename",
                                action: function action() {
                                    that.smartEditable.startEditing(editable, true)
                                }
                            });
                            if (item instanceof UserPackage) {
                                options.push({
                                    name: "Export",
                                    action: function action(e) {
                                        electron.showFileSaveDialog({
                                            title: "Export Component",
                                            defaultPath: (electron.readSetting("lastDesignPath") ? electron.readSetting("lastDesignPath") + electron.pathSeparator : "") + item.getSanitizedName() + ".epod",
                                            filters: [{
                                                name: "Cogworks Component (.epod)",
                                                extensions: ["epod"]
                                            }]
                                        }, function(path) {
                                            if (!path) return;
                                            that.exportPackagesToDisk(item, path, electron.development && e.ctrlKey);
                                            electron.saveSetting("lastDesignPath", parsePath(path).dirname)
                                        })
                                    }
                                }, {
                                    name: "Share Online..",
                                    action: function action() {
                                        app.shareComponentDialog.open({
                                            package: item
                                        })
                                    }
                                })
                            }
                            options.push(moveEntry);
                            options.push({
                                name: "Delete",
                                action: function action() {
                                    that.smartEditable["delete"](editable)
                                }
                            })
                        }
                    }
                    // app.contextMenu.show(pos.x, pos.y, options)
                }
            }, {
                key: "mousedown",
                value: function mousedown(e) {
                    var toolButton = $(e.currentTarget),
                        offset = toolButton.offset();
                    if (toolButton.hasClass("editing")) return;
                    e.preventDefault();
                    var item = this.domToItem.get(e.target.closest("span"));
                    if (isContextClick(e) || e.button > 0) {
                        return
                    }
                    var packageTree = null;
                    if (app.userPackages.contains(item)) {
                        packageTree = app.userPackages
                    } else if (app.downloadedPackages.contains(item)) {
                        packageTree = app.downloadedPackages
                    }
                    if (isSelectionClick(e) && !this.isSearching() && (item instanceof UserPackage || item instanceof DownloadedPackage)) {
                        if (!this.hasMultipleSelectionForTree(packageTree)) {
                            this.clearSelections()
                        }
                        var multiSelect = this.getMultipleSelectionForTree(packageTree);
                        multiSelect.click(packageTree.findWrapperForItemRecursive(item), e);
                        this.update();
                        return
                    }
                    if (item instanceof OnlineResult) {
                        if (item.existsLocally()) {
                            item = item.getLocalCopy()
                        } else {
                            return
                        }
                    }
                    if (!item) return;
                    if (packageTree && this.hasMultipleSelectionForTree(packageTree) && this.getMultipleSelectionForTree(packageTree).isItemSelected(packageTree.findWrapperForItemRecursive(item))) {
                        return
                    }
                    if (!item.canCreate(app.context.page)) {
                        return
                    }
                    var elem = item.create(app.context.page);
                    if (!elem) {
                        return
                    }
                    app.dragStart({
                        components: [elem],
                        historyTitle: "Add " + item.getName(),
                        origin: {
                            top: offset.top,
                            left: offset.left,
                            width: toolButton.outerWidth(),
                            height: toolButton.outerHeight()
                        },
                        operation: item.insertOp(elem),
                        afterDrop: function afterDrop() {
                            if (item instanceof Package && item.framework != app.framework) {
                                app.notifications.create({
                                    title: "Component was converted to Cog " + app.framework.version,
                                    timeout: 5e3
                                }).show()
                            }
                        }
                    })
                }
            }, {
                key: "mouseenter",
                value: function mouseenter(e) {
                    var target = e.target.closest(".item");
                    var item = this.domToItem.get(target);
                    if (!item) return;
                    var rect = target.getBoundingClientRect();
                    var to = null;
                    this.tooltip.showDelay(target, {
                        x: rect.left,
                        y: rect.top + rect.height / 2,
                        position: "left",
                        render: this.renderComponentTooltip.bind(this),
                        interactive: item instanceof Package || item instanceof OnlineResult,
                        activate: function activate() {
                            to = setTimeout(function() {
                                target.classList.add("highlight")
                            }, 120)
                        },
                        deactivate: function deactivate() {
                            clearTimeout(to);
                            target.classList.remove("highlight")
                        }
                    })
                }
            }, {
                key: "mouseleave",
                value: function mouseleave(e) {
                    this.tooltip.hideDelay()
                }
            }, {
                key: "exportPackagesToDisk",
                value: function exportPackagesToDisk(packages, paths) {
                    var toLibrary = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                    if (!Array.isArray(packages)) {
                        packages = [packages]
                    }
                    if (!Array.isArray(paths)) {
                        paths = [paths]
                    }
                    var ops = [];
                    for (var i = 0; i < packages.length; i++) {
                        var pkg = packages[i];
                        var path = paths[i];
                        if (toLibrary) {
                            pkg = pkg.toLibraryPackage()
                        }
                        path = enforceFileExtension(path, "epod");
                        ops.push(electron.writeFile(path, pkg.stringify({
                            stripPreview: true
                        }), "gzip"))
                    }
                    Promise.all(ops)["catch"](function(e) {
                        app.alertDialog.open({
                            title: "Can't Write",
                            message: "An error occured and the file couldn't be written."
                        });
                        console.error(e)
                    })
                }
            }, {
                key: "generateMultipleSelectionOptions",
                value: function generateMultipleSelectionOptions(item, selection, targetGroup) {
                    var options = [];
                    var that = this;
                    var flatSelection = selection.getFlatSelection().map(function(i) {
                        return i instanceof TreeFolder ? i : i.item
                    });
                    var allFolders = targetGroup.generatePossibleMoveTargets(flatSelection);
                    var parentFolders = flatSelection.map(function(i) {
                        return targetGroup.getFolderForEntry(i)
                    });
                    var moveEntry = {
                        name: "Move to Folder",
                        options: [],
                        visible: function visible() {
                            return !that.isSearching()
                        }
                    };
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;
                    try {
                        for (var _iterator6 = allFolders[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var folder = _step6.value;
                            moveEntry.options.push({
                                name: "/" + folder.getRelativePath(targetGroup),
                                action: function(folder) {
                                    var _iteratorNormalCompletion8 = true;
                                    var _didIteratorError8 = false;
                                    var _iteratorError8 = undefined;
                                    try {
                                        for (var _iterator8 = flatSelection[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                            var _item = _step8.value;
                                            var name = _item.getName();
                                            if (folder.hasEntry(name)) {
                                                app.alertDialog.open({
                                                    title: "Unable to Move",
                                                    message: 'The target folder already contains an item named "' + name.slice(0, 40) + '".'
                                                });
                                                return
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
                                    var ops = flatSelection.map(function(i) {
                                        return targetGroup.moveOp(i, folder)
                                    });
                                    ops.forEach(function(op) {
                                        return op["do"]()
                                    });
                                    app.trigger("package-tree-changed", "move", flatSelection, folder.parent, folder);
                                    app.context.history.add({
                                        name: "Move Items",
                                        undo: function undo() {
                                            ops.forEach(function(op) {
                                                return op.undo()
                                            });
                                            for (var i = 0; i < flatSelection.length; i++) {
                                                parentFolders[i].ensureChildUniqueName(flatSelection[i])
                                            }
                                            app.trigger("package-tree-changed", "move", flatSelection, folder.parent, folder)
                                        },
                                        redo: function redo() {
                                            ops.forEach(function(op) {
                                                return op["do"]()
                                            });
                                            for (var i = 0; i < flatSelection.length; i++) {
                                                folder.ensureChildUniqueName(flatSelection[i])
                                            }
                                            app.trigger("package-tree-changed", "move", flatSelection, folder.parent, folder)
                                        }
                                    })
                                }.bind(this, folder)
                            })
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
                    moveEntry.options.push({
                        name: "New Folder",
                        action: function action() {
                            var folder = parentFolders[0].createFolder();
                            folder.name = parentFolders[0].generateUniqueFreeName("New Folder");
                            folder.expanded = true;
                            that.editAfterUpdate = folder;
                            var createFolderOp = parentFolders[0].addOp(folder);
                            createFolderOp["do"]();
                            var moveOps = flatSelection.map(function(i) {
                                return targetGroup.moveOp(i, folder)
                            });
                            moveOps.forEach(function(op) {
                                return op["do"]()
                            });
                            app.trigger("package-tree-changed", "create", [folder]);
                            app.context.history.add({
                                name: "Create Folder And Move",
                                undo: function undo() {
                                    moveOps.forEach(function(op) {
                                        return op.undo()
                                    });
                                    createFolderOp.undo();
                                    app.trigger("package-tree-changed", "delete", [folder])
                                },
                                redo: function redo() {
                                    createFolderOp["do"]();
                                    moveOps.forEach(function(op) {
                                        return op["do"]()
                                    });
                                    parentFolders[0].ensureChildUniqueName(folder);
                                    app.trigger("package-tree-changed", "create", [folder])
                                }
                            })
                        }
                    });
                    if (app.userPackages.contains(item)) {
                        options.push({
                            name: "Export",
                            action: function action(ev) {
                                electron.showFileOpenDialog({
                                    title: "Export Destination",
                                    properties: ["openDirectory", "createDirectory"],
                                    defaultPath: electron.readSetting("lastDesignPath") ? electron.readSetting("lastDesignPath") + electron.pathSeparator : ""
                                }, function(path) {
                                    if (!Array.isArray(path)) return;
                                    var paths = [];
                                    var wrappers = selection.getSelectedElements();
                                    var packages = wrappers.map(function(wrapper) {
                                        return wrapper.item
                                    });
                                    var commonParent = app.userPackages.findNearestCommonParent(packages);
                                    var _iteratorNormalCompletion7 = true;
                                    var _didIteratorError7 = false;
                                    var _iteratorError7 = undefined;
                                    try {
                                        for (var _iterator7 = wrappers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                            var wrapper = _step7.value;
                                            paths.push(path[0] + electron.pathSeparator + wrapper.getRelativePath(commonParent));
                                            electron.mkdirSync(parsePath(paths[paths.length - 1]).dirname)
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
                                    that.exportPackagesToDisk(packages, paths, electron.development && ev.ctrlKey);
                                    electron.saveSetting("lastDesignPath", path[0])
                                })
                            }
                        })
                    }
                    options.push(moveEntry, {
                        name: "Delete",
                        action: function action() {
                            that.multipleDeleteAction(flatSelection, targetGroup)
                        }
                    });
                    return options
                }
            }, {
                key: "installOnlineComponent",
                value: function installOnlineComponent(item) {
                    var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                    var that = this;
                    item.download(function(dpkg, err) {
                        if (!dpkg) {
                            var message = "An error occured while installing component.";
                            var description = "Make sure that you are connected to the internet and try again.";
                            if (err == "version") {
                                message = "This component can't be installed.";
                                description = "It has been created in a newer version of the app."
                            }
                            app.notifications.create({
                                title: message,
                                description: description,
                                timeout: 8e3,
                                type: "error"
                            }).show();
                            if (that.tooltip.isVisible()) {
                                that.tooltip.update();
                                that.tooltip.getTarget().classList.add("downloaded")
                            } else {
                                that.update()
                            }
                            return
                        }
                        if (app.downloadedPackages.hasID(dpkg.id)) {
                            that.update();
                            if (that.tooltip.isVisible()) {
                                that.tooltip.hide()
                            }
                            return
                        }
                        dpkg.name = app.downloadedPackages.generateUniqueFreeName(dpkg.name);
                        var op = app.downloadedPackages.addOp(dpkg);
                        op["do"]();
                        app.trigger("package-tree-changed", "download", [dpkg]);
                        if (that.tooltip.isVisible()) {
                            that.tooltip.update();
                            that.tooltip.getTarget().classList.add("downloaded")
                        } else {
                            that.update()
                        }
                        if (typeof cb == "function") {
                            cb()
                        }
                        app.context.history.add({
                            name: "Install Component",
                            undo: function undo() {
                                op.undo();
                                app.trigger("package-tree-changed", "delete", [dpkg])
                            },
                            redo: function redo() {
                                op["do"]();
                                app.downloadedPackages.ensureChildUniqueName(dpkg);
                                app.trigger("package-tree-changed", "create", [dpkg])
                            }
                        });
                        app.notifications.create({
                            title: "Component was installed.",
                            description: "You can now drag and drop it into the design.",
                            timeout: 8e3
                        }).show()
                    })
                }
            }, {
                key: "uninstallComponent",
                value: function uninstallComponent(item) {
                    var group = app.downloadedPackages;
                    var parentFolder = group.getFolderForEntry(item);
                    if (!parentFolder) return;
                    var op = parentFolder.removeOp(item);
                    op["do"]();
                    app.trigger("package-tree-changed", "uninstall", [item]);
                    app.context.history.add({
                        name: "Uninstall Component",
                        undo: function undo() {
                            op.undo();
                            parentFolder.ensureChildUniqueName(item);
                            app.trigger("package-tree-changed", "create", [item])
                        },
                        redo: function redo() {
                            op["do"]();
                            app.trigger("package-tree-changed", "uninstall", [item])
                        }
                    })
                }
            }, {
                key: "renderComponentTooltip",
                value: function renderComponentTooltip(target) {
                    var item = this.domToItem.get(target);
                    var that = this;
                    if (item instanceof OnlineResult || item instanceof DownloadedPackage) {
                        var tooltip = $('<div class="package-mode">\n\t\t\t\t<div class="preview">\n\t\t\t\t\t<div class="warning"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="header">\n\t\t\t\t\t<div class="vote">\n\t\t\t\t\t\t<div class="arrows">\n\t\t\t\t\t\t\t<div class="arrow up"></div>\n\t\t\t\t\t\t\t<div class="arrow down"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="count"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="title">\n\t\t\t\t\t\t<h2></h2>\n\t\t\t\t\t\t<div class="bs-version"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="author">\n\t\t\t\t\t\t<div class="name"></div>\n\t\t\t\t\t\t<div class="downloads"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="description"></div>\n\t\t\t\t<div class="compatibility-message"><i class="material-icons">warning</i>This component is not compatible with Bootstrap ' + app.framework.version + '</div>\n\t\t\t\t<div class="comments"><span class="count">0</span><span class="label">Comments</span></div>\n\t\t\t\t<div class="btn"></div>\n\t\t\t</div>');
                        var preview = tooltip.find(".preview");
                        if (item.preview) {
                            preview.css("background-image", "url(" + item.preview + ")").text("")
                        } else {
                            preview.css("background-image", "none").text("No preview available.")
                        }
                        tooltip.find(".title h2").text(item.getName()).attr("title", item.getName());
                        tooltip.find(".title .bs-version").text("Cog " + item.framework.version).attr("title", "Made with Bootstrap " + item.framework.version);
                        if (item.comments != null) {
                            tooltip.find(".comments .count").text(item.comments);
                            tooltip.find(".comments").on("click", function(e) {
                                app.componentDialog.open({
                                    componentID: item.id
                                });
                                that.tooltip.hide()
                            })
                        } else {
                            tooltip.find(".comments").remove()
                        }
                        tooltip.find(".compatibility-message").toggle(!item.framework.isCompatibleWith(app.framework));
                        var voteElem = tooltip.find(".vote");
                        if (item.votes == null) {
                            voteElem.remove()
                        } else {
                            voteElem.find(".count").text(item.votes);
                            if (item.can_vote) {
                                if (item.has_voted) {
                                    voteElem.addClass(item.has_voted > 0 ? "voted_up" : "voted_down")
                                }
                                voteElem.find(".arrow").on("click", function(e) {
                                    var isUp = $(e.target).is(".up");
                                    var isDown = !isUp;
                                    var vote = isUp ? 1 : -1;
                                    if (item.has_voted && (isUp && item.has_voted > 0 || isDown && item.has_voted < 0)) {
                                        $.post("/app/library/clear-vote", {
                                            id: item.id
                                        });
                                        item.has_voted = 0;
                                        item.votes -= vote
                                    } else {
                                        $.post("/app/library/vote", {
                                            id: item.id,
                                            vote: vote
                                        });
                                        if (item.has_voted) {
                                            item.votes -= item.has_voted
                                        }
                                        item.has_voted = vote;
                                        item.votes += vote
                                    }
                                    that.tooltip.update()
                                })
                            } else {
                                voteElem.addClass("readonly")
                            }
                        }
                        if (item.description) {
                            var descr = tooltip.find(".description");
                            descr.show().text(item.description);
                            descr.html(linkify(descr.html().replace(/\n/g, "<br>")));
                            descr.on("click", "a", function(e) {
                                e.preventDefault();
                                electron.openBrowserWindow(e.target.href)
                            })
                        }
                        var author = tooltip.find(".author");
                        author.find(".name").text(item.authorName);
                        author.on("click", function() {
                            that.tooltip.hide();
                            app.profileDialog.open({
                                profileID: item.authorID
                            })
                        });
                        var button = tooltip.find(".btn").show();
                        if (item instanceof DownloadedPackage) {
                            if (item.isOrphan()) {
                                author.remove()
                            }
                            button.addClass("uninstall").text("Uninstall");
                            button.on("click", function() {
                                that.uninstallComponent(item);
                                that.tooltip.hide()
                            })
                        } else {
                            if (item.isDownloading()) {
                                button.addClass("inactive").text("Installing")
                            } else if (item.existsLocally()) {
                                if (item.existsInDownloads()) {
                                    button.addClass("uninstall").text("Uninstall");
                                    button.on("click", function() {
                                        var component = app.downloadedPackages.getByID(item.id);
                                        that.uninstallComponent(component);
                                        that.tooltip.getTarget().classList.remove("downloaded");
                                        that.tooltip.update()
                                    })
                                } else {
                                    button.addClass("inactive").text("Installed")
                                }
                            } else {
                                button.addClass("install").text("Install");
                                button.on("click", function() {
                                    that.installOnlineComponent(item);
                                    that.tooltip.update()
                                })
                            }
                        }
                        var warning = tooltip.find(".warning");
                        return tooltip
                    } else if (item instanceof LibraryPackage) {
                        var tooltip = $('<div class="package-mode">\n\t\t\t\t<div class="preview"></div>\n\t\t\t\t<div class="title">\n\t\t\t\t\t<h2></h2>\n\t\t\t\t</div>\n\t\t\t\t<div class="description"></div>\n\t\t\t</div>');
                        tooltip.find(".title h2").text(item.getName());
                        if (item.description) {
                            tooltip.find(".description").html(item.description).show()
                        }
                        var previewElem = tooltip.find(".preview");
                        previewElem.css("background-image", "url(" + item.preview + ")");
                        if (item.darkPreview) {
                            previewElem.addClass("dark")
                        }
                        if (item.tallPreview) {
                            previewElem.addClass("tall")
                        }
                        return tooltip
                    } else if (item instanceof UserPackage) {
                        return $("<p>").html(item.getName())
                        /*var tooltip = $('<div class="package-mode shared">\n\t\t\t\t<div class="header">\n\t\t\t\t\t<div class="vote readonly">\n\t\t\t\t\t\t<div class="arrows">\n\t\t\t\t\t\t\t<div class="arrow up"></div>\n\t\t\t\t\t\t\t<div class="arrow down"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="count"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="title">\n\t\t\t\t\t\t<h2></h2>\n\t\t\t\t\t\t<div class="bs-version"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="secondary">\n\t\t\t\t\t\t<div class="status"></div>\n\t\t\t\t\t\t<div class="comments"><span class="count">0</span><span class="label">Comments</span></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="compatibility-message"><i class="material-icons">warning</i>This component is not compatible with Bootstrap ' + app.framework.version + "</div>\n\t\t\t\t</div>\n\t\t\t</div>");
                        tooltip.find(".title h2").text(item.getName());
                        tooltip.find(".title .bs-version").text("Cog " + item.framework.version).attr("title", "Made with Bootstrap " + item.framework.version);
                        tooltip.find(".compatibility-message").toggle(!item.framework.isCompatibleWith(app.framework));
                        if (item.isShared()) {
                            if (item.downloads != null) {
                                tooltip.find(".status").text("Shared · " + item.downloads + " Download" + (item.downloads != 1 ? "s" : ""))
                            } else {
                                tooltip.find(".status").text("Shared")
                            }
                            if (item.votes != null) {
                                tooltip.find(".vote .count").text(item.votes);
                                if (item.has_voted) {
                                    tooltip.find(".vote").addClass(item.has_voted > 0 ? "voted_up" : "voted_down")
                                }
                            } else {
                                tooltip.find(".vote").remove()
                            }
                        } else {
                            tooltip.find(".vote").remove()
                        }
                        if (item.isShared() && item.comments != null) {
                            tooltip.find(".comments .count").text(item.comments);
                            tooltip.find(".comments").on("click", function(e) {
                                app.componentDialog.open({
                                    componentID: item.id
                                });
                                that.tooltip.hide()
                            })
                        } else {
                            tooltip.find(".comments").remove()
                        }
                        if (item.preview === null) {
                            item.generatePreview(function(data) {
                                item.preview = data;
                                if (data) {
                                    var div = $('<div class="preview">');
                                    div.css("background-image", "url(" + data + ")");
                                    tooltip.prepend(div);
                                    that.tooltip.update()
                                } else {
                                    var div = $('<div class="preview">No preview available.</div>');
                                    tooltip.prepend(div);
                                    that.tooltip.update()
                                }
                                app.trigger("package-preview-updated", item)
                            })
                        } else if (item.preview) {
                            var div = $('<div class="preview"></div>');
                            div.css("background-image", "url(" + item.preview + ")");
                            tooltip.prepend(div);
                            if (item.canEditPreview) {
                                div.append('<span class="edit"><i class="material-icons">mode_edit</i></span>');
                                div.on("click", function() {
                                    that.tooltip.hide();
                                    app.editPackageScreenshotDialog.open({
                                        package: item,
                                        onSave: function onSave(data) {
                                            if (data.preview) {
                                                item.preview = data.preview
                                            }
                                            item.previewScale = data.scale;
                                            item.previewOffset = data.offset;
                                            app.trigger("package-preview-updated", item)
                                        }
                                    })
                                })
                            }
                        } else {
                            var div = $('<div class="preview">No preview available.</div>');
                            tooltip.prepend(div)
                        }
                        return tooltip*/
                    } else {
                        return $("<p>").html(item.description)
                    }
                }
            }, {
                key: "insertComponentInto",
                value: function insertComponentInto(item, parent) {
                    if (!item.canCreate(parent.page())) {
                        return
                    }
                    if (!item.canBeInsertedIn(parent)) {
                        return
                    }
                    var page = app.context.page;
                    var component = item.create(page);
                    if (!component) {
                        return
                    }
                    if (item instanceof Package && item.framework != parent.framework()) {
                        app.notifications.create({
                            title: "Component was converted to Cog " + parent.framework().version,
                            timeout: 5e3
                        }).show()
                    }
                    var op = item.insertOp(component);
                    parent.insertLast(component);
                    op["do"]();
                    page.update();
                    app.context.history.add({
                        name: "Add " + item.getName(),
                        undo: function undo() {
                            op.undo();
                            page.update()
                        },
                        redo: function redo() {
                            parent.insertLast(component);
                            op["do"]();
                            page.update()
                        }
                    })
                }
            }, {
                key: "buildPanelContent",
                value: function buildPanelContent() {
                    if (this.searchInput.val() !== this.searchString) {
                        this.searchInput.val(this.searchString)
                    }
                    this.updateSuggested();
                    this.updateComponents();
                    return this.element
                }
            }, {
                key: "suggestedToggle",
                value: function suggestedToggle() {
                    app.trigger("component-suggested-expansion", this.suggestedHolder.hasClass("collapsed"))
                }
            }, {
                key: "updateSuggested",
                value: function updateSuggested() {
                    var elem = this.element.find(".suggested-list").empty();
                    var build = [];
                    for (var i = 0; i < this.suggestedComponents.length; i++) {
                        build.push(this.renderComponent(app.framework.getComponent(this.suggestedComponents[i])))
                    }
                    elem.html(build);
                    this.suggestedHolder.toggle(build.length > 0)
                }
            }, {
                key: "updateComponents",
                value: function updateComponents() {}
            }, {
                key: "renderComponentFolder",
                value: function renderComponentFolder(group) {
                    var fragment = document.createDocumentFragment();
                    if (group instanceof PackageTreeGroup && !group.children.length) {
                        return fragment
                    }
                    var tmp = document.createElement("span");
                    tmp.className = "item-folder smart-editable";
                    var multiSelect = null;
                    if (this.hasMultipleSelectionForTree(group.getGroup())) {
                        multiSelect = this.getMultipleSelectionForTree(group.getGroup())
                    }
                    if (multiSelect && multiSelect.isItemSelected(group)) {
                        tmp.classList.add("selected")
                    }
                    var b = document.createElement("b");
                    b.className = "name";
                    b.title = group.name;
                    b.appendChild(document.createTextNode(group.name));
                    var i = document.createElement("i");
                    tmp.appendChild(i);
                    tmp.appendChild(b);
                    fragment.appendChild(tmp);
                    tmp.appendChild(document.createElement("input"));
                    var groupHolder = document.createElement("div");
                    groupHolder.className = "subtree";
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;
                    try {
                        for (var _iterator9 = group.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var child = _step9.value;
                            if (child instanceof TreeFolder) {
                                groupHolder.appendChild(this.renderComponentFolder(child))
                            } else if (child instanceof TreeWrapper) {
                                groupHolder.appendChild(this.renderComponent(child.item, group))
                            } else {
                                groupHolder.appendChild(this.renderComponent(child, group))
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
                    this.domToItem.set(tmp, group);
                    this.itemToDOM.set(group, tmp);
                    fragment.appendChild(groupHolder);
                    return fragment
                }
            }, {
                key: "renderComponent",
                value: function renderComponent(comp) {
                    var group = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                    var tmp;
                    var multiSelect = null;
                    if (group && this.hasMultipleSelectionForTree(group.getGroup())) {
                        multiSelect = this.getMultipleSelectionForTree(group.getGroup())
                    }
                    var framework = app.context.framework;
                    if (comp instanceof OnlineResult) {
                        tmp = $('<span class="item online smart-editable">' + "<u></u>" + '<b class="name"></b>' + '<input type="text" value="" />' + "</span>");
                        if (comp.existsLocally()) {
                            tmp.addClass("downloaded");
                            tmp.toggleClass("unavailable", !comp.framework.isCompatibleWith(framework))
                        }
                    } else if (comp instanceof DownloadedPackage) {
                        tmp = $('<span class="item downloaded smart-editable">' + "<u></u>" + '<b class="name"></b>' + '<input type="text" value="" />' + "</span>");
                        if (multiSelect && multiSelect.isItemSelected(app.downloadedPackages.findWrapperForItemRecursive(comp))) {
                            tmp.addClass("selected")
                        }
                        tmp.toggleClass("unavailable", !comp.framework.isCompatibleWith(framework))
                    } else if (comp instanceof UserPackage) {
                        tmp = $('<span class="item user smart-editable">' + "<u></u>" + '<b class="name"></b>' + '<input type="text" value="" />' + "</span>");
                        if (comp.isShared()) {
                            tmp.addClass("shared")
                        }
                        if (multiSelect && multiSelect.isItemSelected(app.userPackages.findWrapperForItemRecursive(comp))) {
                            tmp.addClass("selected")
                        }
                        tmp.toggleClass("unavailable", !comp.framework.isCompatibleWith(framework))
                    } else {
                        tmp = $('<span class="item">' + "<u></u>" + "<b></b>" + "</span>")
                    }
                    tmp.find("b").text(comp.getName());
                    this.domToItem.set(tmp[0], comp);
                    this.itemToDOM.set(comp, tmp[0]);
                    if (group) {
                        this.domToGroup.set(tmp[0], group)
                    }
                    return tmp[0]
                }
            }, {
                key: "expandContract",
                value: function expandContract(folder) {
                    if (folder.expanded) {
                        this.contractGroup(folder)
                    } else {
                        this.expandGroup(folder)
                    }
                }
            }, {
                key: "expandGroup",
                value: function expandGroup(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").slideDown("fast");
                    span.find("i").addClass("down");
                    folder.expanded = true;
                    if (folder.system) {
                        app.setSystemGroupExpandState(folder.getPath(), true)
                    }
                    app.trigger("package-tree-expand-contract", folder.getGroup())
                }
            }, {
                key: "instantExpandGroup",
                value: function instantExpandGroup(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").show();
                    span.find("i").addClass("down");
                    folder.expanded = true;
                    if (folder.system) {
                        app.setSystemGroupExpandState(folder.getPath(), true)
                    }
                    app.trigger("package-tree-expand-contract", folder.getGroup())
                }
            }, {
                key: "silentInstantExpandGroup",
                value: function silentInstantExpandGroup(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").show();
                    span.find("i").addClass("down")
                }
            }, {
                key: "contractGroup",
                value: function contractGroup(folder) {
                    var span = $(this.itemToDOM.get(folder));
                    span.next(".subtree").slideUp("fast");
                    span.find("i").removeClass("down");
                    folder.expanded = false;
                    if (folder.system) {
                        app.setSystemGroupExpandState(folder.getPath(), false)
                    }
                    app.trigger("package-tree-expand-contract", folder.getGroup())
                }
            }, {
                key: "expandAllToItem",
                value: function expandAllToItem(item) {
                    var parent = item.parent;
                    while (parent) {
                        this.instantExpandGroup(parent);
                        parent = parent.parent
                    }
                }
            }, {
                key: "getPathTarget",
                value: function getPathTarget(path) {
                    var match;
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;
                    try {
                        for (var _iterator10 = app.framework.getComponentGroups()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var group = _step10.value;
                            match = group.getByPath(path);
                            if (match) return match
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
                    return null
                }
            }, {
                key: "afterUpdate",
                value: function afterUpdate() {
                    _get(Object.getPrototypeOf(ComponentPanel.prototype), "afterUpdate", this).call(this);
                    if (this.pendingScrollToItem) {
                        this.highlightItem(this.pendingScrollToItem);
                        this.pendingScrollToItem = null
                    }
                    if (this.shouldFocusSearchInput) {
                        this.searchInput.focus();
                        this.shouldFocusSearchInput = false
                    }
                }
            }, {
                key: "updatePodsList",
                value: function updatePodsList() {
					var _this = this;
                    var found = this.searchIndex;
                    var searchString = this.searchString.trim();
                    var container = this.element.find(".tab-target.design-pane .list").empty();
                    var nothingFoundMessage = this.element.find(".tab-target.design-pane .nothing-found");
                    console.log(found);
                    console.log(searchString);
                    nothingFoundMessage.hide();
                    if (this.isSearching()) {
                        found = filter(found, searchString, {
                            key: "name"
                        });
                        if (!found.length) {
                            nothingFoundMessage.show();
                            return
                        }
                        container.html(found.map(function(f) {
                            return _this.renderComponent(f.item, f.group)
                        }));
                        return
                    }
                    var tmp = [];
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;
                    try {
                        for (var _iterator14 = app.podsComponents[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var group = _step14.value;
                            tmp.push(this.renderComponentFolder(group))
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
                    container.empty().append(tmp);
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;
                    try {
                        for (var _iterator15 = app.podsComponents[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var group = _step15.value;
                            if (group.expanded) {
                                this.silentInstantExpandGroup(group)
                            }
                            var _iteratorNormalCompletion16 = true;
                            var _didIteratorError16 = false;
                            var _iteratorError16 = undefined;
                            try {
                                for (var _iterator16 = group.getAllEntries().filter(function(c) {
                                        return c instanceof TreeFolder
                                    })[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                    var folder = _step16.value;
                                    if (folder.expanded) {
                                        this.silentInstantExpandGroup(folder)
                                    }
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
                    if (this.editAfterUpdate) {
                        this.expandAllToItem(this.editAfterUpdate);
                        var editable = $(this.itemToDOM.get(this.editAfterUpdate)).closest(".smart-editable");
                        this.smartEditable.startEditing(editable, true);
                        this.editAfterUpdate = null
                    }
                }
            }]);
            return ComponentPanel
        }(Panel);
        function createPackageItem(item) {
			var tmp = $('<span class="item">' + "<u></u>" + "<b></b>" + "</span>");
			tmp.find("b").text(item.name);
            tmp.data("item", item);
			
			return tmp;
        }
		function createPackageItem2(item) {
			var tmp = $('<span class="item">' + "<u></u>" + "<b></b>" + "</span>");
            
			tmp.find("b").text(item.name);
            tmp.data("item", item);
			
			return tmp;
        }
        module.exports = ComponentPanel
    }, {
        "../base/Tooltip": 28,
        "../helpers/enforceFileExtension": 559,
        "../helpers/isContextClick": 584,
        "../helpers/isSelectionClick": 585,
        "../helpers/linkify": 587,
        "../helpers/parsePath": 595,
        "../helpers/smartEditableElement": 614,
        "../packages/DownloadedPackage": 1204,
        "../packages/LibraryPackage": 1205,
        "../packages/Package": 1206,
        "../packages/UserPackage": 1208,
        "../tree/PackageTreeGroup": 1264,
        "../tree/TreeFolder": 1271,
        "../tree/TreeWrapper": 1274,
        "./OnlineResult": 1228,
        "./Panel.js": 1234,
        "./fuzzaldrin": 1027
    }]
});
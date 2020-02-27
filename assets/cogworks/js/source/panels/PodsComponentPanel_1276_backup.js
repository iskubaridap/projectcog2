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
        var ComponentPanel = require("./ComponentPanel.js");
        var TreeFolder = require("../tree/TreeFolder");
        var PodsComponentPanel = function(_ComponentPanel) {
            _inherits(PodsComponentPanel, _ComponentPanel);

            function PodsComponentPanel() {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                _classCallCheck(this, PodsComponentPanel);
                _get(Object.getPrototypeOf(PodsComponentPanel.prototype), "constructor", this).call(this, options);
                this.id = "pods";
                this.name = "Pods";
                this.icon = "view_array";
                var self = this;
                app.on("package-tree-changed", function(op) {
                    var items = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
                    if (self.tooltip.isVisible()) {
                        self.tooltip.hide()
                    }
                    if (op == "download") {
                        self.scheduleHighlightItem(items[0])
                    }
                    self.scheduleUpdate()
                })
            }
            _createClass(PodsComponentPanel, [{
                key: "updateComponents",
                value: function updateComponents() {
                    var _this = this;
                    var container = this.scrollable.empty();
                    var nothingFoundMessage = this.element.find(".tab-target.studio .nothing-found");
                    nothingFoundMessage.hide();
                    if (this.isSearching()) {
                        var found = app.framework.searchComponents(this.searchString.trim());
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
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = app.framework.getComponentGroups()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var group = _step.value;
                            var groupObj = null;
                            
                            $.each(app.pods, function(index, value){
                                if((group.name).toLowerCase() == value && !app.podsComponentsAdded)
                                {
                                    $.each(app.podsComponents, function(index2, value2){
                                        group.children.push(value2);
                                    });
                                    app.podsComponentsAdded = true;
                                }
                            });
                            
                            groupObj = this.renderComponentFolder(group);
                            
                            $.each(app.pods, function(index, value){
                                if((group.name).toLowerCase() == value)
                                {
                                    tmp.push(groupObj);
                                }
                            });
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
                    container.empty().append(tmp);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = app.framework.getComponentGroups()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var group = _step2.value;
                            if (group.expanded) {
                                this.silentInstantExpandGroup(group)
                            }
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;
                            try {
                                for (var _iterator3 = group.getAllEntries().filter(function(c) {
                                        return c instanceof TreeFolder
                                    })[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var folder = _step3.value;
                                    if (folder.expanded) {
                                        this.silentInstantExpandGroup(folder)
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
                    if (this.editAfterUpdate) {
                        this.expandAllToItem(this.editAfterUpdate);
                        var editable = $(this.itemToDOM.get(this.editAfterUpdate)).closest(".smart-editable");
                        this.smartEditable.startEditing(editable, true);
                        this.editAfterUpdate = null
                    }
                }
            }]);
            return PodsComponentPanel
        }(ComponentPanel);
        module.exports = PodsComponentPanel
    }, {
        "../tree/TreeFolder": 1271,
        "./ComponentPanel.js": 1216
    }]
});
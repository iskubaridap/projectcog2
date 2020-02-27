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
        var _get = function get(_x, _x2, _x3) {
            var _again = true;
            _function: while (_again) {
                var object = _x,
                    property = _x2,
                    receiver = _x3;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x = parent;
                        _x2 = property;
                        _x3 = receiver;
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
        var PageSelectionDialog = require("./PageSelectionDialog");
        var templates = require("../config/available-templates.json");
        var NewDesignDialog = function (_PageSelectionDialog) {
            _inherits(NewDesignDialog, _PageSelectionDialog);

            function NewDesignDialog(elem) {
                _classCallCheck(this, NewDesignDialog);
                _get(Object.getPrototypeOf(NewDesignDialog.prototype), "constructor", this).call(this, elem);
                this.template = null;
                this.mode = "choose-template";
                this.defaultPlaceholders = [];
                this.placeholders = {};
                this.templateWrapper = elem.find(".templates");
                this.placeholderWrapper = elem.find(".placeholders");
                this.placeholderWrapper.on("change", "input, textarea", this.placeholderChange.bind(this));
                this.designName = elem.find(".design-name");
                this.designName.on("input", this.textInput.bind(this));
                this.okButton = elem.find(".button.ok");
                this.okButton.on("click", this.onOK.bind(this));
                this.customizePane = elem.find("#customize-design");
                this.customizeButton = elem.find(".button.customize");
                this.customizeButton.on("click", this.onCustomize.bind(this));
                this.backButton = elem.find(".button.back");
                this.backButton.on("click", this.onBack.bind(this));
                elem.find(".button.cancel").on("click", this.close.bind(this));
                this.element.on("click", ".templates .card", this.clickTemplate.bind(this));
                this.frameworkSelect = this.element.find("select");
                this.frameworkSelect.on("change", this.onFrameworkChange.bind(this));
                this.afterCloseProps = null
            }
            _createClass(NewDesignDialog, [{
                key: "onFrameworkChange",
                value: function onFrameworkChange() {
                    this.template = this.templates[this.frameworkSelect.val()][0];
                    this.mode = "choose-template";
                    this.update()
                }
            }, {
                key: "clickTemplate",
                value: function clickTemplate(e) {
                    var target = $(e.currentTarget);
                    this.template = target.closest("li").data("template");
                    console.log(target.closest("li"));
                    console.log(target.closest("li").data("template"));
                    if (this.template.pages) {
                        this.template.pages = this.template.pages.map(function (p) {
                            return _extends({}, p, {
                                selected: p.selected || p.navbar
                            })
                        });
                        this.setPages(this.template.pages);
                        this.defaultPlaceholders = this.template.placeholders || []
                    }
                    this.update()
                }
            }, {
                key: "textInput",
                value: function textInput() {
                    this.okButton.toggleClass("disable", this.designName.val().trim().length == 0)
                }
            }, {
                key: "placeholderChange",
                value: function placeholderChange(e) {
                    var target = $(e.currentTarget);
                    this.placeholders[target.data("placeholder")] = target.val().trim()
                }
            }, {
                key: "open",
                value: function open(options) {
                    this.templates = $.extend(true, {}, templates);
                    this.sortTemplates();
                    this.mode = "choose-template";
                    this.frameworkSelect.empty();
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = options.frameworks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var framework = _step.value;
                            var tmp = $("<option>");
                            tmp.val(framework.version);
                            tmp.text(framework.name);
                            this.frameworkSelect.append(tmp)
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
                    this.designName.val(options.name || "Untitled");
                    this.designName.select();
                    this.template = this.templates[this.frameworkSelect.val()][0];
                    _get(Object.getPrototypeOf(NewDesignDialog.prototype), "open", this).call(this, options);
                    this.templateWrapper[0].scrollTop = 0;
                    this.pageWrapper[0].scrollTop = 0
                }
            }, {
                key: "sortTemplates",
                value: function sortTemplates() {
                    for (var framework in this.templates) {
                        var templates = this.templates[framework];
                        var blankTemplate = templates.splice(templates.findIndex(function (t) {
                            return t.id === "blank"
                        }), 1)[0];
                        templates = templates.sort(function (a, b) {
                            return b.premium - a.premium || a.id.localeCompare(b.id)
                        });
                        templates.unshift(blankTemplate)
                    }
                }
            }, {
                key: "buildTemplates",
                value: function buildTemplates() {
                    var templateList = this.templateWrapper.find("ul");
                    templateList.empty();
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = this.templates[this.frameworkSelect.val()][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var template = _step2.value;
                            var li = $("<li>");
                            li.data("template", template);
                            li.toggleClass("active", this.template && this.template === template);
                            var card = $("<div>");
                            card.addClass("card");
                            li.append(card);
                            var span = $("<span>");
                            span.addClass("img");
                            card.append(span);
                            var overlay = $("<span>");
                            overlay.addClass("overlay");
                            span.append(overlay);
                            var checkmark = $("<span>");
                            checkmark.addClass("checkmark");
                            card.append(checkmark);
                            if (template.id !== "blank") {
                                var img = $("<div>");
                                img.addClass("background");
                                img.attr("draggable", false);
                                img.css("background-image", "url(../assets/cogworks/templates/" + this.frameworkSelect.val() + "/" + template.id + "/images/preview.jpg)");
                                span.append(img)
                            }
                            var p = $("<p>");
                            p.text(template.name);
                            if (template.premium) {
                                var badge = $('<span class="badge">');
                                badge.append('<i class="material-icons">star</i>');
                                p.attr("title", "Premium Template. Has multiple pages, drag/drop widgets and automatic navbar and footer linking.");
                                p.append(badge)
                            }
                            card.append(p);
                            templateList.append(li)
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
                }
            }, {
                key: "buildPlaceholders",
                value: function buildPlaceholders() {
                    this.placeholderWrapper.empty();
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;
                    try {
                        for (var _iterator3 = this.defaultPlaceholders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var item = _step3.value;
                            var label = $("<label>");
                            var span = $("<span>");
                            span.text(item.name);
                            var tooltip = $("<span>");
                            tooltip.addClass("tip");
                            tooltip.text("?");
                            tooltip.attr("title", item.tooltip);
                            span.append(tooltip);
                            label.append(span);
                            var input = $("<" + item.type + ">");
                            if (item.type === "input") {
                                input.attr("type", "text")
                            }
                            input.attr("placeholder", item["default"]);
                            input.data("placeholder", item.placeholder);
                            input.val(this.placeholders[item.placeholder]);
                            label.append(input);
                            this.placeholderWrapper.append(label)
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
            }, {
                key: "updatePagePreviewsFolder",
                value: function updatePagePreviewsFolder() {
                    this.folder = "../assets/cogworks/templates/" + this.frameworkSelect.val() + "/" + this.template.id + "/images/pages/"
                }
            }, {
                key: "onOK",
                value: function onOK() {
                    var _this = this;
                    var placeholders = {};
                    var defaultPlaceholders = {};
                    Object.keys(this.placeholders).forEach(function (key) {
                        return !_this.placeholders[key].length && delete _this.placeholders[key]
                    });
                    this.defaultPlaceholders.forEach(function (item) {
                        defaultPlaceholders[item.placeholder] = item["default"]
                    });
                    placeholders = _extends({}, defaultPlaceholders, this.placeholders);
                    this.afterCloseProps = {
                        name: this.designName.val(),
                        template: this.template,
                        framework: this.frameworkSelect.val(),
                        placeholders: placeholders,
                        pagePaths: this.getSelectedPagePaths(),
                        navPaths: this.getNavbarPagePaths()
                    };
                    this.close()
                }
            }, {
                key: "onCustomize",
                value: function onCustomize() {
                    console.log(this.template.type);
                    if (this.template.type !== "advanced") return;
                    this.mode = "customize";
                    this.update()
                }
            }, {
                key: "onBack",
                value: function onBack() {
                    this.mode = "choose-template";
                    this.update()
                }
            }, {
                key: "afterClose",
                value: function afterClose() {
                    if (this.afterCloseProps) {
                        this.options.onSave(this.afterCloseProps)
                    }
                    this.afterCloseProps = null;
                    this.mode = "choose-template";
                    this.placeholders = {};
                    this.defaultPlaceholders = [];
                    this.update()
                }
            }, {
                key: "update",
                value: function update() {
                    switch (this.mode) {
                        case "choose-template":
                            this.buildTemplates();
                            break;
                        case "customize":
                            this.buildPlaceholders();
                            this.updatePagePreviewsFolder();
                            this.buildPages();
                            break;
                        default:
                            break
                    }
                    this.customizeButton.toggle(this.template.type === "advanced" && this.mode === "choose-template");
                    this.backButton.toggle(this.template.type === "advanced" && this.mode !== "choose-template");
                    this.customizePane.toggleClass("active", this.mode === "customize");
                    _get(Object.getPrototypeOf(NewDesignDialog.prototype), "update", this).call(this)
                }
            }]);
            return NewDesignDialog
        }(PageSelectionDialog);
        module.exports = NewDesignDialog
    }, {
        "../config/available-templates.json": 359,
        "./PageSelectionDialog": 513
    }]
});
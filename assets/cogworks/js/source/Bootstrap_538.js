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
        var _get = function get(_x31, _x32, _x33) {
            var _again = true;
            _function: while (_again) {
                var object = _x31,
                    property = _x32,
                    receiver = _x33;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x31 = parent;
                        _x32 = property;
                        _x33 = receiver;
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
        var BaseFramework = require("../Framework");
        var Theme = require("../../base/Theme");
        var CustomTheme = require("../../base/CustomTheme");
        var TemplateTheme = require("../../base/TemplateTheme");
        var CSSBlockStyle = require("../../base/CSSBlockStyle");
        var Template = require("../../base/Template");
        var IconFont = require("../../base/IconFont");
        var PackageTreeGroup = require("../../tree/PackageTreeGroup");
        var parseCSS = require("../../helpers/parseCSS");
        var parsePath = require("../../helpers/parsePath");
        var restoreCSSList = require("../../helpers/restoreCSSList");
        var mimeTypes = require("../../config/mime-types");
        var getFallbackForGoogleFont = require("../../helpers/getFallbackForGoogleFont");
        var PackageTreeFolder = require("../../tree/PackageTreeFolder");
        var parseCogComponentFormat = require("../../helpers/parseCogComponentFormat");
        var TextBoxOption = require("../../panels/TextBoxOption");
        var GroupOption = require("../../panels/GroupOption");
        var BreadcrumbsOption = require("../../panels/BreadcrumbsOption");
        var ButtonOption = require("../../panels/ButtonOption");
        var CheckBoxOption = require("../../panels/CheckBoxOption");
        var SelectOption = require("../../panels/SelectOption");
        var InfoOption = require("../../panels/InfoOption");
        var RangeOption = require("../../panels/RangeOption");
        var CompositeOption = require("../../panels/CompositeOption");
        var HTML = require("../../components/base/HTML");
        var Body = require("../../components/base/Body");
        var CustomCode = require("../../components/base/CustomCode");
        var Form = require("../../components/base/Form");
        var Hr = require("../../components/base/Hr");
        var Video = require("../../components/base/Video");
        var GoogleMap = require("../../components/base/Map");
        var InputBase = require("../../components/base/InputBase");
        var Select = require("../../components/base/Select");
        var Image = require("../../components/bootstrap/Image");
        var CarouselIndicators = require("../../components/bootstrap/CarouselIndicators");
        var ButtonGroup = require("../../components/bootstrap/ButtonGroup");
        var ButtonToolbar = require("../../components/bootstrap/ButtonToolbar");
        var Dropdown = require("../../components/bootstrap/Dropdown");
        var Nav = require("../../components/bootstrap/Nav");
        var NavBar = require("../../components/bootstrap/NavBar");
        var ProgressBar = require("../../components/bootstrap/ProgressBar");
        var ResponsiveEmbed = require("../../components/bootstrap/ResponsiveEmbed");
        var cleanUpDataURL = require("../../helpers/cleanUpDataURL");
        var readFileAsBase64 = require("../../helpers/readFileAsBase64");
        var readFileAsPlaintext = require("../../helpers/readFileAsPlaintext");
        var recursiveLoop = require("../../helpers/recursiveLoop");
        var createHash = require("../../helpers/createHash");
        var parseThemeFonts = require("../../helpers/parseThemeFonts");
        var addQueryParamsToURL = require("../../helpers/addQueryParamsToURL");
        var CleanCSS = require("clean-css");
        var UglifyJS = require("uglify-js");
        var Icon = require("../../components/base/Icon");
        var IconFontResource = require("../../resources/IconFontResource");
        var icons = require("../../config/bootstrap-icons");
        var imageList = require("../../components/images.json");
        var Bootstrap = function(_BaseFramework) {
            _inherits(Bootstrap, _BaseFramework);

            function Bootstrap() {
                _classCallCheck(this, Bootstrap);
                _get(Object.getPrototypeOf(Bootstrap.prototype), "constructor", this).call(this);
                this.htmlToThemeElement = new WeakMap;
                this.htmlToBootstrapTheme = new WeakMap;
                this.htmlToAnimationCSS = new WeakMap;
                this.contextIconFontCache = new WeakMap;
                this.version = "";
                this.fullVersion = "";
                this.jQueryVersions = null;
                this.hasTemplates = false;
                this._iconFontCache = null
            }
            _createClass(Bootstrap, [{
                key: "initialize",
                value: function initialize() {
                    _get(Object.getPrototypeOf(Bootstrap.prototype), "initialize", this).call(this);
                    var components = this.getComponentDefinition();
                    for (var group in components) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;
                        try {
                            for (var _iterator = components[group][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var comp = _step.value;
                                this.componentMap.set(comp.name, comp)
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
                    }
                    this.themes = [];
                    this.templateThemes = [];
                    this.userThemes = [];
                    this.themeFileName = "customThemes" + this.version;
                    this.themes = this.getSystemThemes();
                    this.templateThemes = this.getTemplateThemes();
                    var that = this;
                    return electron.readDataFile(this.themeFileName).then(function(result) {
                        if (result) {
                            var themes = JSON.parse(result) || [];
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;
                            try {
                                for (var _iterator2 = themes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var th = _step2.value;
                                    var theme = new CustomTheme;
                                    theme.unserialize(th);
                                    that.userThemes.push(theme)
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
                    })["catch"](function(e) {
                        console.error(e)
                    })
                }
            }, {
                key: "getUIDefinition",
                value: function getUIDefinition() {
                    return []
                }
            }, {
                key: "getIconFontDefinition",
                value: function getIconFontDefinition() {
                    return icons.slice().sort(function(left, right) {
                        return left.weight - right.weight || left.name.localeCompare(right.name)
                    })
                }
            }, {
                key: "getUserGroups",
                value: function getUserGroups() {
                    return [app.userPackages, app.downloadedPackages]
                }
            }, {
                key: "getComponentGroups",
                value: function getComponentGroups() {
                    if (this.groups) {
                        return this.groups
                    }
                    this.groups = _get(Object.getPrototypeOf(Bootstrap.prototype), "getComponentGroups", this).call(this);
                    var uiGroup = new PackageTreeGroup;
                    uiGroup.initialize("UI");
                    uiGroup.system = true;
                    uiGroup.expanded = app.getSystemGroupExpandState(uiGroup.getPath());
                    //var ui = this.getUIDefinition();
                    var ui = new Object();
                    for (var cat in ui) {
                        var folder = new PackageTreeFolder;
                        folder.system = true;
                        folder.name = cat;
                        uiGroup.addOp(folder)["do"]();
                        var arr = [];
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;
                        try {
                            for (var _iterator3 = ui[cat][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var pkg = _step3.value;
                                pkg["package"].preview = imageList[pkg["package"].preview];
                                pkg = parseCogComponentFormat(pkg);
                                recursiveLoop(pkg.images, function(img) {
                                    img.data = imageList[img.data]
                                });
                                arr.push(pkg)
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
                        folder.initialize(cat, arr);
                        folder.expanded = app.getSystemGroupExpandState(folder.getPath(), false)
                    }
                    this.groups.splice(2, 0, uiGroup);
                    return this.groups
                }
            }, {
                key: "getFulljQueryVersion",
                value: function getFulljQueryVersion(context) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;
                    try {
                        for (var _iterator4 = this.jQueryVersions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var jq = _step4.value;
                            if (jq.short == context.settings.jqueryVersion) {
                                return jq.full
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
                    return null
                }
            }, {
                key: "getAvailablejQueryVersions",
                value: function getAvailablejQueryVersions() {
                    return this.jQueryVersions
                }
            }, {
                key: "getAllIconFonts",
                value: function getAllIconFonts() {
                    if (this._iconFontCache) {
                        return this._iconFontCache
                    }
                    return this._iconFontCache = this.getIconFontDefinition().map(function(f) {
                        var font = new IconFont;
                        font.unserialize(f);
                        return font
                    })
                }
            }, {
                key: "getSystemThemes",
                value: function getSystemThemes() {
                    return []
                }
            }, {
                key: "getTemplateThemes",
                value: function getTemplateThemes() {
                    return []
                }
            }, {
                key: "saveThemeSetting",
                value: function saveThemeSetting() {
                    electron.writeDataFile(this.themeFileName, JSON.stringify(this.userThemes.map(function(t) {
                        return t.serialize()
                    })))
                }
            }, {
                key: "themeExists",
                value: function themeExists(theme) {
                    return !!this.getTheme(theme)
                }
            }, {
                key: "getTheme",
                value: function getTheme(theme) {
                    switch (theme.type) {
                        case "builtin":
                        case "template":
                        case "system-template":
                            return this.getThemeById(theme.id);
                            break;
                        case "custom":
                            return this.getThemeByRawCSS(theme.raw);
                            break;
                        default:
                            return null
                    }
                }
            }, {
                key: "getThemeByRawCSS",
                value: function getThemeByRawCSS(css) {
                    for (var i = 0; i < this.userThemes.length; i++) {
                        if (this.userThemes[i].raw == css) {
                            return this.userThemes[i]
                        }
                    }
                    return null
                }
            }, {
                key: "getThemeById",
                value: function getThemeById(id) {
                    for (var i = 0; i < this.themes.length; i++) {
                        if (this.themes[i].id == id) {
                            return this.themes[i]
                        }
                    }
                    for (var i = 0; i < this.templateThemes.length; i++) {
                        if (this.templateThemes[i].id == id) {
                            return this.templateThemes[i]
                        }
                    }
                    for (var i = 0; i < this.userThemes.length; i++) {
                        if (this.userThemes[i].id == id) {
                            return this.userThemes[i]
                        }
                    }
                    return null
                }
            }, {
                key: "getDefaultTheme",
                value: function getDefaultTheme() {
                    return this.themes.filter(function(t) {
                        return t.id === "default"
                    })[0]
                }
            }, {
                key: "getAllThemes",
                value: function getAllThemes() {
                    return this.userThemes.concat(this.themes)
                }
            }, {
                key: "removeTheme",
                value: function removeTheme(theme) {
                    var index = this.userThemes.indexOf(theme);
                    if (index == -1) {
                        return false
                    }
                    this.userThemes.splice(index, 1);
                    this.saveThemeSetting()
                }
            }, {
                key: "addTheme",
                value: function addTheme(theme) {
                    this.userThemes.push(theme);
                    this.userThemes.sort(function(a, b) {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0
                    });
                    this.saveThemeSetting()
                }
            }, {
                key: "renameTheme",
                value: function renameTheme(theme, newName) {
                    theme.name = newName;
                    this.userThemes.sort(function(a, b) {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0
                    });
                    this.saveThemeSetting()
                }
            }, {
                key: "isThemeUserMade",
                value: function isThemeUserMade(id) {
                    for (var i = 0; i < this.userThemes.length; i++) {
                        if (this.userThemes[i].id == id) {
                            return true
                        }
                    }
                    return false
                }
            }, {
                key: "isContextThemeUserMade",
                value: function isContextThemeUserMade(context) {
                    return this.isThemeUserMade(context.settings.theme.id)
                }
            }, {
                key: "contextThemeHasCDN",
                value: function contextThemeHasCDN(context) {
                    return this.getActiveTheme(context).hasCDN()
                }
            }, {
                key: "isThemeUsedInOpenDesigns",
                value: function isThemeUsedInOpenDesigns(id) {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;
                    try {
                        for (var _iterator5 = app.openedContexts[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var ctx = _step5.value;
                            if (this.usesTheme(ctx, id)) {
                                return true
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
                    return false
                }
            }, {
                key: "usesTheme",
                value: function usesTheme(context, id) {
                    return context.settings.theme.id == id
                }
            }, {
                key: "getActiveTheme",
                value: function getActiveTheme(context) {
                    return this.getTheme(context.settings.theme)
                }
            }, {
                key: "getSystemFonts",
                value: function getSystemFonts(context) {
                    return this.getTheme(context.settings.theme).fonts
                }
            }, {
                key: "getStylesheetForActiveTheme",
                value: function getStylesheetForActiveTheme(context) {
                    return "../assets/cogworks/embed/bootstrap/" + this.version + "/" + context.settings.theme.id + "/bootstrap.min.css"
                }
            }, {
                key: "parseBootstrapTheme",
                value: function parseBootstrapTheme(raw) {
                    var name = arguments.length <= 1 || arguments[1] === undefined ? "New Theme" : arguments[1];
                    var theme = new CustomTheme;
                    theme.unserialize({
                        id: theme.id,
                        fonts: parseThemeFonts(raw),
                        name: name,
                        raw: raw
                    });
                    return theme
                }
            }, {
                key: "loadThemeStyles",
                value: function loadThemeStyles(context) {
                    var that = this;
                    return new Promise(function(resolve, reject) {
                        if (that.isContextThemeUserMade(context)) {
                            var theme = that.getTheme(context.settings.theme);
                            context.setThemeCSS(theme.css);
                            resolve(true)
                        } else {
                            $.get("../assets/cogworks/embed/bootstrap/" + that.version + "/" + context.settings.theme.id + "/bootstrap.min.css", function(raw) {
                                var css = parseCSS(raw, {
                                    system: true
                                }, {
                                    system: true
                                });
                                context.setThemeCSS(restoreCSSList(css));
                                resolve(true)
                            })
                        }
                    })
                }
            }, {
                key: "loadTemplate",
                value: function loadTemplate(templateName) {
                    if (app.templateToContext.has(templateName)) {
                        return Promise.resolve(app.templateToContext.get(templateName))
                    }
                    var folder = "../assets/cogworks/templates/" + this.version + "/" + templateName;
                    var template = new Template(folder);
                    return new Promise(function(resolve, reject) {
                        $.ajax(template.paths.template).done(function(json) {
                            console.log(json);
                            if(typeof json.context.design.assets.audio === "undefined")
                            {
                                var obj = new Object();
                                obj.name = "";
                                obj.expanded = false;
                                obj.children = new Array();
                                json.context.design.assets.audio = obj;
                            }
                            if(typeof json.context.design.assets.pdf === "undefined")
                            {
                                var obj = new Object();
                                obj.name = "";
                                obj.expanded = false;
                                obj.children = new Array();
                                json.context.design.assets.pdf = obj;
                            }
                            if (json.meta.type === "advanced") {
                                template.unserialize(json);
                                app.templateToContext.set(templateName, template);
                                template.initializeNavigation()
                            } else {
                                template.unserialize(json)
                            }
                            return resolve(template)
                        }).fail(reject)
                    })
                }
            }, {
                key: "getUsedIconFonts",
                value: function getUsedIconFonts(context) {
                    var usedIconFonts = new Set;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;
                    try {
                        for (var _iterator6 = context.pages.getAll()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var p = _step6.value;
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;
                            try {
                                for (var _iterator7 = p.findInTree(Icon)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var icon = _step7.value;
                                    usedIconFonts.add(icon.getIconFont())
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
                            var _iteratorNormalCompletion8 = true;
                            var _didIteratorError8 = false;
                            var _iteratorError8 = undefined;
                            try {
                                for (var _iterator8 = p.findInTree(CustomCode)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                    var code = _step8.value;
                                    var found = this.getIconFontsInCustomCode(code);
                                    if (found.length) {
                                        usedIconFonts.add.apply(usedIconFonts, found)
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
                    var arr = Array.from(usedIconFonts);
                    arr.sort(function(left, right) {
                        return left.weight - right.weight || left.name.localeCompare(right.name)
                    });
                    return arr
                }
            }, {
                key: "getIconFontsInCustomCode",
                value: function getIconFontsInCustomCode(cc) {
                    var fonts = [];
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;
                    try {
                        for (var _iterator9 = this.getAllIconFonts()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var iconFont = _step9.value;
                            if (iconFont.matchIconsInString(cc.getValue())) fonts.push(iconFont)
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
                    return fonts
                }
            }, {
                key: "getUsedIconFontPaths",
                value: function getUsedIconFontPaths(context) {
                    var sep = arguments.length <= 1 || arguments[1] === undefined ? "/" : arguments[1];
                    var paths = [];
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;
                    try {
                        for (var _iterator10 = this.getUsedIconFonts(context)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var iconFont = _step10.value;
                            for (var i = 0; i < iconFont.sources.length; i++) {
                                paths.push({
                                    source: iconFont.sources[i],
                                    destination: iconFont.destinations ? iconFont.destinations[i] : iconFont.sources[i]
                                })
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
                    return paths
                }
            }, {
                key: "getUsedIconFontResources",
                value: function getUsedIconFontResources(context) {
                    var iconFonts = null;
                    if (context.isDesign) {
                        iconFonts = this.getAllIconFonts()
                    } else {
                        iconFonts = this.getUsedIconFonts(context)
                    }
                    var resources = [];
                    var cache = this.contextIconFontCache;
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;
                    try {
                        for (var _iterator11 = iconFonts[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var font = _step11.value;
                            if (!cache.has(context)) {
                                cache.set(context, new Map)
                            }
                            if (!cache.get(context).has(font)) {
                                cache.get(context).set(font, new IconFontResource(font))
                            }
                            resources.push(cache.get(context).get(font))
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
                    return resources
                }
            }, {
                key: "getIconFontPathsByName",
                value: function getIconFontPathsByName(context, name) {
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;
                    try {
                        for (var _iterator12 = this.getAllIconFonts()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var iconFont = _step12.value;
                            if (iconFont.name == name) {
                                return iconFont.getSourcePaths()
                            }
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
                }
            }, {
                key: "getURLForIconFont",
                value: function getURLForIconFont(context, font) {
                    var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                    if (context.isPreview) {
                        return context.assetPath + font.data.stylesheet
                    }
                    if (context.isExport && context.exportOptions && context.exportOptions.useCDN) {
                        return font.data.cdn
                    }
                    return context.depthToPath(depth) + context.assetPath + font.data.stylesheet
                }
            }, {
                key: "getURLsForBootstrapCSS",
                value: function getURLsForBootstrapCSS(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    if (context.isPreview) {
                        return [context.assetPath + "bootstrap/css/bootstrap.min.css"]
                    }
                    if (context.isDesign) {
                        return [this.getStylesheetForActiveTheme(context)]
                    }
                    if (context.isExport && context.exportOptions && context.exportOptions.useCDN && this.contextThemeHasCDN(context)) {
                        if (Array.isArray(this.getActiveTheme(context).cdn)) {
                            return this.getActiveTheme(context).cdn
                        }
                        return [this.getActiveTheme(context).cdn]
                    }
                    var path = context.depthToPath(depth) + context.assetPath + "bootstrap/css/bootstrap.min.css";
                    if (context.exportOptions && context.exportOptions.versionAssets) {
                        path = addQueryParamsToURL(path, {
                            h: this.getActiveTheme(context).getHash()
                        })
                    }
                    return [path]
                }
            }, {
                key: "getURLForjQuery",
                value: function getURLForjQuery(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    if (context.isPreview) {
                        return context.assetPath + "js/jquery-" + this.getFulljQueryVersion(context) + ".min.js"
                    }
                    if (context.isExport && context.exportOptions && context.exportOptions.useCDN) {
                        return "https://cdnjs.cloudflare.com/ajax/libs/jquery/" + this.getFulljQueryVersion(context) + "/jquery.min.js"
                    }
                    var path = context.depthToPath(depth) + context.assetPath + "js/jquery.min.js";
                    if (context.isExport && context.exportOptions && context.exportOptions.versionAssets) {
                        path = addQueryParamsToURL(path, {
                            h: createHash(this.getFulljQueryVersion(context))
                        })
                    }
                    return path
                }
            }, {
                key: "getURLForBootstrapJS",
                value: function getURLForBootstrapJS(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    if (context.isPreview) {
                        return context.assetPath + "bootstrap/js/bootstrap.min.js"
                    }
                    if (context.isExport && context.exportOptions && context.exportOptions.useCDN) {
                        return "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/" + this.fullVersion + "/js/bootstrap.min.js"
                    }
                    var path = context.depthToPath(depth) + context.assetPath + "bootstrap/js/bootstrap.min.js";
                    if (context.isExport && context.exportOptions && context.exportOptions.versionAssets) {
                        path = addQueryParamsToURL(path, {
                            h: createHash(this.fullVersion)
                        })
                    }
                    return path
                }
            }, {
                key: "getURLForSmartFormsJS",
                value: function getURLForSmartFormsJS(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    if (context.isPreview) {
                        return context.assetPath + "js/smart-forms.min.js"
                    }
                    var path = context.depthToPath(depth) + context.assetPath + "js/smart-forms.min.js";
                    if (context.isExport && context.exportOptions && context.exportOptions.versionAssets) {
                        path = addQueryParamsToURL(path, {
                            h: createHash(this.fullVersion)
                        })
                    }
                    return path
                }
            }, {
                key: "getBootstrapCSSPath",
                value: function getBootstrapCSSPath(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return context.depthToPath(depth) + context.assetPath + "bootstrap/css/bootstrap.min.css"
                }
            }, {
                key: "getBootstrapJSPath",
                value: function getBootstrapJSPath(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return context.depthToPath(depth) + context.assetPath + "bootstrap/js/bootstrap.min.js"
                }
            }, {
                key: "getjQueryPath",
                value: function getjQueryPath(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return context.depthToPath(depth) + context.assetPath + "js/jquery.min.js"
                }
            }, {
                key: "getSmartFormsJSPath",
                value: function getSmartFormsJSPath(context) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return context.depthToPath(depth) + context.assetPath + "js/smart-forms.min.js"
                }
            }, {
                key: "finishComponentUpdate",
                value: function finishComponentUpdate(component) {
                    if ((component.context().isPreview || component.context().isExport) && this.isComponentAnimated(component)) {
                        var animAttributes = this.getAnimationAttributes(component);
                        for (var attr in animAttributes) {
                            component.element[0].setAttribute(attr, animAttributes[attr])
                        }
                        var _iteratorNormalCompletion13 = true;
                        var _didIteratorError13 = false;
                        var _iteratorError13 = undefined;
                        try {
                            for (var _iterator13 = this.getAnimationClasses(component)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                var cls = _step13.value;
                                component.element[0].classList.add(cls)
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
                    }
                }
            }, {
                key: "injectTextOptions",
                value: function injectTextOptions(component, properties) {}
            }, {
                key: "textComponentUpdate",
                value: function textComponentUpdate(component) {}
            }, {
                key: "injectColorOptions",
                value: function injectColorOptions(component) {}
            }, {
                key: "colorComponentUpdate",
                value: function colorComponentUpdate(component) {}
            }, {
                key: "getOptionsGroupByID",
                value: function getOptionsGroupByID(id) {
                    var group = null;
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;
                    try {
                        for (var _iterator14 = app.optionPanels[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var panel = _step14.value;
                            group = panel.getByID(id);
                            if (group) break
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
                    return group
                }
            }, {
                key: "getMainOptionsGroupFor",
                value: function getMainOptionsGroupFor(component) {
                    return this.getOptionsGroupByID(component.constructor.name.toLowerCase() + "-options")
                }
            }, {
                key: "emptyOptionPanels",
                value: function emptyOptionPanels() {
                    app.optionPanels.map(function(panel) {
                        return panel.empty()
                    })
                }
            }, {
                key: "buildComponentOptions",
                value: function buildComponentOptions(component) {
                    var framework = this;
                    var breadcrumbs = new BreadcrumbsOption({
                        component: component
                    });
                    if (!this.componentSupportsOptions(component)) {
                        return
                    }
                    var elem = component.element[0];
                    this.emptyOptionPanels();
                    app.getPanel("look-and-feel").setComponent(component);
                    app.getPanel("look-and-feel").add(breadcrumbs);
                    var layout = new GroupOption({
                        id: "look-and-feel-layout",
                        label: "Layout"
                    });
                    app.getPanel("look-and-feel").add(layout);
                    layout.add(new InfoOption({
                        id: "info-option",
                        component: component
                    }));
                    var widthOption = quickCreateNumericCSSRule(component, "width", "width", "Width");
                    widthOption.add(quickCreateNumericCSSRule(component, "min-width", "minWidth", "Min Width"));
                    widthOption.add(quickCreateNumericCSSRule(component, "max-width", "maxWidth", "Max Width"));
                    var heightOption = quickCreateNumericCSSRule(component, "height", "height", "Height");
                    heightOption.add(quickCreateNumericCSSRule(component, "min-height", "minHeight", "Min Height"));
                    heightOption.add(quickCreateNumericCSSRule(component, "max-height", "maxHeight", "Max Height"));
                    var marginOption = quickCreateNumericCSSRule(component, "margin", "margin", "Margin");
                    var paddingOption = quickCreateNumericCSSRule(component, "padding", "padding", "Padding");
                    var _arr = ["Top", "Right", "Bottom", "Left"];
                    for (var _i = 0; _i < _arr.length; _i++) {
                        var dir = _arr[_i];
                        marginOption.add(quickCreateNumericCSSRule(component, "margin-" + dir.toLowerCase(), "margin" + dir, "Margin " + dir));
                        paddingOption.add(quickCreateNumericCSSRule(component, "padding-" + dir.toLowerCase(), "padding" + dir, "Padding " + dir))
                    }
                    layout.add(widthOption);
                    layout.add(heightOption);
                    layout.add(marginOption);
                    layout.add(paddingOption);
                    var background = new GroupOption({
                        id: "look-and-feel-background",
                        label: "Background"
                    });
                    app.getPanel("look-and-feel").add(background);
                    background.add(quickCreateColorCSSRule(component, "background-color", "backgroundColor", "Bg Color"));
                    var backgroundImage = quickCreateTextButtonCSSRule(component, "background-image", "backgroundImage", "Bg Image", function() {
                        var currentImage = createValueHandler(component, "background-image", "")();
                        var currentPlaceholder = createPlaceholderHandler(component, "background-image", "backgroundImage")();
                        app.imagesDialog.open({
                            selected: currentImage || currentPlaceholder || "",
                            onSave: function onSave(newValue) {
                                backgroundImage.val(newValue);
                                backgroundImage.commitChanges()
                            }
                        })
                    });
                    background.add(backgroundImage);
                    backgroundImage.add(quickCreateTextButtonCSSRule(component, "background-position", "backgroundPosition", "Position", quickCreateButtonActions(["top", "bottom", "left", "right", "center"]), "arrow_drop_down"));
                    backgroundImage.add(quickCreateTextButtonCSSRule(component, "background-size", "backgroundSize", "Size", quickCreateButtonActions(["auto", "contain", "cover"]), "arrow_drop_down"));
                    backgroundImage.add(quickCreateTextButtonCSSRule(component, "background-repeat", "backgroundRepeat", "Repeat", quickCreateButtonActions(["repeat-x", "repeat-y", "repeat", "space", "round", "no-repeat"]), "arrow_drop_down"));
                    var font = new GroupOption({
                        id: "look-and-feel-font",
                        label: "Font"
                    });
                    app.getPanel("look-and-feel").add(font);
                    font.add(quickCreateColorCSSRule(component, "color", "color", "Color"));
                    var fontSize = quickCreateNumericCSSRule(component, "font-size", "fontSize", "Font Size");
                    font.add(fontSize);
                    fontSize.add(quickCreateNumericCSSRule(component, "line-height", "lineHeight", "Line Height"));
                    fontSize.add(quickCreateNumericCSSRule(component, "letter-spacing", "letterSpacing", "Letter Spacing"));
                    var fontFamily = quickCreateTextButtonCSSRule(component, "font-family", "fontFamily", "Font Family", function(control, e) {
                        var rect = e.target.getBoundingClientRect();
                        var options = [];
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;
                        try {
                            for (var _iterator15 = app.context.getFonts()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var f = _step15.value;
                                options.push({
                                    name: f.name,
                                    action: function(f) {
                                        var val = f.name;
                                        if (val.indexOf(" ") > -1) {
                                            val = "'" + val + "'"
                                        }
                                        var fallback = getFallbackForGoogleFont(f.name);
                                        if (fallback) {
                                            val += ", " + fallback
                                        }
                                        control.val(val);
                                        control.commitChanges()
                                    }.bind(framework, f)
                                })
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
                        options.push({
                            name: "Add Font..",
                            action: function action() {
                                app.getPanel("design").importFontAction()
                            }
                        });
                        app.contextMenu.show(rect.right, rect.bottom, options, {
                            gravity: "left",
                            theme: "dark"
                        })
                    }, "arrow_drop_down");
                    font.add(fontFamily);
                    fontFamily.add(quickCreateTextButtonCSSRule(component, "font-weight", "fontWeight", "Font Weight", quickCreateButtonActions(["normal", "bold"]), "arrow_drop_down"));
                    fontFamily.add(quickCreateTextButtonCSSRule(component, "font-style", "fontStyle", "Font Style", quickCreateButtonActions(["normal", "italic", "oblique"]), "arrow_drop_down"));
                    var filter = new GroupOption({
                        id: "look-and-feel-filter",
                        label: "Filters"
                    });
                    app.getPanel("look-and-feel").add(filter);
                    var opacityOption = quickCreateSliderCSSRule(component, "opacity", "opacity", "Opacity", {
                        min: 0,
                        max: 1,
                        step: .01,
                        minLimit: 0,
                        maxLimit: 1
                    });
                    var filterOption = quickCreateCompositeOption(component, "filter", "filter", " ");
                    var blurOption = quickCreateFilterCSSRule(component, "blur", "blur", "Blur", {
                        min: 0,
                        max: 100,
                        step: 1,
                        minLimit: 0
                    }, null, ["px", "em", "rem"], 0);
                    var brightnessOption = quickCreateFilterCSSRule(component, "brightness", "brightness", "Brightness", {
                        min: 0,
                        max: 200,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 100);
                    var contrastOption = quickCreateFilterCSSRule(component, "contrast", "contrast", "Contrast", {
                        min: 0,
                        max: 200,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 100);
                    var grayscaleOption = quickCreateFilterCSSRule(component, "grayscale", "grayscale", "Grayscale", {
                        min: 0,
                        max: 100,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 0);
                    var hueRotateOption = quickCreateFilterCSSRule(component, "hue-rotate", "hue-rotate", "Hue", {
                        min: 0,
                        max: 360,
                        step: 1
                    }, null, ["deg", "rad", "grad"], 0);
                    var invertOption = quickCreateFilterCSSRule(component, "invert", "invert", "Invert", {
                        min: 0,
                        max: 100,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 0);
                    var saturateOption = quickCreateFilterCSSRule(component, "saturate", "saturate", "Saturate", {
                        min: 0,
                        max: 200,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 100);
                    var sepiaOption = quickCreateFilterCSSRule(component, "sepia", "sepia", "Sepia", {
                        min: 0,
                        max: 100,
                        step: 1,
                        minLimit: 0
                    }, null, ["%"], 0);
                    filterOption.add(blurOption);
                    filterOption.add(brightnessOption);
                    filterOption.add(contrastOption);
                    filterOption.add(grayscaleOption);
                    filterOption.add(hueRotateOption);
                    filterOption.add(invertOption);
                    filterOption.add(saturateOption);
                    filterOption.add(sepiaOption);
                    filter.add(opacityOption);
                    filter.add(filterOption);
                    app.getPanel("settings").setComponent(component);
                    app.getPanel("settings").add(breadcrumbs);
                    var defaultGroup = component.defaultGroup = new GroupOption({
                        id: component.constructor.name.toLowerCase() + "-options",
                        label: component.getName() + " Options"
                    });
                    app.getPanel("settings").add(defaultGroup);
                    var item;
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;
                    try {
                        for (var _iterator16 = component.getGroups()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            var prop = _step16.value;
                            item = new GroupOption({
                                id: prop.id,
                                label: prop.label
                            });
                            app.getPanel("settings").add(item, prop.weight)
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
                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;
                    try {
                        for (var _iterator17 = component.getProperties()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                            var prop = _step17.value;
                            item = this.propertyToOptionItem(component, prop);
                            if (prop.group) {
                                app.framework.getOptionsGroupByID(prop.group).add(item, prop.weight)
                            } else {
                                defaultGroup.add(item, prop.weight)
                            }
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
                    app.getPanel("animation").setComponent(component);
                    app.getPanel("animation").add(breadcrumbs);
                    if (this.componentSupportsAnimation(component)) {
                        var anim = new GroupOption({
                            id: "animation",
                            label: "Animation",
                            collapsed: false
                        });
                        app.getPanel("animation").add(anim, 60);
                        var animAnimate = new SelectOption({
                            label: "Trigger",
                            value: [component.properties, "animation", "none"],
                            options: animations,
                            component: component,
                            history: "Modify Component Animation"
                        });
                        anim.add(animAnimate);
                        var animScrollType = new SelectOption({
                            label: "Type",
                            visible: function visible() {
                                return animAnimate.val() == "scroll"
                            },
                            value: [component.properties, "animation-scroll-type", "fade"],
                            options: aosAnimations.map(function(o) {
                                return {
                                    label: o,
                                    value: o
                                }
                            }),
                            component: component,
                            history: "Modify Component Animation"
                        });
                        anim.add(animScrollType);
                        anim.add(new SelectOption({
                            label: "Duration",
                            visible: function visible() {
                                return animAnimate.val() == "scroll" && animScrollType.val() != "parallax-bg"
                            },
                            value: [component.properties, "animation-scroll-duration", 0],
                            options: aosNumberValues.map(function(o) {
                                return {
                                    label: o == 0 ? "Default" : o + "ms",
                                    value: o
                                }
                            }),
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new TextBoxOption({
                            label: "Offset (px)",
                            visible: function visible() {
                                return animAnimate.val() == "scroll" && animScrollType.val() != "parallax-bg"
                            },
                            value: [component.properties, "animation-scroll-offset", ""],
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new SelectOption({
                            label: "Delay",
                            visible: function visible() {
                                return animAnimate.val() == "scroll" && animScrollType.val() != "parallax-bg"
                            },
                            value: [component.properties, "animation-scroll-delay", 0],
                            options: aosNumberValues.map(function(o) {
                                return {
                                    label: o == 0 ? "None" : o + "ms",
                                    value: o
                                }
                            }),
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new CheckBoxOption({
                            label: "Play Once",
                            visible: function visible() {
                                return animAnimate.val() == "scroll" && animScrollType.val() != "parallax-bg"
                            },
                            value: [component.properties, "animation-scroll-once", 0],
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new TextBoxOption({
                            label: "Image",
                            visible: function visible() {
                                return animAnimate.val() == "scroll" && animScrollType.val() == "parallax-bg"
                            },
                            valueOp: function valueOp(val) {
                                var block = component.getPathStyleAsCSSBlock();
                                if (val == undefined) {
                                    var rule = block.getRuleByProperty("background-image");
                                    if (!rule) return "";
                                    var img = rule.value.match(/url\(["']?([^'"\)]+)["']?\)/);
                                    if (img && img.length) {
                                        return img[1]
                                    }
                                    return ""
                                } else {
                                    var bgPosition = "";
                                    var bgSize = "";
                                    if (val) {
                                        val = "url(" + val + ")";
                                        bgPosition = "center";
                                        bgSize = "cover"
                                    }
                                    var op1 = block.updateRuleOp("background-image", val);
                                    var op2 = block.updateRuleOp("background-position", bgPosition);
                                    var op3 = block.updateRuleOp("background-size", bgSize);
                                    return {
                                        do: function _do() {
                                            op1["do"]();
                                            op2["do"]();
                                            op3["do"]();
                                            block.setNodeStyle()
                                        },
                                        undo: function undo() {
                                            op1.undo();
                                            op2.undo();
                                            op3.undo();
                                            block.setNodeStyle()
                                        }
                                    }
                                }
                            },
                            component: component,
                            showButton: true,
                            buttonAction: function buttonAction() {
                                var block = component.getPathStyleAsCSSBlock();
                                var rule = block.getRuleByProperty("background-image");
                                var selected = "";
                                if (rule) {
                                    var img = rule.value.match(/url\(["']?([^'"\)]+)["']?\)/);
                                    if (img && img.length) {
                                        selected = img[1]
                                    }
                                }
                                app.imagesDialog.open({
                                    selected: selected,
                                    onSave: function onSave(val, image) {
                                        image.calculateDimensions(function(x, y) {
                                            val = "url(" + val + ")";
                                            var bgPosition = "center";
                                            var bgSize = "cover";
                                            var op1 = block.updateRuleOp("background-image", val);
                                            var op2 = block.updateRuleOp("background-position", bgPosition);
                                            var op3 = block.updateRuleOp("background-size", bgSize);
                                            op1["do"]();
                                            op2["do"]();
                                            op3["do"]();
                                            block.setNodeStyle();
                                            component.update();
                                            app.context.history.add({
                                                name: "Modify Component Animation",
                                                undo: function undo() {
                                                    op1.undo();
                                                    op2.undo();
                                                    op3.undo();
                                                    block.setNodeStyle();
                                                    component.update()
                                                },
                                                redo: function redo() {
                                                    op1["do"]();
                                                    op2["do"]();
                                                    op3["do"]();
                                                    block.setNodeStyle();
                                                    component.update()
                                                }
                                            })
                                        })
                                    }
                                })
                            },
                            history: "Modify Component Animation"
                        }));
                        anim.add(new SelectOption({
                            label: "Type",
                            visible: function visible() {
                                return animAnimate.val() == "hover"
                            },
                            value: [component.properties, "animation-hover-type", "bounce"],
                            options: animateCSSAnimations.map(function(o) {
                                return {
                                    label: o,
                                    value: o
                                }
                            }),
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new SelectOption({
                            label: "Type",
                            visible: function visible() {
                                return animAnimate.val() == "load"
                            },
                            value: [component.properties, "animation-load-type", "bounce"],
                            options: animateCSSAnimations.map(function(o) {
                                return {
                                    label: o,
                                    value: o
                                }
                            }),
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new CheckBoxOption({
                            label: "Loop",
                            visible: function visible() {
                                return animAnimate.val() == "load"
                            },
                            value: [component.properties, "animation-load-loop", 0],
                            component: component,
                            history: "Modify Component Animation"
                        }));
                        anim.add(new ButtonOption({
                            text: "Play",
                            visible: function visible() {
                                if (!animAnimate.val() || animAnimate.val() == "none") {
                                    return false
                                }
                                if (animAnimate.val() == "scroll" && animScrollType.val() == "parallax-bg") {
                                    return false
                                }
                                return true
                            },
                            layout: "row-right",
                            onClick: function onClick() {
                                app.canvas.hideSystemUI();
                                framework.playAnimation(component);
                                setTimeout(function() {
                                    framework.stopAnimation(component);
                                    app.canvas.showSystemUI()
                                }, framework.getAnimationDuration(component))
                            }
                        }))
                    }
                }
            }, {
                key: "getComponentBadges",
                value: function getComponentBadges(component) {
                    var badges = [];
                    if (this.isComponentAnimated(component)) {
                        badges.push({
                            className: "star",
                            title: "Animated Component",
                            icon: "stars"
                        })
                    }
                    return badges
                }
            }, {
                key: "componentSupportsAnimation",
                value: function componentSupportsAnimation(component) {
                    return this.componentSupportsOptions(component) && !(component instanceof HTML || component instanceof Body)
                }
            }, {
                key: "componentSupportsOptions",
                value: function componentSupportsOptions(component) {
                    return !(component instanceof CustomCode)
                }
            }, {
                key: "componentSupportsTextOptions",
                value: function componentSupportsTextOptions(component) {
                    return this.componentSupportsOptions(component) && !(component instanceof Image || component instanceof CarouselIndicators || component instanceof ButtonGroup || component instanceof ButtonToolbar || component instanceof Dropdown || component instanceof InputBase || component instanceof Select || component instanceof Icon || component instanceof GoogleMap || component instanceof Video || component instanceof ResponsiveEmbed || component instanceof Hr || component instanceof ProgressBar)
                }
            }, {
                key: "componentSupportsColorOptions",
                value: function componentSupportsColorOptions(component) {
                    return this.componentSupportsOptions(component) && !(component instanceof NavBar || component instanceof Nav)
                }
            }, {
                key: "isComponentAnimated",
                value: function isComponentAnimated(component) {
                    return !!component.properties.animation && component.properties.animation != "none"
                }
            }, {
                key: "getAnimationDuration",
                value: function getAnimationDuration(component) {
                    var duration = 0;
                    if (component.properties.animation == "scroll") {
                        duration = Number(component.properties["animation-scroll-duration"] || 0);
                        if (!duration) {
                            duration = 400
                        }
                        if ("animation-scroll-delay" in component.properties) {
                            duration += Number(component.properties["animation-scroll-delay"])
                        }
                        duration += 250
                    } else if (component.properties.animation == "hover") {
                        duration = 1e3;
                        var type = component.properties["animation-hover-type"];
                        if (type == "hinge") {
                            duration = 2e3
                        }
                        if (type == "bounceIn" || type == "bounceOut" || type == "flipOutX" || type == "flipOutY") {
                            duration = 750
                        }
                    } else if (component.properties.animation == "load") {
                        duration = 1e3;
                        var type = component.properties["animation-load-type"];
                        if (type == "hinge") {
                            duration = 2e3
                        }
                        if (type == "bounceIn" || type == "bounceOut" || type == "flipOutX" || type == "flipOutY") {
                            duration = 750
                        }
                    }
                    return duration
                }
            }, {
                key: "playAnimation",
                value: function playAnimation(component) {
                    var animAttributes = this.getAnimationAttributes(component, true);
                    for (var attr in animAttributes) {
                        component.element[0].setAttribute(attr, animAttributes[attr])
                    }
                    var to = 0;
                    if (component.properties.animation == "scroll") {
                        to = 250;
                        component.element[0].style.transitionDuration = "0s"
                    }
                    setTimeout(function() {
                        component.element[0].style.transitionDuration = "";
                        var _iteratorNormalCompletion18 = true;
                        var _didIteratorError18 = false;
                        var _iteratorError18 = undefined;
                        try {
                            for (var _iterator18 = this.getAnimationClasses(component, true)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                var cls = _step18.value;
                                component.element[0].classList.add(cls)
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
                    }.bind(this), to)
                }
            }, {
                key: "stopAnimation",
                value: function stopAnimation(component) {
                    for (var attr in this.getAnimationAttributes(component, true)) {
                        component.element[0].removeAttribute(attr)
                    }
                    var _iteratorNormalCompletion19 = true;
                    var _didIteratorError19 = false;
                    var _iteratorError19 = undefined;
                    try {
                        for (var _iterator19 = this.getAnimationClasses(component, true)[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                            var cls = _step19.value;
                            component.element[0].classList.remove(cls)
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
            }, {
                key: "getAnimationAttributes",
                value: function getAnimationAttributes(component) {
                    var play = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                    if (component.properties.animation == "hover") {
                        return {
                            "data-bs-hover-animate": component.properties["animation-hover-type"] || "bounce"
                        }
                    }
                    if (component.properties.animation == "load") {
                        return {}
                    }
                    var attributes = {};
                    if (component.properties["animation-scroll-type"] == "parallax-bg") {
                        attributes["data-bs-parallax-bg"] = true
                    } else {
                        attributes["data-aos"] = component.properties["animation-scroll-type"] || "fade";
                        if (component.properties["animation-scroll-duration"] && component.properties["animation-scroll-duration"] != "0") {
                            attributes["data-aos-duration"] = component.properties["animation-scroll-duration"]
                        }
                        if ("animation-scroll-offset" in component.properties && component.properties["animation-scroll-offset"] != "" && component.properties["animation-scroll-offset"] != 120) {
                            attributes["data-aos-offset"] = component.properties["animation-scroll-offset"]
                        }
                        if (component.properties["animation-scroll-delay"] && component.properties["animation-scroll-delay"] != "0") {
                            attributes["data-aos-delay"] = component.properties["animation-scroll-delay"]
                        }
                        if (component.properties["animation-scroll-once"]) {
                            attributes["data-aos-once"] = true
                        }
                        if (play) {
                            attributes["data-aos-easing"] = "ease";
                            if (!("data-aos-duration" in attributes)) {
                                attributes["data-aos-duration"] = 400
                            }
                            attributes["bs-anim-preview"] = 1
                        }
                    }
                    return attributes
                }
            }, {
                key: "getAnimationClasses",
                value: function getAnimationClasses(component) {
                    var play = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                    var arr = [];
                    if (component.properties.animation == "hover") {
                        if (play) {
                            arr.push(component.properties["animation-hover-type"] || "bounce");
                            arr.push("animated")
                        }
                    }
                    if (component.properties.animation == "load") {
                        arr.push(component.properties["animation-load-type"] || "bounce");
                        arr.push("animated");
                        if (!play && component.properties["animation-load-loop"]) {
                            arr.push("infinite")
                        }
                    }
                    if (component.properties.animation == "scroll") {
                        if (play) {
                            arr.push("aos-animate")
                        }
                    }
                    return arr
                }
            }, {
                key: "setupContext",
                value: function setupContext(context) {
                    _get(Object.getPrototypeOf(Bootstrap.prototype), "setupContext", this).call(this, context);
                    this.setupContextTheme(context);
                    return this.loadThemeStyles(context)
                }
            }, {
                key: "setupContextTheme",
                value: function setupContextTheme(context) {
                    var theme = context.settings.theme;
                    if (this.themeExists(theme)) {
                        context.settings.theme = this.getTheme(theme)
                    } else {
                        var newTheme = this.parseBootstrapTheme(theme.raw, theme.name || context.name);
                        this.addTheme(newTheme);
                        context.settings.theme = newTheme;
                        app.notifications.create({
                            title: "Missing theme was imported"
                        }).show()
                    }
                }
            }, {
                key: "injectExportItems",
                value: function injectExportItems(context, options) {
                    return {
                        operations: [],
                        files: []
                    }
                }
            }, {
                key: "exportContext",
                value: function exportContext(context, options) {
                    var framework = this;
                    return new Promise(function(resolve, reject) {
                        var files = {};
                        var operations = [];
                        var errors = [];
                        if (options.removeUnusedImages) {
                            context.removeUnusedImages()
                        }
                        var _iteratorNormalCompletion20 = true;
                        var _didIteratorError20 = false;
                        var _iteratorError20 = undefined;
                        try {
                            for (var _iterator20 = context.assets.images.getAll()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                                var image = _step20.value;
                                files["assets/img/" + context.assets.images.getRelativePathForItem(image)] = {
                                    type: "base64",
                                    content: cleanUpDataURL(image.data)
                                }
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
                        var bspath = framework.getBootstrapCSSPath(context);
                        if (framework.isContextThemeUserMade(context)) {
                            var themeContent = framework.getActiveTheme(context).raw;
                            files[bspath] = {
                                type: "plain",
                                content: themeContent
                            }
                        } else if (!options.useCDN || !framework.contextThemeHasCDN(context)) {
                            var originalSheet = framework.getStylesheetForActiveTheme(context);
                            operations.push({
                                path: bspath,
                                op: readFileAsPlaintext(originalSheet),
                                type: "plain"
                            })
                        }
                        var additionalExports = framework.injectExportItems(context, options);
                        Object.assign(files, additionalExports.files);
                        operations.push.apply(operations, _toConsumableArray(additionalExports.operations));
                        if (!options.useCDN) {
                            operations.push({
                                path: framework.getjQueryPath(context),
                                op: readFileAsPlaintext("../assets/cogworks/embed/js/jquery-" + framework.getFulljQueryVersion(context) + ".min.js"),
                                type: "plain"
                            });
                            operations.push({
                                path: framework.getBootstrapJSPath(context),
                                op: readFileAsPlaintext("../assets/cogworks/embed/js/bootstrap" + framework.version + ".min.js"),
                                type: "plain"
                            });
                            var _iteratorNormalCompletion21 = true;
                            var _didIteratorError21 = false;
                            var _iteratorError21 = undefined;
                            try {
                                for (var _iterator21 = framework.getUsedIconFontPaths(context)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                    var path = _step21.value;
                                    operations.push({
                                        path: "assets/" + path.destination,
                                        op: readFileAsBase64("../assets/cogworks/embed/" + path.source),
                                        type: "base64"
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
                        }
                        if (context.containsSmartForms()) {
                            operations.push({
                                path: framework.getSmartFormsJSPath(context),
                                op: readFileAsPlaintext("../assets/cogworks/embed/js/smart-forms.min.js"),
                                type: "plain"
                            })
                        }
                        if (options.minify) {
                            var result = context.minifyCSS();
                            if (result.data) {
                                if (result.status === "fail") {
                                    console.error({
                                        errors: result.errors,
                                        warnings: result.warnings
                                    });
                                    errors.push("Couldn't minify CSS.")
                                }
                                files[context.getMinifiedCSSPath()] = {
                                    content: result.data,
                                    type: "plain"
                                }
                            }
                            result = context.minifyJS();
                            if (result.status === "fail") {
                                errors.push.apply(errors, _toConsumableArray(result.errors))
                            }
                            if (result.data) {
                                files[context.getMinifiedJSPath()] = {
                                    content: result.data,
                                    type: "plain"
                                }
                            }
                        } else {
                            var _iteratorNormalCompletion22 = true;
                            var _didIteratorError22 = false;
                            var _iteratorError22 = undefined;
                            try {
                                for (var _iterator22 = context.assets.css.getLocalCSSResources()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                                    var stylesheet = _step22.value;
                                    if (!stylesheet.isVisible()) {
                                        continue
                                    }
                                    files["assets/css/" + context.assets.css.getRelativePathForItem(stylesheet)] = {
                                        content: stylesheet.generateCSS(context),
                                        type: "plain"
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
                            var _iteratorNormalCompletion23 = true;
                            var _didIteratorError23 = false;
                            var _iteratorError23 = undefined;
                            try {
                                for (var _iterator23 = context.assets.css.getLocalSASSResources()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                                    var sass = _step23.value;
                                    if (!sass.isVisible()) {
                                        continue
                                    }
                                    files["assets/css/" + context.assets.css.getRelativePathForSASS(sass)] = {
                                        content: sass.generateCSS(context),
                                        type: "plain"
                                    }
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
                            var _iteratorNormalCompletion24 = true;
                            var _didIteratorError24 = false;
                            var _iteratorError24 = undefined;
                            try {
                                for (var _iterator24 = context.assets.js.getLocal()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                                    var script = _step24.value;
                                    files["assets/js/" + context.assets.js.getRelativePathForItem(script)] = {
                                        content: script.value,
                                        type: "plain"
                                    }
                                }
                            } catch (err) {
                                _didIteratorError24 = true;
                                _iteratorError24 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
                                        _iterator24["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError24) {
                                        throw _iteratorError24
                                    }
                                }
                            }
                        }
                        if (options.exportSCSS) {
                            var _iteratorNormalCompletion25 = true;
                            var _didIteratorError25 = false;
                            var _iteratorError25 = undefined;
                            try {
                                for (var _iterator25 = context.assets.css.getLocalSASSResources()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                                    var sass = _step25.value;
                                    files["assets/scss/" + context.assets.css.getRelativePathForItem(sass)] = {
                                        content: sass.value,
                                        type: "plain"
                                    }
                                }
                            } catch (err) {
                                _didIteratorError25 = true;
                                _iteratorError25 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
                                        _iterator25["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError25) {
                                        throw _iteratorError25
                                    }
                                }
                            }
                        }
                        var _iteratorNormalCompletion26 = true;
                        var _didIteratorError26 = false;
                        var _iteratorError26 = undefined;
                        try {
                            for (var _iterator26 = context.generateHTML()[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                                var page = _step26.value;
                                files[page.path] = {
                                    type: "plain",
                                    content: page.html
                                }
                            }
                        } catch (err) {
                            _didIteratorError26 = true;
                            _iteratorError26 = err
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
                                    _iterator26["return"]()
                                }
                            } finally {
                                if (_didIteratorError26) {
                                    throw _iteratorError26
                                }
                            }
                        }
                        if (operations.length) {
                            return resolve(Promise.all(operations.map(function(operation) {
                                return operation.op
                            })).then(function(ops) {
                                for (var i = 0; i < ops.length; i++) {
                                    files[operations[i].path] = {
                                        type: operations[i].type,
                                        content: ops[i].content
                                    }
                                }
                                return {
                                    status: "success",
                                    errors: errors,
                                    files: files
                                }
                            }))
                        }
                        resolve({
                            status: "success",
                            errors: errors,
                            files: files
                        })
                    })
                }
            }, {
                key: "previewContext",
                value: function previewContext(context, path, parsed, headers) {
                    var framework = this;
                    return new Promise(function(resolve, reject) {
                        if (!app.settings.previewEnabled) {
                            return reject()
                        }
                        if (path == "/bs-lastchange") {
                            return resolve({
                                content: app.lastChange.toString(),
                                headers: {
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        }
                        if (path == "/bootstrap/css/bootstrap.min.css") {
                            if (framework.isContextThemeUserMade(context)) {
                                var content = framework.getActiveTheme(context).raw;
                                return resolve({
                                    content: content,
                                    headers: {
                                        "Content-Type": "text/css",
                                        "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                    }
                                })
                            } else {
                                var theme = framework.getStylesheetForActiveTheme(context);
                                return resolve(readFileAsBase64(theme, {
                                    "Content-Type": "text/css",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }))
                            }
                        }
                        if (path == "/bootstrap/js/bootstrap.min.js") {
                            path = "/js/bootstrap" + framework.version + ".min.js"
                        }
                        if (path == "/") {
                            path = "/" + app.context.pages.getRelativePathForItem(app.context.page)
                        }
                        var decodedPath = decodeURIComponent(path.slice(1));
                        if (context.pages.hasRelativePathItem(decodedPath)) {
                            var html = context.generateHTML(decodedPath, true);
                            return resolve({
                                content: html,
                                headers: {
                                    "Content-Type": "text/html",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        } else if (/\.html$/.test(decodedPath)) {
                            return resolve({
                                content: '<html><head><meta http-equiv="refresh" content="0; url=/" /></head></html>',
                                headers: {
                                    "Content-Type": "text/html",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        }
                        if (context.assets.images.hasRelativePathItem(decodedPath)) {
                            var img = context.assets.images.getItemByRelativePath(decodedPath);
                            return resolve({
                                content: cleanUpDataURL(img.data),
                                decode: "base64",
                                contentType: mimeTypes[img.extension]
                            })
                        }
                        if (context.assets.css.hasRelativePathItem(decodedPath)) {
                            var css = context.assets.css.getItemByRelativePath(decodedPath);
                            return resolve({
                                content: css.generateCSS(context),
                                headers: {
                                    "Content-Type": "text/css",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        }
                        var sassPath = decodedPath.replace(/.compiled.css$/, ".scss");
                        if (context.assets.css.hasRelativePathItem(sassPath)) {
                            var sass = context.assets.css.getItemByRelativePath(sassPath);
                            return resolve({
                                content: sass.generateCSS(context),
                                headers: {
                                    "Content-Type": "text/css",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        }
                        if (context.assets.js.hasRelativePathItem(decodedPath)) {
                            var js = context.assets.js.getItemByRelativePath(decodedPath);
                            return resolve({
                                content: js.value,
                                headers: {
                                    "Content-Type": "text/javascript",
                                    "Cache-Control": "no-cache, must-revalidate, max-age=0"
                                }
                            })
                        }
                        if (path.slice(0, 16) == "/bootstrap/fonts") {
                            path = "/bootstrap/3/fonts" + path.slice(16)
                        }
                        if (path != "/favicon.ico") {
                            path = "../assets/cogworks/embed" + path
                        }
                        return resolve(readFileAsBase64(path))
                    })
                }
            }, {
                key: "convertUpFromTo",
                value: function convertUpFromTo(original, upgraded) {
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var _iteratorNormalCompletion27 = true;
                    var _didIteratorError27 = false;
                    var _iteratorError27 = undefined;
                    try {
                        for (var _iterator27 = animationProperties[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                            var prop = _step27.value;
                            if (prop in original.properties) {
                                upgraded.properties[prop] = original.properties[prop]
                            }
                        }
                    } catch (err) {
                        _didIteratorError27 = true;
                        _iteratorError27 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
                                _iterator27["return"]()
                            }
                        } finally {
                            if (_didIteratorError27) {
                                throw _iteratorError27
                            }
                        }
                    }
                    return _get(Object.getPrototypeOf(Bootstrap.prototype), "convertUpFromTo", this).call(this, original, upgraded, options)
                }
            }, {
                key: "applyPseudoAssetsForContext",
                value: function applyPseudoAssetsForContext(context) {
                    var _this = this;
                    if (!context.isExport && !context.isPreview) {
                        return
                    }
                    var isAnimateCSSUsed = false,
                        isAOSUsed = false,
                        isHoverCSSUsed = false,
                        isParallaxUsed = false,
                        ret = [];
                    var _iteratorNormalCompletion28 = true;
                    var _didIteratorError28 = false;
                    var _iteratorError28 = undefined;
                    try {
                        for (var _iterator28 = context.pages.getAll()[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                            var p = _step28.value;
                            var _iteratorNormalCompletion29 = true;
                            var _didIteratorError29 = false;
                            var _iteratorError29 = undefined;
                            try {
                                for (var _iterator29 = p.findInTreeCallback(function(comp) {
                                        return _this.isComponentAnimated(comp)
                                    })[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                                    var comp = _step29.value;
                                    if (comp.properties.animation == "scroll") {
                                        if (comp.properties["animation-scroll-type"] == "parallax-bg") {
                                            isParallaxUsed = true
                                        } else {
                                            isAOSUsed = true
                                        }
                                    }
                                    if (comp.properties.animation == "hover" || comp.properties.animation == "load") {
                                        isAnimateCSSUsed = true
                                    }
                                    if (comp.properties.animation == "hover") {
                                        isHoverCSSUsed = true
                                    }
                                }
                            } catch (err) {
                                _didIteratorError29 = true;
                                _iteratorError29 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
                                        _iterator29["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError29) {
                                        throw _iteratorError29
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError28 = true;
                        _iteratorError28 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
                                _iterator28["return"]()
                            }
                        } finally {
                            if (_didIteratorError28) {
                                throw _iteratorError28
                            }
                        }
                    }
                    if (isAOSUsed) {
                        context.assets.css.addOp(context.assets.css.createLink("https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css"))["do"]();
                        context.assets.js.addOp(context.assets.js.createLink("https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.js"))["do"]()
                    }
                    if (isAnimateCSSUsed) {
                        context.assets.css.addOp(context.assets.css.createLink("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"))["do"]()
                    }
                    var includeJS = "";
                    if (isAOSUsed) {
                        includeJS += "\tAOS.init({ disable: 'mobile' });\n"
                    }
                    if (isHoverCSSUsed) {
                        includeJS += "\t$('[data-bs-hover-animate]')\n" + "\t\t.mouseenter( function(){ var elem = $(this); elem.addClass('animated ' + elem.attr('data-bs-hover-animate')) })\n" + "\t\t.mouseleave( function(){ var elem = $(this); elem.removeClass('animated ' + elem.attr('data-bs-hover-animate')) });\n"
                    }
                    if (isParallaxUsed) {
                        includeJS += "\n(function(){\n\n\tif(!('requestAnimationFrame' in window)) return;\n\tif(/Mobile|Android/.test(navigator.userAgent)) return;\n\n\tvar backgrounds = [];\n\n\t$('[data-bs-parallax-bg]').each(function(){\n\t\tvar el = $(this);\n\t\tvar bg = $('<div>');\n\n\t\tbg.css({\n\t\t\tbackgroundImage: el.css('background-image'),\n\t\t\tbackgroundSize: 'cover',\n\t\t\tbackgroundPosition: 'center',\n\t\t\tposition: 'absolute',\n\t\t\theight:'200%',\n\t\t\twidth:'100%',\n\t\t\ttop:0, left:0,\n\t\t\tzIndex: -100\n\t\t});\n\n\t\tbg.appendTo(el);\n\t\tbackgrounds.push(bg[0]);\n\n\t\tel.css({\n\t\t\tposition:'relative',\n\t\t\tbackground:'transparent',\n\t\t\toverflow: 'hidden',\n\t\t});\n\t});\n\n\tif(!backgrounds.length) return;\n\n\tvar visible = [];\n\tvar scheduled;\n\n\t$(window).on('scroll resize', scroll);\n\n\tscroll();\n\n\tfunction scroll(){\n\n\t\tvisible.length = 0;\n\n\t\tfor(var i = 0; i < backgrounds.length; i++){\n\t\t\tvar rect = backgrounds[i].parentNode.getBoundingClientRect();\n\n\t\t\tif(rect.bottom > 0 && rect.top < window.innerHeight){\n\t\t\t\tvisible.push({\n\t\t\t\t\trect: rect,\n\t\t\t\t\tnode: backgrounds[i]\n\t\t\t\t});\n\t\t\t}\n\n\t\t}\n\n\t\tcancelAnimationFrame(scheduled);\n\n\t\tif(visible.length){\n\t\t\tscheduled = requestAnimationFrame(update);\n\t\t}\n\n\t}\n\n\tfunction update(){\n\n\t\tfor(var i = 0; i < visible.length; i++){\n\t\t\tvar rect = visible[i].rect;\n\t\t\tvar node = visible[i].node;\n\n\t\t\tvar quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);\n\n\t\t\tnode.style.transform = 'translate3d(0, '+(-50*quot)+'%, 0)';\n\t\t}\n\n\t}\n\n})();\n"
                    }
                    if (includeJS) {
                        includeJS = "$(document).ready(function(){\n" + includeJS + "});";
                        var name = context.assets.js.generateUniqueFreeName("bs-animation", "js");
                        var jsfile = context.assets.js.createItem(name);
                        jsfile.value = includeJS;
                        context.assets.js.addOp(jsfile)["do"]()
                    }
                }
            }, {
                key: "updateHTMLHead",
                value: function updateHTMLHead(html) {
                    var context = html.context();
                    var page = html.page();
                    var themeCSS = this.htmlToThemeElement.get(html) || $();
                    var bootstrapActiveTheme = this.htmlToBootstrapTheme.get(html);
                    var hasAnimationCSS = this.htmlToAnimationCSS.get(html);
                    if (context.isDesign) {
                        if (!themeCSS.length || bootstrapActiveTheme != context.settings.theme.id) {
                            themeCSS.remove();
                            if (this.isContextThemeUserMade(context)) {
                                var content = this.getActiveTheme(context).raw;
                                content = content.replace(/\.\.\/fonts\//g, "embed/bootstrap/" + this.version + "/fonts/");
                                themeCSS = $("<style>").text(content);
                                themeCSS[0]["bs-tag-override"] = {
                                    tag: "link",
                                    attributes: [{
                                        name: "rel",
                                        value: "stylesheet"
                                    }, {
                                        name: "href",
                                        value: "bootstrap.min.css"
                                    }]
                                }
                            } else {
                                var sheet = this.getURLsForBootstrapCSS(context)[0];
                                themeCSS = $('<link rel="stylesheet" href="' + sheet + '">');
                                themeCSS[0]["bs-href-override"] = "bootstrap.min.css"
                            }
                            html.head.find("title").after(themeCSS);
                            this.htmlToBootstrapTheme.set(html, context.settings.theme.id)
                        }
                        if (!hasAnimationCSS) {
                            html.head.append('<link rel="stylesheet" href="' + context.assetPath + 'animation/animate.min.css" bs-system-element bs-hidden>');
                            html.head.append('<link rel="stylesheet" href="' + context.assetPath + 'animation/aos.min.css" bs-system-element bs-hidden>');
                            this.htmlToAnimationCSS.set(html, true)
                        }
                    } else {
                        if (!themeCSS.length) {
                            var url = this.getURLsForBootstrapCSS(context, page.getDepth());
                            themeCSS = $();
                            var _iteratorNormalCompletion30 = true;
                            var _didIteratorError30 = false;
                            var _iteratorError30 = undefined;
                            try {
                                for (var _iterator30 = url[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                                    var u = _step30.value;
                                    themeCSS = themeCSS.add('<link rel="stylesheet" href="' + u + '">')
                                }
                            } catch (err) {
                                _didIteratorError30 = true;
                                _iteratorError30 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
                                        _iterator30["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError30) {
                                        throw _iteratorError30
                                    }
                                }
                            }
                            html.head.append(themeCSS)
                        }
                    }
                    this.htmlToThemeElement.set(html, themeCSS);
                    html.addResourcesToPage(this.getSystemFonts(context), html.head[0], context, "systemFonts");
                    html.addResourcesToPage(this.getUsedIconFontResources(context), html.head[0], context, "iconFonts")
                }
            }, {
                key: "updateHTMLBody",
                value: function updateHTMLBody(html) {
                    var context = html.context();
                    var page = html.page();
                    if (context.isExport || context.isPreview) {
                        var js = [];
                        var tmp = document.createElement("script");
                        tmp.src = this.getURLForjQuery(context, page.getDepth());
                        js.push(tmp);
                        tmp = document.createElement("script");
                        tmp.src = this.getURLForBootstrapJS(context, page.getDepth());
                        js.push(tmp);
                        if (context.containsSmartForms()) {
                            tmp = document.createElement("script");
                            tmp.src = this.getURLForSmartFormsJS(context, page.getDepth());
                            js.push(tmp)
                        }
                        var _iteratorNormalCompletion31 = true;
                        var _didIteratorError31 = false;
                        var _iteratorError31 = undefined;
                        try {
                            for (var _iterator31 = js[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                                var j = _step31.value;
                                html.body.element.append(j)
                            }
                        } catch (err) {
                            _didIteratorError31 = true;
                            _iteratorError31 = err
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
                                    _iterator31["return"]()
                                }
                            } finally {
                                if (_didIteratorError31) {
                                    throw _iteratorError31
                                }
                            }
                        }
                    }
                }
            }, {
                key: "importBootstrapThemeAction",
                value: function importBootstrapThemeAction() {
                    var that = this;
                    electron.showFileOpenDialog({
                        filters: [{
                            name: "Bootstrap Theme (.css)",
                            extensions: ["css"]
                        }],
                        defaultPath: electron.readSetting("lastBootstrapThemePath") || electron.readSetting("lastDesignPath")
                    }, function(path) {
                        if (Array.isArray(path)) {
                            path = path[0]
                        }
                        if (!path) return;
                        electron.saveSetting("lastBootstrapThemePath", path);
                        electron.readFile(path).then(function(contents) {
                            var parsed = parsePath(path);
                            var result = that.parseBootstrapTheme(contents, parsed.name.replace(".min", ""));
                            that.addTheme(result);
                            app.trigger("bootstrap-theme-added")
                        })["catch"](function(error) {
                            console.error(error);
                            app.alertDialog.open({
                                title: "Invalid CSS",
                                message: "This file contains invalid CSS and can't be imported."
                            })
                        })
                    })
                }
            }, {
                key: "removeBootstrapThemeAction",
                value: function removeBootstrapThemeAction(theme) {
                    this.removeTheme(theme);
                    app.trigger("bootstrap-theme-removed")
                }
            }, {
                key: "renameBootstrapThemeAction",
                value: function renameBootstrapThemeAction(theme, newName) {
                    this.renameTheme(theme, newName);
                    app.trigger("bootstrap-theme-renamed")
                }
            }, {
                key: "getIframeStyles",
                value: function getIframeStyles() {
                    var styles = _get(Object.getPrototypeOf(Bootstrap.prototype), "getIframeStyles", this).call(this);
                    styles += "\n\n\t\t/* Giving sizes to some elements. */\n\n\t\tdiv[class*=\"col-\"]:empty:before,\n\t\tform:empty:before,\n\t\t.row:empty:before,\n\t\t.form-row:empty:before,\n\t\t.form-group:empty:before,\n\t\t.container:empty:before,\n\t\t.container-fluid:empty:before{\n\t\t\tbackground-color:#eee;\n\t\t\tcontent:'Empty Row';\n\t\t\tline-height:40px;\n\t\t\ttext-align: center;\n\t\t\tdisplay:block;\n\t\t\tline-height:80px;\n\t\t\tfont-size:24px;\n\t\t\tcolor:#aaa;\n\t\t\tfont-weight:bold;\n\t\t}\n\n\t\tdiv[class*=\"col-\"]:empty:before{\n\t\t\tcontent:'Empty Column';\n\t\t}\n\n\t\tform:empty:before{\n\t\t\tcontent:'Empty Form';\n\t\t}\n\n\t\t.form-group:empty:before{\n\t\t\tcontent:'Empty Form Group';\n\t\t}\n\n\t\tform.navbar-form:empty:before{\n\t\t\tdisplay: inline-block;\n\t\t\tpadding:0 40px;\n\t\t\tfont-size:16px;\n\t\t\tline-height:36px;\n\t\t}\n\n\t\t.container:empty:before,\n\t\t.container-fluid:empty:before{\n\t\t\tcontent:'Empty Container';\n\t\t}\n\n\t\t.thumbnail img:not([src]){\n\t\t\tbackground-repeat: no-repeat;\n\t\t    background-size: 100% 85%;\n\t\t    background-position-y: 50%;\n\t\t    width: 100%;\n\t\t\theight: 180px;\n\t\t}\n\n\t\t/* Making the dropdown menus have a white background when they're edited */\n\n\t\t.dropdown-item:active,\n\t\t.dropdown-menu>li>a:focus{\n\t\t\tbackground:unset;\n\t\t\tcolor:unset;\n\t\t}\n\n\t\t/* This is needed because the li items are 0x0px by default,\n\t\tand bootstrap studio can't select them */\n\n\t\t.pagination>li {\n\t\t  float: left;\n\t\t}\n\n\t\t/* Iframes without src are colored in gray */\n\t\t.embed-responsive iframe:not([src]){\n\t\t\tbackground-color:#ddd;\n\t\t}\n\n\t\t/* This is needed, otherwise split buttons in input groups break into two lines. */\n\n\t\t.input-group-btn .btn-group > .btn{\n\t\t\tfloat:none;\n\t\t}\n\n\t\t";
                    return styles
                }
            }]);
            return Bootstrap
        }(BaseFramework);
        module.exports = Bootstrap;

        function createOverrideCheck(component, prop) {
            return function() {
                var block = component.getStyleTarget();
                var allCSS = component.getMatchingCSS();
                var index = allCSS.indexOf(block);
                if (index > 0) {
                    var overridenBy = null;
                    for (var i = 0; i < index; i++) {
                        var rule = allCSS[i].getRuleByProperty(prop);
                        if (rule) {
                            overridenBy = allCSS[i].selector
                        }
                    }
                }
                if (!overridenBy) {
                    return false
                }
                return {
                    class: "warning",
                    content: '<i class="material-icons">error</i>',
                    message: "This rule is overriden by " + overridenBy
                }
            }
        }

        function createPreviewHandler(component, prop) {
            return function(val) {
                var block = component.getStyleTarget();
                var clone = block.clone();
                var tmpRule = clone.getRuleByProperty(prop);
                if (!tmpRule) {
                    tmpRule = clone.createRule();
                    tmpRule.property = prop;
                    clone.addSmart(tmpRule)
                }
                var preview = clone.previewControl();
                if (!val) {
                    preview.clear()
                } else {
                    tmpRule.value = val;
                    if (tmpRule.isValid()) {
                        preview.set()
                    }
                }
            }
        }

        function createPlaceholderHandler(component, id) {
            var prop = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            return function() {
                var block = component.getStyleTarget();
                var allCSS = component.getMatchingCSS();
                var index = allCSS.indexOf(block);
                var value = null;
                if (index > -1) {
                    for (var i = 0; i <= index; i++) {
                        var rule = allCSS[i].getRuleByProperty(id);
                        if (rule) {
                            if (i == index) {
                                return ""
                            }
                            value = rule.value;
                            break
                        }
                    }
                }
                if (value) {
                    if (id == "background-image") {
                        value = processImageValue(component.context(), value)
                    }
                    return value
                }
                if (!prop) {
                    return "none"
                }
                value = window.getComputedStyle(component.element[0])[prop];
                if (value == "rgba(0, 0, 0, 0)") {
                    value = "transparent"
                }
                if (id == "background-image") {
                    value = processImageValue(component.context(), value)
                }
                return value
            }
        }

        function quickCreateNumericCSSRule(component, id, property, label) {
            var collapsed = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
            return new TextBoxOption({
                id: id + "-option",
                label: label,
                showIncrementHandle: true,
                defaultIncrementValue: createDefaultIncrementValueHandler(component, property),
                badge: createOverrideCheck(component, id),
                placeholder: createPlaceholderHandler(component, id, property),
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id),
                collapsed: collapsed
            })
        }

        function quickCreateColorCSSRule(component, id, property, label) {
            var collapsed = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
            return new TextBoxOption({
                id: id + "-option",
                label: label,
                showColorPreview: true,
                badge: createOverrideCheck(component, id),
                placeholder: createPlaceholderHandler(component, id, property),
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id),
                collapsed: collapsed
            })
        }

        function quickCreateTextCSSRule(component, id, property, label) {
            var collapsed = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
            return new TextBoxOption({
                id: id + "-option",
                label: label,
                badge: createOverrideCheck(component, id),
                placeholder: createPlaceholderHandler(component, id, property),
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id),
                collapsed: collapsed
            })
        }

        function quickCreateTextButtonCSSRule(component, id, property, label, action) {
            var buttonIcon = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
            var collapsed = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];
            return new TextBoxOption({
                id: id + "-option",
                label: label,
                showButton: true,
                buttonIcon: buttonIcon,
                buttonAction: action,
                badge: createOverrideCheck(component, id),
                placeholder: createPlaceholderHandler(component, id, property),
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id),
                collapsed: collapsed
            })
        }

        function quickCreateSliderCSSRule(component, id, property, label) {
            var range = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
            var collapsed = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];
            var units = arguments.length <= 6 || arguments[6] === undefined ? [] : arguments[6];
            return new RangeOption({
                id: id + "-option",
                label: label,
                range: range,
                units: units,
                badge: createOverrideCheck(component, id),
                placeholder: createPlaceholderHandler(component, id, property),
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id),
                collapsed: collapsed
            })
        }

        function quickCreateCompositeOption(component, id, property) {
            var separator = arguments.length <= 3 || arguments[3] === undefined ? " " : arguments[3];
            var collapsed = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
            return new CompositeOption({
                id: id + "-option",
                value: createValueHandler(component, id),
                onChangePreview: createPreviewHandler(component, id, property),
                separator: separator,
                collapsed: collapsed
            })
        }

        function quickCreateFilterCSSRule(component, id, property, label) {
            var range = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
            var collapsed = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];
            var units = arguments.length <= 6 || arguments[6] === undefined ? [] : arguments[6];
            var placeholder = arguments.length <= 7 || arguments[7] === undefined ? 0 : arguments[7];
            var option = new RangeOption({
                id: id + "-option",
                property: property,
                label: label,
                range: range,
                units: units,
                format: new RegExp(property + "\\((\\s*)?(-?(\\d+)?(\\.\\d+)?)(" + units.join("|") + ")(\\s*)?\\)", "g"),
                formatValue: function formatValue(match) {
                    return (match[2] || "") + (match[5] || "")
                },
                badge: createOverrideCheck(component, id),
                placeholder: placeholder,
                valueOp: function valueOp(val) {
                    if (val === undefined) {
                        return option.parent.getValueForChild(option)
                    } else {
                        option.parent.changeHandler()
                    }
                },
                onChangePreview: function onChangePreview() {},
                collapsed: collapsed
            });
            return option
        }

        function quickCreateButtonActions(properties) {
            return function(control, e) {
                var rect = e.target.getBoundingClientRect();
                var options = [];
                var _iteratorNormalCompletion32 = true;
                var _didIteratorError32 = false;
                var _iteratorError32 = undefined;
                try {
                    for (var _iterator32 = properties[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                        var prop = _step32.value;
                        options.push({
                            name: prop,
                            action: function(prop) {
                                control.val(prop);
                                control.commitChanges()
                            }.bind(this, prop)
                        })
                    }
                } catch (err) {
                    _didIteratorError32 = true;
                    _iteratorError32 = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
                            _iterator32["return"]()
                        }
                    } finally {
                        if (_didIteratorError32) {
                            throw _iteratorError32
                        }
                    }
                }
                app.contextMenu.show(rect.right, rect.bottom, options, {
                    gravity: "left",
                    theme: "dark"
                })
            }
        }

        function createDefaultIncrementValueHandler(component, prop) {
            return function() {
                return (parseInt(window.getComputedStyle(component.element[0])[prop], 10) || "0") + "px"
            }
        }

        function createValueHandler(component, prop) {
            var def = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];
            return function(val) {
                var block = component.getStyleTarget();
                var rule = block.getRuleByProperty(prop);
                if (val == null) {
                    if (rule) {
                        if (prop == "background-image") {
                            return processImageValue(component.context(), rule.value)
                        }
                        return rule.value
                    }
                    return def
                } else {
                    if (prop == "background-image" && val) {
                        val = 'url("' + val + '")'
                    }
                    if (rule && rule.value == val) {
                        return
                    }
                    var context = component.context();
                    var resource = context.assets.css.findResourceForBlock(block);
                    var op = block.updateRuleOp(prop, val);
                    op["do"]();
                    block.applyStyles();
                    if (block instanceof CSSBlockStyle) {
                        component.update()
                    } else {
                        app.trigger("context-css-changed", context, [resource], block)
                    }
                    app.context.history.add({
                        name: "Modify Component Style",
                        undo: function undo() {
                            op.undo();
                            block.applyStyles();
                            if (block instanceof CSSBlockStyle) {
                                component.update()
                            } else {
                                app.trigger("context-css-changed", context, [resource], block)
                            }
                        },
                        redo: function redo() {
                            op["do"]();
                            block.applyStyles();
                            if (block instanceof CSSBlockStyle) {
                                component.update()
                            } else {
                                app.trigger("context-css-changed", context, [resource], block)
                            }
                        }
                    })
                }
            }
        }

        function processImageValue(context, value) {
            value = context.replaceBlobURLWithImagePath(value);
            value = value.replace(/\s*url\(["']?/, "").replace(/['"]?\)\s*$/, "").trim();
            return value
        }
        var animationProperties = ["animation", "animation-scroll-type", "animation-scroll-duration", "animation-scroll-offset", "animation-scroll-delay", "animation-scroll-once", "animation-hover-type"];
        var animations = [{
            label: "Never",
            value: "none"
        }, {
            label: "Scroll",
            value: "scroll"
        }, {
            label: "Hover",
            value: "hover"
        }, {
            label: "Load",
            value: "load"
        }];
        var aosAnimations = ["fade", "fade-up", "fade-down", "fade-right", "fade-left", "fade-up-right", "fade-up-left", "fade-down-right", "fade-down-left", "zoom-in", "zoom-in-up", "zoom-in-down", "zoom-in-right", "zoom-in-left", "zoom-out", "zoom-out-up", "zoom-out-down", "zoom-out-right", "zoom-out-left", "slide-up", "slide-down", "slide-right", "slide-left", "flip-left", "flip-right", "flip-up", "flip-down", "parallax-bg"];
        var animateCSSAnimations = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello"];
        var aosNumberValues = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1e3, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2e3, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3e3]
    }, {
        "../../base/CSSBlockStyle": 13,
        "../../base/CustomTheme": 18,
        "../../base/IconFont": 20,
        "../../base/Template": 25,
        "../../base/TemplateTheme": 26,
        "../../base/Theme": 27,
        "../../components/base/Body": 34,
        "../../components/base/CustomCode": 42,
        "../../components/base/Form": 49,
        "../../components/base/HTML": 50,
        "../../components/base/Hr": 54,
        "../../components/base/Icon": 55,
        "../../components/base/InputBase": 58,
        "../../components/base/Map": 80,
        "../../components/base/Select": 84,
        "../../components/base/Video": 93,
        "../../components/bootstrap/ButtonGroup": 103,
        "../../components/bootstrap/ButtonToolbar": 104,
        "../../components/bootstrap/CarouselIndicators": 112,
        "../../components/bootstrap/Dropdown": 121,
        "../../components/bootstrap/Image": 127,
        "../../components/bootstrap/Nav": 139,
        "../../components/bootstrap/NavBar": 140,
        "../../components/bootstrap/ProgressBar": 147,
        "../../components/bootstrap/ResponsiveEmbed": 148,
        "../../components/images.json": 358,
        "../../config/bootstrap-icons": 360,
        "../../config/mime-types": 370,
        "../../helpers/addQueryParamsToURL": 542,
        "../../helpers/cleanUpDataURL": 548,
        "../../helpers/createHash": 553,
        "../../helpers/getFallbackForGoogleFont": 572,
        "../../helpers/parseCogComponentFormat": 591,
        "../../helpers/parseCSS": 593,
        "../../helpers/parsePath": 595,
        "../../helpers/parseThemeFonts": 596,
        "../../helpers/readFileAsBase64": 600,
        "../../helpers/readFileAsPlaintext": 601,
        "../../helpers/recursiveLoop": 602,
        "../../helpers/restoreCSSList": 604,
        "../../panels/BreadcrumbsOption": 1210,
        "../../panels/ButtonOption": 1212,
        "../../panels/CheckBoxOption": 1213,
        "../../panels/CompositeOption": 1217,
        "../../panels/GroupOption": 1222,
        "../../panels/InfoOption": 1224,
        "../../panels/RangeOption": 1237,
        "../../panels/SelectOption": 1238,
        "../../panels/TextBoxOption": 1243,
        "../../resources/IconFontResource": 1251,
        "../../tree/PackageTreeFolder": 1263,
        "../../tree/PackageTreeGroup": 1264,
        "../Framework": 537,
        "clean-css": 678,
        "uglify-js": 1192
    }]
});
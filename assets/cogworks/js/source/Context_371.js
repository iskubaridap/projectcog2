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

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var CSSResourceTreeGroup = require("../tree/CSSResourceTreeGroup");
        var FontResourceTreeGroup = require("../tree/FontResourceTreeGroup");
        var ImageResourceTreeGroup = require("../tree/ImageResourceTreeGroup");
        var JSResourceTreeGroup = require("../tree/JSResourceTreeGroup");
        var AudioResourceTreeGroup = require("../tree/AudioResourceTreeGroup");
        var PDFResourceTreeGroup = require("../tree/PDFResourceTreeGroup");
        var PageResourceTreeGroup = require("../tree/PageResourceTreeGroup");
        var CustomCode = require("../components/base/CustomCode");
        var buildCogDesignFormat = require("../helpers/buildCogDesignFormat");
        var findInTreeCallback = require("../helpers/findInTreeCallback");
        var addQueryParamsToURL = require("../helpers/addQueryParamsToURL");
        var Page = require("../base/Page");
        var MetaTag = require("../base/MetaTag");
        var clone = require("clone");
        var Context = function() {
            function Context(name, path, fileID, theme) {
                if (name === undefined) name = "";
                if (path === undefined) path = "";
                if (fileID === undefined) fileID = 0;
                _classCallCheck(this, Context);
                this.id = app.generateUniqueID();
                this.name = name;
                this.path = path;
                this.fileID = fileID;
                this.isDesign = false;
                this.isExport = false;
                this.isPreview = false;
                this.isScreenshot = false;
                this.pages = new PageResourceTreeGroup(this);
                this.framework = null;
                this.assets = {
                    images: new ImageResourceTreeGroup,
                    fonts: new FontResourceTreeGroup,
                    css: new CSSResourceTreeGroup,
                    js: new JSResourceTreeGroup,
                    audio: new AudioResourceTreeGroup,
                    pdf: new PDFResourceTreeGroup
                };
                this.customCodePlaceholders = {};
                this.customCodePlaceholderCounter = 0;
                this.settings = {
                    lms: false,
                    theme: theme,
                    jqueryVersion: 1,
                    headContent: "",
                    meta: []
                };
                this.assetPath = "../assets/cogworks/embed/";
                this.componentLinks = new Map;
                this.nextLinkID = 1;
                this.placeholders = {}
            }
            _createClass(Context, [{
                key: "destructor",
                value: function destructor() {}
            }, {
                key: "initialize",
                value: function initialize() {
                    var framework = arguments.length <= 0 || arguments[0] === undefined ? "3" : arguments[0];
                    this.framework = app.getFrameworkByVersion(framework);
                    this.settings.theme = this.settings.theme || this.framework.getDefaultTheme();
                    this.settings.jqueryVersion = this.framework.jQueryVersions[0].short;
                    this.createIndexPage();
                    var css = this.assets.css.createItem("styles.css");
                    this.assets.css.addOp(css)["do"]();
                    this.applyPseudoAssets()
                }
            }, {
                key: "createIndexPage",
                value: function createIndexPage() {
                    var p = new Page("index.html");
                    p.setContext(this);
                    p.initialize();
                    this.pages.addOp(p)["do"]();
                    this.setActivePage()
                }
            }, {
                key: "changeFramework",
                value: function changeFramework(newVersion) {
                    this.framework = app.getFrameworkByVersion(newVersion);
                    this.settings.jqueryVersion = this.framework.jQueryVersions[0].short
                }
            }, {
                key: "regenerateID",
                value: function regenerateID() {
                    this.id = app.generateUniqueID()
                }
            }, {
                key: "exists",
                value: function exists() {
                    return app.openedContexts.indexOf(this) != -1
                }
            }, {
                key: "hasResource",
                value: function hasResource(resource) {
                    if (this.pages.contains(resource)) {
                        return true
                    }
                    for (var col in this.assets) {
                        if (this.assets[col].contains(resource)) return true
                    }
                    return false
                }
            }, {
                key: "hasLocalCSS",
                value: function hasLocalCSS() {
                    return this.assets.css.getLocal().length > 0
                }
            }, {
                key: "hasLocalJS",
                value: function hasLocalJS() {
                    return this.assets.js.getLocal().length > 0
                }
            }, {
                key: "usesTemplate",
                value: function usesTemplate() {
                    return this.settings.theme.type === "template"
                }
            }, {
                key: "containsSmartForms",
                value: function containsSmartForms() {
                    var Form = require("../components/base/Form");
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = this.pages.getAll()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var p = _step.value;
                            if (p.findInTreeCallback(function(comp) {
                                    return comp instanceof Form && comp.isSmart()
                                }).length) {
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
                key: "setDescription",
                value: function setDescription(description) {
                    if (description && description.length) {
                        var meta = new MetaTag("name", "description", description);
                        this.settings.meta.push(meta)
                    }
                }
            }, {
                key: "setPlaceholders",
                value: function setPlaceholders() {
                    var placeholders = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    this.placeholders = placeholders
                }
            }, {
                key: "setActivePage",
                value: function setActivePage(page) {
                    if (!page) {
                        page = this.pages.get("index.html");
                        if (!page) {
                            page = this.pages.getAll()[0]
                        }
                    }
                    this.page = page
                }
            }, {
                key: "findResourceForCSSBlock",
                value: function findResourceForCSSBlock(block) {
                    if (this.blockToCSSCache.has(block)) {
                        return this.blockToCSSCache.get(block)
                    }
                    var css = this.assets.css.findResourceForBlock(block);
                    if (css) {
                        this.blockToCSSCache.set(block, css)
                    }
                    return css
                }
            }, {
                key: "transformResourceURL",
                value: function transformResourceURL(path, options) {
                    return this.transformImageResource(path, options)
                }
            }, {
                key: "transformImageResource",
                value: function transformImageResource(path, options) {}
            }, {
                key: "getSystemFonts",
                value: function getSystemFonts() {
                    return this.framework.getSystemFonts(this)
                }
            }, {
                key: "getUserFonts",
                value: function getUserFonts() {
                    return this.assets.fonts.getAll()
                }
            }, {
                key: "getFonts",
                value: function getFonts() {
                    return this.getSystemFonts().concat(this.getUserFonts())
                }
            }, {
                key: "depthToPath",
                value: function depthToPath() {
                    var depth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                    var relative = "";
                    for (var i = 0; i < depth; i++) {
                        relative += "../"
                    }
                    return relative
                }
            }, {
                key: "getURLForCSS",
                value: function getURLForCSS(css) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return addQueryParamsToURL(this.depthToPath(depth) + this.assetPath + "css/" + this.assets.css.getRelativePathForItem(css), css.getURLParameters(this))
                }
            }, {
                key: "getURLForSCSS",
                value: function getURLForSCSS(css) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return addQueryParamsToURL(this.depthToPath(depth) + this.assetPath + "css/" + this.assets.css.getRelativePathForSASS(css), css.getURLParameters(this))
                }
            }, {
                key: "getURLForJS",
                value: function getURLForJS(js) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return addQueryParamsToURL(this.depthToPath(depth) + this.assetPath + "js/" + this.assets.js.getRelativePathForItem(js), js.getURLParameters(this))
                }
            }, {
                key: "getURLParametersFor",
                value: function getURLParametersFor(path) {
                    return {}
                }
            }, {
                key: "applyPseudoAssets",
                value: function applyPseudoAssets() {
                    this.framework.applyPseudoAssetsForContext(this)
                }
            }, {
                key: "getCustomCodePlaceholder",
                value: function getCustomCodePlaceholder(customCode) {
                    var span = document.createElement("span");
                    for (var id in this.customCodePlaceholders) {
                        if (this.customCodePlaceholders[id] == customCode) {
                            span.textContent = "[custom-code-placeholder-" + id + "]";
                            break
                        }
                    }
                    return $(span)
                }
            }, {
                key: "createCustomCodePlaceholder",
                value: function createCustomCodePlaceholder(customCode) {
                    var id = this.customCodePlaceholderCounter;
                    this.customCodePlaceholderCounter++;
                    this.customCodePlaceholders[id] = customCode;
                    var span = document.createElement("span");
                    span.textContent = "[custom-code-placeholder-" + id + "]";
                    return $(span)
                }
            }, {
                key: "replaceCustomCodePlaceholders",
                value: function replaceCustomCodePlaceholders(html) {
                    var _this = this;
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return html.replace(/<span>\[custom-code-placeholder-(\d+)\]<\/span>/g, function(match, id) {
                        return _this.processUserCode(_this.customCodePlaceholders[id].value, depth)
                    })
                }
            }, {
                key: "cleanupCustomCodePlaceholders",
                value: function cleanupCustomCodePlaceholders() {
                    this.customCodePlaceholders = {};
                    this.customCodePlaceholderCounter = 0
                }
            }, {
                key: "processGeneratedCSS",
                value: function processGeneratedCSS(css) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return this.replaceImageURLsInCSS(css, depth)
                }
            }, {
                key: "processStyleString",
                value: function processStyleString(str) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return this.replaceImageURLsInStyle(str, depth)
                }
            }, {
                key: "processSrcsetString",
                value: function processSrcsetString(str) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    return this.replaceImageURLsInSrcset(str, depth)
                }
            }, {
                key: "processUserCode",
                value: function processUserCode(code) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var that = this;
                    code = code.replace(/style\s*=\s*(['"])([^'"]+)\1/g, function(match, quote, style) {
                        return match.replace(style, that.processStyleString(style, depth))
                    });
                    code = this.replaceImageURLsInCSS(code, depth, false);
                    return this.replaceResourceURLsInHTML(code, depth)
                }
            }, {
                key: "replaceImageURLsInCSS",
                value: function replaceImageURLsInCSS(css) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var stylesheet = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                    var that = this;
                    return css.replace(/url\(['"]?([^)'";}]+)['"]?\)/g, function(match, image) {
                        var src = that.transformImageResource(image, {
                            stylesheet: stylesheet,
                            depth: depth
                        });
                        if (src) {
                            return match.replace(image, src)
                        }
                        return match
                    })
                }
            }, {
                key: "replaceImageURLsInStyle",
                value: function replaceImageURLsInStyle(css) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var that = this;
                    return css.replace(/url\(['"]?([^)'";}]+)['"]?\)/g, function(match, image) {
                        var src = that.transformImageResource(image, {
                            depth: depth
                        });
                        if (src) {
                            return match.replace(image, src)
                        }
                        return match
                    })
                }
            }, {
                key: "replaceImageURLsInSrcset",
                value: function replaceImageURLsInSrcset(srcset) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var that = this;
                    return srcset.replace(/\S+(?:\s+\d+x\,?)?/g, function(match) {
                        return match.replace(/^[^\s\,]+/, function(image) {
                            var img = that.transformImageResource(image, {
                                depth: depth
                            });
                            if (img) {
                                return img
                            }
                            return image
                        })
                    })
                }
            }, {
                key: "matchSrcset",
                value: function matchSrcset(html, cb) {
                    var match;
                    var srcsetRegex = /srcset\s*=\s*['"]?([^'";]+)['"]?/g;
                    while (match = srcsetRegex.exec(html)) {
                        this.matchImageURLsInSrcset(match[1], cb)
                    }
                }
            }, {
                key: "matchImageURLsInSrcset",
                value: function matchImageURLsInSrcset(html, cb) {
                    var match;
                    var srcsetValueRegex = /\S+(?:\s+\d+x\,?)?/g;
                    var imageRegex = /^[^\s\,]+/;
                    while (match = srcsetValueRegex.exec(html)) {
                        var image = imageRegex.exec(match[0]);
                        if (image[0]) {
                            cb && cb(image[0])
                        }
                    }
                }
            }, {
                key: "matchImageURLsInStyle",
                value: function matchImageURLsInStyle(html, cb) {
                    var match;
                    var re = /url\(['"]?([^)'";}]+)['"]?\)/g;
                    while (match = re.exec(html)) {
                        if (match[1]) {
                            cb && cb(match[1])
                        }
                    }
                }
            }, {
                key: "matchImageURLsInSrc",
                value: function matchImageURLsInSrc(html, cb) {
                    var match;
                    var re = /(?:src|href)\s*=\s*['"]?([^,'";]+)['"]?/g;
                    while (match = re.exec(html)) {
                        if (match[1]) {
                            cb && cb(match[1])
                        }
                    }
                }
            }, {
                key: "replaceImageURLsInHTML",
                value: function replaceImageURLsInHTML(html) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var that = this;
                    html = html.replace(/(?:src|href)\s*=\s*['"]?([^,'";]+)['"]?/g, function(match, image) {
                        var src = that.transformImageResource(image, {
                            depth: depth
                        });
                        if (src) {
                            return match.replace(image, src)
                        }
                        return match
                    });
                    html = html.replace(/srcset\s*=\s*['"]?([^'";]+)['"]?/g, function(match, srcset) {
                        return 'srcset="' + that.replaceImageURLsInSrcset(srcset) + '"'
                    });
                    return html
                }
            }, {
                key: "replaceResourceURLsInHTML",
                value: function replaceResourceURLsInHTML(html) {
                    var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                    var that = this;
                    html = html.replace(/(?:href)\s*=\s*['"]?([^,'";]+)['"]?/g, function(match, url) {
                        var src = that.transformResourceURL(url, {
                            depth: depth
                        });
                        if (src) {
                            return match.replace(url, src)
                        }
                        return match
                    });
                    return this.replaceImageURLsInHTML(html, depth)
                }
            }, {
                key: "stringify",
                value: function stringify() {
                    return JSON.stringify(buildCogDesignFormat(this))
                }
            }, {
                key: "linkComponents",
                value: function linkComponents(c1, c2) {
                    if (!c1.linkID) {
                        this.addComponentToLink(c1, this.createComponentLink())
                    }
                    this.addComponentToLink(c2, c1.linkID)
                }
            }, {
                key: "addComponentToLink",
                value: function addComponentToLink(component, linkID) {
                    if (component.linkID) return;
                    if (!this.componentLinks.has(linkID)) {
                        return
                    }
                    component.linkID = linkID;
                    var arr = this.componentLinks.get(linkID);
                    arr.push(component)
                }
            }, {
                key: "unlinkComponent",
                value: function unlinkComponent(component) {
                    if (!component.linkID) return;
                    var linkID = component.linkID;
                    if (!this.componentLinks.has(linkID)) {
                        return
                    }
                    var arr = this.componentLinks.get(linkID);
                    var index = arr.indexOf(component);
                    arr.splice(index, 1);
                    delete component.linkID;
                    if (arr.length < 2) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;
                        try {
                            for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var comp = _step2.value;
                                delete comp.linkID
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
                        this.componentLinks["delete"](linkID)
                    }
                }
            }, {
                key: "softUnlinkComponent",
                value: function softUnlinkComponent(component) {
                    if (!component.linkID) return;
                    var linkID = component.linkID;
                    if (!this.componentLinks.has(linkID)) {
                        return
                    }
                    var arr = this.componentLinks.get(linkID);
                    var index = arr.indexOf(component);
                    arr.splice(index, 1);
                    if (arr.length < 2) {
                        this.componentLinks["delete"](linkID)
                    }
                }
            }, {
                key: "createComponentLink",
                value: function createComponentLink() {
                    var linkID = this.nextLinkID;
                    this.nextLinkID++;
                    this.componentLinks.set(linkID, []);
                    return linkID
                }
            }, {
                key: "getComponentsLinkedTo",
                value: function getComponentsLinkedTo(component) {
                    if (!component.linkID) return;
                    var arr = this.componentLinks.get(component.linkID);
                    return arr.filter(function(c) {
                        return c != component
                    })
                }
            }, {
                key: "removeInactiveLinks",
                value: function removeInactiveLinks() {
                    var _this2 = this;
                    this.componentLinks.forEach(function(components, linkID) {
                        var isLinkActive = components.length >= 2;
                        if (!isLinkActive) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;
                            try {
                                for (var _iterator3 = components[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var comp = _step3.value;
                                    delete comp.linkID
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
                            _this2.componentLinks["delete"](linkID)
                        }
                    })
                }
            }, {
                key: "scanTreeForLinkedComponents",
                value: function scanTreeForLinkedComponents(tree) {
                    var that = this;
                    findInTreeCallback(function(c) {
                        return c.linkID
                    }, tree).forEach(function(c) {
                        if (c.linkID >= that.nextLinkID) {
                            that.nextLinkID = c.linkID + 1
                        }
                        if (!that.componentLinks.has(c.linkID)) {
                            that.componentLinks.set(c.linkID, [])
                        }
                        that.componentLinks.get(c.linkID).push(c)
                    })
                }
            }, {
                key: "syncNewLinkedComponents",
                value: function syncNewLinkedComponents(page) {
                    var _this3 = this;
                    page.findLinkedComponents().forEach(function(c) {
                        if (_this3.componentLinks.has(c.linkID)) {
                            var original = _this3.componentLinks.get(c.linkID)[0];
                            if (!c.exists()) {
                                return
                            }
                            c.overwrite(original.serialize())
                        }
                    })
                }
            }, {
                key: "generateLinkableURLs",
                value: function generateLinkableURLs() {
                    var urls = {
                        Pages: []
                    };
                    var activePage = this.pages.findWrapperForItemRecursive(this.page);
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;
                    try {
                        for (var _iterator4 = this.pages.getAll()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var p = _step4.value;
                            var page = this.pages.findWrapperForItemRecursive(p);
                            urls.Pages.push(page.getPathRelativeTo(activePage))
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
                    var tmp = this.assets.images.getAll();
                    if (tmp.length) {
                        urls.Images = [];
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;
                        try {
                            for (var _iterator5 = tmp[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var img = _step5.value;
                                urls.Images.push(this.assets.images.getRelativePathForItem(img))
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
                    return urls
                }
            }, {
                key: "findPageWithMainNavbar",
                value: function findPageWithMainNavbar() {
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;
                    try {
                        for (var _iterator6 = this.pages.getAll()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var page = _step6.value;
                            if (page.hasMainNavbar()) {
                                return page
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
                    return null
                }
            }, {
                key: "getUserCSS",
                value: function getUserCSS() {
                    var arr = [];
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;
                    try {
                        for (var _iterator7 = this.assets.css.getLocal()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var cssResource = _step7.value;
                            arr.push.apply(arr, cssResource.blocks)
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
                    return arr
                }
            }, {
                key: "findUsedImages",
                value: function findUsedImages() {
                    var images = new Set;
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;
                    try {
                        for (var _iterator8 = this.pages.getAll()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var page = _step8.value;
                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;
                            try {
                                for (var _iterator10 = page.findUsedImages()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var image = _step10.value;
                                    images.add(image)
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
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;
                    try {
                        for (var _iterator9 = this.getUserCSS()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var block = _step9.value;
                            var _iteratorNormalCompletion11 = true;
                            var _didIteratorError11 = false;
                            var _iteratorError11 = undefined;
                            try {
                                for (var _iterator11 = block.findUsedImagePaths(this)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                    var path = _step11.value;
                                    var image = this.assets.images.getItemByRelativePath(path);
                                    if (image) {
                                        images.add(image)
                                    }
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
                    return images
                }
            }, {
                key: "removeUnusedImages",
                value: function removeUnusedImages() {
                    var _this4 = this;
                    var usedImages = this.findUsedImages();
                    this.assets.images.getAll().forEach(function(image) {
                        if (!usedImages.has(image)) {
                            _this4.assets.images.getFolderForEntry(image).removeOp(image)["do"]()
                        }
                    })
                }
            }, {
                key: "addResourcesOp",
                value: function addResourcesOp(resources) {
                    var _this5 = this;
                    var images = resources.images;
                    var css = resources.css;
                    var js = resources.js;
                    var fonts = resources.fonts;
                    var ops = [];
                    if (css) {
                        css = css.filterTree(function(c) {
                            return !_this5.assets.css.hasResourceCSS(c)
                        });
                        if (css.children.length) {
                            ops.push(this.assets.css.insertTreeOp(css, {
                                addDuplicates: true
                            }))
                        }
                    }
                    if (js) {
                        js = js.filterTree(function(j) {
                            return !_this5.assets.js.hasResourceJS(j)
                        });
                        if (js.children.length) {
                            ops.push(this.assets.js.insertTreeOp(js, {
                                addDuplicates: true
                            }))
                        }
                    }
                    if (images && images.children.length) {
                        ops.push(this.assets.images.insertTreeOp(images, {
                            ignoreDuplicates: true
                        }))
                    }
                    if (fonts) {
                        fonts = fonts.filterTree(function(f) {
                            return !_this5.assets.fonts.hasResourceFont(f)
                        });
                        if (fonts.children.length) {
                            ops.push(this.assets.fonts.insertTreeOp(fonts))
                        }
                    }
                    return {
                        do: function _do() {
                            ops.forEach(function(op) {
                                return op["do"]()
                            })
                        },
                        undo: function undo() {
                            ops.forEach(function(op) {
                                return op.undo()
                            })
                        }
                    }
                }
            }, {
                key: "addPagesOp",
                value: function addPagesOp(pages) {
                    if (!this.usesTemplate()) return;
                    var ops = [];
                    var usedImages = new Set;
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;
                    try {
                        for (var _iterator12 = pages.getAll()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var page = _step12.value;
                            page.findUsedImages().forEach(function(image) {
                                return usedImages.add(image)
                            });
                            page.replaceTemplatePlaceholders(this.placeholders)
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
                    var images = pages.context.assets.images.filterTree(function(image) {
                        return usedImages.has(image)
                    });
                    ops.push(this.addResourcesOp({
                        images: images.clone()
                    }));
                    ops.push(this.pages.insertTreeOp(pages, {
                        addDuplicates: true
                    }));
                    var that = this;
                    return {
                        do: function _do() {
                            ops.forEach(function(op) {
                                return op["do"]()
                            });
                            that.claimAllPages();
                            var _iteratorNormalCompletion13 = true;
                            var _didIteratorError13 = false;
                            var _iteratorError13 = undefined;
                            try {
                                for (var _iterator13 = pages.getAll()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                    var page = _step13.value;
                                    that.scanTreeForLinkedComponents(page.html.body)
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
                        },
                        undo: function undo() {
                            ops.forEach(function(op) {
                                return op.undo()
                            })
                        }
                    }
                }
            }, {
                key: "claimAllPages",
                value: function claimAllPages() {
                    var _this6 = this;
                    this.pages.getAll().forEach(function(p) {
                        return p.setContext(_this6)
                    })
                }
            }, {
                key: "getPagesByPath",
                value: function getPagesByPath(paths) {
                    var _this7 = this;
                    return this.pages.filterTree(function(p) {
                        return paths.includes(_this7.pages.getRelativePathForItem(p))
                    })
                }
            }, {
                key: "clone",
                value: function clone() {
                    var clone = new this.constructor(this.name, this.path, this.theme);
                    clone.unserialize(this.serialize());
                    return clone
                }
            }, {
                key: "serialize",
                value: function serialize() {
                    var meta = this.settings.meta;
                    this.settings.meta = meta.map(function(m) {
                        return m.serialize()
                    });
                    var theme = this.settings.theme;
                    this.settings.theme = theme.createDescriptor();
                    var settings = clone(this.settings);
                    this.settings.meta = meta;
                    this.settings.theme = theme;
                    return {
                        id: this.id,
                        name: this.name,
                        settings: settings,
                        placeholders: clone(this.placeholders),
                        framework: this.framework.version,
                        assets: {
                            images: this.assets.images.serialize(),
                            fonts: this.assets.fonts.serialize(),
                            css: this.assets.css.serialize(),
                            js: this.assets.js.serialize(),
                            audio: this.assets.audio.serialize(),
                            pdf: this.assets.pdf.serialize()
                        },
                        pages: this.pages.serialize()
                    }
                }
            }, {
                key: "unserialize",
                value: function unserialize(json) {
                    this.id = json.id;
                    this.name = json.name;
                    this.settings = clone(json.settings);
                    this.placeholders = clone(json.placeholders);
                    this.framework = app.getFrameworkByVersion(json.framework);
                    this.settings.meta = this.settings.meta.map(function(m) {
                        return new MetaTag(m.type, m.key, m.content)
                    });
                    this.assets.fonts.unserialize(json.assets.fonts);
                    this.assets.images.unserialize(json.assets.images);
                    this.assets.css.unserialize(json.assets.css);
                    this.assets.js.unserialize(json.assets.js);
                    this.assets.audio.unserialize(json.assets.audio);
                    this.assets.pdf.unserialize(json.assets.pdf);
                    this.pages.unserialize(json.pages, this);
                    this.applyPseudoAssets();
                    this.nextLinkID = 1;
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;
                    try {
                        for (var _iterator14 = this.pages.getAll()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var page = _step14.value;
                            this.scanTreeForLinkedComponents(page.html.body)
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
                }
            }]);
            return Context
        }();
        module.exports = Context
    }, {
        "../base/MetaTag": 21,
        "../base/Page": 23,
        "../components/base/CustomCode": 42,
        "../components/base/Form": 49,
        "../helpers/addQueryParamsToURL": 542,
        "../helpers/buildCogDesignFormat": 545,
        "../helpers/findInTreeCallback": 565,
        "../tree/CSSResourceTreeGroup": 1258,
        "../tree/FontResourceTreeGroup": 1260,
        "../tree/ImageResourceTreeGroup": 1261,
        "../tree/JSResourceTreeGroup": 1262,
        "../tree/AudioResourceTreeGroup": 1285,
        "../tree/PDFResourceTreeGroup": 1289,
        "../tree/PageResourceTreeGroup": 1266,
        "clone": 739
    }]
});
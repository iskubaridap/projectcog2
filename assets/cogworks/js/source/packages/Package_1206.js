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
        var _clone = require("clone");
        var CSSResourceTreeGroup = require("../tree/CSSResourceTreeGroup");
        var JSResourceTreeGroup = require("../tree/JSResourceTreeGroup");
        var FontResourceTreeGroup = require("../tree/FontResourceTreeGroup");
        var CSSResource = require("../resources/CSSResource");
        var FontResource = require("../resources/FontResource");
        var ImageResource = require("../resources/ImageResource");
        var JSResource = require("../resources/JSResource");
        var CSSLinkResource = require("../resources/CSSLinkResource");
        var JSLinkResource = require("../resources/JSLinkResource");
        var buildEpodFormat = require("../helpers/buildEpodFormat");
        var CustomCode = require("../components/base/CustomCode");
        var mimeTypes = require("../config/mime-types");
        var parsePath = require("../helpers/parsePath");
        var canParentTakeChildren = require("../helpers/canParentTakeChildren");
        var autocropImageData = require("../helpers/autocropImageData");
        var ScreenshotContext = require("../contexts/ScreenshotContext");
        var Package = function() {
            function Package() {
                _classCallCheck(this, Package);
                this.id = app.generateUniqueID();
                this.name = "";
                this.version = Date.now();
                this.shared = false;
                this.framework = null;
                this.preview = null;
                this.previewScale = null;
                this.previewOffset = null;
                this.canEditPreview = true;
                this.comments = null;
                this.votes = null;
                this.js = [];
                this.css = [];
                this.fonts = [];
                this.images = [];
                this.component = {}
            }
            _createClass(Package, [{
                key: "initialize",
                value: function initialize() {
                    var framework = arguments.length <= 0 || arguments[0] === undefined ? "3" : arguments[0];
                    this.framework = app.getFrameworkByVersion(framework)
                }
            }, {
                key: "getName",
                value: function getName() {
                    return this.name
                }
            }, {
                key: "getSanitizedName",
                value: function getSanitizedName() {
                    return this.name.replace(/[\/\\:!\?]/g, "")
                }
            }, {
                key: "canBeInsertedIn",
                value: function canBeInsertedIn(parent) {
                    if (!this.framework.isCompatibleWith(app.framework)) {
                        return false
                    }
                    var child = this.createTree(parent.page());
                    if (!child) {
                        return false
                    }
                    return canParentTakeChildren(parent, child)
                }
            }, {
                key: "getPrefixForResource",
                value: function getPrefixForResource() {
                    return this.name.trim().replace(/\s+/g, "-").replace(/[^\w\d-]/g, "") || "component"
                }
            }, {
                key: "isShared",
                value: function isShared() {
                    return this.shared
                }
            }, {
                key: "markShared",
                value: function markShared() {
                    this.shared = true
                }
            }, {
                key: "markUnshared",
                value: function markUnshared() {
                    this.shared = false
                }
            }, {
                key: "createCSS",
                value: function createCSS() {
                    var _this = this;
                    var cssTree = CSSResourceTreeGroup.fromArray(this.css);
                    cssTree.loop(function(css) {
                        if (css instanceof CSSResource) {
                            css.setName(_this.getPrefixForResource() + ".css")
                        }
                    });
                    return cssTree
                }
            }, {
                key: "createJS",
                value: function createJS() {
                    var _this2 = this;
                    var jsTree = JSResourceTreeGroup.fromArray(this.js);
                    jsTree.loop(function(js) {
                        if (js instanceof JSResource) {
                            js.setName(_this2.getPrefixForResource() + ".js")
                        }
                    });
                    return jsTree
                }
            }, {
                key: "createTree",
                value: function createTree(page) {
                    var tree = null;
                    if (this.framework.shouldBeConvertedTo(page.context.framework)) {
                        var ctx = this.framework.createContext();
                        tree = ctx.page.restoreComponentTree(this.component, ctx.page.html);
                        tree = tree.convertUp()
                    } else {
                        tree = page.restoreComponentTree(this.component, page.html)
                    }
                    if (tree) {
                        tree.label = this.getName()
                    }
                    return tree
                }
            }, {
                key: "createImages",
                value: function createImages() {
                    var ImageResourceTreeGroup = require("../tree/ImageResourceTreeGroup");
                    var images = new ImageResourceTreeGroup;
                    images.unserialize(this.images);
                    return images
                }
            }, {
                key: "createFonts",
                value: function createFonts() {
                    return FontResourceTreeGroup.fromArray(this.fonts)
                }
            }, {
                key: "canCreate",
                value: function canCreate(page) {
                    return this.framework.isCompatibleWith(page.context.framework)
                }
            }, {
                key: "create",
                value: function create(page) {
                    return this.createTree(page)
                }
            }, {
                key: "insertOp",
                value: function insertOp(component) {
                    var resourcesOp = this.addResourcesToContextOp(app.context);
                    var pkg = this;
                    return {
                        do: function _do(insertAction) {
                            insertAction && insertAction();
                            resourcesOp["do"]();
                            app.trigger("package-inserted", pkg)
                        },
                        undo: function undo() {
                            component.remove();
                            resourcesOp.undo();
                            app.trigger("package-removed", pkg)
                        }
                    }
                }
            }, {
                key: "addResourcesToContextOp",
                value: function addResourcesToContextOp(context) {
                    return context.addResourcesOp({
                        css: this.createCSS(),
                        js: this.createJS(),
                        images: this.createImages(),
                        fonts: this.createFonts()
                    })
                }
            }, {
                key: "generatePreview",
                value: function generatePreview(cb, size) {
                    if (!size) {
                        size = {
                            width: 496,
                            height: 496
                        }
                    }
                    var ctx = new ScreenshotContext;
                    ctx.initialize(this.framework.version);
                    this.addResourcesToContextOp(ctx)["do"]();
                    var firstPage = ctx.pages.getAll()[0];
                    firstPage.html.body.insertLast(this.createTree(firstPage));
                    electron.screenshotHTML(ctx.generateStaticPageJSON(), function(data) {
                        if (data) {
                            autocropImageData({
                                data: data,
                                newWidth: size.width,
                                newHeight: size.height
                            }, cb)
                        } else {
                            cb(false)
                        }
                    })
                }
            }, {
                key: "getCleanPreview",
                value: function getCleanPreview() {
                    if (!this.preview) return null;
                    return this.preview.replace("data:image/jpeg;base64,", "")
                }
            }, {
                key: "clone",
                value: function clone() {
                    var c = new this.constructor;
                    c.unserialize(_clone(this.serialize()));
                    return c
                }
            }, {
                key: "stringify",
                value: function stringify() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    return JSON.stringify(this.toEpod(options))
                }
            }, {
                key: "toEpod",
                value: function toEpod() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var build = buildEpodFormat(this);
                    if (options.stripPreview) {
                        build["package"].preview = null;
                        build["package"].previewScale = null;
                        build["package"].previewOffset = null
                    }
                    if (options.stripShared) {
                        build["package"].shared = false
                    }
                    return build
                }
            }, {
                key: "toDownloadedPackage",
                value: function toDownloadedPackage() {
                    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var DownloadedPackage = require("./DownloadedPackage");
                    var ser = this.serialize();
                    Object.assign(ser, obj);
                    var dpkg = new DownloadedPackage;
                    dpkg.unserialize(ser);
                    return dpkg
                }
            }, {
                key: "toLibraryPackage",
                value: function toLibraryPackage() {
                    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var LibraryPackage = require("./LibraryPackage");
                    var ser = this.serialize();
                    Object.assign(ser, obj);
                    var lpkg = new LibraryPackage;
                    lpkg.unserialize(ser);
                    return lpkg
                }
            }, {
                key: "serialize",
                value: function serialize() {
                    return {
                        id: this.id,
                        class: "Package",
                        framework: this.framework.version,
                        version: this.version,
                        name: this.name,
                        shared: this.shared,
                        preview: this.preview,
                        previewScale: this.previewScale,
                        previewOffset: this.previewOffset,
                        js: this.js,
                        css: this.css,
                        fonts: this.fonts,
                        images: this.images,
                        component: this.component
                    }
                }
            }, {
                key: "unserialize",
                value: function unserialize(json) {
                    this.id = json.id;
                    this.version = json.version;
                    this.name = json.name;
                    this.framework = app.getFrameworkByVersion(json.framework);
                    this.shared = json.shared;
                    this.preview = json.preview;
                    this.previewScale = json.previewScale;
                    this.previewOffset = json.previewOffset;
                    this.js = json.js;
                    this.css = json.css;
                    this.fonts = json.fonts;
                    this.images = json.images;
                    this.component = json.component
                }
            }], [{
                key: "createFromCLI",
                value: function createFromCLI(def) {
                    var pkg = new Package;
                    pkg.initialize("3");
                    return new Promise(function(resolve, reject) {
                        if (!def.name || typeof def.name != "string" || !def.name.trim().length) {
                            return reject("No name provided.")
                        }
                        if (!def.html || typeof def.html != "string" || !def.html.trim().length) {
                            return reject("No html provided.")
                        }
                        pkg.name = def.name.trim();
                        var code = new CustomCode;
                        code.initialize();
                        code.value = def.html;
                        pkg.component = code.serialize();
                        if (def.css) {
                            var cssDef = def.css;
                            if (typeof cssDef == "string") {
                                cssDef = [cssDef]
                            }
                            var i = 1;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;
                            try {
                                for (var _iterator = cssDef[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var css = _step.value;
                                    var res = new CSSResource("stylesheet-" + i++ + ".css");
                                    res.importCSSString(css);
                                    pkg.css.push(res.serialize())
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
                        if (def.js) {
                            var jsDef = def.js;
                            if (typeof jsDef == "string") {
                                jsDef = [jsDef]
                            }
                            var i = 1;
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;
                            try {
                                for (var _iterator2 = jsDef[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var js = _step2.value;
                                    var res = new JSResource("script-" + i++ + ".js");
                                    res.value = js;
                                    pkg.js.push(res.serialize())
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
                        if (def.fonts) {
                            var fontDef = def.fonts;
                            for (var name in fontDef) {
                                pkg.fonts.push(new FontResource(FontResource.sanitizeName(name), fontDef[name]).serialize())
                            }
                        }
                        if (def.images) {
                            var imageDef = def.images;
                            var imageOps = [];
                            var images = [];
                            if (typeof imageDef == "string") {
                                imageDef = [imageDef]
                            }
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;
                            try {
                                for (var _iterator3 = imageDef[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var path = _step3.value;
                                    if (!electron.pathExists(path)) {
                                        continue
                                    }
                                    var parsed = parsePath(path);
                                    var ext = parsed.extname.toLowerCase().replace(".", "");
                                    var type = mimeTypes[ext];
                                    if (!type) {
                                        continue
                                    }
                                    var name = ImageResource.sanitizeName(parsed.basename);
                                    images.push(new ImageResource(name, ext));
                                    imageOps.push(electron.readFile(path, "base64"))
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
                            if (imageOps.length) {
                                resolve(Promise.all(imageOps).then(function(ops) {
                                    for (var i = 0; i < images.length; i++) {
                                        images[i].data = "data:" + mimeTypes[images[i].extension] + ";base64," + ops[i]
                                    }
                                    pkg.images = images.map(function(i) {
                                        return i.serialize()
                                    });
                                    return pkg
                                }));
                                return
                            }
                        }
                        resolve(pkg)
                    })
                }
            }]);
            return Package
        }();
        module.exports = Package
    }, {
        "../components/base/CustomCode": 42,
        "../config/mime-types": 370,
        "../contexts/ScreenshotContext": 375,
        "../helpers/autocropImageData": 543,
        "../helpers/buildEpodFormat": 544,
        "../helpers/canParentTakeChildren": 547,
        "../helpers/parsePath": 595,
        "../resources/CSSLinkResource": 1248,
        "../resources/CSSResource": 1249,
        "../resources/FontResource": 1250,
        "../resources/ImageResource": 1252,
        "../resources/JSLinkResource": 1253,
        "../resources/JSResource": 1254,
        "../tree/CSSResourceTreeGroup": 1258,
        "../tree/FontResourceTreeGroup": 1260,
        "../tree/ImageResourceTreeGroup": 1261,
        "../tree/JSResourceTreeGroup": 1262,
        "./DownloadedPackage": 1204,
        "./LibraryPackage": 1205,
        "clone": 739
    }]
});
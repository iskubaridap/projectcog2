define([], function() {
    return [function(require, module, exports) {
        "use strict";
        var _extends = Object.assign || function(target) {
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
        var _get = function get(_x8, _x9, _x10) {
            var _again = true;
            _function: while (_again) {
                var object = _x8,
                    property = _x9,
                    receiver = _x10;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x8 = parent;
                        _x9 = property;
                        _x10 = receiver;
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
        var Context = require("./Context");
        var beautifyHTML = require("js-beautify").html;
        var CleanCSS = require("clean-css");
        var UglifyJS = require("uglify-js");
        var createHash = require("../helpers/createHash");
        var addQueryParamsToURL = require("../helpers/addQueryParamsToURL");
        var ExportContext = function(_Context) {
            _inherits(ExportContext, _Context);

            function ExportContext(name, path) {
                _classCallCheck(this, ExportContext);
                _get(Object.getPrototypeOf(ExportContext.prototype), "constructor", this).call(this, name, path);
                this.isExport = true;
                this.exportOptions = null;
                this.assetPath = "";
                this.tempImageSrc = [];
                this.pathToHash = new Map
            }
            _createClass(ExportContext, [{
                key: "findResource",
                value: function findResource(path) {
                    var resourceGroups = [{
                        name: "page",
                        group: this.pages,
                        path: ""
                    }, {
                        name: "image",
                        group: this.assets.images,
                        path: this.assetPath + "img/"
                    }, {
                        name: "css",
                        group: this.assets.css,
                        path: this.assetPath + "css/"
                    }, {
                        name: "js",
                        group: this.assets.js,
                        path: this.assetPath + "js/"
                    }];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = resourceGroups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var group = _step.value;
                            var asset = group.group.getItemByRelativePath(path);
                            if (asset) {
                                return {
                                    asset: asset,
                                    group: group
                                }
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
                    return null
                }
            }, {
                key: "transformResourceURL",
                value: function transformResourceURL(path) {
                    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var resource = this.findResource(path);
                    if (!resource) return false;
                    var asset = resource.asset;
                    var group = resource.group;
                    var depth = options.depth || 0;
                    if (group.name === "image") {
                        return this.transformImageResource(path, depth)
                    }
                    return addQueryParamsToURL(this.depthToPath(depth) + group.path + group.group.getRelativePathForItem(asset), asset.getURLParameters(this))
                }
            }, {
                key: "transformImageResource",
                value: function transformImageResource(path) {
                    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    path = path.replace(/^\/(?:images|img)\//, "");
                    var asset = this.assets.images.getItemByRelativePath(path);
                    if (!asset) return false;
                    var depth = options.depth || 0;
                    var relative = "";
                    if (options.stylesheet) {
                        return addQueryParamsToURL(this.depthToPath(depth + 2) + this.assetPath + "img/" + path, asset.getURLParameters(this))
                    }
                    var transformedPath = addQueryParamsToURL(this.depthToPath(depth) + this.assetPath + "img/" + path, asset.getURLParameters(this));
                    this.tempImageSrc.push(transformedPath);
                    return "data:text/plain," + String(this.tempImageSrc.length - 1)
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
                key: "getMinifiedCSSPath",
                value: function getMinifiedCSSPath() {
                    var depth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                    return this.assetPath + "css/styles.min.css"
                }
            }, {
                key: "getMinifiedJSPath",
                value: function getMinifiedJSPath() {
                    var depth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                    return this.assetPath + "js/script.min.js"
                }
            }, {
                key: "getURLParametersFor",
                value: function getURLParametersFor(path) {
                    return this.pathToHash.get(path) || {}
                }
            }, {
                key: "setURLParametersFor",
                value: function setURLParametersFor(path) {
                    var newParameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var oldParameters = this.pathToHash.get(path) || {};
                    this.pathToHash.set(path, _extends({}, oldParameters, newParameters))
                }
            }, {
                key: "generateFileExport",
                value: function generateFileExport() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    this.exportOptions = options;
                    return this.framework.exportContext(this, options)
                }
            }, {
                key: "minifyCSS",
                value: function minifyCSS() {
                    var allCSS = "";
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = this.assets.css.getLocalByPriority()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var stylesheet = _step2.value;
                            allCSS += stylesheet.generateCSS(this, 0)
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
                    var result = new CleanCSS({
                        processImport: false,
                        rebase: false
                    }).minify(allCSS);
                    var hasError = result.errors.length || result.warnings.length;
                    if (!hasError) {
                        allCSS = result.styles
                    }
                    if (this.exportOptions.versionAssets) {
                        this.setURLParametersFor(this.getMinifiedCSSPath(), {
                            h: createHash(allCSS)
                        })
                    }
                    return {
                        status: hasError ? "fail" : "success",
                        data: allCSS,
                        errors: result.errors
                    }
                }
            }, {
                key: "minifyJS",
                value: function minifyJS() {
                    var allJS = "";
                    var errors = [];
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;
                    try {
                        for (var _iterator3 = this.assets.js.getLocalByPriority()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var script = _step3.value;
                            allJS += script.value + "\n"
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
                    try {
                        var result = UglifyJS.minify(allJS, {
                            fromString: true
                        });
                        allJS = result.code
                    } catch (e) {
                        console.error(e);
                        errors.push("Couldn't minify JS due to syntax error.")
                    }
                    if (this.exportOptions.versionAssets) {
                        this.setURLParametersFor(this.getMinifiedJSPath(), {
                            h: createHash(allJS)
                        })
                    }
                    return {
                        status: errors.length ? "fail" : "success",
                        data: allJS,
                        errors: errors
                    }
                }
            }, {
                key: "generateHTML",
                value: function generateHTML() {
                    var _this = this;
                    var result = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;
                    try {
                        for (var _iterator4 = this.pages.getAll()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var page = _step4.value;
                            var depth = this.pages.getItemDepth(page);
                            page.html.update();
                            var html = page.html.element[0].outerHTML;
                            page.cleanAfterGenerateHTML();
                            html = "<!DOCTYPE html>" + html;
                            html = beautifyHTML(html);
                            html = this.replaceCustomCodePlaceholders(html, depth);
                            this.cleanupCustomCodePlaceholders();
                            html = html.replace(/data:text\/plain,\d+/g, function(match) {
                                return _this.tempImageSrc[match.split(",")[1]]
                            });
                            var injectedHeadContent = page.getInjectedHeadContent();
                            if (injectedHeadContent) {
                                html = html.replace("</head>", injectedHeadContent + "\n</head>")
                            }
                            result.push({
                                path: this.pages.getRelativePathForItem(page),
                                name: page.name,
                                html: html
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
                    return result
                }
            }]);
            return ExportContext
        }(Context);
        module.exports = ExportContext
    }, {
        "../helpers/addQueryParamsToURL": 542,
        "../helpers/createHash": 553,
        "./Context": 371,
        "clean-css": 678,
        "js-beautify": 1064,
        "uglify-js": 1192
    }]
});
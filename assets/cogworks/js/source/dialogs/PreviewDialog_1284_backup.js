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
        var Dialog = require("./Dialog");
        var ExportContext = require("../contexts/ExportContext");
		var parsePath = require("../helpers/parsePath");
        var Bootstrap = require("../Bootstrap");
        var PreviewDialog = function(_Dialog) {
            _inherits(PreviewDialog, _Dialog);
            var classObj = null;

            function PreviewDialog(elem) {
                _classCallCheck(this, PreviewDialog);
                _get(Object.getPrototypeOf(PreviewDialog.prototype), "constructor", this).call(this, elem);
                classObj = this;
                this.previewCheckbox = elem.find(".preview-checkbox");
				this.previewCheckbox.on("change", this.togglePreview.bind(this));
				elem.find(".button.ok").on("click", this.onOK.bind(this));
				elem.on("click", ".browser-button", this.prepareFileForPreview.bind(this));
				elem.on("click", ".ip input", function (e) {
					e.target.select()
				});
				app.on("preview-status-change", this.update.bind(this))
            }
            _createClass(PreviewDialog, [{
				key: "prepareFileForPreview",
				value: function prepareFileForPreview(e) {
					cogworks.loadingScreen("dynamic","Generating preview for " + app.context.name + " file.","fadeIn");

                    function startPreview()
					{
						var errorFiles = new Array();
						var filesToWrite = new Array();
						var errorMessage = "";
						var writtenFiles = 0;
						var sep = "/";
						var dir = "user_files/" + (ORG.replace(" ","_")) + "/" + USERNAME + "/preview";
						var exp = new ExportContext;
                        var bootstrap = null;
                        
                        app.context.serialize();
						exp.unserialize(app.context.serialize());
                        exp.generateFileExport({
                            useAbsolutePaths: true
                        })
                        bootstrap = exp.framework;
						var pagesHTML = exp.generateHTML();
						try {
							var system = [dir + sep + "img", dir + sep + "js", dir + sep + "css", dir + sep + "bootstrap", dir + sep + "bootstrap" + sep + "js", dir + sep + "bootstrap" + sep + "css", dir + sep + "bootstrap" + sep + "fonts"];
							var user = [];
							var _iteratorNormalCompletion10 = true;
							var _didIteratorError10 = false;
							var _iteratorError10 = undefined;
							try {
								for (var _iterator10 = exp.pages.getAllFolders()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
									var item = _step10.value;
									user.push(dir + sep + item.getRelativePath())
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
							var _iteratorNormalCompletion11 = true;
							var _didIteratorError11 = false;
							var _iteratorError11 = undefined;
							try {
								for (var _iterator11 = exp.assets.css.getAllFolders()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
									var item = _step11.value;
									user.push(dir + sep + "css" + sep + item.getRelativePath())
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
							var _iteratorNormalCompletion12 = true;
							var _didIteratorError12 = false;
							var _iteratorError12 = undefined;
							try {
								for (var _iterator12 = exp.assets.js.getAllFolders()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
									var item = _step12.value;
									user.push(dir + sep + "js" + sep + item.getRelativePath())
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
							var _iteratorNormalCompletion13 = true;
							var _didIteratorError13 = false;
							var _iteratorError13 = undefined;
							try {
								for (var _iterator13 = exp.assets.images.getAllFolders()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
									var item = _step13.value;
									user.push(dir + sep + "img" + sep + item.getRelativePath())
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
							system.concat(user).map(mkdir)
						} catch (e) {
							return error(e.message)
						}
						var operations = [];
						var _iteratorNormalCompletion14 = true;
						var _didIteratorError14 = false;
						var _iteratorError14 = undefined;
						try {
							for (var _iterator14 = pagesHTML[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
								var ph = _step14.value;
								operations.push(writeFile(dir + sep + ph.path, ph.html))
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
						var images = exp.assets.images.getAll();
						for (var i = 0; i < images.length; i++) {
							operations.push(writeImage(dir + sep + "img" + sep + exp.assets.images.getRelativePathForItem(images[i]), images[i].data))
						}
						var sheet = bootstrap.getStylesheetForActiveTheme(exp);
						if (bootstrap.isContextThemeUserMade(exp)) {
							var themeContent = app.context.getActiveTheme().raw;
							operations.push(writeFile(dir + sep + sheet, themeContent))
						} else {
							var originalSheet = (classObj.getActiveTheme(exp) + "/bootstrap.min.css");
							operations.push(copyFilePromise((originalSheet.replace("./","")), dir + sep + "bootstrap/css/bootstrap.min.css"))
						}
						operations.push(copyFilePromise("../assets/cogworks/embed/fonts/glyphicons-halflings-regular.eot", dir + sep + "bootstrap" + sep + "fonts" + sep + "glyphicons-halflings-regular.eot"));
						operations.push(copyFilePromise("../assets/cogworks/embed/fonts/glyphicons-halflings-regular.woff", dir + sep + "bootstrap" + sep + "fonts" + sep + "glyphicons-halflings-regular.woff"));
						operations.push(copyFilePromise("../assets/cogworks/embed/fonts/glyphicons-halflings-regular.woff2", dir + sep + "bootstrap" + sep + "fonts" + sep + "glyphicons-halflings-regular.woff2"));
						operations.push(copyFilePromise("../assets/cogworks/embed/fonts/glyphicons-halflings-regular.ttf", dir + sep + "bootstrap" + sep + "fonts" + sep + "glyphicons-halflings-regular.ttf"));
						operations.push(copyFilePromise("../assets/cogworks/js/jquery.min.js", dir + sep + "js" + sep + "jquery.min.js"));
						operations.push(copyFilePromise("../assets/cogworks/js/bootstrap.min.js", dir + sep + "bootstrap" + sep + "js" + sep + "bootstrap.min.js"));
                        if(bootstrap.version == 3)
                        {
                            if (bootstrap.isGlyphiconsUsed(exp)) {
                                mkdir("user_files/" + (ORG.replace(" ","_")) + "/" + USERNAME + "/preview" + sep + "fonts")
                            }
                        }
						var _iteratorNormalCompletion15 = true;
						var _didIteratorError15 = false;
						var _iteratorError15 = undefined;
						try {
							for (var _iterator15 = bootstrap.getUsedIconFontPaths(exp)[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
								var path = _step15.value;
								//operations.push(copyFilePromise("../assets/cogworks/embed/" + path, dir + sep + "assets" + sep + path))
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
						var _iteratorNormalCompletion16 = true;
						var _didIteratorError16 = false;
						var _iteratorError16 = undefined;
						try {
							for (var _iterator16 = exp.assets.css.getLocal()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
								var stylesheet = _step16.value;
								operations.push(writeFile(dir + sep + "css" + sep + exp.assets.css.getRelativePathForItem(stylesheet), stylesheet.generateCSS(exp)))
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
							for (var _iterator17 = exp.assets.js.getLocal()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
								var script = _step17.value;
								operations.push(writeFile(dir + sep + "js" + sep + exp.assets.js.getRelativePathForItem(script), script.value))
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
						
						function showError(file)
						{
							errorFiles.push(file);
							errorMessage = "<br><br>Found error on these file(s).<br><br>";
							errorMessage += errorFiles.toString();
							errorMessage += "<br><br><span class='closeLoadingScreen btn btn-danger'>Close</span>"
						}
	
						function writeImage(objPath, objContent)
						{
							filesToWrite.push((parsePath(objPath)).basename);
							
							$.ajax({
								url: "./public/php/write_image.php",
								type: "POST",
								cache: true,
								data: {path:(parsePath(objPath)).dirname,fName:(parsePath(objPath)).basename,content:objContent},
								success: function (info) {
									//console.log(info);
									writtenFiles++;
									previewReady();
								},
								error: function (request, status, error) {
									showError((parsePath(objPath)).basename);
								}
							});
						}
	
						function writeFile(objPath, objContent)
						{
							filesToWrite.push((parsePath(objPath)).basename);
							
							$.ajax({
								url: "./public/php/write_file.php",
								type: "POST",
								cache: true,
								data: {path:(parsePath(objPath)).dirname,fName:(parsePath(objPath)).basename,content:objContent},
								success: function (info) {
									//console.log(info);
									writtenFiles++;
									previewReady();
								},
								error: function (request, status, error) {
									showError((parsePath(objPath)).basename);
								}
							});
						}
				
						function mkdir(objPath)
						{
							$.ajax({
								url: "./public/php/mkdir.php",
								type: "POST",
								cache: true,
								data: {path:objPath},
								success: function (info) {
									//console.log(info);
								}
							});
						}
				
						function copyFilePromise(objFrom, objTo) {
							$.ajax({
								url: "./public/php/copy_file.php",
								type: "POST",
								cache: true,
								data: {from:objFrom, to:objTo},
								success: function (info) {
									//console.log(info);
								}
							});
						}
						
						function previewReady()
						{
							var percent = Math.round((writtenFiles / filesToWrite.length) * 100);
							if(writtenFiles == filesToWrite.length)
							{
								cogworks.loadingScreen("dynamic","Generating preview for " + app.context.name + " file.<br><br>Preview - 100%","show");
								setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},0);
								app.previewDialog.open();
							}
							else
							{
								cogworks.loadingScreen("dynamic","Generating preview for " + app.context.name + " file.<br><br>Preview - " + percent + "%" + errorMessage,"show");
								
								$(".closeLoadingScreen").off().on("click",function(){
									cogworks.loadingScreen("","","fadeOut");
								});
							}
						}
						Promise.all(operations).then(function() {
						})["catch"](error);
				
						function error(e) {
                            cogworks.loadingScreen("dynamic","Can not process file to preview<br>" + e,"fadeIn");
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
						}
					}
					$.ajax({
						url: "./public/php/remove_files.php",
						type: "POST",
						cache: true,
						data: {path:("user_files/" + (ORG.replace(" ","_")) + "/" + USERNAME + "/preview/")},
						success: function (info) {
							//console.log(info);
							startPreview();
						}
					});
				}
			}, {
				key: "createURLForIP",
				value: function createURLForIP(ip) {
                    return "about:blank";
				}
			}, {
				key: "togglePreview",
				value: function togglePreview() {
					app.togglePreview();
					this.previewCheckbox.prop("disabled", true)
				}
			}, {
				key: "onOK",
				value: function onOK() {
					this.close();
                    window.open((location.protocol + '//' + location.host + "/user_files/" + (ORG.replace(" ","_")) + "/" + USERNAME + "/preview/index.html"));
				}
			}, {
				key: "update",
				value: function update() {
					this.element.find(".ip-address-list").hide();
					if (app.settings.previewEnabled) {
						var ips = electron.getIPAddresses();
						var build = [];
						for (var i = 0; i < ips.length; i++) {
							build.push('<div class="ip">\t\t\t\t\t<input type="text" value="' + this.createURLForIP(ips[i]) + '" readonly />\t\t\t\t\t<a class="button browser-button" data-index="' + i + '">Open in Browser</a>\t\t\t\t</div>')
						}
						this.element.find(".ip-address-list").html(build).show()
					}
					this.previewCheckbox.prop("checked", app.settings.previewEnabled).prop("disabled", false);
					this.element.find(".checkbox b").text(app.settings.previewEnabled ? "Enabled" : "Disabled")
				}
			}, {
				key: "getActiveTheme",
				value: function getActiveTheme(expCntxt) {
					var str = "";
                    str = (expCntxt.settings.theme.id != undefined) ? "../assets/cogworks/embed/bootstrap/" + (expCntxt.framework.version) + "/" + (expCntxt.settings.theme.id) : "../assets/cogworks/embed/bootstrap/" + (expCntxt.framework.version) + "/" + (expCntxt.settings.theme);
                    return str;
				}
			}]);
            return PreviewDialog
        }(Dialog);
        module.exports = PreviewDialog
    }, {
        "./Dialog": 498,
        "../contexts/ExportContext": 373,
        "../helpers/parsePath": 595,
        "../Bootstrap": 538
    }]
});
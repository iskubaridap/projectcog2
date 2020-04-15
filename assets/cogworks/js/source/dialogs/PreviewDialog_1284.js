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
        var base64 = require('../Base64');
        var PreviewDialog = function(_Dialog) {
            _inherits(PreviewDialog, _Dialog);
            var classObj = null;
            var dir = '';
            var previewPage = '';
            var cogfileInfo = null;

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
                    var audio = "";
                    var video = "";
                    var pdf = "";
                    var extra = '';
                    var numErrors = 0;
                    dir = app.userPath + "preview";
                    previewPage = (dir).substr((dir).indexOf('/cogworks/'), ((dir).length - 1)) + '/index.html';
                    
                    function startPreview()
					{
						var errorFiles = new Array();
						var filesToWrite = new Array();
						var errorMessage = "";
						var writtenFiles = 0;
						var sep = "/";
                        var audioDir = null;
                        var pdfDir = null;
                        var videoDir = null;
                        var extraDir = null;
						var exp = new ExportContext;
                        var bootstrap = null;
                        var pagesHTML = null;
                        var htmlFiles = null;
                        var ajaxAry = new Array();

                        app.context.serialize();
						exp.unserialize(app.context.serialize());
                        exp.generateFileExport({
                            useAbsolutePaths: true
                        }).then(function(data){
                            htmlFiles = data.files;
                            pagesHTML = new Array();
                            bootstrap = exp.framework;
                            Object.keys(htmlFiles).forEach(function eachKey(key){
                                if(key.search(".htm") > 0)
                                {
                                    var obj = new Object();
                                    obj.path = key;
                                    obj.name = ((key.split("/"))[((key.split("/")).length - 1)]);
                                    obj.html = (htmlFiles[key]).content;
                                    pagesHTML.push(obj);
                                }
                            });
                            try {
                                var system = [dir + sep + "img", dir + sep + "js", dir + sep + "css", dir + sep + "bootstrap", dir + sep + "bootstrap" + sep + "js", dir + sep + "bootstrap" + sep + "css", dir + sep + "bootstrap" + sep + "fonts", dir + sep + "media", dir + sep + "media" + sep + "audio", dir + sep + "media" + sep + "video", dir + sep + "pdf"];
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
                                var _iteratorNormalCompletion131 = true;
                                var _didIteratorError131 = false;
                                var _iteratorError131 = undefined;
                                try {
                                    for (var _iterator131 = exp.assets.audio.getAllFolders()[Symbol.iterator](), _step131; !(_iteratorNormalCompletion131 = (_step131 = _iterator131.next()).done); _iteratorNormalCompletion131 = true) {
                                        var item = _step131.value;
                                        audioDir =  dir + sep + "media" + sep + "audio" + sep + item.getRelativePath();
                                        user.push(dir + sep + "media" + sep + "audio" + sep + item.getRelativePath())
                                    }
                                } catch (err) {
                                    _didIteratorError131 = true;
                                    _iteratorError131 = err
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion131 && _iterator131["return"]) {
                                            _iterator131["return"]()
                                        }
                                    } finally {
                                        if (_didIteratorError131) {
                                            throw _iteratorError131
                                        }
                                    }
                                }
                                var _iteratorNormalCompletion132 = true;
                                var _didIteratorError132 = false;
                                var _iteratorError132 = undefined;
                                try {
                                    for (var _iterator132 = exp.assets.pdf.getAllFolders()[Symbol.iterator](), _step132; !(_iteratorNormalCompletion132 = (_step132 = _iterator132.next()).done); _iteratorNormalCompletion132 = true) {
                                        var item = _step132.value;
                                        pdfDir =  dir + sep + "pdf" + sep + item.getRelativePath();
                                        user.push(dir + sep + "pdf" + sep + item.getRelativePath())
                                    }
                                } catch (err) {
                                    _didIteratorError132 = true;
                                    _iteratorError132 = err
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion132 && _iterator132["return"]) {
                                            _iterator132["return"]()
                                        }
                                    } finally {
                                        if (_didIteratorError132) {
                                            throw _iteratorError132
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
                            var jqueryVersion = bootstrap.getFulljQueryVersion(exp);
                            var themeID = exp.settings.theme.id;
                            var bootstrapVer = exp.framework.version;
                            if (bootstrap.isContextThemeUserMade(exp)) {
                                var themeContent = app.context.getActiveTheme().raw;
                                operations.push(writeFile(dir + sep + sheet, themeContent))
                            } else {
                                var originalSheet = (classObj.getActiveTheme(exp) + "/bootstrap.min.css");
                                operations.push(copyFilePromise((originalSheet.replace('../', '')), dir + sep + "bootstrap/css/bootstrap.min.css"))
                            }
                            operations.push(copyFolderFiles("assets/cogworks/embed/fonts/bootstrap", (dir + sep + "bootstrap" + sep + "fonts")));
                            mkdir(dir + sep + "fonts");
                            if(themeID == "mcafee" || themeID == "jsi")
                            {
                                if(themeID == "jsi")
                                {
                                    mkdir(dir + sep + "fonts" + sep + "jsi");
                                    operations.push(copyFolderFiles("assets/cogworks/embed/fonts/jsi", (dir + sep + "fonts" + sep + "jsi")));
                                }
                                else if(themeID == "mcafee")
                                {
                                    mkdir(dir + sep + "fonts" + sep + "mcafee");
                                    operations.push(copyFilePromise("assets/cogworks/embed/fonts/simple-line-icons.min.css", dir + sep + "fonts" + sep + "simple-line-icons.min.css"));
                                    operations.push(copyFolderFiles("assets/cogworks/embed/fonts/mcafee", (dir + sep + "fonts" + sep + "mcafee")));
                                    operations.push(copyFolderFiles("assets/cogworks/extra/export/default/img/mcafee", (dir + sep + "img")));
                                }
                                operations.push(copyFilePromise("assets/cogworks/js/jquery/jquery.min.js", dir + sep + "js" + sep + "jquery.min.js"));
                                operations.push(copyFilePromise("assets/cogworks/js/bootstrap.min.js", dir + sep + "bootstrap" + sep + "js" + sep + "bootstrap.min.js"));

                                operations.push(copyFilePromise("assets/cogworks/extra/export/default/README.md", (dir + sep + "media" + sep + "audio" + sep + "README.md")));
                                operations.push(copyFilePromise("assets/cogworks/extra/export/default/README.md", (dir + sep + "media" + sep + "video" + sep + "README.md")));
                                operations.push(copyFilePromise("assets/cogworks/extra/export/default/README.md", (dir + sep + "pdf" + sep + "README.md")));
                                operations.push(copyFilePromise("assets/cogworks/extra/export/default/audio/blank.mp3", (dir + sep + "media" + sep + "audio" + sep + "blank.mp3")));
                            }
                            else
                            {
                                operations.push(copyFilePromise("assets/cogworks/embed/js/jquery-" + jqueryVersion + ".min.js", dir + sep + "js" + sep + "jquery.min.js"));
                                //operations.push(copyFilePromise("assets/cogworks/js/jquery.min.js", dir + sep + "js" + sep + "jquery.min.js"));
                                if(bootstrapVer == 3)
                                {
                                    operations.push(copyFilePromise("assets/cogworks/js/bootstrap.min.js", dir + sep + "bootstrap" + sep + "js" + sep + "bootstrap.min.js"));
                                }
                                else
                                {
                                    operations.push(copyFilePromise("assets/cogworks/js/bootstrap4.min.js", dir + sep + "bootstrap" + sep + "js" + sep + "bootstrap.min.js"));
                                }
                            }
                            
                            var _iteratorNormalCompletion15 = true;
                            var _didIteratorError15 = false;
                            var _iteratorError15 = undefined;
                            try {
                                for (var _iterator15 = bootstrap.getUsedIconFontPaths(exp)[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                    var path = _step15.value;
                                    //operations.push(copyFilePromise("assets/cogworks/embed/" + path, dir + sep + "assets" + sep + path))
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
                            var _iteratorNormalCompletion18 = true;
                            var _didIteratorError18 = false;
                            var _iteratorError18 = undefined;
                            try {
                                for (var _iterator18 = exp.assets.audio.getLocal()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                    var audioObj = _step18.value;
                                    var path = dir + sep + "media" + sep + "audio" + sep + exp.assets.audio.getRelativePathForItem(audioObj);
                                    var parseObj = parsePath(path);
                                    operations.push(copyFilePromise((audio + '/' + parseObj.basename), path));
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
                            var _iteratorNormalCompletion19 = true;
                            var _didIteratorError19 = false;
                            var _iteratorError19 = undefined;
                            try {
                                for (var _iterator19 = exp.assets.pdf.getLocal()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                    var pdfObj = _step19.value;
                                    var path = dir + sep + "pdf" + sep + exp.assets.pdf.getRelativePathForItem(pdfObj);
                                    var parseObj = parsePath(path);
                                    operations.push(copyFilePromise((pdf + '/' + parseObj.basename), path));
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
                            
                            Promise.all(operations).then(function() {
						      })["catch"](error);
                        });
                        
                        function copyFolderFiles(objFrom, objTo)
						{
                            var ajaxObj = null;
                            var folder = (((objTo).split("/"))[((objTo).split("/").length - 1)]);
							filesToWrite.push(folder);
							
							ajaxObj = $.ajax({
								url: '../cogworks/main-tool-backend/copy-folder',
								type: "POST",
								cache: true,
								data: {source: objFrom, destination: objTo},
								success: function (info) {
									if(info == 'fail') {
                                        numErrors++;
                                    } else {
                                        writtenFiles++;
                                    }
                                    previewReady();
								},
								error: function (request, status, error) {
                                    console.log(status);
                                    numErrors++;
                                    previewReady();
								}
							});
                            ajaxAry.push(ajaxObj);
						}
	
						function writeImage(objPath, objContent)
						{
                            var ajaxObj = null;
							filesToWrite.push((parsePath(objPath)).basename);
							
							ajaxObj = $.ajax({
								url: "../cogworks/main-tool-backend/write-image",
								type: "POST",
								cache: true,
								data: {path:(parsePath(objPath)).dirname,fName:(parsePath(objPath)).basename,content:objContent},
								success: function (info) {
									if(info == 'fail') {
                                        numErrors++;
                                        
                                    } else {
                                        writtenFiles++;
                                    }
                                    previewReady();
								},
								error: function (request, status, error) {
                                    console.log(status);
									numErrors++;
                                    previewReady();
								}
							});
                            ajaxAry.push(ajaxObj);
						}
	
						function writeFile(objPath, objContent)
						{
                            var ajaxObj = null;
							filesToWrite.push((parsePath(objPath)).basename);
							
							ajaxObj = $.ajax({
								url: "../cogworks/main-tool-backend/write-file",
								type: "POST",
								cache: true,
								data: {path:(parsePath(objPath)).dirname,fName:(parsePath(objPath)).basename,content:objContent},
								success: function (info) {
									if(info == 'fail') {
                                        numErrors++;
                                    } else {
                                        writtenFiles++;
                                    }
                                    previewReady();
								},
								error: function (request, status, error) {
                                    console.log(status);
									numErrors++;
                                    previewReady();
								}
							});
                            ajaxAry.push(ajaxObj);
						}
				
						function mkdir(objPath)
						{
                            var ajaxObj = null;
							ajaxObj = $.ajax({
								url: "../cogworks/main-tool-backend/mkdir",
								type: "POST",
								cache: true,
								data: {path:objPath},
								success: function (info) {
									if(info == 'false') {
                                        numErrors++;
                                        previewReady();
                                    }
								},
								error: function (request, status, error) {
									numErrors++;
                                    previewReady();
								}
							});
                            ajaxAry.push(ajaxObj);
						}
				
						function copyFilePromise(objFrom, objTo)
                        {
                            var ajaxObj = null;
                            filesToWrite.push((((objTo).split("/"))[((objTo).split("/").length - 1)]));
							
                            ajaxObj = $.ajax({
								url: "../cogworks/main-tool-backend/copy-file",
								type: "POST",
								cache: true,
								data: {from:objFrom, to:objTo},
								success: function (info) {
									if(info == 'fail') {
                                        numErrors++;
                                    } else {
                                        writtenFiles++;
                                    }
                                    previewReady();
								},
								error: function (request, status, error) {
                                    console.log(status);
									numErrors++;
                                    previewReady();
								}
							});
                            ajaxAry.push(ajaxObj);
						}
						
						function previewReady()
						{
							var percent = Math.round((writtenFiles / filesToWrite.length) * 100);
							if(writtenFiles == filesToWrite.length) {
								cogworks.loadingScreen("dynamic","Generating preview for " + app.context.name + " file.<br><br>Preview - 100%","show");
								setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},0);
								app.previewDialog.open();
							} else {
                                if(numErrors > 0) {
                                    $.each(ajaxAry, function(index, value){
                                        value.abort();
                                    });
                                    cogworks.loadingScreen("alert","<p>Cannot preview the file '" + app.context.name + "'.</p><p>Report error ID: 011 to the admin if issue persist.</p>","show");
                                } else {
                                    cogworks.loadingScreen("dynamic","Generating preview for " + app.context.name + " file.<br><br>Preview - " + percent + "%","show");
                                }
							}
						}
				
						function error(e) {
                            cogworks.loadingScreen("alert","<p>Can not process file to preview.<p></p>" + e + "</p>","show");
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
						}
                    }
                    $.post('../cogworks/main-tool-backend/general-info/cog-file',{userID: app.user, id: app.context.fileID, fileName: app.context.name, designID: app.context.id}, function(data){
                        cogfileInfo = JSON.parse(data);
                        audio = cogfileInfo.resources.audio;
                        video = cogfileInfo.resources.video;
                        pdf = cogfileInfo.resources.pdf;
                        extra = cogfileInfo.resources.extra;
                        $.ajax({
                            url: "../cogworks/main-tool-backend/remove-dir-files",
                            type: "POST",
                            cache: true,
                            data: {path:(dir + '/')},
                            success: function (info) {
                                startPreview();
                            },
                            error: function (request, status, error) {
                                cogworks.loadingScreen("alert","<p>Cannot preview the file '" + app.context.name + "'.</p><p>Report error ID: 010 to the admin if issue persist.</p>","show");
                            }
                        });
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
                    // console.log(base64.btoa(app.user));
                    this.close();
                    window.open((location.protocol + '//' + location.host + previewPage));
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
        "../Bootstrap": 538,
        '../Base64': 623
    }]
});
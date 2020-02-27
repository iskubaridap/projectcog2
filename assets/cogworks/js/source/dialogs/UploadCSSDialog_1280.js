define([], function () {
	return [function (require, module, exports) {
		"use strict";
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
		var Dialog = require("./Dialog");
        var parsePath = require("../helpers/parsePath");
		var UploadCSSDialog = function (_Dialog) {
			_inherits(UploadCSSDialog, _Dialog);
            var folder = null;

			function UploadCSSDialog(elem) {
                var obj = this;
				_classCallCheck(this, UploadCSSDialog);
				_get(Object.getPrototypeOf(UploadCSSDialog.prototype), "constructor", this).call(this, elem);
				
                var fileListIndex = 0;
                var inappropriateFiles = new Array();
                var fileLists = new Array();
                var cogID = "";
                var filename = "";
				var thefile = null;
				var reader = null;
				var firstProgress = true;
				
				$("#upload-css-dialog .button.uploadBtn").hide();
	
				function init() {
					var bHaveFileAPI = (window.File && window.FileReader);
	
					if (!bHaveFileAPI) {
						alert("This browser doesn't support the File API");
						return;
					}
	
					document.getElementById("uploadCSS").addEventListener("change", onFileChanged);
					document.getElementById("startreadCSS").addEventListener("click", startread);
				}
				
				function onFileChanged(theEvt) {
                    fileListIndex = 0;
                    fileLists = new Array();
                    
                    $.each((theEvt.target.files), function(index, value){
                        reader = null;
                        firstProgress = true;
                        $("#progressBar").val(0);
                        
                        if (value != null) {
                            var str = ((value.type.split('/')[((value.type.split('/').length) - 1)]).toLowerCase());

                            if(str == 'css')
                            {
                                reader = new FileReader();

                                reader.onerror = fileError;
                                reader.onprogress = fileProgress;
                                reader.onloadend = fileLoadEnd;

                                reader.readAsBinaryString(value);
                                fileLists.push(value);
                            }
                            else
                            {
                                inappropriateFiles.push(value.name);
                            }
                        }
                        else {
                            $("#status").empty().html("<p>No file selected to read.</p>");
                            return false;
                        }
                    });
                    if((theEvt.target.files).length > 0 && inappropriateFiles.length == (theEvt.target.files).length)
                    {
                        $("#status").empty().html('<p>Selected ' + ((inappropriateFiles.length == 1) ? 'file is' : 'files are') + ' not Stylesheet or CSS.</p>');
                    }
				}
				
				function startread(theEvt) {
					if (thefile != null) {
						reader = new FileReader();
						
						reader.onerror = fileError;
						reader.onprogress = fileProgress;
						reader.onloadend = fileLoadEnd;
	
						reader.readAsBinaryString(thefile);
					}
					else {
						$("#status").empty().html("<p>No file selected to read.</p>");
					}
				}
				
				function fileLoadEnd(evt) {
                    var str = '';
                    if(inappropriateFiles.length > 0)
                    {
                        str = '<ul class="list-group">';
                        $.each(inappropriateFiles, function(index, value){
                            str += '<li>' + value + '</li>';
                        });
                        str += '</ul>';
                        $("#status").empty().html('<p>There ' + ((inappropriateFiles.length == 1) ? 'is a file this is not' : 'are some files that are') + ' not Stylesheet or CSS. ' + ((inappropriateFiles.length == 1) ? 'This' : 'These') + ' will not be include in your upload.</p>' + str);
                    }
					$("#upload-css-dialog .button.uploadBtn").fadeIn();
				}
				function fileProgress(evt) {
					if (evt.lengthComputable) {
						if (firstProgress) {
							firstProgress=false;
						}
						var progCalc = Math.round((evt.loaded / evt.total) * 100);
						$("#progressBar").val(progCalc);
					}
				}
				
				function fileError(evt) {
					switch (evt.target.error.code) {
						case evt.target.error.NOT_FOUND_ERR:
							$("#status").empty().html("<p>File was not found.</p>");
							break;
						case evt.target.error.NOT_READABLE_ERR:
							$("#status").empty().html("<p>File was unreadable.</p>");
							break;
					}
				}
				function resetLoader()
				{
					fileLists = new Array();
                    inappropriateFiles = new Array();
                    cogID = "";
					filename = "";
					thefile = null;
					reader = null;
					firstProgress = true;
					$("#progressBar").val(0);
					$("#uploadCSS").val("");
					$("#status").html("");
					$("#startreadCSS").show();
					$("#upload-css-dialog .button.uploadBtn").hide();
				}
				function readCSS(path)
				{
					var parsed = parsePath(path);
					
					$.ajax({
					url: "./public/php/read_file.php",
					type: "POST",
					cache: true,
					data: {path:parsed.dirname,fName:parsed.basename},
					success: function (data) {
							app.cssContentRead = data;
                            app.getPanel("design").importStylesheetsByPaths(eval("['" + path + "']"),folder);
						}
					
					});
				}
				init();
				
                elem.find(".button.cancel").on("click", function(){
					obj.close();
					resetLoader();
				});
				elem.find(".button.reset").on("click", function(){
					resetLoader();
				});
				elem.find(".button.uploadBtn").on("click", function(){
                    var loopCount = 0;
                    
                    $.each(fileLists, function(index, value){
                        var paths = ["./tmp/"];
                        var form_data = new FormData();                  
                        form_data.append('file', value);
                        form_data.append('orgname', ORG);
                        form_data.append('username', USERNAME);

                        cogworks.loadingScreen("dynamic","Importing " + value.name + ".","fadeIn");

                        $.ajax({
                            url: './public/php/move_file.php',
                            dataType: 'text',
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form_data,                         
                            type: 'post',
                            success: function(data){
                                var parsed = parsePath(data);
                                console.log(data);

                                $.ajax({
                                url: "./public/php/read_file.php",
                                type: "POST",
                                cache: true,
                                data: {path:parsed.dirname,fName:parsed.basename},
                                success: function (data2) {
                                    app.cssContentRead = data2;
                                    app.getPanel("design").importStylesheetsByPaths(eval("['" + data + "']"), folder);

                                    if(loopCount < (fileLists.length - 1))
                                    {
                                        loopCount = loopCount + 1;
                                    }
                                    else if(loopCount >= (fileLists.length - 1))
                                    {
                                        app.notifications.create({
                                            title: fileLists.length == 1 ? "A stylesheet was imported" : fileLists.length + " stylesheets were imported",
                                            description: "You can see " + (fileLists.length == 1 ? "it" : "them") + " in the Design panel."
                                        }).show();
                                        $("#upload-css-dialog .button.cancel").trigger("click");
                                        setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
                                        app.getPanel("design").instantExpandCategory("Styles")
                                    }
                                }

                                });
                            }
                         });
                    });
					
				});
			}
			_createClass(UploadCSSDialog, [{
				key: "open",
				value: function open(options) {
					_get(Object.getPrototypeOf(UploadCSSDialog.prototype), "open", this).call(this, options)
				}
			},{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(UploadCSSDialog.prototype), "close", this).call(this)
				}
			},{
				key: "getFolder",
				value: function getFolder(folderObj) {
					folder = folderObj;
				}
			},{
				key: "removeCSS",
				value: function removeCSS(cssPath){
					$.ajax({
						url: "./public/php/remove_file.php",
						type: "POST",
						cache: true,
						data: {path:cssPath},
						success: function (data) {
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
							//console.log(data);
						}
					});
				}
			}]);
			return UploadCSSDialog
		}(Dialog);
		module.exports = UploadCSSDialog
	}, {
		"./Dialog": 498,
        "../helpers/parsePath": 595
	}]
});

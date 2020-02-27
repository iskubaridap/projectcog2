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
		var UploadJsFileDialog = function (_Dialog) {
			_inherits(UploadJsFileDialog, _Dialog);
            var folder = null;
            
			function UploadJsFileDialog(elem) {
                var obj = this;
				_classCallCheck(this, UploadJsFileDialog);
				_get(Object.getPrototypeOf(UploadJsFileDialog.prototype), "constructor", this).call(this, elem);
				
                var fileListIndex = 0;
                var inappropriateFiles = new Array();
                var fileLists = new Array();
                var cogID = "";
                var filename = "";
				var thefile = null;
				var reader = null;
				var firstProgress = true;
				
				$("#upload-js-file-dialog .button.jsUploadBtn").hide();
	
				function init() {
					var bHaveFileAPI = (window.File && window.FileReader);
	
					if (!bHaveFileAPI) {
						alert("This browser doesn't support the File API");
						return;
					}
	
					document.getElementById("uploadJsFile").addEventListener("change", onFileChanged);
					document.getElementById("startreadJs").addEventListener("click", startread);
				}
				
				function onFileChanged(theEvt) {
                    fileListIndex = 0;
                    fileLists = new Array();
                    
                    $.each((theEvt.target.files), function(index, value){
                        console.log(value.type);
                        reader = null;
                        firstProgress = true;
                        $("#jsProgressBar").val(0);
                        
                        if (value != null) {
                            var str = ((value.type.split('/')[((value.type.split('/').length) - 1)]).toLowerCase());

                            if(str == 'javascript')
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
                            $("#jsStatus").empty().html("<p>No file selected to read.</p>");
                            return false;
                        }
                    });
                    if((theEvt.target.files).length > 0 && inappropriateFiles.length == (theEvt.target.files).length)
                    {
                        $("#jsStatus").empty().html('<p>Selected ' + ((inappropriateFiles.length == 1) ? 'file is' : 'files are') + ' not Javascript.</p>');
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
						$("#jsStatus").empty().html("<p>No file selected to read.</p>");
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
                        $("#jsStatus").empty().html('<p>There ' + ((inappropriateFiles.length == 1) ? 'is a file this is not' : 'are some files that are') + ' not Javascript. ' + ((inappropriateFiles.length == 1) ? 'This' : 'These') + ' will not be include in your upload.</p>' + str);
                    }
					$("#upload-js-file-dialog .button.jsUploadBtn").fadeIn();
				}
				function fileProgress(evt) {
					// evt will be a ProgressEvent: http://www.w3.org/TR/progress-events/#progressevent
					if (evt.lengthComputable) {
						if (firstProgress) {
							firstProgress=false;
						}
						var progCalc = Math.round((evt.loaded / evt.total) * 100);
						$("#jsProgressBar").val(progCalc);
					}
				}
				
				function fileError(evt) {
					switch (evt.target.error.code) {
						case evt.target.error.NOT_FOUND_ERR:
							$("#jsStatus").html("File was not found");
							break;
						case evt.target.error.NOT_READABLE_ERR:
							$("#jsStatus").html("File was unreadable");
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
					$("#jsProgressBar").val(0);
					$("#uploadJsFile").val("");
					$("#jsStatus").html("");
					$("#startreadJs").show();
					$("#upload-js-file-dialog .button.jsUploadBtn").hide();
				}
				function readJs(path)
				{
					var parsed = parsePath(path);
					
					$.ajax({
					url: "./public/php/read_file.php",
					type: "POST",
					cache: true,
					data: {path:parsed.dirname,fName:parsed.basename},
					success: function (data) {
							app.jsContentRead = data;
                            console.log(path);
                            app.getPanel("design").importJSFilesByPaths(eval("['" + path + "']"), folder);
						}
					
					});
				}
                init();
				
                elem.find(".button.jsCancel").on("click", function(){
					obj.close();
					resetLoader();
				});
				elem.find(".button.jsReset").on("click", function(){
					resetLoader();
				});
				elem.find(".button.jsUploadBtn").on("click", function(){
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
                                    app.jsContentRead = data2;
                                    app.getPanel("design").importJSFilesByPaths(eval("['" + data + "']"), folder);

                                    if(loopCount < (fileLists.length - 1))
                                    {
                                        loopCount = loopCount + 1;
                                    }
                                    else if(loopCount >= (fileLists.length - 1))
                                    {
                                        app.notifications.create({
                                            title: fileLists.length == 1 ? "A JavaScript file was imported" : fileLists.length + " JavaScript files were imported",
                                            description: "You can see " + (fileLists.length == 1 ? "it" : "them") + " in the Design panel."
                                        }).show();
                                        $("#upload-js-file-dialog .button.jsCancel").trigger("click");
                                        setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
                                        app.getPanel("design").instantExpandCategory("JavaScript");
                                    }
                                }

                                });
                            }
                         });
                    });
					
				});
			}
			_createClass(UploadJsFileDialog, [{
				key: "open",
				value: function open(options) {
					_get(Object.getPrototypeOf(UploadJsFileDialog.prototype), "open", this).call(this, options)
				}
			},{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(UploadJsFileDialog.prototype), "close", this).call(this)
				}
			},{
				key: "getFolder",
				value: function getFolder(folderObj) {
					folder = folderObj;
				}
			},{
				key: "removeJs",
				value: function removeJs(jsPath){
					$.ajax({
						url: "./public/php/remove_file.php",
						type: "POST",
						cache: true,
						data: {path:jsPath},
						success: function (data) {
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
							//console.log(data);
						}
					});
				}
			}]);
			return UploadJsFileDialog
		}(Dialog);
		module.exports = UploadJsFileDialog
	}, {
		"./Dialog": 498,
        "../helpers/parsePath": 595
	}]
});

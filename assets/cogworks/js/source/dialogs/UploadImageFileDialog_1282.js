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
		var UploadImageFileDialog = function (_Dialog) {
			_inherits(UploadImageFileDialog, _Dialog);
            var folder = null;
            var this_ = this;
            
			function UploadImageFileDialog(elem) {
                var obj = this;
				_classCallCheck(this, UploadImageFileDialog);
				_get(Object.getPrototypeOf(UploadImageFileDialog.prototype), "constructor", this).call(this, elem);
				
                var fileListIndex = 0;
                var inappropriateFiles = new Array();
                var fileLists = new Array();
                var cogID = "";
                var filename = "";
				var thefile = null;
				var reader = null;
				var firstProgress = true;
				
				$("#upload-image-file-dialog .button.imageUploadBtn").hide();
	
				function init() {
					var bHaveFileAPI = (window.File && window.FileReader);
	
					if (!bHaveFileAPI) {
						alert("This browser doesn't support the File API");
						return;
					}
					document.getElementById("uploadImageFile").addEventListener("change", onFileChanged);
					document.getElementById("startreadImage").addEventListener("click", startread);
				}
				
				function onFileChanged(theEvt) {
					fileListIndex = 0;
                    fileLists = new Array();
                    
                    $.each((theEvt.target.files), function(index, value){
                        reader = null;
                        firstProgress = true;
                        $("#imageProgressBar").val(0);
                        
                        if (value != null) {
                            var str = ((value.type.split('/')[((value.type.split('/').length) - 1)]).toLowerCase());

                            if(str == 'jpg' || str == 'jpeg' || str == 'png' || str == 'svg' || str == 'svg+xml' || str == 'gif')
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
                            $("#imageStatus").empty().html("<p>No file selected to read.</p>");
                            return false;
                        }
                    });
                    if((theEvt.target.files).length > 0 && inappropriateFiles.length == (theEvt.target.files).length)
                    {
                        $("#imageStatus").empty().html('<p>Selected ' + ((inappropriateFiles.length == 1) ? 'file is' : 'files are') + ' not JPG, PNG, SVG or GIF.</p>');
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
						$("#imageStatus").empty().html("<p>No file selected to read.</p>");
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
                        $("#imageStatus").empty().html('<p>There ' + ((inappropriateFiles.length == 1) ? 'is a file this is not' : 'are some files that are') + ' not JPG, PNG, SVG or GIF. ' + ((inappropriateFiles.length == 1) ? 'This' : 'These') + ' will not be include in your upload.</p>' + str);
                    }
					$("#upload-image-file-dialog .button.imageUploadBtn").fadeIn();
				}
				function fileProgress(evt) {
					// evt will be a ProgressEvent: http://www.w3.org/TR/progress-events/#progressevent
					if (evt.lengthComputable) {
						if (firstProgress) {
							firstProgress=false;
						}
						var progCalc = Math.round((evt.loaded / evt.total) * 100);
						$("#imageProgressBar").val(progCalc);
					}
				}
				
				function fileError(evt) {
					switch (evt.target.error.code) {
						case evt.target.error.NOT_FOUND_ERR:
							$("#imageStatus").html("File was not found");
							break;
						case evt.target.error.NOT_READABLE_ERR:
							$("#imageStatus").html("File was unreadable");
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
					$("#imageProgressBar").val(0);
					$("#uploadImageFile").val("");
					$("#imageStatus").html("");
					$("#startreadImage").show();
					$("#upload-image-file-dialog .button.imageUploadBtn").hide();
				}
				/* function readImage(path)
				{
					var parsed = parsePath(path);
					
					$.ajax({
					url: '../cogworks/main-tool-backend/read-image',
					type: "POST",
					cache: true,
					data: {path:parsed.dirname,fName:parsed.basename},
					success: function (data) {
							app.imageContentRead = data;
                            app.getPanel("design").importImagesByPaths(eval("['" + path + "']"), folder);
						}
					
					});
				} */
				init();
				
                elem.find(".button.imageCancel").on("click", function(){
					obj.close();
					resetLoader();
				});
				elem.find(".button.imageReset").on("click", function(){
					resetLoader();
				});
				elem.find(".button.imageUploadBtn").on("click", function(){
					var fileIndex = 0;
					var processFile = function(){
						var value = fileLists[fileIndex];
						var paths = ["./tmp/"];
						var form_data = new FormData();
						if(fileIndex < fileLists.length) {
							form_data.append('file', value);
							form_data.append('user', app.user);
							
							cogworks.loadingScreen("dynamic","Importing " + value.name + ".","fadeIn");

							$.ajax({
								url: '../cogworks/main-tool-backend/move/file/tmp',
								dataType: 'text',
								cache: false,
								contentType: false,
								processData: false,
								data: form_data,                         
								type: 'post',
								success: function(data){
									var obj = JSON.parse(data);
									if(obj.status) {
										var parsed = parsePath(obj.path);
										$.ajax({
											url: '../cogworks/main-tool-backend/read-image',
											type: "POST",
											cache: true,
											data: {path:parsed.dirname,fName:parsed.basename},
											success: function (data2) {
												if(data2 != 'fail') {
													app.imageContentRead = data2;
                                    				app.getPanel("design").importImagesByPaths(eval("['" + obj.path + "']"), folder);
													fileIndex++;
													processFile();
												} else {
													cogworks.loadingScreen("alert","<p>We encountered error in file " + value.name + ". Try it again.</p><p>Report error ID: 045 to the admin if issue persist.</p>","show");
												}
											},
											error: function (request, status, error) {
												cogworks.loadingScreen("alert","<p>We encountered error in file " + value.name + ". Try it again.</p><p>Report error ID: 044 to the admin if issue persist.</p>","show");
											}
										});
									} else {
										cogworks.loadingScreen("alert","<p>We encountered error in file " + value.name + ". Try it again.</p><p>Report error ID: 043 to the admin if issue persist.</p>","show");
									}
								},
								error: function (request, status, error) {
									cogworks.loadingScreen("alert","<p>We encountered error in file " + value.name + ". Try it again.</p><p>Report error ID: 042 to the admin if issue persist.</p>","show");
								}
							});
						} else {
							app.notifications.create({
								title: fileLists.length == 1 ? "An image was imported" : fileLists.length + " images were imported",
								description: "You can see " + (fileLists.length == 1 ? "it" : "them") + " in the Design panel."
							}).show()

							$("#upload-image-file-dialog .button.imageCancel").trigger("click");
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
							app.getPanel("design").instantExpandCategory("Images");
						}
					}
					processFile();
				});
			}
			_createClass(UploadImageFileDialog, [{
				key: "open",
				value: function open(options) {
					_get(Object.getPrototypeOf(UploadImageFileDialog.prototype), "open", this).call(this, options)
				}
			},{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(UploadImageFileDialog.prototype), "close", this).call(this)
				}
			},{
				key: "getFolder",
				value: function getFolder(folderObj) {
					folder = folderObj;
				}
			},{
				key: "removeImage",
				value: function removeImage(imagePath){
					$.ajax({
						url: "../cogworks/main-tool-backend/remove-file",
						type: "POST",
						cache: true,
						data: {path:imagePath},
						success: function (data) {
							var obj = JSON.parse(data);
							if(!obj.status){
								// let's make this notification simple and not too obvious. this is not much a big deal.
								app.notifications.create({
									title: 'Fail to Delete',
									description: 'Fail to Delete a file. Error ID: 047.'
								}).show();
							}
						},
						error: function (request, status, error) {
							// let's make this notification simple and not too obvious. this is not much a big deal.
							app.notifications.create({
								title: 'Fail to Delete',
								description: 'Fail to Delete a file. Error ID: 046.'
							}).show();
						}
					});
				}
			}]);
			return UploadImageFileDialog
		}(Dialog);
		module.exports = UploadImageFileDialog
	}, {
		"./Dialog": 498,
        "../helpers/parsePath": 595
	}]
});

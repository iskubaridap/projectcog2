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
        var UploadPDFDialog = function(_Dialog) {
            _inherits(UploadPDFDialog, _Dialog);
            var folder = null;

            function UploadPDFDialog(elem) {
                var obj = this;
				_classCallCheck(this, UploadPDFDialog);
				_get(Object.getPrototypeOf(UploadPDFDialog.prototype), "constructor", this).call(this, elem);
				
                var fileListIndex = 0;
                var inappropriateFiles = new Array();
                var fileLists = new Array();
                var cogID = "";
                var filename = "";
				var thefile = null;
				var reader = null;
                var firstProgress = true;
                var fileErrorAry = new Array();
				
				$("#upload-pdf-file-dialog .button.pdfUploadBtn").hide();
	
				function init() {
					var bHaveFileAPI = (window.File && window.FileReader);
	
					if (!bHaveFileAPI) {
						alert("This browser doesn't support the File API");
						return;
					}
	
					document.getElementById("uploadPDFFile").addEventListener("change", onFileChanged);
					document.getElementById("startreadPDF").addEventListener("click", startread);
				}
				
				function onFileChanged(theEvt) {
                    fileListIndex = 0;
                    fileLists = new Array();
                    
                    $.each((theEvt.target.files), function(index, value){
                        reader = null;
                        firstProgress = true;
                        $("#pdfProgressBar").val(0);
                        if (value != null) {
                            if(((value.type.split('/')[((value.type.split('/').length) - 1)]).toLowerCase()) == 'pdf')
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
                            $("#pdfStatus").empty().html("<p>No file selected to read.</p>");
                            return false;
                        }
                    });
                    if((theEvt.target.files).length > 0 && inappropriateFiles.length == (theEvt.target.files).length)
                    {
                        $("#pdfStatus").empty().html('<p>Selected ' + ((inappropriateFiles.length == 1) ? 'file is' : 'files are') + ' not PDF.</p>');
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
						$("#pdfStatus").empty().html("<p>No file selected to read bar.</p>");
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
                        $("#pdfStatus").empty().html('<p>There ' + ((inappropriateFiles.length == 1) ? 'is a file this is not' : 'are some files that are') + ' not PDF. ' + ((inappropriateFiles.length == 1) ? 'This' : 'These') + ' will not be include in your upload.</p>' + str);
                    }
					$("#upload-pdf-file-dialog .button.pdfUploadBtn").fadeIn();
				}
				function fileProgress(evt) {
					if (evt.lengthComputable) {
						if (firstProgress) {
							firstProgress=false;
						}
						var progCalc = Math.round((evt.loaded / evt.total) * 100);
						$("#pdfProgressBar").val(progCalc);
					}
				}
				
				function fileError(evt) {
					switch (evt.target.error.code) {
						case evt.target.error.NOT_FOUND_ERR:
							$("#pdfStatus").empty().html("<p>File was not found.</p>");
							break;
						case evt.target.error.NOT_READABLE_ERR:
							$("#pdfStatus").empty().html("<p>File was unreadable.</p>");
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
                    fileErrorAry = new Array();
					$("#pdfProgressBar").val(0);
					$("#uploadPDFFile").val("");
					$("#pdfStatus").html("");
					$("#startreadPDF").show();
					$("#upload-pdf-file-dialog .button.pdfUploadBtn").hide();
				}
				
                init();
                
                var indicateError = function(file) {
                    var str = '';
                    fileErrorAry.push(file);
                    $.each(fileErrorAry, function(index, value) {
                        str += value + ((index < (fileErrorAry.length - 1)) ? ', ' : '');
                    });
                    cogworks.loadingScreen("alert","<p>You have an error in " + ((fileErrorAry.length == 1) ? 'file ' : 'files ') + str + ".</p>","show");
                }
				
                elem.find(".button.pdfCancel").on("click", function(){
					obj.close();
					resetLoader();
				});
				elem.find(".button.pdfReset").on("click", function(){
					resetLoader();
				});
				elem.find(".button.pdfUploadBtn").on("click", function(){
                    var fileID = app.context.fileID;
                    var designID = app.context.id;
                    var user = app.user;
                    var loopCount = 0;
                    var formData = null;
                    fileErrorAry = new Array();
                    
                    var processFile = function() {
                        var value = fileLists[loopCount];
                        formData = new FormData();
                        if(loopCount < fileLists.length) {
                            formData.append('file', value);
                            formData.append('fileID', fileID);
                            formData.append('asset', 'pdf');
                            formData.append('designID', designID);
                            formData.append('user', user);
                            
                            if(fileErrorAry.length <= 0) {
                                cogworks.loadingScreen("dynamic","<p>Importing " + value.name + ".</p>","fadeIn");
                            }

                            $.ajax({
                                url: '../cogworks/main-tool-backend/move/upload/assets',
                                dataType: 'text',
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: formData,                         
                                type: 'post',
                                success: function(data){
                                    var filePath = (JSON.parse(data)).path;
                                    app.pdfContentRead = value;
                                    app.getPanel("design").importPDFFilesByPaths(eval("['" + filePath + "']"), folder);
                                    
                                    loopCount++;
                                    processFile();
                                },
                                error: function(data){
                                    loopCount++;
                                    processFile();
                                    indicateError(value.name);
                                }
                            });
                        } else {
                            app.notifications.create({
                                title: fileLists.length == 1 ? "A PDF file was imported" : fileLists.length + " PDF files were imported",
                                description: "You can see " + (fileLists.length == 1 ? "it" : "them") + " in the Design panel."
                            }).show()
                            $("#upload-pdf-file-dialog .button.pdfCancel").trigger("click");
                            if(fileErrorAry.length <= 0) {
                                setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
                            }
                            app.getPanel("design").instantExpandCategory("PDF");
                        }
                    };
                    processFile();

                    /* var cogName = ((app.context.path).split("/"))[((app.context.path).split("/").length - 1)];
                    var cogDir = (((app.context.path).split("/"))[((app.context.path).split("/").length - 2)] == "raw_files") ? "0" : ((app.context.path).split("/"))[((app.context.path).split("/").length - 2)];
                    $.post((ROOT + "extra/get_cog_id"),{cogName: (((app.context.path).split("/"))[((app.context.path).split("/").length - 1)]), cogDir: cogDir}, function(data){
                        var loopCount = 0;
                        cogID = data;
                        
                        $.each(fileLists, function(index, value){
                            var form_data = new FormData();
                            form_data.username = USERNAME;
                            form_data.append('file', value);
                            form_data.append('id', cogID);
                            form_data.append('asset', 'pdf');
                            form_data.append('orgname', ORG);
                            form_data.append('username', USERNAME);
                            
                            cogworks.loadingScreen("dynamic","Importing " + value.name + ".","fadeIn");
                            
                            $.ajax({
                                url: (ROOT + "extra/move_asset"),
                                dataType: 'text',
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,                         
                                type: 'post',
                                success: function(data){
                                    app.pdfContentRead = value;
                                    app.getPanel("design").importPDFFilesByPaths(eval("['" + data + "']"), folder);
                                    
                                    if(loopCount < (fileLists.length - 1))
                                    {
                                        loopCount = loopCount + 1;
                                    }
                                    else if(loopCount >= (fileLists.length - 1))
                                    {
                                        app.notifications.create({
                                            title: fileLists.length == 1 ? "A PDF file was imported" : fileLists.length + " PDF files were imported",
                                            description: "You can see " + (fileLists.length == 1 ? "it" : "them") + " in the Design panel."
                                        }).show()
                                        $("#upload-pdf-file-dialog .button.pdfCancel").trigger("click");
                                        setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
                                        app.getPanel("design").instantExpandCategory("PDF");
                                    }
                                }
                             });
                        })
                    }); */
					
				});
            }
            _createClass(UploadPDFDialog, [{
				key: "open",
				value: function open(options) {
					_get(Object.getPrototypeOf(UploadPDFDialog.prototype), "open", this).call(this, options)
				}
			},{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(UploadPDFDialog.prototype), "close", this).call(this)
				}
			},{
				key: "getFolder",
				value: function getFolder(folderObj) {
					folder = folderObj;
				}
			},{
				key: "removePDF",
				value: function removePDF(pdfPath){
					/* $.ajax({
						url: "./public/php/remove_file.php",
						type: "POST",
						cache: true,
						data: {path:pdfPath},
						success: function (data) {
							setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
							//console.log(data);
						}
					}); */
				}
			}]);
            return UploadPDFDialog
        }(Dialog);
        module.exports = UploadPDFDialog
    }, {
        "./Dialog": 498
    }]
});
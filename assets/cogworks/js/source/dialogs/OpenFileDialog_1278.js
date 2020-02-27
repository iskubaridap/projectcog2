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
        var OpenFileDialog = function(_Dialog) {
            _inherits(OpenFileDialog, _Dialog);
            var openFileDialogObj = null;
            
            function openFile()
			{
				$(".openCogFile").each(function(){
					$(this).unbind().bind("click",function(){
						var filename = $(this).data("filename");
						var org = ($(this).data("org") + "/");
						var proj = ($(this).data("project") != "") ? ($(this).data("project") + "/") : "";
						var user = ($(this).data("user") != "") ? ($(this).data("user") + "/raw_files/") : "";
						var file = (proj.length > 0) ? org + proj + filename : org + user + filename;
						
						app.openCogPath(file);
						openFileDialogObj.close();
					});
				});
			}

            function OpenFileDialog(elem) {
                var obj = this;
				openFileDialogObj = this;
                
                _classCallCheck(this, OpenFileDialog);
                _get(Object.getPrototypeOf(OpenFileDialog.prototype), "constructor", this).call(this, elem);
                
                elem.find(".button.cancel").on("click", function(){
					obj.close();
				});
            }
            _createClass(OpenFileDialog, [{
                key: "open",
                value: function open(options) {
                    _get(Object.getPrototypeOf(OpenFileDialog.prototype), "open", this).call(this, options);
                    $("#orgCogFiles").empty();
					$("#cogFiles").empty();
                    
                    $.post(ROOT + "cog_files/retrieve/projects", {}, function(e) {
						if(e == false)
						{
							$("#orgCogFiles").html("No Projects...");
						}
						else
						{
							var prj = "";
							e.sort(function(a,b) {return (a.projectName > b.projectName) ? 1 : ((b.projectName > a.projectName) ? -1 : 0);} );
							$.each(e, function(key, value){
								var id = value.id;
								var file = value.name;
								var name = (value.name).replace(".cog","");
								var user = (USERNAME).replace(".com","");
								var project = value.projectName ? (value.projectName).replace(" ","_") : "";
								var org = (value.org).replace(" ","_");
								var cogFile = "";
								
								if(prj != project)
								{
									cogFile = '<div class="projectName">' + value.projectName + '</div>'+'<div data-cogfileid="' + id + '" data-filename="' + file + '" data-user="' + user + '" data-project="' + project + '" data-org="' + org + '" class="cogfile openCogFile">' + name + '</div>';
									prj = project;
								}
								else
								{
									cogFile = '<div data-cogfileid="' + id + '" data-filename="' + file + '" data-user="' + user + '" data-project="' + project + '" data-org="' + org + '" class="cogfile openCogFile">' + name + '</div>';
								}
								
								$("#orgCogFiles").append(cogFile);
							});
							openFile();
						}
					}, 'json');
					
					$.post(ROOT + "cog_files/retrieve/cog_files", {}, function(e) {
						if(e == false)
						{
							$("#cogFiles").html("No Cog Files...");
						}
						else
						{
							$.each(e, function(key, value){
								var id = value.id;
								var file = value.name;
								var name = (value.name).replace(".cog","");
								var user = (USERNAME).replace(".com","");
								var project = value.projectName ? (value.projectName).replace(" ","_") : "";
								var org = (value.org).replace(" ","_");
								var cogFile = '<div data-cogfileid="' + id + '" data-filename="' + file + '" data-user="' + user + '" data-project="' + project + '" data-org="' + org + '" class="cogfile openCogFile">' + name + '</div>';
								
								$("#cogFiles").append(cogFile);
							});
							openFile();
						}
					}, 'json');
                }
            },{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(OpenFileDialog.prototype), "close", this).call(this)
				}
			}]);
            return OpenFileDialog
        }(Dialog);
        module.exports = OpenFileDialog
    }, {
        "./Dialog": 498
    }]
});
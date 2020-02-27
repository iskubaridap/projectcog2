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
        var clone = require("clone");
		var Dialog = require("./Dialog");
        var parsePath = require("../helpers/parsePath");
		var ElementSettingsDialog = function (_Dialog) {
			_inherits(ElementSettingsDialog, _Dialog);
            
            var element = null;
            var oldElement = null;
            var folder = null;
            var overridesObj = null;
            var overridesObjOld = new Array();
            var str = "";
            var text = "";
            var node = null;
            var component = null;
            var path = null;
            var oldOverrides = null;
            var changesMade = false;

			function ElementSettingsDialog(elem) {
                var obj = this;
				_classCallCheck(this, ElementSettingsDialog);
				_get(Object.getPrototypeOf(ElementSettingsDialog.prototype), "constructor", this).call(this, elem);
				
                elem.find(".button.element-settings-update").on("click", function(){
                    node = app.context.page.focusedDOMNode;
                    component = app.context.page.findComponentForElement(node);
                    path = component.getPathForChildElement(node);
                    oldOverrides = clone(component.getOverrides(path));
                    
					$("#element-settings-dialog-form .element-settings-dialog-value").each(function(index){
                        if(overridesObj[$(this).attr("data-property")] != $(this).val())
                        {
                            changesMade = true;
                            overridesObj[$(this).attr("data-property")] = $(this).val();
                        }
                    });
                    if(changesMade)
                    {
                        $.each(overridesObj, function(key, value){
                            if(key == "id")
                            {
                                if(($(".option-group.attributes .content .option.textboxoption .control input").val()) != value)
                                {
                                    $(".option-group.attributes .content .option.textboxoption .control input").val(value);
                                }
                            }
                            else if(key == "class")
                            {
                                if(($(".option-group.attributes .content .tb-locked b").text()) != value)
                                {
                                    $(".option-group.attributes .content .tb-locked b").text(value);
                                }
                            }
                            else
                            {
                                $(".option-group.attributes .content .option-group.overrides-group .content .doubletextboxoption").each(function(){
                                    $(this).find("label input").each(function(){
                                        if($(this).val() == key)
                                        {
                                            if($(this).next().val() != value)
                                            {
                                                $(this).next().val(value);
                                            }
                                            return false;
                                        }
                                    });
                                });
                            }
                        });
                        
                        $("#left-editor .attribute-panel .fields .option-group.attributes .content button.button").each(function(){
                            if((($(this).text()).toLowerCase()) == "apply")
                            {
                                $(this).trigger("click");
                                return false;
                            }
                        });
                    }
                    obj.close();
				});
                elem.find(".button.element-settings-cancel").on("click", function(){
					obj.close();
				});
			}
			_createClass(ElementSettingsDialog, [{
				key: "open",
				value: function open(options) {
					element = obj;
                    str = "";
                    text = "";
                    overridesObj = null;
                    
                    // This is to make sure we got the value coming from "/" property
                    for (var key in obj.overrides) {
                        if( obj.overrides.hasOwnProperty(key)){
                            if(key == "/")
                            {
                                overridesObj = clone(obj.overrides[key]);
                                break;
                            }
                        }
                    }
                    $("#element-settings-dialog-form").empty();
                    for (var key in overridesObj) {
                        if(overridesObj.hasOwnProperty(key)){
                            text = (overridesObj[key]).replace(/\'/g, "&apos;");
                            text = (text).replace(/\"/g, "&quot;");
                            str += '<div>';
                            str += '<label><b>' + key + '</b><br><input class="element-settings-dialog-value" data-property="' + key + '" type="text" value="' + text + '"></label><br>';
                            str += '</div>';
                        }
                    }
                    
                    $("#element-settings-dialog-form").append(str);
					_get(Object.getPrototypeOf(ElementSettingsDialog.prototype), "open", this).call(this)
				}
			},{
				key: "close",
				value: function close() {
					_get(Object.getPrototypeOf(ElementSettingsDialog.prototype), "close", this).call(this)
				}
			}]);
			return ElementSettingsDialog
		}(Dialog);
		module.exports = ElementSettingsDialog
	}, {
		"./Dialog": 498,
        "clone": 686,
        "../helpers/parsePath": 595
	}]
});

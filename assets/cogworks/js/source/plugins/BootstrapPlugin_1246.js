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
        var _get = function get(_x2, _x3, _x4) {
            var _again = true;
            _function: while (_again) {
                var object = _x2,
                    property = _x3,
                    receiver = _x4;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x2 = parent;
                        _x3 = property;
                        _x4 = receiver;
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
        var Plugin = require("./Plugin");
        var LookAndFeelOptionsPanel = require("../panels/LookAndFeelOptionsPanel");
        var SettingsPanel = require("../panels/SettingsPanel");
        var AnimationPanel = require("../panels/AnimationPanel");
        var panelClasses = {
            LookAndFeelOptionsPanel: LookAndFeelOptionsPanel,
            SettingsPanel: SettingsPanel,
            AnimationPanel: AnimationPanel
        };
        var frameworks = require("../frameworks/bootstrap");
        var BootstrapPlugin = function(_Plugin) {
            _inherits(BootstrapPlugin, _Plugin);

            function BootstrapPlugin() {
                _classCallCheck(this, BootstrapPlugin);
                _get(Object.getPrototypeOf(BootstrapPlugin.prototype), "constructor", this).apply(this, arguments)
            }
            _createClass(BootstrapPlugin, [{
                key: "initializeAssets",
                value: function initializeAssets() {
                    var _this = this;
                    return new Promise(function(resolve, reject) {
                        var downloadedIDs = app.downloadedPackages.getAll().map(function(pkg) {
                            return pkg.id
                        });
                        $.get("/app/init", {
                            downloaded: downloadedIDs
                        }, function(response) {
                            if (response.library) {
                                app.setupDownloadedPackages(response.library, downloadedIDs)
                            }
                            if (response.recipients) {
                                _this.updateRecipients(response.recipients)
                            }
                        }).always(function() {
                            resolve()
                        })
                    })
                }
            }, {
                key: "getDefaultPanelConfig",
                value: function getDefaultPanelConfig() {
                    return [{
                        id: "left-panel",
                        class: "VerticalPanelContainer",
                        collapsed: false,
                        reverse: false,
                        dimensions: {},
                        children: [{
                            class: "PanelGroup",
                            regularDimensions: {},
                            collapsedDimensions: {},
                            children: [{
                                class: "LookAndFeelOptionsPanel"
                            }, {
                                class: "SettingsPanel"
                            }, {
                                class: "AnimationPanel"
                            }]
                        }, {
                            class: "PanelGroup",
                            regularDimensions: {},
                            collapsedDimensions: {},
                            children: [{
                                class: "DesignPanel"
                            }]
                        }]
                    },{
                        id: "right-panel",
                        class: "VerticalPanelContainer",
                        collapsed: false,
                        reverse: true,
                        dimensions: {},
                        children: [{
                            class: "PanelGroup",
                            regularDimensions: {},
                            collapsedDimensions: {},
                            children: [{
                                class: "PodsComponentPanel"
                            },{
                                class: "WidgetComponentPanel"
                            }, {
                                class: "WhatNotsComponentPanel"
                            }]
                        }, {
                            class: "PanelGroup",
                            regularDimensions: {},
                            collapsedDimensions: {},
                            children: [{
                                class: "OverviewPanel"
                            }]
                        }]
                    }]
                }
            }, {
                key: "registerPanels",
                value: function registerPanels() {
                    for (var name in panelClasses) {
                        app.registerPanel(name, panelClasses[name])
                    }
                }
            }, {
                key: "fetchRecipients",
                value: function fetchRecipients() {
                    var _this2 = this;
                    return new Promise(function(resolve, reject) {
                        $.get("/app/recipients").done(function(response) {
                            _this2.updateRecipients(response.recipients);
                            resolve(response)
                        }).fail(reject)
                    })
                }
            }, {
                key: "createRecipient",
                value: function createRecipient(body) {
                    return new Promise(function(resolve, reject) {
                        $.post("/app/recipients", body).done(function(response) {
                            resolve(response.recipient)
                        }).fail(reject)
                    })
                }
            }, {
                key: "verifyRecipient",
                value: function verifyRecipient(id, code) {
                    return new Promise(function(resolve, reject) {
                        $.post("/app/recipients/" + id + "/verify", {
                            code: code
                        }).done(function(response) {
                            resolve(response.recipient)
                        }).fail(reject)
                    })
                }
            }, {
                key: "sendRecipientVerification",
                value: function sendRecipientVerification(id) {
                    return new Promise(function(resolve, reject) {
                        $.post("/app/recipients/" + id + "/send-verification").done(resolve).fail(reject)
                    })
                }
            }, {
                key: "deleteRecipient",
                value: function deleteRecipient(id) {
                    return new Promise(function(resolve, reject) {
                        $.ajax("/app/recipients/" + id, {
                            method: "delete"
                        }).done(resolve).fail(reject)
                    })
                }
            }, {
                key: "updateRecipients",
                value: function updateRecipients() {
                    var recipients = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    electron.saveSetting("recipients", recipients);
                    app.trigger("recipients-changed")
                }
            }, {
                key: "frameworks",
                get: function get() {
                    return frameworks
                }
            }]);
            return BootstrapPlugin
        }(Plugin);
        module.exports = BootstrapPlugin
    }, {
        "../frameworks/bootstrap": 541,
        "../panels/AnimationPanel": 1209,
        "../panels/LookAndFeelOptionsPanel": 1226,
        "../panels/SettingsPanel": 1239,
        "./Plugin": 1247
    }]
});
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
        var PaneDialog = require("./PaneDialog");
        var ThemeManagerPane = require("./ThemeManagerPane");
        var PreviewPane = require("./PreviewPane");
        var MetaTagPane = require("./MetaTagPane");
        var BackupPane = require("./BackupPane");
        var SettingsDialog = function(_PaneDialog) {
            _inherits(SettingsDialog, _PaneDialog);

            function SettingsDialog(elem) {
                _classCallCheck(this, SettingsDialog);
                _get(Object.getPrototypeOf(SettingsDialog.prototype), "constructor", this).call(this, elem);
                this.okButton = elem.find(".button.ok");
                this.okButton.on("click", this.onSave.bind(this));
                elem.find(".button.cancel").on("click", this.close.bind(this));
                this.pseudoThemeInput = elem.find(".theme.pseudo-input");
                this.designTheme = elem.find(".design-theme");
                this.designTheme.on("change", this.onThemeSelectChange.bind(this));
                elem.find(".button.manage-themes").on("click", this.onManageThemesClick.bind(this));
                this.lms = false;
                this.chosenTheme = "";
                this.originalTheme = "";
                this.jQueryVersionsDropdown = elem.find(".jquery-version");
                this.sassPathField = elem.find("input.sass-path");
                this.exportButton = elem.find(".button.export");
                this.exportButton.on("click", this.onExport.bind(this));
                this.exportPathField = elem.find("input.export-path");
                this.exportScriptField = elem.find("input.export-script");
                this.exportLMlibraries = elem.find("input.lms");
                this.minifyCheckbox = elem.find("input.minify");
                this.cdnCheckbox = elem.find("input.cdn");
                this.cleanupCheckbox = elem.find("input.cleanup");
                this.pathsCheckbox = elem.find("input.paths");
                this.cacheCheckbox = elem.find("input.cache");
                this.exportSCSSCheckbox = elem.find("input.export-scss");
                this.exportLabelsCheckbox = elem.find("input.export-labels");
                this.exportPathBrowse = elem.find(".button.export-path-browse");
                this.exportScriptBrowse = elem.find(".button.export-script-browse");
                this.exportPathBrowse.on("click", this.onExportPathBrowseClick.bind(this));
                this.exportScriptBrowse.on("click", this.onExportScriptBrowseClick.bind(this));
                this.exportPathField.on("input", this.onExportPathInput.bind(this));
                this.exportScriptField.on("input", this.onExportScriptInput.bind(this));
                this.minifyCheckbox.on("change", this.onMinifyCheck.bind(this));
                this.exportLMlibraries.on("change", this.onLMCheck.bind(this));
                this.cdnCheckbox.on("change", this.onCDNCheck.bind(this));
                this.themeManager = new ThemeManagerPane(elem.find(".target.theme-manager"));
                this.previewManager = new PreviewPane(elem.find(".target.preview"));
                this.metaTagManager = new MetaTagPane(elem.find(".target.meta-tags"));
                this.backupManager = new BackupPane(elem.find(".target.backup"));
                this.tabToPane.set("theme-manager", this.themeManager);
                this.tabToPane.set("preview", this.previewManager);
                this.tabToPane.set("meta-tags", this.metaTagManager);
                this.tabToPane.set("backup", this.backupManager);
                this.isChanged = false;
                elem.find(".pull-up-section .heading").on("click", function(e) {
                    $(e.target).closest(".pull-up-section").toggleClass("expanded")
                });
                elem.find(".convert-to-bs4").on("click", function() {
                    app.framework.convertBootstrap4Confirmation()
                });
                this.havePublishSettingsChanged = false;
                this.originalWebsiteIDValue = false;
                this.websiteChooser = this.element.find(".publish-website");
                this.websiteChooser.on("change", this.onWebsiteSelectChange.bind(this));
                this.publishButton = elem.find(".button.publish");
                this.publishButton.on("click", this.onPublish.bind(this));
                elem.find(".button.manage-websites").on("click", this.onManageWebsitesClick.bind(this));
                this.headContentTextarea = this.element.find(".head-content textarea");
                app.on("bootstrap-theme-added bootstrap-theme-removed bootstrap-theme-renamed", this.onThemesChanged.bind(this))
            }
            _createClass(SettingsDialog, [{
                key: "onThemesChanged",
                value: function onThemesChanged() {
                    this.updateThemesDropdown()
                }
            }, {
                key: "onManageThemesClick",
                value: function onManageThemesClick() {
                    this.selectTab("theme-manager");
                    this.update()
                }
            }, {
                key: "onManageWebsitesClick",
                value: function onManageWebsitesClick() {
                    app.websiteManagerDialog.open()
                }
            }, {
                key: "onThemeSelectChange",
                value: function onThemeSelectChange() {
                    this.chosenTheme = app.framework.getThemeById(this.designTheme.val());
                    this.options.onThemeChange({
                        theme: this.chosenTheme
                    })
                }
            }, {
                key: "onWebsiteSelectChange",
                value: function onWebsiteSelectChange() {
                    this.havePublishSettingsChanged = this.originalWebsiteIDValue != Number(this.websiteChooser.val());
                    this.updatePublishButton()
                }
            }, {
                key: "onExport",
                value: function onExport() {
                    this.options.onExport(this.extractExportOptions())
                }
            }, {
                key: "onPublish",
                value: function onPublish() {
                    var websiteID = Number(this.websiteChooser.val());
                    if (websiteID) {
                        app.handlePublish(app.context, websiteID)
                    }
                }
            }, {
                key: "open",
                value: function open(options) {
                    var that = this;
                    this.context = options.context;
                    this.activeTab = options.tab || "choose-theme";
                    this.element.find(".bootstrap-version span").text(app.framework.name);
                    this.element.find(".convert-to-bs4").toggle(app.framework.version == 3 && app.context.settings.theme.id != "mcafee" && app.context.settings.theme.id != "jsi");
                    this.element.find("#choose-theme-jquery").toggle(app.context.settings.theme.id != "mcafee" && app.context.settings.theme.id != "jsi");
                    this.chosenTheme = options.theme;
                    this.originalTheme = options.theme;
                    this.updateThemesDropdown();
                    this.themeManager.setup({
                        canThemeBeDeleted: function canThemeBeDeleted(theme) {
                            return app.framework.isThemeUsedInOpenDesigns(theme.id) || theme.id == that.originalTheme.id
                        }
                    });
                    this.addButtonsFor(this.themeManager);
                    this.themeManager.update();
                    this.previewManager.update();
                    this.jQueryVersionsDropdown.empty();
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = options.availablejQueryVersions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var ver = _step.value;
                            this.jQueryVersionsDropdown.append('<option value="' + ver.short + '">jQuery ' + ver.full + "</option>")
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
                    this.jQueryVersionsDropdown.val(options.jqueryVersion);
                    this.sassPathField.val(options.sassPath || "");
                    this.isChanged = false;
                    this.element.find(".advanced").removeClass("expanded");
                    this.exportOptions = options.exportOptions;
                    this.exportLMlibraries.prop("checked", ((typeof app.context.settings.lms === "undefined") ? false : app.context.settings.lms));
                    this.minifyCheckbox.prop("checked", !!this.exportOptions.minify);
                    this.cdnCheckbox.prop("checked", !!this.exportOptions.useCDN);
                    this.cleanupCheckbox.prop("checked", !!this.exportOptions.removeUnusedImages);
                    this.pathsCheckbox.prop("checked", !!this.exportOptions.useAbsolutePaths);
                    this.cacheCheckbox.prop("checked", !!this.exportOptions.versionAssets);
                    this.exportSCSSCheckbox.prop("checked", !!this.exportOptions.exportSCSS);
                    this.exportLabelsCheckbox.prop("checked", !!this.exportOptions.exportLabels);
                    this.exportPathField.val(this.exportOptions.exportDestination || "");
                    this.exportScriptField.val(this.exportOptions.exportScript || "");
                    this.headContentTextarea.val(options.headContent);
                    this.metaTagManager.setup({
                        meta: options.meta,
                        noTagMessage: 'These meta tags are added to all pages of your design. You can create tags for individual pages from the "Page Properties" dialog. Click the "Add Meta" button below.'
                    });
                    this.metaTagManager.update();
                    this.addButtonsFor(this.metaTagManager);
                    this.backupManager.setup(options.backupSettings);
                    this.backupManager.update();
                    this.addButtonsFor(this.backupManager);
                    _get(Object.getPrototypeOf(SettingsDialog.prototype), "open", this).call(this, options)
                }
            }, {
                key: "update",
                value: function update() {
                    this.updateContent();
                    this.updateButtons();
                    _get(Object.getPrototypeOf(SettingsDialog.prototype), "update", this).call(this)
                }
            }, {
                key: "updateThemesDropdown",
                value: function updateThemesDropdown() {
                    if (app.context.usesTemplate()) {
                        this.designTheme.hide();
                        this.pseudoThemeInput.find("span").text(app.context.settings.theme.name);
                        this.pseudoThemeInput.show()
                    } else {
                        this.designTheme.empty();
                        var tmp;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;
                        try {
                            for (var _iterator2 = app.framework.getAllThemes()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var theme = _step2.value;
                                tmp = $("<option>");
                                tmp.text(theme.name);
                                tmp.val(theme.id);
                                this.designTheme.append(tmp)
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
                        this.designTheme.val(this.chosenTheme.id);
                        this.designTheme.show();
                        this.pseudoThemeInput.hide()
                    }
                }
            }, {
                key: "updateButtons",
                value: function updateButtons() {
                    this.updateExportButton();
                    this.updatePublishButton()
                }
            }, {
                key: "updateContent",
                value: function updateContent() {
                    if (this.activeTab == "publish-options") {
                        var that = this;
                        if (that.workingGetWebsites) return;
                        that.workingGetWebsites = true;
                        that.havePublishSettingsChanged = false;
                        var tabTarget = this.element.find(".target." + this.activeTab);
                        tabTarget.removeClass("has-websites no-websites error");
                        tabTarget.addClass("loading");
                        that.websiteChooser.empty();
                        $.get("/app/websites/get-all", {
                            designID: this.context.id
                        }).done(function(response) {
                            if (!response.websites.length) {
                                tabTarget.addClass("no-websites")
                            } else {
                                tabTarget.addClass("has-websites");
                                that.websiteChooser.append($('<option value="0">').text("None"));
                                var chosen = 0,
                                    tmp;
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;
                                try {
                                    for (var _iterator3 = response.websites[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var site = _step3.value;
                                        tmp = $("<option>");
                                        tmp.text(site.url);
                                        tmp.val(site.id);
                                        that.websiteChooser.append(tmp);
                                        if (site.id == response.websiteForDesign) {
                                            chosen = site.id
                                        }
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
                                that.websiteChooser.val(chosen);
                                that.originalWebsiteIDValue = chosen
                            }
                            that.updatePublishButton()
                        }).fail(function(msg) {
                            tabTarget.addClass("error")
                        }).always(function() {
                            tabTarget.removeClass("loading");
                            that.workingGetWebsites = false
                        })
                    }
                }
            }, {
                key: "onExportPathInput",
                value: function onExportPathInput() {
                    this.updateExportButton()
                }
            }, {
                key: "onExportScriptInput",
                value: function onExportScriptInput() {
                    this.updateExportButton()
                }
            }, {
                key: "onExportPathBrowseClick",
                value: function onExportPathBrowseClick() {
                    electron.showFileOpenDialog({
                        title: "Export Destination",
                        properties: ["openDirectory", "createDirectory"],
                        defaultPath: electron.readSetting("lastExportPath") || electron.readSetting("lastDesignPath")
                    }, function(path) {
                        if (!Array.isArray(path)) return;
                        electron.saveSetting("lastExportPath", path[0]);
                        this.exportPathField.val(path[0]);
                        this.updateExportButton()
                    }.bind(this))
                }
            }, {
                key: "onExportScriptBrowseClick",
                value: function onExportScriptBrowseClick() {
                    electron.showFileOpenDialog({
                        title: "Export Script",
                        defaultPath: electron.readSetting("lastExportPath") || electron.readSetting("lastDesignPath")
                    }, function(path) {
                        if (!Array.isArray(path)) return;
                        this.exportScriptField.val(path[0]);
                        this.updateExportButton()
                    }.bind(this))
                }
            }, {
                key: "onMinifyCheck",
                value: function onMinifyCheck() {
                    this.updateExportButton()
                }
            }, {
                key: "onLMCheck",
                value: function onLMCheck() {
                    this.updateExportLMSButton()
                }
            }, {
                key: "onCDNCheck",
                value: function onCDNCheck() {
                    this.updateExportButton()
                }
            }, {
                key: "extractExportOptions",
                value: function extractExportOptions() {
                    var obj = {};
                    if (this.exportPathField.val().trim()) {
                        obj.exportDestination = this.exportPathField.val().trim()
                    }
                    if (this.exportScriptField.val().trim()) {
                        obj.exportScript = this.exportScriptField.val().trim()
                    }
                    if (this.minifyCheckbox.prop("checked")) {
                        obj.minify = true
                    }
                    if (this.cdnCheckbox.prop("checked")) {
                        obj.useCDN = true
                    }
                    if (this.cleanupCheckbox.prop("checked")) {
                        obj.removeUnusedImages = true
                    }
                    if (this.pathsCheckbox.prop("checked")) {
                        obj.useAbsolutePaths = true
                    }
                    if (this.cacheCheckbox.prop("checked")) {
                        obj.versionAssets = true
                    }
                    if (this.exportSCSSCheckbox.prop("checked")) {
                        obj.exportSCSS = true
                    }
                    if (this.exportLabelsCheckbox.prop("checked")) {
                        obj.exportLabels = true
                    }
                    return obj
                }
            }, {
                key: "updateExportLMSButton",
                value: function updateExportLMSButton() {
                    this.lms = this.exportLMlibraries.prop("checked");
                    this.options.lms = this.lms;
                }
            }, {
                key: "updateExportButton",
                value: function updateExportButton() {
                    this.exportButton.removeClass("disable");
                    var newOptions = this.extractExportOptions();
                    if (!newOptions.exportDestination) {
                        this.exportButton.addClass("disable")
                    }
                }
            }, {
                key: "updatePublishButton",
                value: function updatePublishButton() {
                    this.publishButton.toggleClass("disable", Number(this.websiteChooser.val()) == 0)
                }
            }, {
                key: "onSave",
                value: function onSave() {
                    var sassPath = this.sassPathField.val().trim();
                    if (!electron.pathExists(sassPath)) {
                        sassPath = null
                    }
                    this.options.onSave({
                        theme: this.chosenTheme,
                        lms: this.lms,
                        meta: this.metaTagManager.getTags(),
                        headContent: this.headContentTextarea.val(),
                        exportOptions: this.extractExportOptions(),
                        sassPath: sassPath,
                        backupSettings: this.backupManager.getSettings(),
                        jqueryVersion: parseInt(this.jQueryVersionsDropdown.val(), 10)
                    });
                    if (this.havePublishSettingsChanged) {
                        $.post("/app/websites/save-website-for-design", {
                            designID: this.context.id,
                            websiteID: this.websiteChooser.val()
                        })
                    }
                    console.log(this.options);
                    this.close()
                }
            }, {
                key: "afterClose",
                value: function afterClose() {
                    this.context = null
                }
            }]);
            return SettingsDialog
        }(PaneDialog);
        module.exports = SettingsDialog
    }, {
        "./BackupPane": 488,
        "./MetaTagPane": 509,
        "./PaneDialog": 514,
        "./PreviewPane": 515,
        "./ThemeManagerPane": 523
    }]
});
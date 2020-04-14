define([], function() {
    return [function(require, module, exports) {
        "use strict";
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key]
                    }
                }
            }
            return target
        };
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

        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2
            } else {
                return Array.from(arr)
            }
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var Point = require("./Point");
        var Canvas = require("./Canvas");
        var DesignContext = require("../contexts/DesignContext");
        var ExportContext = require("../contexts/ExportContext");
        var Page = require("../base/Page");
        var Package = require("../packages/Package");
        var DownloadedPackage = require("../packages/DownloadedPackage");
        var SCSSResource = require("../resources/SCSSResource");
        var packageJSON = require("../package.json");
        var BootstrapPlugin = require("../plugins/BootstrapPlugin");
        var TabBar = require("../bars/TabBar");
        var ToolBar = require("../bars/ToolBar");
        var Panel = require("../panels/Panel");
        var PanelContainer = require("../panels/PanelContainer");
        var VerticalPanelContainer = require("../panels/VerticalPanelContainer");
        var PanelGroup = require("../panels/PanelGroup");
        var OverviewPanel = require("../panels/OverviewPanel");
        var StudioComponentPanel = require("../panels/StudioComponentPanel");
        var WidgetComponentPanel = require("../panels/WidgetComponentPanel");
        var PodsComponentPanel = require("../panels/PodsComponentPanel");
        var WhatNotsComponentPanel = require("../panels/WhatNotsComponentPanel");
        var OnlineComponentPanel = require("../panels/OnlineComponentPanel");
        var OptionsPanel = require("../panels/OptionsPanel");
        var LookAndFeelOptionsPanel = require("../panels/LookAndFeelOptionsPanel");
        var DesignPanel = require("../panels/DesignPanel");
        var EditorPanel = require("../panels/EditorPanel");
        var WidgetDrawer = require("../panels/WidgetDrawer");
        var Dialog = require("../dialogs/Dialog");
        var OpenFileDialog = require("../dialogs/OpenFileDialog");
        var UploadHTMLFileDialog = require("../dialogs/UploadHTMLFileDialog");
		var UploadCSSDialog = require("../dialogs/UploadCSSDialog");
		var UploadJsFileDialog = require("../dialogs/UploadJsFileDialog");
		var UploadImageFileDialog = require("../dialogs/UploadImageFileDialog");
		var UploadAudioFileDialog = require("../dialogs/UploadAudioFileDialog");
		var UploadPDFFileDialog = require("../dialogs/UploadPDFFileDialog");
        var ElementSettingsDialog = require("../dialogs/ElementSettingsDialog");
        var SettingsDialog = require("../dialogs/SettingsDialog");
        var AlertDialog = require("../dialogs/AlertDialog");
        var AboutDialog = require("../dialogs/AboutDialog");
        var IconsDialog = require("../dialogs/IconsDialog");
        var LinkDialog = require("../dialogs/LinkDialog");
        var ConfirmDialog = require("../dialogs/ConfirmDialog");
        var ChoiceDialog = require("../dialogs/ChoiceDialog");
        var ImagesDialog = require("../dialogs/ImagesDialog");
        var FontManagerDialog = require("../dialogs/FontManagerDialog");
        var CSSLinkDialog = require("../dialogs/CSSLinkDialog");
        var JSLinkDialog = require("../dialogs/JSLinkDialog");
        var ComponentDialog = require("../dialogs/ComponentDialog");
        var ComponentToPackageDialog = require("../dialogs/ComponentToPackageDialog");
        var NewDesignDialog = require("../dialogs/NewDesignDialog");
        var NewTemplatePageDialog = require("../dialogs/NewTemplatePageDialog");
        var PurchaseDialog = require("../dialogs/PurchaseDialog");
        var WhatsNewDialog = require("../dialogs/WhatsNewDialog");
        var CharacterInputDialog = require("../dialogs/CharacterInputDialog");
        var PagePropertiesDialog = require("../dialogs/PagePropertiesDialog");
        var ShareComponentDialog = require("../dialogs/ShareComponentDialog");
        var EditProfileDialog = require("../dialogs/EditProfileDialog");
        var ProfileDialog = require("../dialogs/ProfileDialog");
        var EditPackageScreenshotDialog = require("../dialogs/EditPackageScreenshotDialog");
        var ResourceOrderDialog = require("../dialogs/ResourceOrderDialog");
        var LabelDialog = require("../dialogs/LabelDialog");
        var WebsiteManagerDialog = require("../dialogs/WebsiteManagerDialog");
        var CreateWebsiteDialog = require("../dialogs/CreateWebsiteDialog");
        var EditWebsiteDialog = require("../dialogs/EditWebsiteDialog");
        var CopyToMultipleDialog = require("../dialogs/CopyToMultipleDialog");
        var CreateRecipientDialog = require("../dialogs/CreateRecipientDialog");
        var RecipientManagerDialog = require("../dialogs/RecipientManagerDialog");
        var BackupDialog = require("../dialogs/BackupDialog");
        var PreviewDialog = require("../dialogs/PreviewDialog");
        var ContextMenu = require("./ContextMenu");
        var ColorPicker = require("../panels/ColorPicker");
        var NotificationCenter = require("./NotificationCenter");
        var deepEqual = require("deep-equal");
        var jsonPatch = require("fast-json-patch");
        var parsePath = require("../helpers/parsePath");
        var parseEpodComponentFormat = require("../helpers/parseEpodComponentFormat");
        var parseCogDesignFormat = require("../helpers/parseCogDesignFormat");
        var enforceFileExtension = require("../helpers/enforceFileExtension");
        var executeDropCall = require("../helpers/executeDropCall");
        var cookies = require("../helpers/cookies");
        var keyChecker = require("../helpers/keyChecker");
        var hasSelection = require("../helpers/hasSelection");
        var generateMenuTemplateForApp = require("../helpers/generateMenuTemplateForApp");
        var updateLocalStorage = require("../converters/localStorage/");
        var PackageTreeGroup = require("../tree/PackageTreeGroup");
        var Application = function() {
            function Application() {
                _classCallCheck(this, Application);
                this.ready = false;
                this.aboveCanvas = false;
                this.mousePosition = new Point;
                this.isDragging = false;
                this.draggedComponents = null;
                this.dropCall = null;
                this.tabBar = null;
                this.toolBar = null;
                this.activeComponentToolbar = null;
                this.componentToolBar = null;
                this.panels = [];
                this.optionPanels = [];
                this.panelContainers = [];
                this.panelMap = new Map;
                this.panelConstructorsMap = new Map;
                this.context = null;
                this.openedContexts = [];
                this.loadingDesigns = [];
                this.framework = null;
                this.availableFrameworks = {};
                this.template = null;
                this.templateToContext = new Map;
                this.drawerTimeline = null;
                this.userPackages = {};
                this.downloadedPackages = {};
                this.recent = [];
                this.userCSSElement = null;
                this.canvas = null;
                this.pubsub = {};
                this.optionsPanelCollapsedState = new Map;
                this.settings = {
                    previewEnabled: false,
                    imageOverwrite: null,
                    activeOptionsTab: "look-and-feel-tab",
                    optionsScrollTop: {},
                    zoomFactor: 1
                };
                this.attributesCopyBuffer = null;
                this.requestMonitoring = true;
                this.sassJobs = {};
                this.sassJobID = 1;
                this._autoBackupInterval = null;
                this._savePackageTimeouts = {};
                this.pendingCommands = [];
                this.whatNotsPackages = {};
                this.podsComponents = [];
                this.podsComponentsAdded = false;
                this.assetAudioObj = new Object();
                this.assetPDFObj = new Object();
            }
            _createClass(Application, [{
                key: "setup",
                value: function setup(doc, $) {
                    var _this = this;
                    var app = this;
                    this.favoriteColors = electron.readSetting("favoriteColors", []);
                    this.recent = electron.readSetting("recent", []);
                    app.user = 0;
                    app.userPath = '';
                    app.fileID = 0;
                    app.openFile = null;
                    app.openFilePath = ''
;                    app.standardPods = null;
                    app.pods = null;
                    app.whatNots = null;
                    app.packages = [];
                    app.designPackages = [];
                    app.newEpod = null;
                    app.openFileDialog = new OpenFileDialog($("#open-file-dialog"));
                    app.uploadHTMLFileDialog = new UploadHTMLFileDialog($("#upload-html-file-dialog"));
					app.uploadCSSDialog = new UploadCSSDialog($("#upload-css-dialog"));
					app.uploadJsFileDialog = new UploadJsFileDialog($("#upload-js-file-dialog"));
					app.uploadImageFileDialog = new UploadImageFileDialog($("#upload-image-file-dialog"));
					app.uploadAudioFileDialog = new UploadAudioFileDialog($("#upload-audio-file-dialog"));
					app.uploadPDFFileDialog = new UploadPDFFileDialog($("#upload-pdf-file-dialog"));
                    app.elementSettingsDialog = new ElementSettingsDialog($("#element-settings-dialog"));
                    app.alertDialog = new AlertDialog($("#alert-dialog"));
                    app.aboutDialog = new AboutDialog($("#about-dialog"));
                    app.iconsDialog = new IconsDialog($("#icons-dialog"));
                    app.imagesDialog = new ImagesDialog($("#images-dialog"));
                    app.linkDialog = new LinkDialog($("#link-dialog"));
                    app.confirmDialog = new ConfirmDialog($("#confirm-dialog"));
                    app.choiceDialog = new ChoiceDialog($("#choice-dialog"));
                    app.fontManagerDialog = new FontManagerDialog($("#font-manager-dialog"));
                    app.cssLinkDialog = new CSSLinkDialog($("#css-link-dialog"));
                    app.jsLinkDialog = new JSLinkDialog($("#js-link-dialog"));
                    app.componentDialog = new ComponentDialog($("#component-dialog"));
                    app.componentToPackageDialog = new ComponentToPackageDialog($("#component-to-package-dialog"));
                    app.settingsDialog = new SettingsDialog($("#settings-dialog"));
                    app.newDesignDialog = new NewDesignDialog($("#new-design-dialog"));
                    app.newTemplatePageDialog = new NewTemplatePageDialog($("#new-template-page-dialog"));
                    app.purchaseDialog = new PurchaseDialog($("#purchase-dialog"));
                    app.whatsNewDialog = new WhatsNewDialog($("#whats-new-dialog"));
                    app.characterInputDialog = new CharacterInputDialog($("#character-input-dialog"));
                    app.pagePropertiesDialog = new PagePropertiesDialog($("#page-properties-dialog"));
                    app.shareComponentDialog = new ShareComponentDialog($("#share-component-dialog"));
                    app.editProfileDialog = new EditProfileDialog($("#edit-profile-dialog"));
                    app.profileDialog = new ProfileDialog($("#profile-dialog"));
                    app.editPackageScreenshotDialog = new EditPackageScreenshotDialog($("#edit-screenshot-dialog"));
                    app.resourceOrderDialog = new ResourceOrderDialog($("#resource-order-dialog"));
                    app.labelDialog = new LabelDialog($("#label-dialog"));
                    app.websiteManagerDialog = new WebsiteManagerDialog($("#website-manager-dialog"));
                    app.createWebsiteDialog = new CreateWebsiteDialog($("#create-website-dialog"));
                    app.editWebsiteDialog = new EditWebsiteDialog($("#edit-website-dialog"));
                    app.copyToMultipleDialog = new CopyToMultipleDialog($("#copy-multiple-dialog"));
                    app.createRecipientDialog = new CreateRecipientDialog($("#create-recipient-dialog"));
                    app.recipientManagerDialog = new RecipientManagerDialog($("#recipient-manager-dialog"));
                    app.previewDialog = new PreviewDialog($("#preview-dialog"));
                    app.backupDialog = new BackupDialog($("#backup-list-dialog"));
                    app.editorPanel = new EditorPanel($("#editor-panel"));
                    app.widgetDrawer = new WidgetDrawer($("#widget-drawer"));
                    app.tabBar = new TabBar($("#tab-bar"));
                    app.toolBar = new ToolBar($("#tool-bar"));
                    app.componentToolBar = $("#component-tool-bar");
                    app.contextMenu = new ContextMenu($("#context-menu"));
                    app.colorPicker = new ColorPicker($("#color-picker"));
                    app.notifications = new NotificationCenter($("#notification-center"));
                    app.pods = ["ui"];
                    app.widgets = ["text", "image", "controls", "grid", "containers", "cards", "page", "pagination", "table", "form", "misc"];
                    app.what_nots = ["user"];
                    app.non_widgets = ["user", "downloaded", "ui"];
                
                    win.on("resize", app.resize.bind(app));
                    win.on("focus", app.focus.bind(app));
                    win.on("blur", app.blur.bind(app));
                    win.on("mousewheel", app.scroll.bind(app));
                    doc.on("mousemove", function(e) {
                        if (!app.hasActiveContext()) return;
                        app.mousePosition.x = e.pageX;
                        app.mousePosition.y = e.pageY;
                        app.canvas.mousePosition.x = Infinity;
                        app.canvas.mousePosition.y = Infinity;
                        app.onMousemove(e)
                    });
                    doc.on("mousedown", app.onMousedown.bind(app));
                    doc.on("mouseup", app.onMouseup.bind(app));
                    doc.on("contextmenu", false);
                    doc.on("mousewheel", app.onBrowserZoom.bind(app));
                    doc.on("click", "a.link", function(e) {
                        electron.openBrowserWindow(e.target.href)
                    });
                    doc.on("keydown", function(e) {
                        if (!app.hasActiveContext()) return;
                        var target = $(e.target);
                        if (target.is("textarea, input, [contenteditable]")) {
                            return
                        }
                        app.trigger("keydown", e)
                    });
                    this.on("mousedown", function(e) {
                        if (app.aboveCanvas) return;
                        var target = $(e.target);
                        var component = app.context.page.getFocusedComponent();
                        if (component && component.isInlineEditingActivated) {
                            if (!target.closest("#inline-editing-bar").length && !target.closest("#dialogs").length && !target.closest("#context-menu").length && !target.closest("#tab-bar .tab").length) {
                                component.commit();
                                e.preventDefault();
                                return false
                            }
                            return
                        }
                    });
                    this.on("input", function(e) {
                        if (app.context.page.hasFocusedComponent()) {
                            var result = app.context.page.getFocusedComponent().onInput(e);
                            if (result === false) {
                                return false
                            }
                        }
                    });
                    this.on("keydown", function(e) {
                        if (e.which == 27) {
                            if (app.isContextMenuShown()) {
                                app.contextMenu.hide();
                                return false
                            }
                            if (app.isWidgetDrawerShown()) {
                                app.widgetDrawer.close();
                                return false
                            }
                            if (app.isDialogShown()) {
                                Dialog.getShownDialog().close();
                                return false
                            }
                        }
                        if (e.which == 13) {
                            if (app.isContextMenuShown()) {
                                app.contextMenu.activeMenu.selectOption();
                                return false
                            }
                        }
                        if (app.context.page.hasFocusedComponent()) {
                            var result = app.context.page.getFocusedComponent().onKeydown(e);
                            if (result === false) {
                                return false
                            }
                        }
                    }, -1);
                    this.on("keydown", function(e) {
                        if (keyChecker(e.which == 78 && e.ctrlKey, e.which == 78 && e.metaKey)) {
                            e.preventDefault();
                            app.showDialogForNewDesign()
                        }
                        if (keyChecker(e.which == 79 && e.ctrlKey, e.which == 79 && e.metaKey)) {
                            e.preventDefault();
                            app.openDesignDialog()
                        }
                        if (keyChecker(e.which == 90 && e.ctrlKey, e.which == 90 && e.metaKey)) {
                            e.preventDefault();
                            if (e.shiftKey) {
                                app.redo()
                            } else {
                                app.undo()
                            }
                        }
                        if (keyChecker(e.which == 89 && e.ctrlKey, e.which == 89 && e.metaKey)) {
                            e.preventDefault();
                            app.redo()
                        }
                        if (keyChecker(e.which == 83 && e.ctrlKey, e.which == 83 && e.metaKey)) {
                            e.preventDefault();
                            app.saveDesign(app.context)
                        }
                        if (keyChecker(e.which == 87 && e.ctrlKey, e.which == 87 && e.metaKey)) {
                            e.preventDefault();
                            app.confirmCloseContext(app.context)
                        }
                        if (keyChecker(e.which == 76 && e.ctrlKey, e.which == 76 && e.metaKey)) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent() && !app.context.page.getFocusedComponent().isLocked()) {
                                app.context.page.getFocusedComponent().labelAction()
                            }
                        }
                        if (keyChecker(e.which == 68 && e.ctrlKey, e.which == 68 && e.metaKey)) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent() && app.context.page.getFocusedComponent().flags.canBeDuplicated) {
                                app.context.page.getFocusedComponent().duplicateAction()
                            } else if (app.context.page.hasSelection() && app.context.page.canSelectionBeDuplicated()) {
                                app.context.page.duplicateSelectionAction()
                            }
                        }
                        if (keyChecker(e.which == 67 && e.ctrlKey, e.which == 67 && e.metaKey) && !hasSelection()) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent()) {
                                app.context.page.getFocusedComponent().copyAction()
                            }
                        }
                        if (keyChecker(e.which == 86 && e.ctrlKey && e.shiftKey, e.which == 86 && e.metaKey && e.shiftKey)) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent() && app.context.page.getFocusedComponent().pasteLinkedAction) {
                                app.context.page.getFocusedComponent().pasteLinkedAction()
                            }
                            return
                        }
                        if (keyChecker(e.which == 86 && e.ctrlKey, e.which == 86 && e.metaKey)) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent() && app.context.page.getFocusedComponent().pasteInsideAction) {
                                app.context.page.getFocusedComponent().pasteInsideAction()
                            }
                        }
                        if (keyChecker(e.which == 38 && e.ctrlKey, e.which == 38 && e.metaKey)) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent()) {
                                app.context.page.getFocusedComponent().focusParent()
                            }
                        }
                        if (keyChecker(e.which == 40 && e.ctrlKey, e.which == 40 && e.metaKey)) {
                            e.preventDefault();
                            if (!app.context.page.hasFocusedComponent()) return;
                            var pbl = app.context.previousBreadcrumbList;
                            var child = null;
                            if (pbl && pbl.length) {
                                for (var i = 0; i < pbl.length; i++) {
                                    if (pbl[i] == app.context.page.hasFocusedComponent() && pbl[i + 1] && pbl[i + 1].isVisible()) {
                                        child = pbl[i + 1]
                                    }
                                }
                            }
                            if (!child && app.context.page.getFocusedComponent().children) {
                                var comp = app.context.page.getFocusedComponent().findFirstComponentChild();
                                comp && comp.focus()
                            }
                            if (child) {
                                child.focus()
                            }
                        }
                        if (keyChecker(e.which == 39 && e.ctrlKey, e.which == 39 && e.metaKey)) {
                            e.preventDefault();
                            if (!app.context.page.hasFocusedComponent()) return;
                            app.context.page.getFocusedComponent().focusNextSibling()
                        }
                        if (keyChecker(e.which == 37 && e.ctrlKey, e.which == 37 && e.metaKey)) {
                            e.preventDefault();
                            if (!app.context.page.hasFocusedComponent()) return;
                            app.context.page.getFocusedComponent().focusPreviousSibling()
                        }
                        if (e.which == 38) {
                            e.preventDefault();
                            if (!app.isContextMenuShown()) return;
                            app.contextMenu.activeMenu.prev()
                        }
                        if (e.which == 40) {
                            e.preventDefault();
                            if (!app.isContextMenuShown()) return;
                            app.contextMenu.activeMenu.next()
                        }
                        if (e.which == 39) {
                            e.preventDefault();
                            if (!app.isContextMenuShown()) return;
                            app.contextMenu.activeMenu.focusSubmenu()
                        }
                        if (e.which == 37) {
                            e.preventDefault();
                            if (!app.isContextMenuShown()) return;
                            app.contextMenu.activeMenu.focusParent()
                        }
                        if (e.which == 46) {
                            e.preventDefault();
                            if (app.editorPanel.hasTextSelection()) return;
                            if (app.context.page.hasFocusedComponent() && app.context.page.getFocusedComponent().flags.canBeDuplicated) {
                                app.context.page.getFocusedComponent().deleteAction()
                            } else if (app.context.page.hasSelection() && app.context.page.canSelectionBeDeleted()) {
                                app.context.page.deleteSelectionAction()
                            }
                        }
                        if (e.which == 8) {
                            e.preventDefault();
                            if (app.context.page.hasFocusedComponent() && app.context.page.getFocusedComponent().flags.canBeEdited) {
                                app.context.page.getFocusedComponent().activateInlineEditingAndEmpty()
                            }
                        }
                        if (keyChecker(e.which == 82 && e.ctrlKey, e.which == 82 && e.metaKey)) {
                            e.preventDefault()
                        }
                        if (keyChecker(e.which == 107 && e.ctrlKey, e.which == 107 && e.metaKey)) {
                            if (e.shiftKey) {
                                app.scaleUp()
                            } else {
                                app.zoomCanvasIn()
                            }
                            e.preventDefault()
                        }
                        if (keyChecker(e.which == 109 && e.ctrlKey, e.which == 109 && e.metaKey)) {
                            if (e.shiftKey) {
                                app.scaleDown()
                            } else {
                                app.zoomCanvasOut()
                            }
                            e.preventDefault()
                        }
                        if (keyChecker((e.which == 45 || e.which == 96) && e.ctrlKey, (e.which == 45 || e.which == 96) && e.metaKey)) {
                            if (e.shiftKey) {
                                app.resetScale()
                            } else {
                                app.resetCanvasZoom()
                            }
                            e.preventDefault()
                        }
                    }, 100);
                    this.on("drag-start", function(e) {
                        bod.addClass("dragging")
                    });
                    this.on("drag-end", function(e) {
                        bod.removeClass("dragging")
                    });
                    this.canvas = new Canvas($("#canvas"));
                    this.startScreen = $("#startscreen");
                    this.startScreen.find(".button.create").on("click", function() {
                        app.showDialogForNewDesign()
                    });
                    this.startScreen.find(".button.open").on("click", function() {
                        app.openDesignDialog()
                    });
                    this.startScreen.find(".button.tutorial").on("click", function() {
                        app.loadTutorial("getting-started")
                    });
                    this.startScreen.on("click", ".recent > div", function(e) {
                        var design = $(this).data("item");
                        if (e.target.nodeName == "A") {
                            app.removeRecentDesign(design.path);
                            app.showStartScreen()
                        } else {
                            app.openDesignAction(design.path)
                        }
                    });
                    var menu = $("#menu");
                    menu.find(".new").on("click", app.showDialogForNewDesign.bind(app));
                    menu.find(".open").on("click", app.openDesignDialog.bind(app));
                    menu.find(".export").on("click", function(e) {
                        app.exportContext();
                        /*var target = $(e.target);
                        if (target.is(".arrow")) {
                            var left = target.offset().left + target.outerWidth();
                            var top = target.offset().top + target.outerHeight();
                            app.contextMenu.show(left, top, [{
                                name: "Export Options",
                                action: app.showSettingsDialog.bind(app, app.context, {
                                    tab: "export-options"
                                })
                            }], {
                                toggler: target,
                                gravity: "left"
                            })
                        } else {
                            setTimeout(function() {
                                app.handleExport()
                            }, 20)
                        }*/
                    });
                    menu.find(".publish").on("click", function(e) {
                        var target = $(e.target);
                        if (target.is(".arrow")) {
                            var left = target.offset().left + target.outerWidth();
                            var top = target.offset().top + target.outerHeight();
                            app.contextMenu.show(left, top, [{
                                name: "Publish Options",
                                action: app.showSettingsDialog.bind(app, app.context, {
                                    tab: "publish-options"
                                })
                            }], {
                                toggler: target,
                                gravity: "left"
                            })
                        } else {
                            setTimeout(function() {
                                app.handlePublish(app.context)
                            }, 20)
                        }
                    });
                    var preview = menu.find(".preview").on("click", function(e) {
                        app.previewDialog.prepareFileForPreview();
                        /*var target = $(e.target);
                        if (target.is(".arrow")) {
                            var left = target.offset().left + target.outerWidth();
                            var top = target.offset().top + target.outerHeight();
                            app.contextMenu.show(left, top, [{
                                name: function name() {
                                    return app.settings.previewEnabled ? "Enabled" : "Disabled"
                                },
                                action: function(e, value) {
                                    app.togglePreview();
                                    return false
                                }.bind(app),
                                checkbox: true,
                                checkboxChecked: app.settings.previewEnabled
                            }, {
                                name: "Preview Options",
                                action: app.showSettingsDialog.bind(app, app.context, {
                                    tab: "preview"
                                })
                            }], {
                                toggler: target,
                                gravity: "left"
                            })
                        } else {
                            setTimeout(function() {
                                if (app.settings.previewEnabled) {
                                    app.openPreviewURLInBrowser()
                                } else {
                                    app.showSettingsDialog(app.context, {
                                        tab: "preview"
                                    })
                                }
                            }, 20)
                        }*/
                    });
                    app.on("preview-status-change", function() {
                        if (app.settings.previewEnabled) {
                            preview.find(".wrapper span").text("Preview (on)");
                            var userPreviewPort = app.getPreviewPort();
                            var currentPreviewPort = electron.previewPort;
                            if (userPreviewPort !== currentPreviewPort) {
                                app.notifications.create({
                                    type: "warning",
                                    title: "Port " + userPreviewPort + " in use",
                                    description: "Preview started on port " + currentPreviewPort + "."
                                }).show()
                            }
                        } else {
                            preview.find(".wrapper span").text("Preview")
                        }
                    });
                    var save = menu.find(".save");
                    save.on("click", function() {
                        app.saveDesign(app.context)
                    });
                    menu.find(".settings").on("click", function() {
                        app.showSettingsDialog(app.context)
                    });
                    var undo = menu.find(".undo"),
                        redo = menu.find(".redo");
                    undo.on("click", function() {
                        app.undo()
                    });
                    redo.on("click", function() {
                        app.redo()
                    });
                    app.on("context-changed context-activated context-saved", function() {
                        undo.toggleClass("active", app.hasUndo());
                        redo.toggleClass("active", app.hasRedo());
                        save.toggleClass("active", app.context.canBeSaved())
                    });
                    app.on("context-activated", function() {
                        if (app.context.needsSCSSCompilation) {
                            app.scheduleSASSCompile();
                            app.context.needsSCSSCompilation = false
                        }
                    });
                    app.on("context-changed", function(context) {
                        context.invalidatePreviewContext()
                    });
                    app.on("preview-status-change", function() {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;
                        try {
                            for (var _iterator = app.openedContexts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var ctx = _step.value;
                                ctx.invalidatePreviewContext()
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
                    });
                    app.on("context-activated context-closed", function() {
                        clearTimeout(app.drawerTimeline);
                        app.widgetDrawer.instantClose();
                        app.drawerTimeline = setTimeout(function() {
                            app.widgetDrawer.setup(app.template);
                            if (app.shouldShowWidgetDrawer()) {
                                app.widgetDrawer.show();
                                app.widgetDrawer.position()
                            } else {
                                app.widgetDrawer.hide()
                            }
                        }, 10)
                    });
                    app.on("canvas-dimensions-changed", function() {
                        if (app.shouldShowWidgetDrawer()) {
                            app.widgetDrawer.show();
                            app.widgetDrawer.position()
                        } else {
                            app.widgetDrawer.hide()
                        }
                    });
                    app.on("context-pre-change context-css-changed", function(context) {
                        context.invalidateCSSCaches()
                    });
                    app.on("context-closed", function() {
                        if (!app.openedContexts.length) electron.setTitle("Cogworks")
                    });
                    app.on("context-activated context-saved context-changed", function() {
                        electron.setTitle(app.context.name + (app.context.isSaved() ? "" : " (unsaved)") + " - Cogworks")
                    });
                    var ignoreContextChanged = false;
                    app.on("context-css-changed", function(context, resources) {
                        if (!app.settings.previewEnabled) return;
                        ignoreContextChanged = true;
                        var targets = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;
                        try {
                            for (var _iterator2 = resources[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var resource = _step2.value;
                                targets.push(app.context.assets.css.getRelativePathForItem(resource))
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
                        electron.notifySSEClients({
                            type: "css",
                            targets: targets
                        });
                        setTimeout(function() {
                            ignoreContextChanged = false
                        }, 20)
                    });
                    app.lastChange = Date.now();
                    var lastJSStatus = false;
                    app.on("context-changed context-activated page-activated", function() {
                        app.updateComponentToolbar();
                        app.lastChange = Date.now();
                        if (!app.settings.previewEnabled) return;
                        if (ignoreContextChanged) {
                            return
                        }
                        setTimeout(function() {
                            electron.notifySSEClients({
                                type: "full"
                            })
                        }, 20)
                    });
                    app.on("resource-edited", this.resourceEdited.bind(this));
                    doc.on("drop", function(e) {
                        app.processDroppedFiles(e);
                        e.preventDefault();
                        e.stopPropagation()
                    });
                    doc.on("dragover", function(e) {
                        e.preventDefault();
                        e.stopPropagation()
                    });
                    app.on("context-opened context-saved", function(ctx) {
                        app.addToRecent(ctx.name, ctx.path);
                        electron.addToRecent(ctx.path)
                    });
                    app.on("context-opened", function(ctx) {
                        app.hideStartScreen();
                        if (!app.hasActiveContext()) {
                            app.activateContext(ctx)
                        }
                    });
                    win.on("beforeunload", app.beforeUnload.bind(app));
                    app.on("resource-changed", function(type, action, items) {
                        if (!Array.isArray(items)) {
                            items = [items]
                        }
                        if (type == "scss" || type == "css") {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;
                            try {
                                for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var item = _step3.value;
                                    if (item instanceof SCSSResource) {
                                        app.scheduleSASSCompile();
                                        return
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
                        }
                        if (type != "page") return;
                        if (action == "delete") {
                            if (!app.context.pages.contains(app.context.page)) {
                                app.activatePage(app.context.pages.getAll()[0])
                            }
                            app.context.updateCopyOrigin();
                            return
                        }
                        if (items.includes(app.context.page)) {
                            app.context.page.update()
                        }
                    });
                    electron.getZoomFactor().then(function(zoomFactor) {
                        _this.settings.zoomFactor = zoomFactor;
                        _this.rebuildMainMenu();
                        _this.openCogPath(electron.commandLineArgs)
                    });
                    var scheduleMenuRebuild = null;
                    var rebuildMenuAction = function rebuildMenuAction() {
                        app.rebuildMainMenu()
                    };
                    app.on("component-selected component-unselected context-activated page-activated", function() {
                        if (!app.context.page.hasFocusedComponent()) {
                            app.framework.emptyOptionPanels();
                            return
                        }
                        app.framework.displayComponentOptions(app.context.page.getFocusedComponent())
                    });
                    app.on("context-activated context-closed context-changed context-saved " + "component-selected component-unselected interface-zoom-factor-change", function() {
                        clearTimeout(scheduleMenuRebuild);
                        scheduleMenuRebuild = setTimeout(rebuildMenuAction, 200)
                    });
                    app.on("component-selected component-unselected", function() {
                        app.updateComponentToolbar()
                    });
                    app.on("canvas-resized", function() {
                        app.updateComponentToolbar()
                    });
                    app.on("package-preview-updated", function() {
                        app.scheduleSavePackages("user", 1e3)
                    });
                    app.on("package-tree-changed", function(action, items, parent) {
                        for (var version in app.availableFrameworks) {
                            app.availableFrameworks[version].rebuild()
                        }
                        if (items) {
                            var isDownloaded = items[0] instanceof DownloadedPackage || parent && app.downloadedPackages == parent || app.downloadedPackages.contains(parent);
                            if (isDownloaded) {
                                app.scheduleSavePackages("downloaded", 1e3)
                            } else {
                                app.scheduleSavePackages("user", 1e3)
                            }
                        }
                    });
                    app.on("package-tree-expand-contract", function(group) {
                        if (group == app.userPackages) {
                            app.scheduleSavePackages("user", 2500)
                        }
                        if (group == app.downloadedPackages) {
                            app.scheduleSavePackages("downloaded", 2500)
                        }
                    });
                    /*app.startBackupSchedule();
                    app.on("backup-settings-changed", function() {
                        app.resetBackupSchedule();
                        if (app.getBackupSettings().enabled) {
                            app.startBackupSchedule()
                        }
                    });
                    setInterval(function() {
                        app.checkToken()
                    }, 30 * 60 * 1e3);
                    setTimeout(function() {
                        app.checkToken()
                    }, 30 * 1e3);
                    setInterval(function() {
                        app.updateActivityCookies()
                    }, 5 * 60 * 1e3);*/
                    this.updateSystemCookies();
                    if (electron.readSetting("lastRun")) {
                        if (this.isTrial()) {
                            var lastShow = electron.readSetting("lastPurchaseDialogShowDate");
                            if (lastShow != (new Date).toDateString()) {
                                setTimeout(function() {
                                    electron.saveSetting("lastPurchaseDialogShowDate", (new Date).toDateString());
                                    app.purchaseDialog.open({
                                        daysRemaining: app.licenseDaysRemaining()
                                    })
                                }, 5 * 60 * 1e3)
                            }
                        } else {
                            if (app.licenseDaysRemaining() < 30) {
                                var lastRenewShow = electron.readSetting("lastRenewNotificationShowDate");
                                if (lastRenewShow != (new Date).toDateString()) {
                                    setTimeout(function() {
                                        electron.saveSetting("lastRenewNotificationShowDate", (new Date).toDateString());
                                        var type = "warning";
                                        var title = "You will stop receiving updates soon!";
                                        var description = "Click here to renew your license.";
                                        if (app.licenseDaysRemaining() == 0) {
                                            type = "error";
                                            title = "You are not receiving updates anymore!"
                                        }
                                        app.notifications.create({
                                            type: type,
                                            title: title,
                                            description: description,
                                            action: function action(notif) {
                                                app.renewLicenseKey();
                                                notif.hide()
                                            },
                                            timeout: 0
                                        }).show()
                                    }, 5 * 60 * 1e3)
                                }
                            }
                        }
                        if (electron.readSetting("lastRunVersion") != packageJSON.version) {
                            var lastRunVersion = electron.readSetting("lastRunVersion");
                            setTimeout(function() {
                                app.showWhatsNewDialog(true, lastRunVersion)
                            }, 1e3)
                        }
                    }
                    electron.saveSetting("lastRun", Date.now());
                    electron.saveSetting("lastRunVersion", packageJSON.version);
                    app.setUISetting("visualizeElementBoxes", app.getUISetting("visualizeElementBoxes", false));
                    app.setUISetting("visualizeGrid", app.getUISetting("visualizeGrid", true));
                    win.resize()
                }
            }, {
                // Cogworks
                key: "setStageElement",
                value: function setStageElement(textVal, htmlVal) {
                    app.stageElement.text = textVal;
                    app.stageElement.html = htmlVal;
                    document.execCommand('copy');
                }
            }, {
                // Cogworks
                key: "setStageElementText",
                value: function setStageElementText(textVal) {
                    app.stageElement.text = textVal;
                }
            }, {
                // Cogworks
                key: "setStageElementHTML",
                value: function setStageElementHTML(htmlVal) {
                    app.stageElement.html = htmlVal;
                }
            }, {
                // Cogworks
                key: "getStageElement",
                value: function getStageElement() {
                    return app.stageElement;
                }
            }, {
                // Cogworks
                key: "getStageElementText",
                value: function getStageElementText() {
                    return app.stageElement.text
                }
            }, {
                // Cogworks
                key: "getStageElementHTML",
                value: function getStageElementHTML() {
                    return app.stageElement.html;
                }
            }, {
				// Cogworks
                key: "initWhatNots",
                value: function initWhatNots(json) {
					if (!json) {
						json = {
							name: "Personal",
							children: [],
							expanded: true
						}
						app.whatNots = json;
					}
					
					this.whatNotsPackages = new PackageTreeGroup;
					this.whatNotsPackages.unserialize(json);
					[this.whatNotsPackages].forEach(function(collection) {
							var folders = collection.getAllFolders();
                            folders.unshift(collection);
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;
                            try {
                                for (var _iterator = folders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var folder = _step.value;
                                    var _iteratorNormalCompletion2 = true;
                                    var _didIteratorError2 = false;
                                    var _iteratorError2 = undefined;
                                    try {
                                        for (var _iterator2 = folder.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                            var child = _step2.value;
                                            folder.ensureChildUniqueName(child)
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
                        });
                        var whatNotsIDs = app.whatNotsPackages.getAll().map(function(pkg) {
                            return pkg.id
                        });
                }
            }, {
				// Cogworks
				
                key: "initPods",
                value: function initPods(ary) {
					for(var a = 0; a < app.pods.length; a++)
					{
						app.standardPods.push(app.pods[a]);
					}
					for(var i = 0; i < app.standardPods.length; i++)
					{
						var group = new PackageTreeGroup;
						group.unserialize(app.standardPods[i]);
						
						var folders = group.getAllFolders();
						folders.unshift(group);
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
						try {
							for (var _iterator = folders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var folder = _step.value;
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;
								try {
									for (var _iterator2 = folder.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
										var child = _step2.value;
										folder.ensureChildUniqueName(child)
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
                        this.podsComponents.push(group);
                    }
                    
                    $("#right-panel .tab-holder .tab").each(function(){
                        if(($(this).attr("title")).toLowerCase() == "widget")
                        {
                            $(this).trigger("click");
                            return false;
                        }
                    });
                    $("#right-panel .tab-holder .tab").each(function(){
                        if(($(this).attr("title")).toLowerCase() == "pods")
                        {
                            $(this).trigger("click");
                            return false;
                        }
                    });
                }
            }, {
				// Cogworks
				
                key: "saveWhatNotsComp",
                value: function saveWhatNotsComp() {
                    app.whatNots.children.push((app.newEpod).toEpod());
					this.whatNotsPackages = new PackageTreeGroup;
					this.whatNotsPackages.unserialize(app.whatNots);
					var whatNotsContent = JSON.stringify(app.whatNots);
					$.post('../cogworks/main-tool-backend/what-nots/update', {id: app.user, content: whatNotsContent}, function(e) {
						if(e != 'true') {
							cogworks.loadingScreen("dynamic","Fail to add " + app.newEpod.name + " to your What-Nots pane","fadeIn");
							setTimeout(function(){
								cogworks.loadingScreen("","","fadeOut");
							},1000);
						} else {
							app.notifications.create({
								title: "A component was added to your What-Nots.",
								description: 'You can see it in the "What-Nots" panel.',
								timeout: 8e3
							}).show();
							
							cogworks.loadingScreen("","","fadeOut");
						}
					}, 'text');
                }
            }, {
				// Cogworks
				
                key: "renamePackage",
                value: function renamePackage(pkg, name) {
                    pkg.name = name;
                    this.trigger("package-changed");
                    this.saveWhatNotsComp()
                }
            }, {
				// Cogworks
				
                key: "removePackage",
                value: function removePackage(pkg) {
                    var index = this.packages.indexOf(pkg);
                    this.packages.splice(index, 1);
                    this.trigger("package-deleted");
                    this.saveWhatNotsComp()
                }
            }, {
				// Cogworks
				
                key: "updatePackage",
                value: function updatePackage(pkg, props) {
                    pkg.css = props.css;
                    pkg.fonts = props.fonts;
                    pkg.images = props.images;
                    pkg.version = props.version;
                    pkg.components = props.components;
                    this.trigger("package-changed");
                    this.saveWhatNotsComp()
                }
            }, {
				// Cogworks
				
                key: "addPackage",
                value: function addPackage(pkg) {
                    if (this.packageExists(pkg.id)) {
                        return false
                    }
                    this.packages.push(pkg);
                    this.packages.sort(function(a, b) {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0
                    });
                    this.trigger("package-created");
					app.newEpod = null;
					app.newEpod = pkg;
                    this.saveWhatNotsComp();
                    return true
                }
            }, {
				// Cogworks
				
                key: "getPackageById",
                value: function getPackageById(id) {
                    for (var i = 0; i < this.packages.length; i++) {
                        if (this.packages[i].id == id) {
                            return this.packages[i]
                        }
                    }
                    return false
                }
            }, {
				// Cogworks
				
                key: "packageExists",
                value: function packageExists(id) {
                    return !!this.getPackageById(id)
                }
            }, {
                key: "init",
                value: function init() {
                    updateLocalStorage(localStorage);
                    
                    app.plugin = new BootstrapPlugin;
                    app.initializePanels();
                    app.plugin.initializeFrameworks().then(function() {
                        return app.initializeLibrary()
                    }).then(function() {
                        app.setup(doc, $);
                        app.showStartScreen();
                        app.ready = true;
                        app.runPendingCommands();
                    })["catch"](function(e) {
                        cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 001 to the admin if issue persist.</p>","show");
                        console.error(e);
                    })
                }
            }, {
                key: "initializeLibrary",
                value: function initializeLibrary() {
                    var setupPackages = function(upkgData, dpkgData) {
                        if (upkgData) {
                            upkgData = JSON.parse(upkgData)
                        } else {
                            upkgData = {
                                name: "User",
                                children: [],
                                expanded: true
                            }
                        }
                        if (dpkgData) {
                            dpkgData = JSON.parse(dpkgData)
                        } else {
                            dpkgData = {
                                name: "Downloaded",
                                children: [],
                                expanded: true
                            }
                        }
                        this.userPackages = new PackageTreeGroup;
                        this.userPackages.unserialize(upkgData);
                        this.downloadedPackages = new PackageTreeGroup;
                        this.downloadedPackages.unserialize(dpkgData);
                        [this.userPackages, this.downloadedPackages].forEach(function(collection) {
                            var folders = collection.getAllFolders();
                            folders.unshift(collection);
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;
                            try {
                                for (var _iterator4 = folders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var folder = _step4.value;
                                    var _iteratorNormalCompletion5 = true;
                                    var _didIteratorError5 = false;
                                    var _iteratorError5 = undefined;
                                    try {
                                        for (var _iterator5 = folder.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                            var child = _step5.value;
                                            folder.ensureChildUniqueName(child)
                                        }
                                    } catch (err) {
                                        _didIteratorError5 = true;
                                        _iteratorError5 = err
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                                                _iterator5["return"]()
                                            }
                                        } finally {
                                            if (_didIteratorError5) {
                                                throw _iteratorError5
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                        _iterator4["return"]()
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4
                                    }
                                }
                            }
                        })
                    }.bind(this);
                    return Promise.all([electron.readDataFile("userPackages"), electron.readDataFile("downloadedPackages")]).then(function(result) {
                        setupPackages(result[0], result[1])
                    })["catch"](function(e) {
                        console.error(e);
                        setupPackages()
                    })
                }
            }, {
                key: "setupDownloadedPackages",
                value: function setupDownloadedPackages(data, downloadedIDs) {
                    if (!data) return;
                    app.getPanel("online").buildOnlineHomepage({
                        trending: data.trending,
                        latest: data.latest
                    });
                    var update = false;
                    var persistUser = false,
                        persistDownloaded = false;
                    var missingDownloadedIDs = downloadedIDs;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;
                    try {
                        for (var _iterator6 = data.downloaded[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var c = _step6.value;
                            var pkg = app.downloadedPackages.getByID(c.component_id);
                            if (!pkg) continue;
                            pkg.comments = c.comments;
                            pkg.votes = c.votes;
                            pkg.has_voted = c.has_voted;
                            pkg.can_vote = c.can_vote;
                            pkg.authorPhoto = c.author_photo;
                            pkg.authorDownloads = c.author_downloads;
                            if (pkg.description != c.description || pkg.authorID != c.author_id || pkg.authorName != c.author_name || c.orphan) {
                                persistDownloaded = true;
                                update = true;
                                pkg.description = c.description;
                                pkg.authorID = c.author_id;
                                pkg.authorName = c.author_name;
                                c.orphan = false
                            }
                            missingDownloadedIDs.splice(missingDownloadedIDs.indexOf(c.component_id), 1)
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                                _iterator6["return"]()
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6
                            }
                        }
                    }
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;
                    try {
                        for (var _iterator7 = missingDownloadedIDs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var _id = _step7.value;
                            var pkg = app.downloadedPackages.getByID(_id);
                            if (!pkg) continue;
                            if (!pkg.orphan) {
                                pkg.orphan = true;
                                persistDownloaded = true;
                                update = true
                            }
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
                                _iterator7["return"]()
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7
                            }
                        }
                    }
                    var shared = data.shared;
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;
                    try {
                        for (var _iterator8 = shared[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var comp = _step8.value;
                            var pkg = app.userPackages.getByID(comp.component_id);
                            if (!pkg) continue;
                            pkg.comments = comp.comments;
                            pkg.votes = comp.votes;
                            pkg.has_voted = comp.has_voted;
                            pkg.can_vote = comp.can_vote;
                            if (!pkg.isShared()) {
                                pkg.markShared();
                                persistUser = true;
                                update = true
                            }
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                                _iterator8["return"]()
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8
                            }
                        }
                    }
                    var localShared = app.userPackages.getAll().filter(function(p) {
                        return p.isShared()
                    }).map(function(p) {
                        return p.id
                    });
                    var remoteShared = shared.map(function(p) {
                        return p.component_id
                    });
                    var missingShared = remoteShared.filter(function(id) {
                        return localShared.indexOf(id) == -1
                    });
                    var removeShared = localShared.filter(function(id) {
                        return remoteShared.indexOf(id) == -1
                    });
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;
                    try {
                        for (var _iterator9 = removeShared[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var id = _step9.value;
                            app.userPackages.getByID(id).markUnshared();
                            update = true
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
                                _iterator9["return"]()
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9
                            }
                        }
                    }
                    if (missingShared.length) {
                        update = false;
                        $.get("/app/library/fetch-all-components", {
                            ids: missingShared
                        }, function(components) {
                            if (!components.length) return;
                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;
                            try {
                                for (var _iterator10 = components[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var comp = _step10.value;
                                    var pkg = parseEpodComponentFormat(JSON.parse(comp.component));
                                    pkg.comments = comp.comments;
                                    pkg.votes = comp.votes;
                                    pkg.has_voted = comp.has_voted;
                                    pkg.can_vote = comp.can_vote;
                                    pkg.markShared();
                                    app.userPackages.addOp(pkg)["do"]();
                                    app.userPackages.ensureChildUniqueName(pkg);
                                    persistUser = true
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
                            if (persistUser) app.scheduleSavePackages("user", 1e3);
                            if (persistDownloaded) app.scheduleSavePackages("downloaded", 1e3);
                            app.trigger("package-tree-changed", "share");
                            var s = components.length == 1 ? " was" : "s were";
                            app.notifications.create({
                                title: "Components were synced",
                                description: components.length + " shared component" + s + " downloaded.",
                                timeout: 8e3
                            }).show()
                        })
                    }
                    if (update) {
                        if (persistUser) app.scheduleSavePackages("user", 1e3);
                        if (persistDownloaded) app.scheduleSavePackages("downloaded", 1e3);
                        app.trigger("package-tree-changed", "share")
                    }
                }
            }, {
                key: "registerPanel",
                value: function registerPanel(name, panel) {
                    this.panelConstructorsMap.set(name, panel)
                }
            }, {
                key: "getPanelConstructor",
                value: function getPanelConstructor(name) {
                    return this.panelConstructorsMap.get(name)
                }
            }, {
                key: "initializePanels",
                value: function initializePanels() {
                    this.registerPanel("Panel", Panel);
                    this.registerPanel("PanelGroup", PanelGroup);
                    this.registerPanel("PanelContainer", PanelContainer);
                    this.registerPanel("VerticalPanelContainer", VerticalPanelContainer);
                    this.registerPanel("OverviewPanel", OverviewPanel);
                    //this.registerPanel("StudioComponentPanel", StudioComponentPanel);
                    this.registerPanel("PodsComponentPanel", PodsComponentPanel);
                    this.registerPanel("WidgetComponentPanel", WidgetComponentPanel);
                    this.registerPanel("WhatNotsComponentPanel", WhatNotsComponentPanel);
                    this.registerPanel("OnlineComponentPanel", OnlineComponentPanel);
                    this.registerPanel("DesignPanel", DesignPanel);
                    app.plugin.registerPanels();
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;
                    try {
                        for (var _iterator11 = app.getPanelConfig()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var json = _step11.value;
                            var _PanelContainer = app.getPanelConstructor(json["class"]);
                            var element = $("#" + json.id);
                            var _container = new _PanelContainer(element);
                            _container.unserialize(json);
                            _container.update();
                            app.panelContainers.push(_container)
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
                        for (var _iterator12 = app.panelContainers[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var container = _step12.value;
                            var _iteratorNormalCompletion13 = true;
                            var _didIteratorError13 = false;
                            var _iteratorError13 = undefined;
                            try {
                                for (var _iterator13 = container.children[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                    var group = _step13.value;
                                    var _iteratorNormalCompletion14 = true;
                                    var _didIteratorError14 = false;
                                    var _iteratorError14 = undefined;
                                    try {
                                        for (var _iterator14 = group.children[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                            var panel = _step14.value;
                                            app.setPanel(panel.id, panel);
                                            app.panels.push(panel);
                                            if (panel instanceof OptionsPanel) {
                                                app.optionPanels.push(panel)
                                            }
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
                }
            }, {
                key: "isMouseOverPanel",
                value: function isMouseOverPanel() {
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;
                    try {
                        for (var _iterator15 = app.panels[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var panel = _step15.value;
                            if (panel.isMouseOver()) {
                                return true
                            }
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
                    return false
                }
            }, {
                key: "getPanel",
                value: function getPanel(name) {
                    return app.panelMap.get(name)
                }
            }, {
                key: "setPanel",
                value: function setPanel(name, panel) {
                    app.panelMap.set(name, panel)
                }
            }, {
                key: "getPanelConfig",
                value: function getPanelConfig() {
                    return electron.readSetting("panels", app.plugin.getDefaultPanelConfig())
                }
            }, {
                key: "persistPanels",
                value: function persistPanels() {
                    var panels = [];
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;
                    try {
                        for (var _iterator16 = this.panelContainers[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            var container = _step16.value;
                            panels.push(container.serialize())
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
                    electron.saveSetting("panels", panels)
                }
            }, {
                key: "startBackupSchedule",
                value: function startBackupSchedule() {
                    var _this2 = this;
                    this._autoBackupCounter = 0;
                    this._autoBackupIntervalTime = parseInt(this.getBackupSetting("frequency"), 10);
                    this._autoBackupInterval = setInterval(function() {
                        _this2._autoBackupCounter++;
                        if (_this2.shouldBackup()) {
                            _this2.handleBackup().then(function() {
                                _this2._autoBackupCounter = 0
                            })
                        }
                    }, 60 * 1e3)
                }
            }, {
                key: "resetBackupSchedule",
                value: function resetBackupSchedule() {
                    if (!this._autoBackupInterval) return;
                    clearInterval(this._autoBackupInterval)
                }
            }, {
                key: "shouldBackup",
                value: function shouldBackup() {
                    return this.isBackupEnabled() && !this.isBackingUp && this._autoBackupCounter >= this._autoBackupIntervalTime && this.hasUnbackedDesigns()
                }
            }, {
                key: "isBackupEnabled",
                value: function isBackupEnabled() {
                    return this.getBackupSetting("enabled")
                }
            }, {
                key: "hasUnbackedDesigns",
                value: function hasUnbackedDesigns() {
                    return !!this.getUnbackedDesigns().length
                }
            }, {
                key: "getUnbackedDesigns",
                value: function getUnbackedDesigns() {
                    return app.openedContexts.filter(function(ctx) {
                        return ctx.hasChangesSinceLastBackup()
                    })
                }
            }, {
                key: "handleBackup",
                value: function handleBackup() {
                    var _this3 = this;
                    app.isBackingUp = true;
                    var contexts = this.getUnbackedDesigns();
                    var promises = [];
                    var hasShownError = false;
                    var _iteratorNormalCompletion17 = true;
                    var _didIteratorError17 = false;
                    var _iteratorError17 = undefined;
                    try {
                        for (var _iterator17 = contexts[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                            var context = _step17.value;
                            promises.push(this.backupDesign(context)["catch"](showBackupError))
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
                    return Promise.all(promises).then(function() {
                        return Promise.all(_this3.deleteExpiredBackups().map(function(p) {
                            return p["catch"](function(e) {
                                return e
                            })
                        }))
                    }).then(function() {
                        return app.isBackingUp = false
                    });

                    function showBackupError(err) {
                        if (hasShownError) return;
                        var options = {
                            type: "error",
                            title: "Backup failed",
                            description: err.message || app.getErrorMessage(err)
                        };
                        if (err.action) {
                            options.action = err.action
                        }
                        app.notifications.create(options).show();
                        hasShownError = true;
                        console.error(err)
                    }
                }
            }, {
                key: "backupDesign",
                value: function backupDesign(context) {
                    var separator = electron.separator;
                    var backupDestination = this.getBackupSetting("destination") + separator + this.getBackupFolderName();
                    var backupName = context.name + " (Backup " + Date.now() + ")";
                    var path = enforceFileExtension(backupDestination + separator + backupName, "cog");
                    var content = context.stringify();
                    var historyID = context.history.stackID;
                    if (!electron.pathExists(backupDestination)) {
                        if (!electron.mkdirSync(backupDestination)) {
                            return Promise.reject({
                                message: "Backup folder doesn't exist.",
                                action: app.showSettingsDialog.bind(app, context, {
                                    tab: "backup"
                                })
                            })
                        }
                    }
                    return electron.writeFileChunked(path, content).then(function() {
                        context.markAsBackedUp(historyID);
                        app.saveBackupRecord(context, {
                            path: path,
                            timestamp: Date.now()
                        })
                    })
                }
            }, {
                key: "restoreBackup",
                value: function restoreBackup(item) {
                    var path = item.backup.path;
                    if (!path) return;
                    this.openDesignAction(path, false, false, "Restoring backup.")["catch"](function(err) {
                        if (err && err.message) {
                            app.alertDialog.open({
                                title: "Can't Restore Backup",
                                message: "The backup file couldn't be found. This can happen if the backup location is deleted or renamed."
                            })
                        }
                    })
                }
            }, {
                key: "deleteBackup",
                value: function deleteBackup(item) {
                    var _this4 = this;
                    return electron.deleteFile(item.backup.path).then(function() {
                        _this4.deleteBackupRecord(item)
                    })["catch"](function(err) {
                        console.error(err)
                    })
                }
            }, {
                key: "deleteExpiredBackups",
                value: function deleteExpiredBackups() {
                    var _this5 = this;
                    var backupSettings = this.getBackupSettings();
                    var maxBackupCount = backupSettings.count;
                    var expirationPeriod = backupSettings.expiration * 60 * 1e3;
                    var currentTimestamp = Date.now();
                    var backupsByPath = {};
                    var expired = [];
                    this.deleteMissingBackups();
                    var backups = this.getBackupList();
                    backups.sort(function(a, b) {
                        return a.backup.timestamp - b.backup.timestamp
                    });
                    var _iteratorNormalCompletion18 = true;
                    var _didIteratorError18 = false;
                    var _iteratorError18 = undefined;
                    try {
                        for (var _iterator18 = backups[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                            var item = _step18.value;
                            if (!backupsByPath[item.path]) {
                                backupsByPath[item.path] = []
                            }
                            backupsByPath[item.path].push(item)
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
                    for (var path in backupsByPath) {
                        var currentBackups = backupsByPath[path];
                        var expiredCount = 0;
                        for (var i = 0; i < currentBackups.length; i++) {
                            if (currentTimestamp - currentBackups[i].backup.timestamp < expirationPeriod) {
                                break
                            }
                            expiredCount++
                        }
                        expired.push.apply(expired, _toConsumableArray(currentBackups.splice(0, Math.max(currentBackups.length - maxBackupCount, expiredCount))))
                    }
                    return expired.map(function(i) {
                        return _this5.deleteBackup(i)
                    })
                }
            }, {
                key: "saveBackupRecord",
                value: function saveBackupRecord(context, backup) {
                    var backupRecords = this.getBackupList();
                    var record = {
                        id: context.id,
                        path: context.path,
                        name: context.name,
                        backup: backup
                    };
                    backupRecords.unshift(record);
                    this.saveBackupList(backupRecords)
                }
            }, {
                key: "deleteBackupRecord",
                value: function deleteBackupRecord(backup) {
                    var backupRecords = this.getBackupList();
                    var index = backupRecords.findIndex(function(i) {
                        return deepEqual(i, backup)
                    });
                    if (index !== -1) {
                        backupRecords.splice(index, 1)
                    }
                    this.saveBackupList(backupRecords)
                }
            }, {
                key: "deleteMissingBackups",
                value: function deleteMissingBackups() {
                    var _iteratorNormalCompletion19 = true;
                    var _didIteratorError19 = false;
                    var _iteratorError19 = undefined;
                    try {
                        for (var _iterator19 = this.getBackupList()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                            var item = _step19.value;
                            if (!electron.pathExists(item.backup.path)) {
                                this.deleteBackupRecord(item)
                            }
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
                }
            }, {
                key: "getBackupList",
                value: function getBackupList() {
                    return electron.readSetting("backups", [])
                }
            }, {
                key: "saveBackupList",
                value: function saveBackupList() {
                    var backups = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    electron.saveSetting("backups", backups);
                    app.trigger("backups-updated")
                }
            }, {
                key: "getBackupFolderName",
                value: function getBackupFolderName() {
                    return "Cogworks Backups"
                }
            }, {
                key: "getDefaultBackupSettings",
                value: function getDefaultBackupSettings() {
                    return {
                        enabled: true,
                        frequency: 5,
                        count: 5,
                        expiration: 7 * 24 * 60,
                        destination: electron.homePath
                    }
                }
            }, {
                key: "getBackupSettings",
                value: function getBackupSettings() {
                    var settings = electron.readSetting("backupSettings", {});
                    var defaultSettings = this.getDefaultBackupSettings();
                    return _extends({}, defaultSettings, settings)
                }
            }, {
                key: "saveBackupSettings",
                value: function saveBackupSettings(settings) {
                    electron.saveSetting("backupSettings", settings)
                }
            }, {
                key: "getBackupSetting",
                value: function getBackupSetting(key) {
                    return this.getBackupSettings()[key]
                }
            }, {
                key: "processDroppedFiles",
                value: function processDroppedFiles(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    var files = e.originalEvent.dataTransfer.files;
                    if (!files || !files.length) return false;
                    var cogRegex = /\.(?:epod|cog)$/;
                    var htmlRegex = /\.html?$/;
                    var imagesRegex = /^image\//;
                    var cssRegex = /\.(?:css|scss)$/;
                    var jsRegex = /\.js$/;
                    var images = [],
                        cogpaths = [],
                        html = [],
                        js = [],
                        css = [];
                    for (var i = 0; i < files.length; i++) {
                        if (cogRegex.test(files[i].name)) {
                            cogpaths.push(files[i].path);
                            continue
                        }
                        if (!app.hasActiveContext()) continue;
                        if (imagesRegex.test(files[i].type)) {
                            images.push(files[i].path);
                            continue
                        }
                        if (htmlRegex.test(files[i].name)) {
                            html.push(files[i].path);
                            continue
                        }
                        if (jsRegex.test(files[i].name)) {
                            js.push(files[i].path);
                            continue
                        }
                        if (cssRegex.test(files[i].name)) {
                            css.push(files[i].path);
                            continue
                        }
                    }
                    if (cogpaths.length) {
                        app.openCogPath(cogpaths)
                    }
                    if (images.length) {
                        app.getPanel("design").importImagesByPaths(images, app.context.assets.images);
                        app.getPanel("design").instantExpandCategory("Images")
                    }
                    if (css.length) {
                        app.getPanel("design").importStylesheetsByPaths(css, app.context.assets.css);
                        app.getPanel("design").instantExpandCategory("Styles")
                    }
                    if (js.length) {
                        app.getPanel("design").importJSFilesByPaths(js, app.context.assets.js);
                        app.getPanel("design").instantExpandCategory("JavaScript")
                    }
                    if (html.length) {
                        app.getPanel("design").importHTMLFilesByPaths(html, app.context.pages);
                        app.getPanel("design").instantExpandCategory("Pages")
                    }
                }
            }, {
                key: "runPendingCommands",
                value: function runPendingCommands() {
                    if (!app.ready) return;
                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;
                    try {
                        for (var _iterator20 = app.pendingCommands[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var command = _step20.value;
                            app.runCliCommand(command)
                        }
                    } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
                                _iterator20["return"]()
                            }
                        } finally {
                            if (_didIteratorError20) {
                                throw _iteratorError20
                            }
                        }
                    }
                    app.pendingCommands = []
                }
            }, {
                key: "onCliCommand",
                value: function onCliCommand(command) {
                    if (!command) return;
                    if (app.ready) {
                        this.runCliCommand(command)
                    } else {
                        this.bufferCliCommand(command)
                    }
                }
            }, {
                key: "bufferCliCommand",
                value: function bufferCliCommand(command) {
                    app.pendingCommands.push(command)
                }
            }, {
                key: "runCliCommand",
                value: function runCliCommand(command) {
                    if (!command) return;
                    if (Array.isArray(command)) {
                        app.openCogPath(command);
                        return
                    }
                    switch (command.type) {
                        case "create-component":
                            this.createComponentCommand(command);
                            break
                    }
                }
            }, {
                key: "createComponentCommand",
                value: function createComponentCommand(command) {
                    if (!command.path || !electron.pathExists(command.path)) return;
                    if (!command.definition) return;
                    Package.createFromCLI(command.definition).then(function(pkg) {
                        return electron.writeFile(command.path + electron.pathSeparator + pkg.name.replace(/[<>:"\/\\|?*]/g, "") + ".epod", pkg.stringify(), "gzip")
                    })["catch"](function(e) {
                        console.error(e)
                    })
                }
            }, {
                key: "getFocusedComponent",
                value: function getFocusedComponent() {
                    if (!this.context || !this.context.page || !this.context.page.hasFocusedComponent()) {
                        return null
                    }
                    return this.context.page.getFocusedComponent()
                }
            }, {
                key: "getFrameworkByVersion",
                value: function getFrameworkByVersion(ver) {
                    return this.availableFrameworks[ver]
                }
            }, {
                key: "generateUniqueID",
                value: function generateUniqueID() {
                    return this.getPublicID() + "_" + Date.now()
                }
            }, {
                key: "hasToken",
                value: function hasToken() {
                    return cookies.hasItem("token")
                }
            }, {
                key: "setToken",
                value: function setToken(token) {
                    var validity = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
                    return cookies.setItem("token", token, validity, "/")
                }
            }, {
                key: "getPublicID",
                value: function getPublicID() {
                // let me do this next time
                // value: function getPublicID(id) {
                    // return id;
                    return app.user;
                }
            }, {
                key: "getToken",
                value: function getToken() {
                    return cookies.getItem("token")
                }
            }, {
                key: "removeToken",
                value: function removeToken() {
                    return cookies.removeItem("token", "/")
                }
            }, {
                key: "getDeviceID",
                value: function getDeviceID() {
                    return cookies.getItem("device")
                }
            }, {
                key: "getDeviceName",
                value: function getDeviceName() {
                    return decodeURIComponent(cookies.getItem("device-name"))
                }
            }, {
                key: "getUpdatesUntil",
                value: function getUpdatesUntil() {
                    return new Date(Number(cookies.getItem("updates-until")) * 1e3).toLocaleDateString()
                }
            }, {
                key: "getVersion",
                value: function getVersion() {
                    return packageJSON.version
                }
            }, {
                key: "getParsedVersion",
                value: function getParsedVersion() {
                    var v = this.getVersion().split(".");
                    return {
                        major: v[0],
                        minor: v[1],
                        bugfix: v[2]
                    }
                }
            }, {
                key: "getBaseMinorVersion",
                value: function getBaseMinorVersion() {
                    var parsed = this.getParsedVersion();
                    return parsed.major + "." + parsed.minor + ".0"
                }
            }, {
                key: "getElectronVersion",
                value: function getElectronVersion() {
                    return electron.version
                }
            }, {
                key: "updateSystemCookies",
                value: function updateSystemCookies() {
                    cookies.setItem("app-version", packageJSON.version, Infinity, "/");
                    cookies.setItem("os", electron.os, Infinity, "/")
                }
            }, {
                key: "updateActivityCookies",
                value: function updateActivityCookies() {
                    if (Date.now() - app.lastChange > 5 * 60 * 1e3) {
                        return
                    }
                    var totalActivity = (Number(cookies.getItem("activity")) || 0) + 5;
                    cookies.setItem("activity", totalActivity, Infinity, "/")
                }
            }, {
                key: "isLicensed",
                value: function isLicensed() {
                    return this.hasToken()
                }
            }, {
                key: "isTrial",
                value: function isTrial() {
                    return cookies.hasItem("trial") && cookies.getItem("trial") == "1"
                }
            }, {
                key: "isLifetime",
                value: function isLifetime() {
                    return cookies.hasItem("lifetime") && cookies.getItem("lifetime") == "1"
                }
            }, {
                key: "isStudent",
                value: function isStudent() {
                    return cookies.hasItem("student") && cookies.getItem("student") == "1"
                }
            }, {
                key: "canBeRenewed",
                value: function canBeRenewed() {
                    return !app.isTrial() && !app.isLifetime()
                }
            }, {
                key: "licenseDaysRemaining",
                value: function licenseDaysRemaining() {
                    var expiresOn = new Date(Number(cookies.getItem("updates-until")) * 1e3);
                    if (expiresOn < Date.now()) {
                        return 0
                    }
                    return Math.round((expiresOn - Date.now()) / (24 * 60 * 60 * 1e3))
                }
            }, {
                key: "deleteLicenseKey",
                value: function deleteLicenseKey() {
                    app.confirmDialog.open({
                        title: "Delete License Key",
                        message: "Deleting the license key will unregister this computer from your account, and you will be able to add another in its place. Once you do this, this copy of Cogworks will be deactivated. Continue?",
                        okButton: "Delete Key",
                        onOK: function onOK() {
                            $.post("/app/unregister-device", function() {
                                setTimeout(function() {
                                    app.alertDialog.open({
                                        title: "Key Was Deleted",
                                        message: "Save your work and restart Cogworks."
                                    })
                                }, 800);
                                UpdateSystem.deactivateApp()
                            })
                        }
                    })
                }
            }, {
                key: "renewLicenseKey",
                value: function renewLicenseKey() {
                    $.post("/renew-license-handler", {
                        createRenewalForToken: app.getToken()
                    }, function(msg) {
                        if (!msg || !msg.key) return;
                        app.openURLInBrowser("")
                    })
                }
            }, {
                key: "manageDevices",
                value: function manageDevices() {
                    if (this.manageDevicesWindow && this.manageDevicesWindow && !this.manageDevicesWindow.closed) {
                        this.manageDevicesWindow.focus();
                        return
                    }
                    this.manageDevicesWindow = window.open("/app/manage-devices/?token=" + this.getToken(), "Manage Devices", "scrollbars,status,show=true,width=600,height=320,min-width=600,min-height=320,use-content-size=true")
                }
            }, {
                key: "checkToken",
                value: function checkToken() {
                    $.getJSON("/app/is-token-valid", function(isValid) {
                        if (isValid) return;
                        app.removeToken();
                        UpdateSystem.deactivateApp()
                    })
                }
            }, {
                key: "shellUpdateIsAvailable",
                value: function shellUpdateIsAvailable() {
                    var notif = app.notifications.create({
                        type: "warning",
                        title: "An update is available",
                        description: "Click to download it from our website.",
                        action: function action(notif) {
                            app.openURLInBrowser("");
                            notif.hide()
                        },
                        timeout: 0
                    });
                    app.notifications.clear();
                    notif.show()
                }
            }, {
                key: "appUpdateIsAvailable",
                value: function appUpdateIsAvailable() {
                    var notif = app.notifications.create({
                        type: "warning",
                        title: "An update is available",
                        description: "Restart Cogworks to activate it.",
                        timeout: 0
                    });
                    app.notifications.clear();
                    notif.show()
                }
            }, {
                key: "checkForUpdates",
                value: function checkForUpdates() {
                    var notification = app.notifications.create({
                        type: "warning",
                        title: "Checking for Updates..",
                        timeout: 2500
                    });
                    UpdateSystem.checkForUpdates(function(event, which) {
                        if (event == "check-started") {
                            notification.show()
                        }
                        if (event == "no-updates") {
                            notification.set({
                                title: "No Updates Available."
                            });
                            notification.update();
                            notification.hideAfter(3500)
                        }
                        if (event == "update-available" && which == "app") {
                            notification.set({
                                title: "Downloading.."
                            });
                            notification.update();
                            notification.hideAfter(3500)
                        }
                        if (event == "update-ready" && which == "app") {
                            notification.hide();
                            app.appUpdateIsAvailable()
                        }
                        if (event == "update-ready" && which == "shell") {
                            notification.hide();
                            app.shellUpdateIsAvailable()
                        }
                    })
                }
            }, {
                key: "getZoomFactor",
                value: function getZoomFactor() {
                    return app.settings.zoomFactor
                }
            }, {
                key: "setZoomFactor",
                value: function setZoomFactor(zoomFactor) {
                    app.settings.zoomFactor = zoomFactor;
                    electron.setZoomFactor(zoomFactor);
                    app.trigger("interface-zoom-factor-change")
                }
            }, {
                key: "scaleUp",
                value: function scaleUp() {
                    var step = .05;
                    var maxZoom = 2;
                    var newZoom = app.getZoomFactor() + step;
                    newZoom = Math.round(newZoom * 100) / 100;
                    if (newZoom <= maxZoom) {
                        app.setZoomFactor(newZoom)
                    }
                }
            }, {
                key: "scaleDown",
                value: function scaleDown() {
                    var step = .05;
                    var minZoom = .5;
                    var newZoom = app.getZoomFactor() - step;
                    newZoom = Math.round(newZoom * 100) / 100;
                    if (newZoom >= minZoom) {
                        app.setZoomFactor(newZoom)
                    }
                }
            }, {
                key: "resetScale",
                value: function resetScale() {
                    this.setZoomFactor(1)
                }
            }, {
                key: "zoomCanvasIn",
                value: function zoomCanvasIn() {
                    if (!this.context) return;
                    return app.canvas.zoomIn()
                }
            }, {
                key: "zoomCanvasOut",
                value: function zoomCanvasOut() {
                    if (!this.context) return;
                    return app.canvas.zoomOut()
                }
            }, {
                key: "resetCanvasZoom",
                value: function resetCanvasZoom() {
                    if (!this.context) return;
                    return app.canvas.resetZoom()
                }
            }, {
                key: "hasUndo",
                value: function hasUndo() {
                    if (!this.context) return false;
                    if (this.isInlineEditingActive()) {
                        return false
                    }
                    return this.context.history.hasUndo()
                }
            }, {
                key: "hasRedo",
                value: function hasRedo() {
                    if (!this.context) return false;
                    if (this.isInlineEditingActive()) {
                        return false
                    }
                    return this.context.history.hasRedo()
                }
            }, {
                key: "undoName",
                value: function undoName() {
                    if (!this.context) return "Undo";
                    return this.context.history.undoName()
                }
            }, {
                key: "redoName",
                value: function redoName() {
                    if (!this.context) return "Redo";
                    return this.context.history.redoName()
                }
            }, {
                key: "undo",
                value: function undo() {
                    if (this.isInlineEditingActive()) {
                        return false
                    }
                    if (app.isDialogShown()) {
                        return false
                    }
                    return this.context.history.undo()
                }
            }, {
                key: "redo",
                value: function redo() {
                    if (this.isInlineEditingActive()) {
                        return false
                    }
                    if (app.isDialogShown()) {
                        return false
                    }
                    return this.context.history.redo()
                }
            }, {
                key: "isDialogShown",
                value: function isDialogShown() {
                    return Dialog.isDialogShown()
                }
            }, {
                key: "isWidgetDrawerShown",
                value: function isWidgetDrawerShown() {
                    return this.widgetDrawer.isOpen()
                }
            }, {
                key: "shouldShowWidgetDrawer",
                value: function shouldShowWidgetDrawer() {
                    return !!app.template && app.template.hasWidgets() && app.canvas.dimensions.height > 150
                }
            }, {
                key: "isContextMenuShown",
                value: function isContextMenuShown() {
                    return this.contextMenu.visible
                }
            }, {
                key: "shouldCloseContextMenu",
                value: function shouldCloseContextMenu(target) {
                    return app.isContextMenuShown() && !target.closest("#context-menu") && !target.closest(".context-menu-toggler")
                }
            }, {
                key: "shouldCloseWidgetDrawer",
                value: function shouldCloseWidgetDrawer(target) {
                    return app.isWidgetDrawerShown() && !target.closest("#widget-drawer")
                }
            }, {
                key: "hasOpenedContexts",
                value: function hasOpenedContexts() {
                    return this.openedContexts.length > 0
                }
            }, {
                key: "hasActiveContext",
                value: function hasActiveContext() {
                    return this.hasOpenedContexts() && !!app.framework
                }
            }, {
                key: "isDesignOpened",
                value: function isDesignOpened(path) {
                    return this.getIndexForDesign(path) > -1
                }
            }, {
                key: "isDesignLoading",
                value: function isDesignLoading(path) {
                    return this.loadingDesigns.includes(path)
                }
            }, {
                key: "getIndexForDesign",
                value: function getIndexForDesign(path) {
                    for (var i = 0; i < this.openedContexts.length; i++) {
                        if (path == this.openedContexts[i].path) {
                            return i
                        }
                    }
                    return -1
                }
            }, {
                key: "switchToContext",
                value: function switchToContext(id) {
                    if (!this.openedContexts[id]) return;
                    app.activateContext(this.openedContexts[id])
                }
            }, {
                key: "saveDesign",
                value: function saveDesign(context) {
                    cogworks.loadingScreen("dynamic","Saving " + (context.name).replace(".cog","") + " file.","fadeIn");
                    
                    if (!context.canBeSaved()) return;
                    context.isSaving = true;
                    if (context.existsOnDisk()) {
                        app.writeContextToDisk(context, context.path)
                    } else {
						$.post('../cogworks/main-tool-backend/cog-file/add', {id: app.user, content: (context.stringify())}, function(data) {
                            var obj = JSON.parse(data);
                            context.path = obj.path;
                            context.fileID = obj.fileID;
							if(obj.result == false) {
								cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + (context.name).replace(".cog","") + "' failed to save.</p><p>Report error ID: 007 to the admin if issue persist.</p>","show");
							} else {
								app.writeContextToDisk(context,context.path);
							}
						});
                    }
                }
            }, {
                key: "writeContextToDisk",
                value: function writeContextToDisk(context, path) {
                    if (!path) return;
                    path = enforceFileExtension(path, "cog");
                    var parsed = parsePath(path);
                    var content = context.stringify();
                    var tmpPath = app.userPath + "tmp";
                    var cogfileName = parsed.basename;

                    if(parseInt(context.fileID) == 0) {
                        cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + (context.name).replace(".cog","") + "' failed to save.</p><p>Report error ID: 021 to the admin if issue persist.</p>","show");
                    } else {
                        $.ajax({
                            url: '../cogworks/main-tool-backend/write-context-to-disk',
                            type: "POST",
                            cache: true,
                            data: {userID: app.user, fileID: context.fileID, destinationPath: parsed.dirname, fName: parsed.basename, content: content},
                            success: function (data) {
                                var obj = null;
                                if(data == 'fail') {
                                    cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + (context.name).replace(".cog","") + "' is not generated.</p><p>Report error ID: 022 to the admin if issue persist.</p>","show");
                                } else {
                                    obj = JSON.parse(data);
                                    if(obj.status == true) {
                                        context.markAsSaved(path);
                                        app.trigger("context-saved", context);
                                        
                                        setTimeout(function(){cogworks.loadingScreen("","","fadeOut")},1000);
                                        
                                        // separated this to make things more faster
                                        $.post('../cogworks/main-tool-backend/make-cog-backup', {id: context.fileID, content: content}, function(data) {
                                            if(data == 'false') {
                                                app.notifications.create({
                                                    type: "backup_error",
                                                    title: "Can't make a backup file",
                                                    description: "Something went wrong to your file '" + (context.name).replace(".cog","") + "' Report error ID: 009"
                                                }).show();
                                            } else {
                                                app.notifications.create({
                                                    type: "backup_succeed",
                                                    title: "Success creating backup",
                                                    description: "Your file is successfully have a backup."
                                                }).show();
                                            }
                                        }).fail(function(error){
                                            app.notifications.create({
                                                type: "backup_error",
                                                title: "Can't make a backup file",
                                                description: "Something went wrong to your file '" + (context.name).replace(".cog","") + "' Report error ID: 018."
                                            }).show();
                                        });
                                    } else {
                                        cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + (context.name).replace(".cog","") + "' is not generated.</p><p>Report error ID: 023 to the admin if issue persist.</p>","show");
                                    }
                                    if(obj.dbUpdated == false) {
                                        cogworks.loadingScreen("alert","<p>Date is not updated.</p><p>Report error ID: 024 to the admin if issue persist.</p>","show");
                                    }
                                }
                            },
                            error: function(data){
                                app.notifications.create({
                                    type: "backup_error",
                                    title: "Can't make a backup file",
                                    description: "Something went wrong to your file '" + (context.name).replace(".cog","") + "' error ID: 008."
                                }).show();
                            }
                        });
                    }
                }
            }, {
                key: "getErrorMessage",
                value: function getErrorMessage(err) {
                    var message = "";
                    switch (err.code) {
                        case "EPERM":
                        case "EACCES":
                            message = "The path is not writable.";
                            break;
                        case "EEXIST":
                            message = "The file already exists.";
                            break;
                        case "EISDIR":
                            message = "The given path is a directory, file expected.";
                            break;
                        case "ENOENT":
                            message = "The given path does not exist.";
                            break;
                        case "ENOTSUP":
                            message = "Operation not allowed.";
                            break;
                        case "Z_DATA_ERROR":
                            message = "Sorry, this design has been corrupted. You can try restoring a working version from a backup.";
                            break;
                        default:
                            message = "Oops! Something went wrong.";
                            break
                    }
                    return message
                }
            }, {
                key: "saveDesignAs",
                value: function saveDesignAs(context) {
                    if (!context.canBeSavedAs()) return;
                    electron.showFileSaveDialog({
                        title: "Save Design As",
                        defaultPath: context.path,
                        filters: [{
                            name: "Cogworks Design (.cog)",
                            extensions: ["cog"]
                        }]
                    }, function(path) {
                        if (!path) return;
                        var oldSettings = app.readSettingsForDesign(context);
                        context.regenerateID();
                        app.writeContextToDisk(context, path);
                        app.saveSettingsForDesign(context, oldSettings)
                    })
                }
            }, {
                key: "showDialogForNewDesign",
                value: function showDialogForNewDesign() {
                    /*
                    this.newDesignDialog.open({
                        name: "",
						path: DOCUMENT_ROOT + "user_files/" + newFile,
                        theme: "default",
                        onSave: function onSave(prop) {
                            if (prop.template == "blank") {
                                app.openContext(Application.createContext(prop), true)
                            } else {
                                app.loadTemplateWithNewName(prop.template,prop.name)
                            }
                        }
                    })
                    */
                    var frameworks = [];
                    for (var version in app.availableFrameworks) {
                        frameworks.unshift({
                            version: version,
                            name: app.availableFrameworks[version].name,
                            hasTemplates: app.availableFrameworks[version].hasTemplates
                        })
                    }
                    this.newDesignDialog.open({
                        name: "",
                        path: "",
                        frameworks: frameworks,
                        onSave: function onSave(prop) {
                            if (prop.template.id == "blank") {
                                app.openContext(Application.createContext(prop), true)
                            } else {
                                app.getFrameworkByVersion(prop.framework).loadTemplate(prop.template.id).then(function(template) {
                                    console.log(template);
                                    app.openContext(Application.createContextFromTemplate(template, prop), true)
                                })
                            }
                        }
                    })
                }
            }, {
                key: "createBlankDesign",
                value: function createBlankDesign(framework) {
                    return Application.createContext({
                        theme: framework.getDefaultTheme(),
                        framework: framework.version
                    })
                }
            }, {
                key: "showAboutDialog",
                value: function showAboutDialog() {
                    this.aboutDialog.open({
                        version: packageJSON.version,
                        computerName: app.getDeviceName(),
                        updatesUntil: app.getUpdatesUntil(),
                        lifetime: app.isLifetime(),
                        trial: app.isTrial(),
                        student: app.isStudent()
                    })
                }
            }, {
                key: "showWhatsNewDialog",
                value: function showWhatsNewDialog() {
                    var upgraded = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                    var lastRunVersion = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                    $.get("/changelog/log.json", function(response) {
                        var slides = [];
                        var baseVersion = app.getBaseMinorVersion();
                        var baseDistance = 0;
                        for (var i = 0; i < response.log.length; i++) {
                            if (baseVersion == response.log[i].version) {
                                baseDistance = i;
                                break
                            }
                        }
                        var highlightDistance = baseDistance + 1;
                        if (upgraded) {
                            var lastRunDistance = 0;
                            for (var i = 0; i < response.log.length; i++) {
                                if (lastRunVersion == response.log[i].version) {
                                    lastRunDistance = i;
                                    break
                                }
                            }
                            if (lastRunDistance < highlightDistance) {
                                highlightDistance = lastRunDistance
                            }
                        }
                        for (var i = 0; i < highlightDistance; i++) {
                            var release = response.log[i];
                            if (release.highlights.length) {
                                var tmp = [];
                                var _iteratorNormalCompletion21 = true;
                                var _didIteratorError21 = false;
                                var _iteratorError21 = undefined;
                                try {
                                    for (var _iterator21 = release.highlights[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                        var highlight = _step21.value;
                                        var slide = {
                                            type: "highlight",
                                            title: highlight.title,
                                            description: highlight.description
                                        };
                                        if (highlight.image) {
                                            slide.image = highlight.image
                                        }
                                        tmp.push(slide)
                                    }
                                } catch (err) {
                                    _didIteratorError21 = true;
                                    _iteratorError21 = err
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
                                            _iterator21["return"]()
                                        }
                                    } finally {
                                        if (_didIteratorError21) {
                                            throw _iteratorError21
                                        }
                                    }
                                }
                                slides.unshift.apply(slides, tmp)
                            }
                        }
                        var changes = [];
                        for (var i = 0; i <= baseDistance; i++) {
                            var release = response.log[i];
                            changes.push({
                                version: release.version,
                                installed: release.version == app.getVersion(),
                                date: release.date,
                                changes: release.changes
                            })
                        }
                        slides.push({
                            type: "changelog",
                            title: "Change Log",
                            image: "../img/logo/projectcog/logo.svg",
                            changes: changes
                        });
                        if (upgraded && slides.length > 1) {
                            slides.unshift({
                                type: "intro",
                                image: "../img/logo/projectcog/logo.svg",
                                title: "You've Upgraded to " + app.getVersion(),
                                description: "See all features and improvements <br>that are new in this release."
                            })
                        }
                        app.whatsNewDialog.open({
                            slides: slides
                        })
                    })
                }
            }, {
                key: "showSettingsDialog",
                value: function showSettingsDialog(context) {
                    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    context = context || app.context;
                    var framework = context.framework;
                    var tempThemeChange = false,
                        originalTheme = context.settings.theme;
                    var themeChangeTimer = null;
                    this.settingsDialog.open({
                        context: context,
                        lms: context.settings.lms,
                        tab: options.tab || null,
                        headContent: context.settings.headContent,
                        meta: context.settings.meta,
                        sassPath: electron.readSetting("sassPath", null),
                        exportOptions: app.readSettingsForDesign(context),
                        backupSettings: app.getBackupSettings(),
                        theme: originalTheme,
                        jqueryVersion: context.settings.jqueryVersion,
                        availablejQueryVersions: framework.getAvailablejQueryVersions(),
                        onThemeChange: function onThemeChange(prop) {
                            tempThemeChange = true;
                            clearTimeout(themeChangeTimer);
                            themeChangeTimer = setTimeout(function() {
                                updateTheme(prop.theme)
                            }, 1e3)
                        },
                        onClose: function onClose() {
                            if (tempThemeChange) {
                                updateTheme(originalTheme)
                            }
                            clearTimeout(themeChangeTimer);
                            tempThemeChange = false
                        },
                        onSave: function onSave(prop) {
                            var anyChanges = false,
                                lmsChanges = false,
                                themeChanges = false,
                                exportChanges = false,
                                metaChanges = false,
                                backupChanges = false;
                            var newTheme = prop.theme;
                            if (tempThemeChange) {
                                updateTheme(newTheme);
                                if (newTheme.id != originalTheme.id) {
                                    anyChanges = true;
                                    themeChanges = true
                                }
                            }
                            clearTimeout(themeChangeTimer);
                            tempThemeChange = false;
                            var newLMSVersion = prop.lms;
                            var oldLMSVersion = context.settings.lms;
                            if (newLMSVersion != oldLMSVersion) {
                                anyChanges = true;
                                lmsChanges = true;
                                context.settings.lms = newLMSVersion
                            }
                            var newjQueryVersion = prop.jqueryVersion;
                            var oldjQueryVersion = context.settings.jqueryVersion;
                            if (newjQueryVersion != oldjQueryVersion) {
                                anyChanges = true;
                                context.settings.jqueryVersion = newjQueryVersion
                            }
                            var newHeadContent = prop.headContent;
                            var oldHeadContent = context.settings.headContent;
                            if (newHeadContent != oldHeadContent) {
                                anyChanges = true;
                                context.settings.headContent = newHeadContent
                            }
                            var oldMeta = context.settings.meta,
                                newMeta = prop.meta;
                            if (!deepEqual(oldMeta, newMeta)) {
                                anyChanges = true;
                                metaChanges = true;
                                context.settings.meta = newMeta;
                                app.trigger("context-meta-changed")
                            }
                            var oldSASSPath = electron.readSetting("sassPath", null),
                                newSASSPath = prop.sassPath;
                            if (oldSASSPath != newSASSPath) {
                                anyChanges = true;
                                electron.saveSetting("sassPath", newSASSPath)
                            }
                            var oldBackupSettings = app.getBackupSettings(),
                                newBackupSettings = _extends({}, oldBackupSettings, prop.backupSettings);
                            if (!deepEqual(oldBackupSettings, newBackupSettings)) {
                                anyChanges = true;
                                backupChanges = true;
                                app.saveBackupSettings(newBackupSettings);
                                app.trigger("backup-settings-changed")
                            }
                            var newExportOptions = prop.exportOptions;
                            var oldExportOptions = app.readSettingsForDesign(context);
                            if (!deepEqual(oldExportOptions, newExportOptions)) {
                                anyChanges = true;
                                exportChanges = true;
                                app.saveSettingsForDesign(context, newExportOptions)
                            }
                            if (!anyChanges) return;
                            context.history.add({
                                name: "Change Design Settings",
                                undo: function undo() {
                                    if (themeChanges) {
                                        updateTheme(originalTheme)
                                    }
                                    if (exportChanges) {
                                        app.saveSettingsForDesign(context, oldExportOptions)
                                    }
                                    if (metaChanges) {
                                        context.settings.meta = oldMeta;
                                        app.trigger("context-meta-changed")
                                    }
                                    if (backupChanges) {
                                        app.saveBackupSettings(oldBackupSettings);
                                        app.trigger("backup-settings-changed")
                                    }
                                    if (lmsChanges) {
                                        context.settings.lms = oldLMSVersion;
                                    }
                                    context.settings.jqueryVersion = oldjQueryVersion;
                                    context.settings.headContent = oldHeadContent;
                                    electron.saveSetting("sassPath", oldSASSPath)
                                },
                                redo: function redo() {
                                    if (themeChanges) {
                                        updateTheme(newTheme)
                                    }
                                    if (exportChanges) {
                                        app.saveSettingsForDesign(context, newExportOptions)
                                    }
                                    if (metaChanges) {
                                        context.settings.meta = newMeta;
                                        app.trigger("context-meta-changed")
                                    }
                                    if (backupChanges) {
                                        app.saveBackupSettings(newBackupSettings);
                                        app.trigger("backup-settings-changed")
                                    }
                                    if (lmsChanges) {
                                        context.settings.lms = newLMSVersion;
                                    }
                                    context.settings.jqueryVersion = newjQueryVersion;
                                    context.settings.headContent = newHeadContent;
                                    electron.saveSetting("sassPath", newSASSPath)
                                }
                            })
                        },
                        onExport: function onExport(settings) {
                            setTimeout(function() {
                                app.exportDesign(context, settings)
                            }, 20)
                        }
                    });

                    function updateTheme(theme) {
                        if (!context.framework.themeExists(theme)) {
                            theme = context.framework.getDefaultTheme()
                        }
                        context.settings.theme = theme;
                        var themePromises = [];
                        var _iteratorNormalCompletion22 = true;
                        var _didIteratorError22 = false;
                        var _iteratorError22 = undefined;
                        try {
                            for (var _iterator22 = context.framework.getTheme(theme).fonts[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                                var font = _step22.value;
                                themePromises.push(app.canvas.preloadFont(font.name))
                            }
                        } catch (err) {
                            _didIteratorError22 = true;
                            _iteratorError22 = err
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
                                    _iterator22["return"]()
                                }
                            } finally {
                                if (_didIteratorError22) {
                                    throw _iteratorError22
                                }
                            }
                        }
                        themePromises.push(context.framework.loadThemeStyles(context));
                        if (themePromises.length) {
                            Promise.all(themePromises).then(exec)
                        } else exec()
                    }

                    function exec() {
                        app.trigger("context-theme-changed")
                    }
                }
            }, {
                key: "handleExport",
                value: function handleExport(context) {
                    context = context || app.context;
                    var destination = app.readSettingsForDesign(context).exportDestination;
                    if (destination) {
                        this.exportDesign(context)
                    } else {
                        this.showSettingsDialog(context, {
                            tab: "export-options"
                        })
                    }
                }
            }, {
                key: "exportContext",
                value: function exportContext() {
                    var audio = "";
                    var video = "";
                    var pdf = "";
                    var extra = '';
                    var dir = app.userPath + "tmp";
                    var cogfileInfo = null;
                    
                    cogworks.loadingScreen("dynamic","Exporting " + app.context.name + " file.","fadeIn");
                    
                    function startExport()
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
                        var numErrors = 0;
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
                                    var str = "";
                                    obj.path = key;
                                    obj.name = ((key.split("/"))[((key.split("/")).length - 1)]);
                                    if(obj.name == "index.html" && app.context.settings.lms)
                                    {
                                        str = '\n\t<script src="./lms/APIConstants.js"></script>\n';
                                        str += '\t<script src="./lms/Configuration.js"></script>\n';
                                        str += '\t<script src="./lms/API.js"></script>\n';
                                        str += '\t<script src="./lms/NONEFunctions.js"></script>\n';
                                        str += '\t<script src="./lms/SCORMDiscovery.js"></script>\n';
                                        str += '\t<script src="./lms/UtilityFunctions.js"></script>\n';
                                        str += '\t<script src="./lms/SCORM2004Functions.js"></script>\n';
                                        obj.html = ((htmlFiles[key]).content).slice(0, ((htmlFiles[key]).content).search("</head>")) + str + ((htmlFiles[key]).content).slice(((htmlFiles[key]).content).search("</head>"));
                                    }
                                    else
                                    {
                                        obj.html = (htmlFiles[key]).content;
                                    }
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
                                var path = (exp.settings.theme.id != undefined) ? "assets/cogworks/embed/bootstrap/" + (exp.framework.version) + "/" + (exp.settings.theme.id) : "assets/cogworks/embed/bootstrap/" + (exp.framework.version) + "/" + (exp.settings.theme);
                                var originalSheet = (path + "/bootstrap.min.css");
                                operations.push(copyFilePromise((originalSheet.replace("../","")), dir + sep + "bootstrap/css/bootstrap.min.css"))
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
                                }
                                operations.push(copyFilePromise("assets/cogworks/js/jquery/jquery.min.js", dir + sep + "js" + sep + "jquery.min.js"));
                                operations.push(copyFilePromise("assets/cogworks/js/bootstrap.min.js", dir + sep + "bootstrap" + sep + "js" + sep + "bootstrap.min.js"));
                            }
                            else
                            {
                                operations.push(copyFilePromise("assets/cogworks/embed/js/jquery-" + jqueryVersion + ".min.js", dir + sep + "js" + sep + "jquery.min.js"));
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
                            if(app.context.assets.pdf.length > 0)
                            {
                                operations.push(copyFolderFiles(pdf, (pdfDir ? pdfDir : dir + sep + "pdf")));
                            }
                            if(app.context.assets.audio.length > 0)
                            {
                                operations.push(copyFolderFiles(audio, (audioDir ? audioDir : dir + sep + "media" + sep + "audio")));
                            }
                            if(app.context.settings.lms)
                            {
                                mkdir(dir + sep + "lms");
                                operations.push(copyFolderFiles("assets/cogworks/embed/js/lms", (dir + sep + "lms")));
                                generateManifestXML(cogfileInfo.userOrg, app.context.name, dir);
                            }
                            
                            Promise.all(operations).then(function() {
						      })["catch"](error);
                        });
                        
                        function copyFolderFiles(objFrom, objTo)
						{
                            var ajaxObj = null;
							filesToWrite.push((((objTo).split("/"))[((objTo).split("/").length - 1)]));
							
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
									convertToZip();
								},
								error: function (request, status, error) {
                                    console.log(status);
									numErrors++;
                                    convertToZip();
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
                                    convertToZip();
                                },
                                error: function (request, status, error) {
                                    console.log(status);
                                    numErrors++;
                                    convertToZip();
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
                                    convertToZip();
                                },
                                error: function (request, status, error) {
                                    console.log(status);
                                    numErrors++;
                                    convertToZip();
                                }
                            });
                            ajaxAry.push(ajaxObj)
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
                                    console.log(status);
									numErrors++;
                                    convertToZip();
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
									convertToZip();
                                },
								error: function (request, status, error) {
                                    console.log(status);
									numErrors++;
                                    convertToZip();
								}
                            });
                            ajaxAry.push(ajaxObj);
                        }
                        
                        function generateManifestXML(org, filename)
                        {
                            var ajaxObj = null;
                            var docRoot = (app.userPath).substr(0, (app.userPath).indexOf('/cogworks/'));
                            filesToWrite.push(filename);
                            ajaxObj = $.ajax({
                                url: '../cogworks/main-tool-backend/read-file',
                                type: "POST",
                                cache: true,
                                data: {path: (docRoot + '/assets/cogworks/embed/xml'), fName:"imsmanifest.xml"},
                                success: function (info) {
                                    if(info == 'fail') {
                                        numErrors++;
                                        convertToZip();
                                    } else {
                                        var ajaxObj2 = null;
                                        var xml = $.parseXML(info);
                                        var xmlRaw = $(xml);
                                        var xmlString = "";
                                        xml.getElementsByTagName("organizations")[0].setAttribute("default", org);
                                        xml.getElementsByTagName("organizations")[0].getElementsByTagName("organization")[0].setAttribute("identifier", org);
                                        xml.getElementsByTagName("organizations")[0].getElementsByTagName("organization")[0].getElementsByTagName("title")[0].childNodes[0].nodeValue = filename;
                                        xml.getElementsByTagName("organizations")[0].getElementsByTagName("organization")[0].getElementsByTagName("item")[0].getElementsByTagName("title")[0].childNodes[0].nodeValue = filename;

                                        if (window.ActiveXObject) {
                                            xmlString = xmlRaw;
                                        } else {
                                            // code for Mozilla, Firefox, Opera, etc.
                                            xmlString = (new XMLSerializer()).serializeToString(xml);
                                        }
                                        ajaxObj2 = $.ajax({
                                            url: '../cogworks/main-tool-backend/write-file',
                                            type: "POST",
                                            cache: true,
                                            data: {path: dir,fName: "imsmanifest.xml",content: xmlString},
                                            success: function (info) {
                                                if(info == 'fail') {
                                                    numErrors++;
                                                } else {
                                                    writtenFiles++;
                                                }
                                                convertToZip();
                                            },
                                            error: function (request, status, error) {
                                                console.log(status);
                                                numErrors++;
                                                convertToZip();
                                            }
                                        });
                                        ajaxAry.push(ajaxObj2);
                                    }
                                },
                                error: function (request, status, error) {
                                    console.log(request);
                                    console.log(status);
                                    console.log(error);
                                    numErrors++;
                                    convertToZip();
                                }
                            });
                            ajaxAry.push(ajaxObj);
                        }

                        function convertToZip()
                        {
                            var percent = Math.round((writtenFiles / filesToWrite.length) * 100);
                            if(writtenFiles == filesToWrite.length) {
                                cogworks.loadingScreen("dynamic","Exporting " + app.context.name + " file.<br><br>Export - 100%","show");
                                app.notifications.create({
                                    title: "Your design was exported."
                                }).show();

                                $.ajax({
                                    url: "../cogworks/main-tool-backend/convert-to-zip",
                                    type: "POST",
                                    cache: true,
                                    data: {path: (dir + '/'), filename:app.context.name},
                                    success: function (info) {
                                        if(info == 'fail') {
                                            cogworks.loadingScreen("alert","<p>Cannot export the file '" + app.context.name + "'.</p><p>Report error ID: 015 to the admin if issue persist.</p>","show");
                                        } else {
                                            cogworks.loadingScreen("","","fadeOut");
                                            var tmpPath = (dir).substr((dir).indexOf('/cogworks/'), ((dir).length - 1)) + '/';
                                            
                                            $("a#downloadFile").attr({target: '_blank', href: (location.protocol + '//' + location.host + tmpPath + app.context.name + ".zip"), download : (app.context.name + ".zip")});
                                            $("a#downloadFile")[0].click();
                                        }
                                    },
                                    error: function (request, status, error) {
                                        cogworks.loadingScreen("alert","<p>Cannot export the file '" + app.context.name + "'.</p><p>Report error ID: 014 to the admin if issue persist.</p>","show");
                                    }
                                });
                            } else {
                                if(numErrors > 0) {
                                    $.each(ajaxAry, function(index, value){
                                        value.abort();
                                    });
                                    cogworks.loadingScreen("alert","<p>Cannot export the file '" + app.context.name + "'.</p><p>Report error ID: 013 to the admin if issue persist.</p>","show");
                                } else {
                                    cogworks.loadingScreen("dynamic","Exporting for " + app.context.name + " file.<br><br>Preview - " + percent + "%","show");
                                }
                            }
                        }

                        function error(e) {
                            cogworks.loadingScreen("alert","<p>Can not process file to preview.<p></p>" + e +"</p>","show");
                            app.notifications.create({
                                title: "Couldn't Export",
                                description: "Please choose a different folder.",
                                type: "error"
                            }).show()
                        }
                    }
                    $.post('../cogworks/main-tool-backend/general-info/cog-file',{id: app.context.fileID}, function(data){
                        cogfileInfo = JSON.parse(data);
                        audio = cogfileInfo.resources.audio;
                        video = cogfileInfo.resources.video;
                        pdf = cogfileInfo.resources.pdf;
                        extra = cogfileInfo.resources.extra;
                        $.ajax({
                            url: "../cogworks/main-tool-backend/remove-dir-files",
                            type: "POST",
                            cache: true,
                            data: {path:(dir + "/")},
                            success: function (info) {
                                // console.log(info);
                                startExport();
                            },
                            error: function (request, status, error) {
                                cogworks.loadingScreen("alert","<p>Cannot export the file '" + app.context.name + "'.</p><p>Report error ID: 012 to the admin if issue persist.</p>","show");
                            }
                        });
                    });
                }
            }, {
                key: "exportDesign",
                value: function exportDesign(context, settings) {
                    context = context || app.context;
                    settings = settings || app.readSettingsForDesign(app.context);
                    var path = settings.exportDestination;
                    if (!path) {
                        return
                    }
                    var notification = app.notifications.create({
                        title: "Exporting design.",
                        type: "loading",
                        timeout: 0
                    });
                    notification.show();
                    var exportStart = Date.now();
                    setTimeout(function() {
                        var exp = new ExportContext;
                        exp.unserialize(app.context.serialize());
                        app.context.smartTransfer(exp);
                        exp.generateFileExport(settings).then(function(result) {
                            var files = result.files;
                            var sep = electron.separator;
                            var createdFolders = new Set;
                            for (var filePath in files) {
                                var folders = filePath.split("/");
                                folders.pop();
                                var pp = path;
                                var _iteratorNormalCompletion23 = true;
                                var _didIteratorError23 = false;
                                var _iteratorError23 = undefined;
                                try {
                                    for (var _iterator23 = folders[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                                        var folder = _step23.value;
                                        pp = pp + sep + folder;
                                        if (createdFolders.has(pp)) {
                                            continue
                                        }
                                        createdFolders.add(pp);
                                        if (!electron.mkdirSync(pp)) {
                                            throw new Error("No rights")
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError23 = true;
                                    _iteratorError23 = err
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
                                            _iterator23["return"]()
                                        }
                                    } finally {
                                        if (_didIteratorError23) {
                                            throw _iteratorError23
                                        }
                                    }
                                }
                            }
                            for (var filePath in files) {
                                if (files[filePath].type == "plain") {
                                    electron.writeFile(path + sep + filePath.replace(/\//g, sep), files[filePath].content)
                                } else {
                                    electron.writeFile(path + sep + filePath.replace(/\//g, sep), files[filePath].content, "raw-from-base64")
                                }
                            }
                            if (settings.exportScript) {
                                electron.spawn(settings.exportScript, path)
                            }
                            var exportDuration = Date.now() - exportStart;
                            setTimeout(function() {
                                notification.hide();
                                if (result.errors.length) {
                                    app.notifications.create({
                                        title: "Your design was exported.",
                                        description: result.errors.join(" "),
                                        type: "warning"
                                    }).show()
                                } else {
                                    app.notifications.create({
                                        title: "Your design was exported.",
                                        description: "Click to open the target folder.",
                                        action: function action() {
                                            electron.openFileBrowser(path)
                                        }
                                    }).show()
                                }
                            }, Math.max(1e3 - exportDuration, 0))
                        })["catch"](function(e) {
                            console.error(e);
                            notification.hide();
                            app.notifications.create({
                                title: "Couldn't Export",
                                description: "Please choose a different folder.",
                                type: "error"
                            }).show()
                        })
                    }, 25)
                }
            }, {
                key: "showPublishingNotification",
                value: function showPublishingNotification() {
                    if (this.publishingNotification) {
                        return
                    }
                    this.publishingNotification = this.notifications.create({
                        title: "Publishing your website..",
                        timeout: 0
                    });
                    this.publishingNotification.show()
                }
            }, {
                key: "hidePublishingNotification",
                value: function hidePublishingNotification() {
                    var after = arguments.length <= 0 || arguments[0] === undefined ? 1e3 : arguments[0];
                    if (!this.publishingNotification) {
                        return
                    }
                    this.publishingNotification.hideAfter(1250);
                    this.publishingNotification = null
                }
            }, {
                key: "convertPublishingNotificationToError",
                value: function convertPublishingNotificationToError() {
                    var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                    var description = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
                    if (!this.publishingNotification) {
                        return
                    }
                    this.publishingNotification.set({
                        type: "error",
                        title: title,
                        description: description
                    });
                    this.publishingNotification.update();
                    this.publishingNotification.hideAfter(5e3);
                    this.publishingNotification = null
                }
            }, {
                key: "markPublishingNotificationComplete",
                value: function markPublishingNotificationComplete(url) {
                    if (!this.publishingNotification) {
                        return
                    }
                    var notif = this.publishingNotification;
                    this.publishingNotification.set({
                        title: "Your website was published",
                        description: "Click to open it in your browser.",
                        action: function action() {
                            app.openURLInBrowser(url);
                            notif.hide()
                        }
                    });
                    this.publishingNotification.update();
                    this.publishingNotification.hideAfter(6e3);
                    this.publishingNotification = null
                }
            }, {
                key: "handlePublish",
                value: function handlePublish(context) {
                    var websiteID = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                    context = context || app.context;
                    if (!context) return;
                    app.showPublishingNotification();
                    $.post("/app/websites/pre-publish", {
                        designID: context.id,
                        websiteID: websiteID
                    }).done(function(response) {
                        if (response.status == "success") {
                            app.publishDesign(context, {
                                token: response.token,
                                api: response.api,
                                url: response.url,
                                passkey: response.passkey
                            })
                        } else if (response.status == "fail" && response.reason == "no-site") {
                            app.showSettingsDialog(context, {
                                tab: "publish-options"
                            });
                            app.hidePublishingNotification()
                        } else {
                            app.convertPublishingNotificationToError("Couldn't publish your website", "Please try again after a few moments.")
                        }
                    }).fail(function(msg) {
                        app.convertPublishingNotificationToError("Website Publishing is not available", "Please try again after a few moments.")
                    })
                }
            }, {
                key: "publishDesign",
                value: function publishDesign(context, options) {
                    context = context || app.context;
                    var exp = new ExportContext;
                    exp.unserialize(app.context.serialize());
                    app.context.smartTransfer(exp);
                    exp.generateFileExport({
                        useCDN: true,
                        minify: true,
                        useAbsolutePaths: true,
                        versionAssets: true
                    }).then(function(result) {
                        var files = result.files;
                        var type = "full";
                        var data = JSON.stringify(files);
                        if (data.length > 50 * 1024 * 1024) {
                            app.convertPublishingNotificationToError("Website is too large to publish.", "Please reduce the number or size of images.");
                            return
                        }
                        var request = {
                            type: "full",
                            publishSession: null,
                            authToken: options.token,
                            passkey: options.passkey,
                            siteData: data
                        };
                        if (context.hasPublishSession() && context.lastPublishJSON) {
                            request.type = "partial";
                            request.publishSession = context.getPublishSession();
                            request.siteData = JSON.stringify(jsonPatch.compare(context.lastPublishJSON, files))
                        }
                        publish(options.api, request);

                        function publish(api, request) {
                            $.post(api, request).done(function(response) {
                                if (response.status == "success") {
                                    context.lastPublishJSON = files;
                                    context.setPublishSession(response.publishSession);
                                    app.markPublishingNotificationComplete(options.url)
                                } else if (response.status == "fail" && response.reason == "session-missing" && request.type == "partial") {
                                    request.type = "full";
                                    request.publishSession = null;
                                    request.siteData = data;
                                    publish(api, request)
                                } else {
                                    if (response.reason == "size") {
                                        app.convertPublishingNotificationToError("Website is too large to publish.", "Please reduce the number or size of images.")
                                    } else {
                                        app.convertPublishingNotificationToError("Couldn't publish your website.", "Please try again after a few moments.");
                                        context.resetPublishSession()
                                    }
                                }
                            }).fail(function(msg) {
                                app.convertPublishingNotificationToError("Couldn't publish your website.", "Please try again after a few moments.");
                                context.resetPublishSession()
                            })
                        }
                    })
                }
            }, {
                key: "openDuplicateDesign",
                value: function openDuplicateDesign(context) {
                    var ctx = Application.createContext({
                        name: context.name + " (copy)",
                        path: "",
                        json: context.serialize(),
                        framework: context.framework.version,
                        theme: context.settings.theme
                    });
                    ctx.regenerateID();
                    return app.openContext(ctx)
                }
            }, {
                key: "openDialog",
                value: function openDialog(type) {
                    switch(type)
                    {
                        case "cog":
                            app.openFileDialog.open();
                            break;
                        case "epod":
                            break;
                    }
                }
            }, {
                key: "openDesignDialog",
                value: function openDesignDialog() {
                    this.openDialog("cog")
                }
            }, {
                key: "openPackageDialog",
                value: function openPackageDialog() {
                    this.openDialog("Cogworks Component Files", ["epod"])
                }
            }, {
                key: "openCogPath",
                value: function openCogPath(paths) {
                    if (!Array.isArray(paths)) {
                        paths = [paths]
                    }
                    var lastDesignIndex = false;
                    for (var i = 0; i < paths.length; i++) {
                        var parsed = parsePath(paths[i]);
                        if (parsed.extname.toLowerCase() == ".cog") {
                            lastDesignIndex = i
                        }
                    }
                    var packages = [];
                    for (i = 0; i < paths.length; i++) {
                        var path = paths[i];
                        var parsed = parsePath(path);
                        switch (parsed.extname.toLowerCase()) {
                            case ".epod":
                                packages.push(path);
                                break;
                            case ".cog":
                                app.openDesignAction(path, i == lastDesignIndex);
                                break
                        }
                    }
                    if (packages.length) {
                        app.openPackageAction(packages)
                    }
                }
            }, {
                key: "openDesignAction",
                value: function openDesignAction(path) {
                    var parsed = null;
                    var focusOnOpen = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                    var _this6 = this;
                    var focusOnExisting = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                    var notificationTitle = arguments.length <= 3 || arguments[3] === undefined ? "Opening file." : arguments[3];
                    
                    if (this.isDesignOpened(path)) {
                        if (focusOnExisting) {
                            this.switchToContext(this.getIndexForDesign(path))
                        }
                        return Promise.resolve()
                    }
                    parsed = parsePath(path);
                    $.ajax({
                        url: "../cogworks/main-tool-backend/read-cog-file",
                        type: "POST",
                        cache: true,
                        data: {path:parsed.dirname,fName:parsed.basename, user: app.user},
                        success: function (data) {
                            var json = JSON.parse(data);
                            var context = null;
                            console.log(json);
                            try {
                                if(typeof json.design.assets.audio === "undefined") {
                                    var obj = new Object();
                                    obj.name = "";
                                    obj.expanded = false;
                                    obj.children = new Array();
                                    json.design.assets.audio = obj;
                                    app.assetAudioObj = obj;
                                } else {
                                    app.assetAudioObj = json.design.assets.audio;
                                }

                                if(typeof json.design.assets.pdf === "undefined") {
                                    var obj = new Object();
                                    obj.name = "";
                                    obj.expanded = false;
                                    obj.children = new Array();
                                    json.design.assets.pdf = obj;
                                    app.assetPDFObj = obj;
                                } else {
                                    app.assetPDFObj = json.design.assets.pdf;
                                }
                                context = parseCogDesignFormat(json, path);
                                context.fileID = json.fileID;
                                console.log(context);
                                context.name = json.design.name;
                                return app.openContext(context, focusOnOpen);
                            } catch(err) {
                                if(app.openedContexts.length > 0) {
                                    cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + (((path).split("/")[(((path).split("/")).length - 1)]).replace(".cog","")) + "' cannot open.</p><p>Report error ID: 006 to the admin if issue persist.</p>","show");
                                } else {
                                    cogworks.loadingScreen("dashboard_reload","<p>Something went wrong, your file '" + (((path).split("/")[(((path).split("/")).length - 1)]).replace(".cog","")) + "' cannot open.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 005 to the admin if issue persist.</p>","show");
                                }
                            }
                        },
                        error: function(data){
                            cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 004 to the admin if issue persist.</p>","show");
                        }
                    });
                }
            }, {
                key: "openPackageAction",
                value: function openPackageAction(paths) {
                    if (!paths) return;
                    if (!Array.isArray(paths)) {
                        paths = [paths]
                    }
                    paths = paths.filter(function(p) {
                        return electron.pathExists(p)
                    });
                    if (!paths.length) return;
                    var ops = paths.map(function(p) {
                        return electron.readFile(p, "gzip-async")
                    });
                    Promise.all(ops).then(function(packages) {
                        var readErrors = [],
                            existingPackages = [],
                            addedPackages = [];
                        for (var i = 0; i < packages.length; i++) {
                            try {
                                var pkg = parseEpodComponentFormat(JSON.parse(packages[i]))
                            } catch (e) {
                                readErrors.push(paths[i].slice(-30));
                                continue
                            }
                            if (app.userPackages.hasID(pkg.id)) {
                                existingPackages.push(pkg.name.substr(0, 30));
                                continue
                            }
                            pkg.name = app.userPackages.generateUniqueFreeName(pkg.name);
                            app.userPackages.addOp(pkg)["do"]();
                            addedPackages.push(pkg.name.substr(0, 30))
                        }
                        var message = "";
                        if (addedPackages.length == 1) {
                            message += "A new component was added to your library. "
                        }
                        if (addedPackages.length > 1) {
                            message += addedPackages.length + " components were added to your library. "
                        }
                        if (existingPackages.length == 1) {
                            message += 'The component "' + existingPackages[0] + '" already exists in your library. '
                        }
                        if (existingPackages.length > 1) {
                            if (existingPackages.length == paths.length) {
                                message += "These components already exist in your library. "
                            } else {
                                message += existingPackages.length + " components already exist. "
                            }
                        }
                        if (readErrors.length == 1) {
                            message += 'The file "' + readErrors[0] + '" is corrupted and was not added to your library. '
                        }
                        if (readErrors.length > 1) {
                            if (readErrors.length == paths.length) {
                                message += "These files are corrupted and were not imported. "
                            } else {
                                message += readErrors.length + " files were corrupted and were not added. "
                            }
                        }
                        if (addedPackages.length) {
                            app.trigger("package-tree-changed", "create", addedPackages)
                        }
                        app.alertDialog.open({
                            title: "Component Import",
                            message: message
                        })
                    })["catch"](function(error) {
                        var message = "An error occured while reading a component and it can't be imported.";
                        if (error.message == "version") {
                            message = "This component was created in a newer version of Cogworks and can't be opened."
                        }
                        app.alertDialog.open({
                            title: "Can't Import",
                            message: message
                        });
                        console.error(error)
                    })
                }
            }, {
                key: "openContext",
                value: function openContext(ctx) {
                    var assetsObj = null;
                    var switchTo = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                    app.openedContexts.push(ctx);
                    return ctx.framework.setupContext(ctx).then(function() {
                        if (ctx.usesTemplate()) {
                            return ctx.framework.loadTemplate(ctx.settings.theme.id)
                        }
                    }).then(function() {
                        ctx.canvasDimensions.zoom = 0.75;
                        ctx.canvasDimensions.width = 1200;
                        app.trigger("context-opened", ctx);
                        if (switchTo) {
                            app.activateContext(ctx);
                            console.log(ctx);
                            console.log(app.context.id);
                        }
                        if (ctx.assets.css.hasSCSS()) {
                            app.compileSASS(ctx)
                        }
                        assetsObj = (JSON.parse((app.context).stringify())).design.assets;
                        $.post('../cogworks/main-tool-backend/make-resource-folders', {user: app.user, cogID: app.context.fileID, designID: app.context.id, assets: JSON.stringify(assetsObj)}, function() {
                            // reserve code
                        })
                        .fail(function() {
                            cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Report error ID: 048 to the admin if issue persist.</p>","show");
                        })
                    });
                }
            }, {
                key: "confirmCloseContext",
                value: function confirmCloseContext(context) {
                    if (!context) return;
                    if (this.isDialogShown()) {
                        return
                    }
                    if (context.isActive() && app.isInlineEditingActive()) {
                        app.context.page.getFocusedComponent().commit();
                        return
                    }
                    if (context.hasUnsavedChanges()) {
                        app.confirmDialog.open({
                            title: "Close this Design?",
                            message: "You have unsaved changes. If you close this design, you will lose them. Continue?",
                            okButton: "Close Design",
                            onOK: function onOK() {
                                app.closeContext(context)
                            }
                        })
                    } else {
                        app.closeContext(context)
                    }
                }
            }, {
                key: "closeContext",
                value: function closeContext(ctx) {
                    this.openedContexts.splice(this.openedContexts.indexOf(ctx), 1);
                    this.trigger("context-closed", ctx);
                    if (ctx.isActive()) {
                        this.deactivateContext(ctx);
                        if (this.openedContexts.length) {
                            this.activateContext(this.openedContexts[0])
                        }
                    }
                    ctx.destructor();
                    if (!this.hasOpenedContexts()) {
                        this.aboveCanvas = false;
                        //this.showStartScreen();
                        app.dashboardPage();
                    }
                }
            }, {
                key: "isContextOpen",
                value: function isContextOpen(ctx) {
                    return this.openedContexts.includes(ctx)
                }
            }, {
                key: "updateComponentToolbar",
                value: function updateComponentToolbar() {
                    if (this.activeComponentToolbar) {
                        this.activeComponentToolbar.deactivate();
                        this.activeComponentToolbar = null
                    }
                    this.componentToolBar.empty();
                    var focused = this.getFocusedComponent();
                    if (!focused) {
                        return
                    }
                    var bars = [];
                    var current = focused;
                    while (current) {
                        var tmp = current.createToolbar(focused);
                        if (tmp) {
                            bars.push(tmp)
                        }
                        current = current.parent
                    }
                    if (!bars.length) {
                        return
                    }
                    var max = -1;
                    var _iteratorNormalCompletion24 = true;
                    var _didIteratorError24 = false;
                    var _iteratorError24 = undefined;
                    try {
                        for (var _iterator24 = bars[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                            var bar = _step24.value;
                            if (bar.weight > max) {
                                this.activeComponentToolbar = bar;
                                max = bar.weight
                            }
                        }
                    } catch (err) {
                        _didIteratorError24 = true;
                        _iteratorError24 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
                                _iterator24["return"]()
                            }
                        } finally {
                            if (_didIteratorError24) {
                                throw _iteratorError24
                            }
                        }
                    }
                    if (this.activeComponentToolbar) {
                        this.componentToolBar.append(this.activeComponentToolbar.update());
                        this.activeComponentToolbar.activate()
                    }
                }
            }, {
                key: "getUISetting",
                value: function getUISetting(setting) {
                    var def = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                    var ret = electron.readSetting("ui", {})[setting];
                    return ret !== undefined ? ret : def
                }
            }, {
                key: "setUISetting",
                value: function setUISetting(setting, value) {
                    var uiState = electron.readSetting("ui", {});
                    uiState[setting] = value;
                    electron.saveSetting("ui", uiState)
                }
            }, {
                key: "toggleUISetting",
                value: function toggleUISetting(setting) {
                    this.setUISetting(setting, !this.getUISetting(setting))
                }
            }, {
                key: "saveFavoriteColors",
                value: function saveFavoriteColors() {
                    electron.saveSetting("favoriteColors", this.favoriteColors)
                }
            }, {
                key: "isColorFavorite",
                value: function isColorFavorite(color) {
                    return this.favoriteColors.indexOf(color) !== -1
                }
            }, {
                key: "toggleFavoriteColor",
                value: function toggleFavoriteColor(color) {
                    if (this.isColorFavorite(color)) {
                        this.removeFavoriteColor(color)
                    } else {
                        this.addFavoriteColor(color)
                    }
                }
            }, {
                key: "addFavoriteColor",
                value: function addFavoriteColor(color) {
                    if (this.favoriteColors.indexOf(color) == -1) {
                        this.favoriteColors.push(color);
                        this.saveFavoriteColors()
                    }
                }
            }, {
                key: "removeFavoriteColor",
                value: function removeFavoriteColor(color) {
                    var index = this.favoriteColors.indexOf(color);
                    if (index > -1) {
                        this.favoriteColors.splice(index, 1);
                        this.saveFavoriteColors()
                    }
                }
            }, {
                key: "resourceEdited",
                value: function resourceEdited(resource) {
                    if (resource instanceof SCSSResource) {
                        this.scheduleSASSCompile()
                    }
                }
            }, {
                key: "getSystemGroupExpandState",
                value: function getSystemGroupExpandState(path) {
                    var def = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                    var states = electron.readSetting("groupExpandState", {});
                    if (path in states) {
                        return states[path]
                    }
                    return def
                }
            }, {
                key: "setSystemGroupExpandState",
                value: function setSystemGroupExpandState(path, state) {
                    var states = electron.readSetting("groupExpandState", {});
                    states[path] = state;
                    electron.saveSetting("groupExpandState", states)
                }
            }, {
                key: "scheduleSavePackages",
                value: function scheduleSavePackages(which) {
                    var timeout = arguments.length <= 1 || arguments[1] === undefined ? 1e3 : arguments[1];
                    var that = this;
                    clearTimeout(this._savePackageTimeouts[which]);
                    this._savePackageTimeouts[which] = setTimeout(function() {
                        if (which == "user") {
                            that.saveUserPackages()
                        }
                        if (which == "downloaded") {
                            that.saveDownloadedPackages()
                        }
                    }, timeout)
                }
            }, {
                key: "saveUserPackages",
                value: function saveUserPackages() {
                    electron.writeDataFile("userPackages", JSON.stringify(this.userPackages.serialize()))
                }
            }, {
                key: "saveDownloadedPackages",
                value: function saveDownloadedPackages() {
                    electron.writeDataFile("downloadedPackages", JSON.stringify(this.downloadedPackages.serialize()))
                }
            }, {
                key: "setOpenFileTable",
                value: function setOpenFileTable() {
                    cogworks.setFootableTable(app.user, function(file, fileID){
                        app.openFileDialog.close();
                        $.ajax({
                            url: "../cogworks/main-tool-backend/path/cog-file",
                            type: "POST",
                            cache: true,
                            data: {id: fileID},
                            success: function (path) {
                                app.openCogPath(path);
                            },
                            error: function(data){
                                cogworks.loadingScreen("alert","<p>Something went wrong, your file '" + file + "' failed to open.</p><p>Report error ID: 020 to the admin if issue persist.</p>","show");
                            }
                        });
                    });
                }
            }, {
                key: "showStartScreen",
                value: function showStartScreen() {
                    var recent = this.startScreen.find(".recent");
                    var arr = [],
                        tmp;
                    var recentDesigns = this.getRecentDesigns(4, true);
                    var _iteratorNormalCompletion25 = true;
                    var _didIteratorError25 = false;
                    var _iteratorError25 = undefined;
                    var linkCode = (window.location.href).split('/')[((window.location.href).split('/').length - 1)];
                    try {
                        for (var _iterator25 = recentDesigns[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                            var design = _step25.value;
                            tmp = $('<div><a title="Remove From Recent">&times;</a><div class="name"></div><div class="path"></div></div>');
                            tmp.find(".name").text(design.name);
                            tmp.find(".path").text(design.path);
                            tmp.data("item", design);
                            arr.push(tmp)
                        }
                    } catch (err) {
                        _didIteratorError25 = true;
                        _iteratorError25 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
                                _iterator25["return"]()
                            }
                        } finally {
                            if (_didIteratorError25) {
                                throw _iteratorError25
                            }
                        }
                    }
                    recent.html(arr);

                    $.ajax({
                        url: '../cogworks/main-tool-backend/set-init-value',
                        type: "POST",
						cache: true,                  
                        data: {value: linkCode},
                        success: function(data){
                            if(data != 'null' && data != 'fail'){
                                var obj = JSON.parse(data);
                                app.user = obj.user;
                                app.userPath = obj.userPath;
                                app.fileID = obj.fileID;
                                app.openFile = obj.file;
                                app.openFilePath = obj.filePath;
                                app.setOpenFileTable();
                                console.log(obj);
                                $.post('../cogworks/main-tool-backend/clean-tmp-resources', {userID: app.user}, function() {
                                    app.initWhatNots(null); // initial value
                                    console.log(app.openFilePath);
                                    app.openCogPath(app.openFilePath);
                                })
                                .fail(function() {
                                    cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 048 to the admin if issue persist.</p>","show");
                                })
                                /* setTimeout(function(){
                                    app.initWhatNots(null); // initial value
                                    console.log(app.openFilePath);
                                    app.openCogPath(app.openFilePath);
                                },1000); */
                            } else {
                                cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>File cannot be retrieve.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 018 to the admin if issue persist.</p>","show");
                            }
                        },
                        error: function(data){
                            cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 002 to the admin if issue persist.</p>","show");
                        }
                    });
                    
                    setTimeout(function(){
                        $.getJSON('../assets/cogworks/templates/json/standard-pods.json', function(data){
                            app.standardPods = data;

                            $.ajax({
                                url: "../cogworks/pods/retrieve/main-tool",
                                type: "POST",
                                cache: true,
                                data: {id:app.user},
                                success: function (data) {
                                    app.pods = (data != 'null') ? JSON.parse(JSON.parse(data)) : new Array();
                                    app.initPods(app.standardPods); // organization's component
                                    
                                    $.ajax({
                                        url: "../cogworks/what-nots/retrieve/main-tool",
                                        type: "POST",
                                        cache: true,
                                        data: {id:app.user},
                                        success: function (data) {
                                            app.whatNots = (data != 'null') ? JSON.parse(JSON.parse(data)) : null;
											app.initWhatNots(app.whatNots); // user's personal component
                                        },
                                        error: function(data){
                                            cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 003 to the admin if issue persist.</p>","show");
                                        }
                                    });
                                },
                                error: function(data){
                                    cogworks.loadingScreen("dashboard_reload","<p>Something went wrong.</p><p>Reload the page by clicking the \'Reload\' button<br>or go back to the Dashboard page by clicking the \'Return to Dashboard\' button.</p><p>Report error ID: 002 to the admin if issue persist.</p>","show");
                                }
                            });
                        });
                    },3000);
                }
            }, {
                key: "dashboardPage",
                value: function dashboardPage() {
                    window.location = location.protocol + '//' + location.host + '/dashboard';
                }
            }, {
                key: "hideStartScreen",
                value: function hideStartScreen() {
                    cogworks.loadingScreen("","","fadeOut");
                    this.startScreen.fadeOut("fast");
                }
            }, {
                key: "addToRecent",
                value: function addToRecent(name, path) {
                    if (!name || !path) return;
                    this.removeRecentDesign(path);
                    this.recent.unshift({
                        name: name,
                        path: path
                    });
                    if (this.recent.length > 10) {
                        this.recent.length = 10
                    }
                    electron.saveSetting("recent", this.recent)
                }
            }, {
                key: "getRecentDesigns",
                value: function getRecentDesigns() {
                    var count = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];
                    var checkExists = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                    var recent = [];
                    var _iteratorNormalCompletion26 = true;
                    var _didIteratorError26 = false;
                    var _iteratorError26 = undefined;
                    try {
                        for (var _iterator26 = this.recent[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                            var r = _step26.value;
                            if (recent.length >= count) break;
                            if (checkExists && !electron.pathExists(r.path)) continue;
                            recent.push(r)
                        }
                    } catch (err) {
                        _didIteratorError26 = true;
                        _iteratorError26 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
                                _iterator26["return"]()
                            }
                        } finally {
                            if (_didIteratorError26) {
                                throw _iteratorError26
                            }
                        }
                    }
                    return recent
                }
            }, {
                key: "removeRecentDesign",
                value: function removeRecentDesign(path) {
                    var index = -1;
                    for (var i = 0; i < this.recent.length; i++) {
                        if (this.recent[i].path == path) {
                            index = i
                        }
                    }
                    if (index >= 0) {
                        this.recent.splice(index, 1)
                    }
                    electron.saveSetting("recent", this.recent)
                }
            }, {
                key: "activateContext",
                value: function activateContext(ctx) {
                    if (this.context == ctx) {
                        return
                    }
                    this.context = ctx;
                    if (!ctx.page) {
                        this.context.setActivePage()
                    }
                    var oldFramework = this.framework;
                    this.framework = ctx.framework;
                    this.framework.activateContext(ctx);
                    if (this.framework != oldFramework) {
                        this.trigger("framework-switched")
                    }
                    this.template = null;
                    if (ctx.usesTemplate()) {
                        this.template = this.templateToContext.get(ctx.settings.theme.id)
                    }
                    this.trigger("context-activated");
                }
            }, {
                key: "activatePage",
                value: function activatePage(page) {
                    this.context.setActivePage(page);
                    this.trigger("page-activated")
                }
            }, {
                key: "deactivateContext",
                value: function deactivateContext(ctx) {
                    ctx.framework.deactivateContext(ctx);
                    this.context = null;
                    this.framework = null;
                    this.template = null;
                    this.updateComponentToolbar()
                }
            }, {
                key: "isInlineEditingActive",
                value: function isInlineEditingActive() {
                    return this.context && this.context.page.hasFocusedComponent() && this.context.page.getFocusedComponent().isInlineEditingActivated
                }
            }, {
                key: "freezeUI",
                value: function freezeUI() {
                    $("#freeze-ui").show()
                }
            }, {
                key: "unfreezeUI",
                value: function unfreezeUI() {
                    $("#freeze-ui").hide()
                }
            }, {
                key: "dragStart",
                value: function dragStart(props) {
                    this.draggedComponents = props.components;
                    this.dropHistoryTitle = props.historyTitle || "Move Component";
                    this.dropOperation = props.operation;
                    this.afterDrop = props.afterDrop;
                    this.trigger("drag-start", props.components);
                    this.dragbox = document.getElementById("dragbox");
                    this.ghost = document.getElementById("ghost");
                    this.ghostText = document.getElementById("ghost-text");
                    var ghostX = 0,
                        ghostY = 0,
                        ghostWidth = 0,
                        ghostHeight = 0;
                    if (props.origin) {
                        ghostX = props.origin.left - this.mousePosition.x;
                        ghostY = props.origin.top - this.mousePosition.y;
                        ghostWidth = props.origin.width;
                        ghostHeight = props.origin.height
                    }
                    this.ghost.style.transform = "translate3D(" + ghostX + "px," + ghostY + "px, 0)";
                    this.ghost.style.width = ghostWidth + "px";
                    this.ghost.style.height = ghostHeight + "px";
                    this.ghost.style.opacity = .5;
                    var ghostText = "";
                    if (this.draggedComponents.length === 1) {
                        ghostText = this.draggedComponents[0].getDragLabel()
                    } else {
                        ghostText = this.draggedComponents.length + " components"
                    }
                    this.ghostText.textContent = ghostText;
                    this.ghostText.style.display = "none";
                    this.dragbox.style.display = "block";
                    setTimeout(function() {
                        this.ghost.style.transform = "translate3d(10px, 10px, 0)";
                        this.ghost.style.width = "auto";
                        this.ghost.style.height = "auto";
                        this.ghost.style.opacity = 1;
                        this.ghostText.style.display = "block"
                    }.bind(this), 20);
                    this.isDragging = true;
                    this.dragbox.style.transform = "translate3D(" + this.mousePosition.x + "px," + this.mousePosition.y + "px, 0)"
                }
            }, {
                key: "dragEnd",
                value: function dragEnd() {
                    var that = this;
                    var page = this.context.page;
                    this.dragbox.style.display = "none";
                    if (this.dropCall) {
                        this.dropCall.object.beforeDrop();
                        var insertAction = executeDropCall.bind(this, this.dropCall);
                        this.dropCall = {};
                        var op = this.dropOperation;
                        op["do"](insertAction);
                        page.update();
                        if (this.afterDrop) {
                            this.afterDrop()
                        }
                        app.context.history.add({
                            name: this.dropHistoryTitle,
                            undo: function undo() {
                                op.undo();
                                page.update()
                            },
                            redo: function redo() {
                                op["do"](insertAction);
                                page.update()
                            }
                        })
                    }
                    var draggedComponents = this.draggedComponents;
                    this.isDragging = false;
                    this.draggedComponents = null;
                    delete this.dropHistoryTitle;
                    delete this.dropOperation;
                    delete this.afterDrop;
                    this.trigger("drag-end", draggedComponents)
                }
            }, {
                key: "onMousemove",
                value: function onMousemove(e) {
                    if (!app.hasActiveContext()) return;
                    this.dropCall = null;
                    this.trigger("mousemove", e);
                    if (this.isDragging) {
                        this.dragbox.style.transform = "translate3D(" + this.mousePosition.x + "px," + this.mousePosition.y + "px, 0)"
                    }
                }
            }, {
                key: "onMouseup",
                value: function onMouseup(e) {
                    if (!app.hasActiveContext()) return;
                    this.trigger("mouseup", e);
                    if (this.isDragging) {
                        this.dragEnd()
                    }
                }
            }, {
                key: "onMousedown",
                value: function onMousedown(e) {
                    if (this.isDragging && e.button == 2) {
                        this.dropCall = null;
                        this.dragEnd();
                        return
                    }
                    if (app.shouldCloseContextMenu(e.target)) {
                        this.contextMenu.hide()
                    }
                    if (app.shouldCloseWidgetDrawer(e.target)) {
                        this.widgetDrawer.close();
                        return
                    }
                    if (!app.hasActiveContext()) return;
                    this.trigger("mousedown", e)
                }
            }, {
                key: "onBrowserZoom",
                value: function onBrowserZoom(e) {
                    if (!e.ctrlKey) return;
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (!app.hasActiveContext()) {
                        return
                    }
                    e = e.originalEvent;
                    if (e.deltaY < 0) {
                        app.zoomCanvasIn()
                    } else {
                        app.zoomCanvasOut()
                    }
                }
            }, {
                key: "beforeUnload",
                value: function beforeUnload(e) {
                    if (app.quitConfirmed) {
                        return
                    }
                    var _iteratorNormalCompletion27 = true;
                    var _didIteratorError27 = false;
                    var _iteratorError27 = undefined;
                    try {
                        for (var _iterator27 = this.openedContexts[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                            var ctx = _step27.value;
                            if (ctx.hasUnsavedChanges()) {
                                app.confirmDialog.open({
                                    title: "Close Cogworks?",
                                    message: "You have unsaved changes. If you close the application, you will lose them. Continue?",
                                    okButton: "Close App",
                                    onOK: function onOK() {
                                        app.quitConfirmed = true;
                                        app.quit()
                                    }
                                });
                                return false
                            }
                        }
                    } catch (err) {
                        _didIteratorError27 = true;
                        _iteratorError27 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
                                _iterator27["return"]()
                            }
                        } finally {
                            if (_didIteratorError27) {
                                throw _iteratorError27
                            }
                        }
                    }
                }
            }, {
                key: "quit",
                value: function quit() {
                    electron.quit()
                }
            }, {
                key: "resize",
                value: function resize() {
                    this.trigger("resize")
                }
            }, {
                key: "focus",
                value: function focus() {
                    this.trigger("focus")
                }
            }, {
                key: "blur",
                value: function blur() {
                    this.trigger("blur")
                }
            }, {
                key: "scroll",
                value: function scroll(e) {
                    this.trigger("scroll", e)
                }
            }, {
                key: "setPreviewPort",
                value: function setPreviewPort(port) {
                    if (port < 1024 || port >= 65535) {
                        port = 8e3
                    }
                    electron.saveSetting("previewPort", port)
                }
            }, {
                key: "getPreviewPort",
                value: function getPreviewPort() {
                    var port = electron.readSetting("previewPort", 8e3);
                    if (port < 1024 || port >= 65535) {
                        port = 8e3
                    }
                    return port
                }
            }, {
                key: "togglePreview",
                value: function togglePreview() {
                    app.settings.previewEnabled = !app.settings.previewEnabled;
                    if (app.settings.previewEnabled) {
                        electron.listenOnNetwork(app.getPreviewPort(), function() {
                            app.trigger("preview-status-change")
                        })
                    } else {
                        electron.stopListeningOnNetwork(function() {
                            app.trigger("preview-status-change")
                        })
                    }
                }
            }, {
                key: "saveSettingsForDesign",
                value: function saveSettingsForDesign(context, data) {
                    return electron.saveSetting("design-" + context.id, data)
                }
            }, {
                key: "readSettingsForDesign",
                value: function readSettingsForDesign(context) {
                    return electron.readSetting("design-" + context.id, {})
                }
            }, {
                key: "openURLInBrowser",
                value: function openURLInBrowser(url) {
                    electron.openBrowserWindow(url)
                }
            }, {
                key: "inDevelopment",
                value: function inDevelopment() {
                    return electron.development
                }
            }, {
                key: "enableRequestMonitoring",
                value: function enableRequestMonitoring() {
                    this.requestMonitoring = true
                }
            }, {
                key: "disableRequestMonitoring",
                value: function disableRequestMonitoring() {
                    this.requestMonitoring = false
                }
            }, {
                key: "onNetworkRequest",
                value: function onNetworkRequest(event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers) {
                    if (!this.requestMonitoring) return;
                    if (requestMethod !== "GET") return;
                    var url = new window.URL(newURL);
                    var ignoreOrigins = [window.location.origin, ""];
                    if (/bss-ignore=1/.test(url.search || "")) {
                        return
                    }
                    if (ignoreOrigins.indexOf(url.origin) == -1 && app.context) {
                        setTimeout(function() {
                            app.canvas.schedulePartialUpdate({
                                ui: true
                            }, 100)
                        }, 100);
                        console.info("Refreshing Canvas Due To External HTTP Request", newURL)
                    }
                }
            }, {
                key: "handlePreviewRequest",
                value: function handlePreviewRequest(path, parsed, headers) {
                    if (!this.hasActiveContext()) {
                        return Promise.reject()
                    }
                    return app.context.acquirePreviewContext().handlePreviewRequest(path, parsed, headers)
                }
            }, {
                key: "rebuildMainMenu",
                value: function rebuildMainMenu() {
                    var template = generateMenuTemplateForApp(this);
                    electron.setMenu(template)
                }
            }, {
                key: "loadTutorial",
                value: function loadTutorial(tutorial) {
                    this.openDesignFromURL("../assets/cogworks/tutorials/" + tutorial + ".json")
                }
            }, {
                key: "openDesignFromURL",
                value: function openDesignFromURL(jsonURL, cb) {
                    $.getJSON(jsonURL).done(function(data) {
                        var context = parseCogDesignFormat(data);
                        app.openContext(context, true)
                    })
                }
            }, {
                key: "screenshotReady",
                value: function screenshotReady(dataURL) {
                    this.trigger("screenshot-ready", dataURL)
                }
            }, {
                key: "scheduleSASSCompile",
                value: function scheduleSASSCompile() {
                    var timeout = arguments.length <= 0 || arguments[0] === undefined ? 20 : arguments[0];
                    var that = this;
                    clearTimeout(this._sassCompileTimeout);
                    this._sassCompileTimeout = setTimeout(function() {
                        that.compileSASS()
                    }, timeout)
                }
            }, {
                key: "compileSASS",
                value: function compileSASS() {
                    var context = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                    if (!this.hasActiveContext()) {
                        return
                    }
                    if (!context) {
                        context = app.context
                    }
                    var request = {
                        version: 1,
                        compiler: electron.readSetting("sassPath"),
                        files: {}
                    };
                    var scssFiles = app.context.assets.css.getAllSASSResources();
                    var _iteratorNormalCompletion28 = true;
                    var _didIteratorError28 = false;
                    var _iteratorError28 = undefined;
                    try {
                        for (var _iterator28 = scssFiles[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                            var s = _step28.value;
                            request.files["/" + app.context.assets.css.getRelativePathForItem(s)] = s.value
                        }
                    } catch (err) {
                        _didIteratorError28 = true;
                        _iteratorError28 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
                                _iterator28["return"]()
                            }
                        } finally {
                            if (_didIteratorError28) {
                                throw _iteratorError28
                            }
                        }
                    }
                    request.jobID = this.sassJobID;
                    this.sassJobs[this.sassJobID] = context;
                    this.sassJobID++;
                    electron.compileSASS(request)
                }
            }, {
                key: "sassCompilationResult",
                value: function sassCompilationResult(message) {
                    var context;
                    if (message.jobID) {
                        context = this.sassJobs[message.jobID];
                        delete this.sassJobs[message.jobID]
                    }
                    if (app.sassNotification) {
                        app.sassNotification.hide();
                        app.sassNotification = null
                    }
                    if (message.status == "error") {
                        this.sassJobs.length = 0;
                        var props = {
                            title: "SASS Compilation Error",
                            description: message.long,
                            preformatted: true,
                            type: "error",
                            timeout: 2e4
                        };
                        if (message.sidekickMissing) {
                            props.button = "Learn More";
                            props.action = function(notif) {
                                notif.hide();
                                app.openURLInBrowser("")
                            }
                        }
                        if (message.data) {
                            props.title = "SASS Error - " + message.data.file + " (" + message.data.line + ":" + message.data.column + ")";
                            var file = context.assets.css.getItemByRelativePath(message.data.file);
                            if (file) {
                                var editor = app.editorPanel.getEditorForTarget(file);
                                if (editor && editor.isActive()) {
                                    editor.showError(message.data.line - 1, message.long)
                                }
                                props.button = "See Code";
                                props.action = function(notif) {
                                    notif.hide();
                                    if (!context.isActive()) {
                                        return
                                    }
                                    if (!context.assets.css.contains(file)) {
                                        return
                                    }
                                    app.getPanel("design").openResource(file);
                                    editor = app.editorPanel.getEditorForTarget(file);
                                    editor.setCursor(message.data.line - 1, message.data.column - 1);
                                    setTimeout(function() {
                                        editor.removeAllWidgets();
                                        editor.showError(message.data.line - 1, message.long)
                                    }, 20)
                                }
                            }
                        }
                        app.sassNotification = app.notifications.create(props);
                        app.sassNotification.show();
                        return
                    }
                    if (!context || !this.hasActiveContext()) {
                        return
                    }
                    for (var path in message.result) {
                        var item = context.assets.css.getItemByRelativePath(path);
                        if (item) {
                            item.setCSS(message.result[path])
                        } else {
                            console.error(path + " doesn't exist")
                        }
                    }
                    app.trigger("context-sass-changed", context)
                }
            }, {
                key: "openPreviewURLInBrowser",
                value: function openPreviewURLInBrowser() {
                    var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                    var ip = electron.getIPAddresses()[index];
                    var url = "http://" + ip + ":" + electron.previewPort + "/";
                    electron.openBrowserWindow(url)
                }
            }, {
                key: "on",
                value: function on(str, cb) {
                    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                    var parsed = parseEventName(str);
                    for (var i = 0; i < parsed.length; i++) {
                        if (!(parsed[i].name in this.pubsub)) {
                            this.pubsub[parsed[i].name] = []
                        }
                        this.pubsub[parsed[i].name].push({
                            name: parsed[i].name,
                            namespace: parsed[i].namespace,
                            callback: cb,
                            weight: weight
                        })
                    }
                    for (var i = 0; i < parsed.length; i++) {
                        this.pubsub[parsed[i].name].sort(function(a, b) {
                            return a.weight - b.weight
                        })
                    }
                    return this
                }
            }, {
                key: "off",
                value: function off(str, cb) {
                    var parsed = parseEventName(str);
                    var queue, newQueue;
                    for (var i = 0; i < parsed.length; i++) {
                        for (var k in this.pubsub)
                            if (this.pubsub.hasOwnProperty(k)) {
                                if (parsed[i].name !== undefined && parsed[i].name !== k) {
                                    continue
                                }
                                if (parsed[i].namespace !== undefined) {
                                    newQueue = [];
                                    queue = this.pubsub[k];
                                    for (var j = 0; j < queue.length; j++) {
                                        if (queue[j].namespace === parsed[i].namespace) {
                                            if (cb) {
                                                if (queue[j].callback === cb) {
                                                    continue
                                                }
                                            } else continue
                                        }
                                        newQueue.push(queue[j])
                                    }
                                    this.pubsub[k] = newQueue
                                } else if (cb) {
                                    newQueue = [];
                                    queue = this.pubsub[k];
                                    for (var j = 0; j < queue.length; j++) {
                                        if (queue[j].callback === cb) {
                                            continue
                                        }
                                        newQueue.push(queue[j])
                                    }
                                    this.pubsub[k] = newQueue
                                } else {
                                    delete this.pubsub[k]
                                }
                            }
                    }
                    return this
                }
            }, {
                key: "trigger",
                value: function trigger(str) {
                    var parsed = parseEventName(str);
                    var queue, result, len;
                    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        rest[_key - 1] = arguments[_key]
                    }
                    for (var i = 0; i < parsed.length; i++) {
                        if (!(parsed[i].name in this.pubsub)) {
                            continue
                        }
                        queue = this.pubsub[parsed[i].name];
                        for (var j = 0, len = queue.length; j < len; j++) {
                            if (parsed[i].namespace === undefined || parsed[i].namespace === queue[j].namespace) {
                                result = queue[j].callback.apply(this.pubsub, rest);
                                if (result === false) return this
                            }
                        }
                    }
                    return this
                }
            }], [{
                key: "createContextFromTemplate",
                value: function createContextFromTemplate(template, options) {
                    template.context.framework.setupContextTheme(template.context);
                    var ctx = new DesignContext;
                    var json = template.context.serialize();
                    json.name = options.name || "Untitled";
                    if (options.template.type === "regular") {
                        ctx.unserialize(json);
                        return ctx
                    }
                    json.settings.theme.type = "template";
                    json.pages.children = [];
                    json.assets.images.children = [];
                    ctx.unserialize(json);
                    ctx.regenerateID();
                    ctx.setPlaceholders(options.placeholders);
                    ctx.setDescription(options.placeholders.description);
                    ctx.nextLinkID = template.context.nextLinkID;
                    var pagePaths = options.pagePaths;
                    var navPaths = options.navPaths;
                    if (!pagePaths.length) {
                        ctx.createIndexPage()
                    } else {
                        var result = template.insertInto(ctx, {
                            pagePaths: pagePaths,
                            navPaths: navPaths
                        });
                        result.op["do"]()
                    }
                    return ctx
                }
            }, {
                key: "createContext",
                value: function createContext(options) {
                    var _options$name = options.name;
                    var name = _options$name === undefined ? "Untitled" : _options$name;
                    var path = options.path;
                    var theme = options.theme;
                    var json = options.json;
                    var framework = options.framework;
                    var ctx = new DesignContext(name, path, theme);
                    if (!json) {
                        ctx.initialize(framework)
                    } else {
                        ctx.unserialize(json);
                        ctx.name = name
                    }
                    return ctx
                }
            }]);
            return Application
        }();
        var namespaceRegex = /([^\s\.]+)?(?:\.(\S+))?/;

        function parseEventName(str) {
            var names = String(str).trim().split(/\s+/);
            var events = new Array(names.length);
            var tmp;
            for (var i = 0; i < names.length; i++) {
                tmp = names[i].match(namespaceRegex);
                events[i] = {
                    name: tmp[1],
                    namespace: tmp[2]
                }
            }
            return events
        }
        module.exports = Application
    }, {
        "../bars/TabBar": 7,
        "../bars/ToolBar": 8,
        "../base/Page": 23,
        "../contexts/DesignContext": 372,
        "../contexts/ExportContext": 373,
        "../converters/localStorage/": 421,
        "../dialogs/AboutDialog": 485,
        "../dialogs/AlertDialog": 486,
        "../dialogs/OpenFileDialog": 1278,
		"../dialogs/UploadHTMLFileDialog": 1279,
		"../dialogs/UploadCSSDialog": 1280,
		"../dialogs/UploadJsFileDialog": 1281,
		"../dialogs/UploadImageFileDialog": 1282,
		"../dialogs/UploadAudioFileDialog": 1288,
		"../dialogs/UploadPDFFileDialog": 1292,
		"../dialogs/ElementSettingsDialog": 1283,
        "../dialogs/BackupDialog": 487,
        "../dialogs/CSSLinkDialog": 489,
        "../dialogs/CharacterInputDialog": 490,
        "../dialogs/ChoiceDialog": 491,
        "../dialogs/ComponentDialog": 492,
        "../dialogs/ComponentToPackageDialog": 493,
        "../dialogs/ConfirmDialog": 494,
        "../dialogs/CopyToMultipleDialog": 495,
        "../dialogs/CreateRecipientDialog": 496,
        "../dialogs/CreateWebsiteDialog": 497,
        "../dialogs/Dialog": 498,
        "../dialogs/EditPackageScreenshotDialog": 499,
        "../dialogs/EditProfileDialog": 500,
        "../dialogs/EditWebsiteDialog": 501,
        "../dialogs/FontManagerDialog": 502,
        "../dialogs/IconsDialog": 503,
        "../dialogs/ImagesDialog": 504,
        "../dialogs/JSLinkDialog": 505,
        "../dialogs/LabelDialog": 506,
        "../dialogs/LinkDialog": 507,
        "../dialogs/NewDesignDialog": 510,
        "../dialogs/NewTemplatePageDialog": 511,
        "../dialogs/PagePropertiesDialog": 512,
        "../dialogs/ProfileDialog": 516,
        "../dialogs/PurchaseDialog": 517,
        "../dialogs/RecipientManagerDialog": 518,
        "../dialogs/ResourceOrderDialog": 519,
        "../dialogs/SettingsDialog": 520,
        "../dialogs/ShareComponentDialog": 522,
        "../dialogs/WebsiteManagerDialog": 524,
        "../dialogs/WhatsNewDialog": 525,
        "../dialogs/PreviewDialog": 1284,
        "../helpers/cookies": 552,
        "../helpers/enforceFileExtension": 559,
        "../helpers/executeDropCall": 562,
        "../helpers/generateMenuTemplateForApp": 567,
        "../helpers/hasSelection": 577,
        "../helpers/keyChecker": 586,
        "../helpers/parseEpodComponentFormat": 591,
        "../helpers/parseCogDesignFormat": 592,
        "../helpers/parsePath": 595,
        "../package.json": 1203,
        "../packages/DownloadedPackage": 1204,
        "../packages/Package": 1206,
        "../panels/ColorPicker": 1214,
        "../panels/DesignPanel": 1218,
        "../panels/EditorPanel": 1220,
        "../panels/LookAndFeelOptionsPanel": 1226,
        "../panels/OnlineComponentPanel": 1227,
        "../panels/OptionsPanel": 1232,
        "../panels/OverviewPanel": 1233,
        "../panels/Panel": 1234,
        "../panels/PanelContainer": 1235,
        "../panels/PanelGroup": 1236,
        "../panels/StudioComponentPanel": 1240,
        "../panels/WidgetComponentPanel": 1275,
        "../panels/PodsComponentPanel": 1276,
        "../panels/WhatNotsComponentPanel": 1277,
        "../panels/VerticalPanelContainer": 1244,
        "../panels/WidgetDrawer": 1245,
        "../plugins/BootstrapPlugin": 1246,
        "../resources/SCSSResource": 1257,
        "../tree/PackageTreeGroup": 1264,
        "./Canvas": 16,
        "./ContextMenu": 17,
        "./NotificationCenter": 22,
        "./Point": 24,
        "deep-equal": 971,
        "fast-json-patch": 1024
    }]
});
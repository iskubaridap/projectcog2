<!DOCTYPE html>
<html>
	<head>
		<title>CogWorks</title>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="referrer" content="no-referrer">

		<link rel="stylesheet" href="../assets/cogworks/bootstrap/3/fonts/glyphicons.css">
        
        <!-- We need to include font awesome 4 last, so that it can override the font of the "fa" class.  -->
		<link rel="stylesheet" href="../assets/cogworks/fonts/fontawesome-all.min.css">
		<link rel="stylesheet" href="../assets/cogworks/fonts/font-awesome.min.css">
		
		<link rel="stylesheet" href="../assets/cogworks/fonts/ionicons.min.css">
		<link rel="stylesheet" href="../assets/cogworks/fonts/typicons.min.css">
		<link rel="stylesheet" href="../assets/cogworks/fonts/simple-line-icons.min.css">
		<link rel="stylesheet" href="../assets/cogworks/fonts/line-awesome.min.css">
        
        <link rel="stylesheet" href="../assets/css/plugins/footable/footable.standalone.min.css">
        <link rel="stylesheet" href="../assets/cogworks/css/codemirror.css">
		<link rel="stylesheet" href="../assets/cogworks/css/codemirror-cogworks.css">
		<link rel="stylesheet" href="../assets/cogworks/css/styles.css">
        <link rel="stylesheet" href="../assets/cogworks/css/styles-cogworks.css">
        <link rel="stylesheet" href="../assets/cogworks/css/advance-properties.css">
        
        <link href="../assets/img/favicon.png" rel="icon" type="image/x-icon" />
    </head>
    <body>
        
        <div id="loadingScreen">

            <div class="aTable">
                <div class="aTR">
                    <div class="aTD">
                        <div id="loadingElem">
                            <img src="../assets/img/logo/projectcog/logo.gif" />
                            <br><br>
                            <p>Content Loading...</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <div id="startscreen" class="loading">

            <div class="top row">
                <h1 id="logo">Project Cog</h1>
                <img  class="bottomRight" src="../assets/img/robots/robot-prof.png" alt="Prof" >

                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>

            <!-- <div class="bottom row dont-display">

                <div class="left col">
                    <p>Recent designs</p>
                    <div class="recent"></div>
                </div>

                <div class="right col">

                    <div class="buttons">
                        <div class="button darkgray tutorial">Getting started guide</div>
                        <div class="button darkgray create">Create new design</div>
                        <div class="button darkgray open">Open existing</div>
                    </div>

                </div>

            </div> -->

        </div>

        <div id="menu">
            <a href="../dashboard" title="Dashboard">
                <div class="menu-logo">    
                    <img src="../assets/img/logo/projectcog/logo.svg" width="40" height="40">        
                </div>
            </a>
            <div class="Logotitle">
                Cog Works
            </div>
            <div class="menu-entry new active" title="New">
                New
            </div>

            <div class="menu-entry open active" title="Open">
                Open
            </div>

            <div class="menu-entry settings active" title="Settings">
                Settings
            </div>

            <div class="menu-entry save">
                <i class="livicon" data-name="piggybank" data-color="#BBD2AE"></i> Save
            </div>	

            <div class="menu-entry undo">
                <i class="material-icons">undo</i>
            </div>

            <div class="menu-entry redo">
                <i class="material-icons">redo</i>
            </div>
            <a id="downloadFile" class="dont-display">Download</a>
            <a id="previewFile" class="dont-display">Preview</a>
            <div class="menu-entry export active">
                    <i class="livicon" data-name="rocket" data-color="#E74930"></i> Export
            </div>    

            <div class="menu-entry menu-pre preview active bgMenu">
                <span>Preview</span>
            </div>

        </div>
        <div id="main">

            <div id="left-panel" class="panel-container"></div>

            <div id="center-panel" class="panel-container">
                <div id="toolbars">

                    <div id="tab-bar" class="bar">
                        <div class="tab-scroll">
                            <div class="tab-holder"></div>
                        </div>
                    </div>

                    <div id="component-tool-bar" class="bar"></div>

                </div>

                <section id="canvas">

                    <div class="sizer">

                        <div class="view-wrapper">

                            <div class="ui-offset">

                                <div class="resize-handles">
                                    <div class="handle resize-canvas visible vertical reverse" data-type="w"></div>
                                    <div class="handle resize-canvas visible vertical" data-type="e"></div>
                                    <div class="handle resize-canvas visible horizontal reverse" data-type="n"></div>
                                    <div class="handle resize-canvas visible horizontal" data-type="s"></div>
                                    <div class="handle resize-canvas visible both se" data-type="se"></div>
                                    <div class="handle resize-canvas visible both nw" data-type="nw"></div>
                                    <div class="handle resize-canvas visible both ne" data-type="ne"></div>
                                    <div class="handle resize-canvas visible both sw" data-type="sw"></div>
                                </div>
                                <div class="ui-overlay">
                                    <div class="grid"></div>
                                    <div class="focus-bar-container">
                                        <div class="focus-bar"></div>
                                    </div>
                                    <div class="highlights"></div>
                                    <div class="line-container">
                                        <div class="line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="widget-drawer">
                        <div class="widget-toggler"><span></span></div>
                        <div class="widget-wrapper">
                            <div class="content">
                                <div class="list"></div>
                            </div>
                        </div>
                    </div>

                </section>

                <div id="editor-panel" class="">

                    <div class="handle horizontal" data-type="n" data-min="28" data-toggle-class="expanded" data-toggle-enable="31" data-toggle-disable="80" data-target="#editor-panel"></div>

                    <div class="panel">

                        <div id="left-editor">
                            <div class="tabs editor-tabs">
                                <div class="tab-scroll">
                                    <div class="tab-holder"></div>
                                </div>
                            </div>

                            <div class="editor-content"></div>
                        </div>

                        <div class="handle vertical" data-type="e" data-target="#left-editor"></div>

                        <div id="right-editor">
                            <div class="tabs editor-tabs">
                                <div class="tab-scroll">
                                    <div class="tab-holder"></div>
                                </div>
                            </div>

                            <div class="editor-content"></div>
                        </div>
                    </div>

                </div>

                <div id="tool-bar" class="bar">
                    <span class="button-zoom zoom-in" data-id="zoom-in" title="Zoom In"><i class="material-icons">zoom_in</i></span>
                    <span class="button-zoom zoom-out" data-id="zoom-out" title="Zoom Out"><i class="material-icons">zoom_out</i></span>

                    <span class="rotate-canvas active" data-id="zoom-out" title="Flip Canvas"><i class="material-icons">screen_rotation</i></span>

                    <span class="canvas-settings active" data-id="canvas-settings" title="View Options"><i class="material-icons">layers</i></span>

                    <span class="info-container">
                        <span class="info device-selection"></span>
                    </span>

                    <div class="page-selection"></div>

                    <div class="devices"></div>

                </div>

            </div>

            <div id="right-panel" class="panel-container"></div>

        </div>


        <div id="dialogs">

            <div id="open-file-dialog" class="dialog">

                <h5>Open File</h5>

                <div class="content">
                    <div id="open-file-message"><p></p></div>
                    <div id="open-file-reset-btn-wrap">
                        <div class="button refresh primary">Refresh</div>
                    </div>
                    <div id="open-file-loading-indicator-wrap">
                        <div id="open-file-loading-indicator">
                            <div class="element-center">
                                <p>Loading files <img class="loading-icon-sm" src="../assets/img/icon/loading.gif"></p>
                            </div>
                        </div>
                    </div>
                    <div id="open-file-table-wrap">
                    <table id="open-file-table" class="table"></table>
                        <!-- <input type="text" class="form-control input-sm m-b-xs" id="open-file-filter" placeholder="Search in table">
                        <table id="open-file-table" class="footable table table-stripped" data-page-size="10" data-filter=#open-file-filter>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Project</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody id="open-file-table-body"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3">
                                        <ul class="pagination pull-right"></ul>
                                    </td>
                                </tr>
                            </tfoot>
                        </table> -->
                    </div>
                </div>

                <div class="buttons">
                    <div class="button cancel primary">Cancel</div>
                </div>
            </div>
            
            <div id="upload-html-file-dialog" class="dialog uploadDiaglog">
                <h5>Import HTML</h5>

                <div class="content">
                    <form action="" method="post" id="add-html-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadHTMLFile" id="uploadHTMLFile" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadHTML" type="button" value="Read File" rel="">
                        <br>
                        <progress id="htmlProgressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="htmlStatus"></div>
                    </form>
                </div>

                <div class="buttons">
                    <div class="button htmlCancel">Cancel</div>
                    <div class="button htmlReset">Reset</div>
                    <div class="button htmlUploadBtn primary">Upload</div>
                </div>
            </div>
            
            <div id="upload-css-dialog" class="dialog uploadDiaglog">
                <h5>Import CSS</h5>

                <div class="content">
                    <form action="" method="post" id="add-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadCSS" id="uploadCSS" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadCSS" type="button" value="Read File" rel="">
                        <br>
                        <progress id="progressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="status"></div>
                    </form>
                </div>

                <div class="buttons">
                    <div class="button cancel">Cancel</div>
                    <div class="button reset">Reset</div>
                    <div class="button uploadBtn primary">Upload</div>
                </div>
            </div>
            
            <div id="upload-js-file-dialog" class="dialog uploadDiaglog">

                <h5>Import Javascript</h5>

                <div class="content">
                    <form action="" method="post" id="add-js-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadJsFile" id="uploadJsFile" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadJs" type="button" value="Read File" rel="">
                        <br>
                        <progress id="jsProgressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="jsStatus"></div>
                    </form>
                </div>

                <div class="buttons">
                    <div class="button jsCancel">Cancel</div>
                    <div class="button jsReset">Reset</div>
                    <div class="button jsUploadBtn primary">Upload</div>
                </div>
            </div>
            
            <div id="upload-audio-file-dialog" class="dialog uploadDiaglog">
                <h5>Import Audio</h5>

                <div class="content">
                    <form action="" method="post" id="add-audio-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadAudioFile" id="uploadAudioFile" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadAudio" type="button" value="Read File" rel="">
                        <br>
                        <progress id="audioProgressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="audioStatus"></div>
                    </form>
                </div>

                <div class="buttons">
                    <div class="button audioCancel">Cancel</div>
                    <div class="button audioReset">Reset</div>
                    <div class="button audioUploadBtn primary">Upload</div>
                </div>
            </div>
            
            <div id="upload-pdf-file-dialog" class="dialog uploadDiaglog">
                <h5>Import PDF</h5>

                <div class="content">
                    <form action="" method="post" id="add-pdf-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadPDFFile" id="uploadPDFFile" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadPDF" type="button" value="Read File" rel="">
                        <br>
                        <progress id="pdfProgressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="pdfStatus"></div>
                    </form>
                </div>

                <div class="buttons">
                    <div class="button pdfCancel">Cancel</div>
                    <div class="button pdfReset">Reset</div>
                    <div class="button pdfUploadBtn primary">Upload</div>
                </div>
            </div>
            
            <div id="element-settings-dialog" class="dialog uploadDiaglog">
                <h5>Settings</h5>

                <div class="content">
                    <form action="" method="" id="element-settings-dialog-form" enctype="multipart/form-data"></form>
                </div>

                <div class="buttons">
                    <div class="button element-settings-cancel">Cancel</div>
                    <div class="button element-settings-update">Update</div>
                </div>
            </div>
            
            <div id="upload-image-file-dialog" class="dialog uploadDiaglog">

                <h5>Import Image</h5>

                <div class="content">
                    <form action="" method="post" id="add-image-file-form" enctype="multipart/form-data">
                        <input type="file" name="uploadImageFile" id="uploadImageFile" multiple>
                        <br>
                        <br>
                        <input class="invisible" id="startreadImage" type="button" value="Read File" rel="">
                        <br>
                        <progress id="imageProgressBar" value="0" max="100" style="width: 100%;"></progress>
                        <div id="imageStatus"></div>
                    </form>
                </div>
                <div class="buttons">
                    <div class="button imageCancel">Cancel</div>
                    <div class="button imageReset">Reset</div>
                    <div class="button imageUploadBtn primary">Upload</div>
                </div>
            </div>

            <div id="icons-dialog" class="dialog">

                <h5>Choose an Icon</h5>

                <select></select>

                <input type="search" placeholder="Search for icons" />

                <div class="icon-holder"></div>

                <div class="buttons">
                    <div class="button primary ok disable">OK</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="edit-screenshot-dialog" class="dialog">

                <h5>Edit Component Screenshot</h5>

                <div class="crop-area"></div>

                <div class="control-buttons">
                    <div class="button zoom-in">+</div>
                    <div class="button zoom-out">−</div>
                </div>

                <div class="buttons">
                    <div class="button primary ok">Crop</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="images-dialog" class="dialog">

                <h5>Choose an Image</h5>

                <input type="search" placeholder="Find image" />

                <div class="image-holder"></div>

                <div class="buttons">
                    <div class="button primary ok disable">OK</div>
                    <div class="button cancel">Cancel</div>
                    <div class="button aside import">Import Image</div>
                </div>
            </div>

            <div id="link-dialog" class="dialog">

                <h5>Link Properties</h5>

                <div class="content">

                    <label class="split-field">
                        <span>HREF</span>
                        <div class="split-button">
                            <input type="text" placeholder="URL of the link" />
                            <div class="button input-button choose-link-source">▼</div>
                        </div>
                    </label>

                </div>

                <!-- Todo: in the future show a list of recently used links -->

                <div class="buttons">
                    <div class="button primary disabled ok">OK</div>
                    <div class="button cancel">Cancel</div>
                    <div class="button aside remove">Remove Link</div>
                </div>
            </div>

            <div id="label-dialog" class="dialog">

                <h5>Change Component Label</h5>

                <div class="content">

                    <input type="text" required maxlength="50" />
                    <p>Labels are shown next to the component in the Overview panel.</p>

                </div>

                <div class="buttons">
                    <div class="button primary import">Set</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="create-recipient-dialog" class="dialog">

                <h5 class="dialog-title">Create New Recipient</h5>

                <div class="content">

                    <div class="loading">
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                    </div>

                    <div class="forms">

                        <div class="mode create">
                            <label class="field">
                                <input type="email" name="email" placeholder="Enter an email" required maxlength="50" />
                            </label>
                            <p>Enter a valid email address where you wish to receive form submissions, and we'll send you a verification code.</p>
                        </div>

                        <div class="mode verify">
                            <label class="field">
                                <input type="text" name="code" placeholder="Verification code" required pattern="[0-9]{6}" title="Please enter a 6-digit verification code." />
                            </label>
                            <p>Didn't get a verfication email? <a href="#" class="send-verification">Send verification.</a></p>
                        </div>
                    </div>
                </div>

                <div class="buttons">
                    <div class="button primary">Create</div>
                    <div class="button cancel">Cancel</div>
                </div>

            </div>

            <div id="recipient-manager-dialog" class="dialog">
                <h5>Manage Recipients</h5>

                <div class="content">

                    <div class="loading">
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                    </div>

                    <div class="has-recipients">
                        <div class="listing"></div>
                        <div class="note"></div>
                    </div>

                    <div class="message no-recipients">You don't have any recipients yet. Click the "Add Recipient"<br> button below to create your first one.</div>

                    <div class="message error">Recipient mangement is not available right now.</div>

                </div>

                <div class="buttons">
                    <div class="button primary cancel">Close</div>
                    <div class="button create aside add-recipient">Add Recipient</div>
                </div>
            </div>

            <div id="css-link-dialog" class="link-import-dialog dialog">

                <h5>Link External CSS</h5>

                <div class="content">

                    <input type="url" placeholder="e.g. https://cdnjs.cloudflare.com/ajax/libs/animate.css" required />

                    <p>Link a stylesheet from an external URL. It won't be stored in your design, <br>only a &lt;link&gt; pointing to it will be added.</p>

                </div>

                <div class="buttons">
                    <div class="button primary import disable">Link</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="js-link-dialog" class="link-import-dialog dialog">

                <h5>Link External JavaScript</h5>

                <div class="content">

                    <input type="url" placeholder="e.g. https://cdnjs.cloudflare.com/ajax/libs/backbone.js" required />

                    <p>Link a js file from an external URL. It won't be stored in your design, <br>only a &lt;script&gt; pointing to it will be added.</p>

                </div>

                <div class="buttons">
                    <div class="button primary import disable">Link</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="theme-manager-dialog" class="dialog">

                <h5>Custom Bootstrap Themes</h5>

                <div class="content">
                    <div class="listing"></div>
                    <div class="message no-themes">You don't have any themes yet. Import a custom Bootstrap theme from the button below. Only CSS files are supported.</div>
                </div>

                <div class="buttons">
                    <div class="button primary cancel">Close</div>
                    <div class="button import">Import Theme</div>
                </div>
            </div>

            <div id="confirm-dialog" class="dialog">

                <h5></h5>

                <div class="content">
                    <p class="message"></p>
                </div>

                <div class="buttons">
                    <div class="button primary ok">OK</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="timer-dialog" class="dialog">

                <h5></h5>

                <div class="content">
                    <p class="message"></p>
                    <b><span class="timer"></span></b>
                </div>

                <div class="buttons">
                    <div class="button primary ok">OK</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="choice-dialog" class="dialog">

                <h5></h5>

                <div class="content">
                    <p class="message"></p>
                </div>

                <div class="buttons">
                    <label class="checkbox remember">
                    <b class="pretty-checkbox light"><input type="checkbox" /><i></i></b> <span>Remember</span>
                    </label>
                </div>
            </div>

            <div id="alert-dialog" class="dialog">

                <h5>Error</h5>

                <div class="message"></div>

                <div class="buttons">
                    <div class="button ok primary">OK</div>
                    <div class="button aside"></div>
                </div>
            </div>

            <div id="about-dialog" class="dialog">

                <img src="../assets/img/logo/projectcog/logo.svg" />

                <h5>Bootstrap Studio <span class="version"></span><i class="edition">Standard Edition</i></h5>

                <div class="message">
                    <p>Computer name: <span class="computer-name"></span></p>
                    <p class="updates-until"></p>
                </div>

                <div class="buttons">
                    <div class="button ok primary">Close</div>
                </div>
            </div>

            <div id="whats-new-dialog" class="dialog">

                <div class="slides">
                    <div class="slide-scroll"></div>
                </div>

                <div class="arrow previous"><span class="glyphicon glyphicon-chevron-left"></span></div>
                <div class="arrow next"><span class="glyphicon glyphicon-chevron-right"></span></div>

                <div class="buttons">
                    <div class="button ok primary">Close</div>
                    <div class="button all-releases aside">See All Releases</div>
                </div>
            </div>

            <div id="purchase-dialog" class="dialog">

                <img src="../assets/img/logo/projectcog/logo.svg" />

                <h5><span class="days-remaining"></span> Days Left</h5>

                <div class="message">
                    <p>We hope that you like Bootstrap Studio so far! This is just a friendly reminder that your free trial will end soon. Upgrade now and enjoy a fantastic discount!</p>
                </div>

                <div class="buttons">
                    <div class="button primary purchase">Purchase License</div>
                    <div class="button cancel">Cancel</div>
                    <div class="button aside feedback">Send Feedback</div>
                </div>
            </div>

            <div id="settings-dialog" class="dialog">

                <h5 class="separate">Settings</h5>

                <div class="content">

                    <div class="accordion">
                        <div class="accordion-item design-settings" data-tab="design-settings">
                            <div class="header active">
                                Design
                            </div>
                            <div class="list design-settings">
                                <div class="item choose-theme" data-item="choose-theme">
                                    <i class="material-icons">settings_applications</i>Bootstrap
                                </div>
                                <div class="item meta-tags" data-item="meta-tags">
                                    <i class="material-icons">code</i>Meta Tags
                                </div>
                                <div class="item head-content" data-item="head-content">
                                    <i class="material-icons">short_text</i>Head Content
                                </div>
                                <div class="item export-options" data-item="lms-options">
                                    <i class="material-icons">flash_on</i>Export together with LMS libraries
                                </div>
                                <!--<div class="item export-options" data-item="export-options">
                                    <i class="material-icons">flash_on</i>Export
                                </div>
                                <div class="item publish-options" data-item="publish-options">
                                    <i class="material-icons">cloud_upload</i>Publish
                                </div>-->
                            </div>
                        </div>
                    </div>

                    <div class="target preview">

                        <label class="field preview-field">
                            <span>Preview Port</span>
                            <input type="number" class="preview-port" placeholder="8000" min="1024" max="65534" maxlength="5" />

                            <strong class="message error port-not-valid">Port must be between 1024 and 65534.</strong>
                        </label>

                        <label class="checkbox">
                            <u class="pretty-checkbox light"><input type="checkbox" class="preview-checkbox" /><i></i></u>
                            <span>Preview is <b>Disabled</b></span>
                        </label>

                        <p class="description">Activating the preview will give you a URL which everyone on your local network can open on their smartphone or web browser and see the designs you are working on in real time.</p>

                        <div class="preview-addresses">

                            <label class="">
                                <span>Preview URLs</span>
                            </label>

                            <div class="ip-address-list">
                                <label class="ip split-field">
                                    <div class="split-button">
                                        <input type="text" value="http://127.0.0.1:12345/" readonly />
                                        <a class="button input-button browser-button" data-index="1">Open in Browser</a>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="target theme-manager">

                        <div class="content">
                            <div class="listing"></div>
                            <div class="message no-themes">You don't have any themes yet. Import a custom Bootstrap theme from the button below. Only CSS files are supported.</div>
                        </div>

                        <div class="buttons">
                            <div class="button aside import">Import Theme</div>
                        </div>
                    </div>

                    <div class="target sass-options">
                        <label class="field">
                            <span>Path to bstudio-sass</span>
                            <input type="text" class="sass-path" />
                        </label>
                        <p>To compile SASS code, install the <a href="https://github.com/bootstrapstudio/bstudio-sass" class="link">bstudio-sass</a> utility and run it in your terminal. Paste the installation path that it reports above. <a href="https://bootstrapstudio.io/tutorials/writing-sass" class="link">Learn more.</a></p>
                    </div>

                    <div class="target backup">

                        <label class="field split-field">
                            <span>Backup Destination</span>
                            <div class="split-button">
                                <input type="text" class="backup-destination" />
                                <div class="button backup-destination-browse input-button">Browse</div>
                            </div>
                        </label>

                        <label class="checkbox backup-enabled">
                            <u class="pretty-checkbox light"><input type="checkbox"/><i></i></u>
                            <span>Backups are <b>Disabled</b></span>
                        </label>

                        <label class="field field-inline">
                            <span>Frequency<span class="tip" title="How often to back up designs with unsaved changes.">?</span></span>
                            <select class="backup-frequency"></select>
                        </label>

                        <label class="field field-inline">
                            <span>Backups Per Design<span class="tip" title="Number of backups to keep per design.">?</span></span>
                            <input type="number" min="1" max="100" class="backup-count" />
                        </label>

                        <label class="field">
                            <span>Delete After<span class="tip" title="Automatically delete backups older than the specified amount of time.">?</span></span>
                            <select class="backup-expiration"></select>
                        </label>

                        <div class="button aside show-backups">See Backups</div>

                    </div>

                    <div class="target choose-theme">

                        <label class="field pseudo-field">
                            <span>Bootstrap Version</span>
                            <div class="pseudo-input bootstrap-version" title="The Bootstrap version can't be changed"><span></span> <i class="material-icons picker">lock_outline</i></div>
                            <div class="button convert-to-bs4">Convert to BS4</div>
                        </label>
                        <label class="field split-field">
                            <span>Theme</span>
                            <div class="split-button">
                                <select class="design-theme"></select>
                                <div class="pseudo-input theme">
                                    <span></span>
                                    <i class="material-icons picker">lock_outline</i>
                                </div>
                                <div class="button input-button manage-themes">Manage Themes</div>
                            </div>
                        </label>
                        <label id="choose-theme-jquery" class="field">
                            <span>jQuery Version</span>
                            <select class="jquery-version"></select>
                        </label>
                    </div>

                    <div class="target meta-tags">

                        <div class="meta-tag-list"></div>

                        <div class="button aside add-meta">Add Meta</div>
                    </div>

                    <div class="target head-content">

                        <label>
                            <span>HTML/Code</span>
                            <textarea class="head-content-area"></textarea>
                        </label>
                        <p>This code will be included in the &lt;head&gt; section of all pages of this design when exporting. <br>You can override it in each page's properties dialog.</p>
                    </div>
                    
                     <div class="target lms-options">

                        <div class="field field-flex">

                            <div>
                                <p>Export the file together with LMS libraries</p>
                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="lms" /><i></i></b> <span>LMS Libraries</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="target export-options">

                        <label class="field split-field">
                            <span>Export Destination</span>
                            <div class="split-button">
                                <input type="text" class="export-path" />
                                <div class="button export-path-browse input-button">Browse</div>
                            </div>
                        </label>

                        <div class="field field-flex">

                            <div>
                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="minify" /><i></i></b> <span>Minify JavaScript and CSS</span>
                                </label>

                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="cdn" /><i></i></b>
                                    <span>Use a CDN for libraries</span><span class="tip" title="Use a CDN for jQuery, Bootstrap and icon fonts.">?</span>
                                </label>

                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="cleanup" /><i></i></b>
                                    <span>Skip unused images</span><span class="tip" title="Only export images that are used in the design.">?</span>
                                </label>

                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="export-labels" /><i></i></b>
                                    <span>Export Labels</span><span class="tip" title="Export component labels as Start/End comments.">?</span>
                                </label>
                            </div>

                            <div>
                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="paths" /><i></i></b>
                                    <span>Use absolute paths</span><span class="tip" title="Prefix all page, CSS, JS and image URLs with a forward slash (/).">?</span>
                                </label>

                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="cache" /><i></i></b>
                                    <span>Version assets</span><span class="tip" title="Append content hashes to all asset URLs for cache busting.">?</span>
                                </label>

                                <label class="checkbox">
                                    <b class="pretty-checkbox light"><input type="checkbox" class="export-scss" /><i></i></b>
                                    <span>Export SASS</span><span class="tip" title="If you use SASS, this option will export your SASS files in addition to the compiled CSS.">?</span>
                                </label>
                            </div>
                        </div>

                        <div class="advanced pull-up-section">
                            <div class="heading">Advanced</div>

                            <div class="area">
                                <label class="field split-field">
                                    <span>Export Script<span class="tip" title="This script is executed automatically after the design is exported. The export destination is passed as arg 1.">?</span></span>
                                    <div class="split-button">
                                        <input type="text" class="export-script" />
                                        <div class="button export-script-browse input-button">Browse</div>
                                    </div>
                                </label>

                            </div>
                        </div>
                    </div>

                    <div class="target publish-options">

                        <div class="loading">
                            <div class="spinner">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                        </div>

                        <div class="error">
                            <p class="message">Publishing options are unavailable.</p>
                        </div>

                        <div class="no-websites">
                            <p class="message">Publishing your design will upload it as a assets website to Bootstrap Studio<br> servers for free. To create your first website, press the button below.</p>
                            <div class="button manage-websites">Manage Websites</div>
                        </div>

                        <div class="has-websites">

                            <label class="field split-field">
                                <span>Publish to Website</span>
                                <div class="split-button">
                                    <select class="publish-website"></select> <div class="button input-button manage-websites">Manage Websites</div>
                                </div>
                            </label>

                            <p class="message">When you hit the "Publish" button, your design will be uploaded to the URL<br> you choose above, and will be visible by anyone.</p>

                        </div>


                    </div>

                </div>


                <div class="buttons">
                    <div class="button primary ok">Save</div>
                    <div class="button cancel">Cancel</div>
                    <div class="button aside export" data-show-when="export-options">Export</div>
                    <div class="button aside publish" data-show-when="publish-options">Publish</div>
                </div>
            </div>

            <div id="backup-list-dialog" class="dialog">

                <h5>Backups</h5>

                <div class="content">

                    <label class="field backup-search">
                        <input type="search" />
                        <i class="material-icons search-icon">search</i>
                    </label>

                    <div class="backup-list"></div>
                    <div class="message empty-message">
                        Backups are automatic snapshots of your designs.<br>You don't have any backups yet.
                    </div>
                </div>

                <div class="buttons">
                    <div class="button primary close">Close</div>
                    <div class="button create aside show-settings">Backup Settings</div>
                </div>

            </div>

            <div id="website-manager-dialog" class="dialog">

                <h5>Manage Websites</h5>

                <div class="content">

                    <div class="loading">
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                    </div>

                    <div class="has-websites">
                        <div class="listing"></div>
                        <div class="note"></div>
                    </div>

                    <div class="message no-websites">You don't have any websites yet. Click the "Add Website"<br> button below to create your first one.</div>

                    <div class="message no-websites-expired">You don't have any websites yet. Please renew your<br> license key to create your first one.</div>

                    <div class="message error">Website mangement is not available right now.</div>

                </div>

                <div class="buttons">
                    <div class="button primary cancel">Close</div>
                    <div class="button create aside add-website">Add Website</div>
                </div>
            </div>

            <div id="create-website-dialog" class="dialog">

                <h5>Create Website</h5>

                <div class="content">

                    <label class="field">
                        <span>Type</span>
                        <select class="domain-type">
                            <option value="bss.design">Free bss.design Subdomain</option>
                            <option value="custom">Custom Domain</option>
                        </select>
                    </label>

                    <label class="field subdomain-choice">

                        <span>Enter Subdomain</span>

                        <div class="wrapper">
                            <input type="text" class="subdomain" maxlength="60" />
                            <div class="before">https://</div>
                            <div class="after">.bss.design</div>
                            <div class="error-bubble subdomain-error"></div>
                        </div>

                    </label>

                    <label class="split-field domain-choice enter-domain">

                        <span>Enter Domain</span>

                        <div class="split-button">
                            <input type="text" placeholder="example.com" class="domain" maxlength="100" />
                            <div class="button input-button check">Check</div>
                            <div class="error-bubble domain-error"></div>
                        </div>

                    </label>

                    <div class="domain-instructions">
                        <p>To create your new site, please complete these steps</p>

                        <ol>
                            <li>Transfer your domain name to the free <a class="link" href="https://www.cloudflare.com/">CloudFlare</a> service.</li>
                            <li>After the transfer is complete, create this DNS record (<a href="https://bootstrapstudio.io/tutorials/custom-domains" class="link">help</a>).
                                <div class="code">
                                    <strong>Type:</strong> CNAME<br>
                                    <strong>Name:</strong> <span class="original-domain">domain.com</span><br>
                                    <strong>Domain Name:</strong> sites.bootstrapstudio.io
                                <div></li>
                            <li>Once you're ready, click the Verify Domain button below.</li>
                        </ol>

                        <div class="button verify">Verify Domain</div>
                    </div>

                    <label class="field subdomain-choice">
                        <span>Delete After</span>
                        <select class="delete-after">
                            <option value="1">1 Day</option>
                            <option value="7">1 Week</option>
                            <option value="31">1 Month</option>
                            <option value="0">Never</option>
                        </select>
                    </label>

                    <label class="field security">
                        <span>Security</span>

                        <label class="checkbox passkey-enable">
                            <b class="pretty-checkbox light"><input type="checkbox" /><i></i></b> <span>Require Passkey <span class="tip" title="You can protect your website by requiring visitors to enter a passkey to view it. You can change this later.">?</span></span>
                        </label>

                        <input type="password" placeholder="Enter Passkey" class="passkey" maxlength="20" />
                        <div class="toggle-pass-type" title="Toggle Passkey Visibility"><i class="material-icons">remove_red_eye</i></div>
                        <div class="error-bubble passkey-error">Should be longer than 3 chars. May contain only a-z, 0-9 - and _.</div>

                    </label>

                    <p class="domain-choice domain-explanation">With Custom Domains you can point a domain name that you own to our free hosting service. <a href="https://bootstrapstudio.io/tutorials/custom-domains" class="link">Learn more.</a></p>

                </div>

                <div class="buttons">
                    <div class="button primary create">Create</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="edit-website-dialog" class="dialog">

                <h5>Edit Website</h5>

                <div class="content">

                    <label class="field pseudo-field">
                        <span>Domain</span>
                        <div class="pseudo-input domain" title="Domains can't be changed. You can delete this site and create a new one."><span>domain.bss.design</span><i class="material-icons picker">lock_outline</i></div>
                    </label>

                    <label class="field security">
                        <span>Security</span>

                        <label class="checkbox passkey-enable">
                            <b class="pretty-checkbox light"><input type="checkbox" /><i></i></b> <span>Require Passkey <span class="tip" title="You can protect your website by requiring visitors to enter a passkey to view it. You can change this later.">?</span></span>
                        </label>

                        <input type="password" placeholder="Enter Passkey" class="passkey" maxlength="20" />
                        <div class="toggle-pass-type" title="Toggle Passkey Visibility"><i class="material-icons">remove_red_eye</i></div>
                        <div class="error-bubble passkey-error">Should be longer than 3 chars. May contain only a-z, 0-9 - and _.</div>

                    </label>

                </div>

                <div class="buttons">
                    <div class="button primary save">Save</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="character-input-dialog" class="dialog">

                <h5>Character Input</h5>

                <div class="characters">
                    <span>©</span>
                    <span>®</span>
                    <span>™</span>
                    <span>·</span>
                    <span>×</span>
                    <span>±</span>
                    <span>€</span>
                    <span>£</span>
                    <span>¥</span>
                    <span>¢</span>
                    <span>§</span>
                    <span>№</span>
                    <span>π</span>
                    <span>℃</span>
                    <span>℉</span>
                    <span>✓</span>
                    <span>✗</span>
                    <span>∞</span>
                    <span>«</span>
                    <span>»</span>
                    <span>↑</span>
                    <span>↓</span>
                    <span>←</span>
                    <span>→</span>
                    <span>↔</span>
                    <span>↺</span>
                    <span>↻</span>
                    <span>↯</span>
                    <span>⇄</span>
                    <span>▲</span>
                    <span>▼</span>
                    <span>◀</span>
                    <span>▶</span>
                    <span>♿</span>
                    <span>♻</span>
                    <span>♫</span>
                    <span>⚓</span>
                    <span>⚖</span>
                    <span>✈</span>
                    <span>❤</span>
                </div>

                <div class="text-input">
                    <textarea placeholder="Type here.."></textarea>
                    <div class="buttons">
                        <div class="button primary insert">Insert</div>
                        <div class="button clear">Clear</div>
                    </div>
                </div>

                <div class="buttons">
                    <div class="button cancel">Close</div>
                </div>
            </div>

            <div id="new-design-dialog" class="dialog">

                <h5 class="separate">New Design</h5>

                <div class="content">

                    <div class="content-left">

                        <label>
                            <span>Name</span>
                            <input type="text" class="design-name" placeholder="Name" />
                        </label>

                        <div class="framework-selector">
                            <select class="framework"></select>
                        </div>
                    </div>

                    <div class="content-right">
                        <div class="templates thumbnails">
                            <span class="title">Template</span>
                            <ul>
                            </ul>
                        </div>

                        <div id="customize-design" class="additional-options">

                            <div class="pages thumbnails">

                                <div class="placeholders"></div>

                                <label>
                                    <span class="title">Pages
                                        <span class="count"></span>
                                        <span class="tip" title="Choose which template pages to include in your new site. You can always add these later, from the 'New Template Page' menu.">?</span>
                                    </span>
                                </label>
                                <ul>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="buttons">
                    <div class="button primary ok">Create</div>
                    <div class="button cancel">Cancel</div>
                    <div class="button aside customize">Customize</div>
                    <div class="button aside back">Back</div>
                </div>
            </div>
            
            <div id="preview-dialog" class="dialog">

				<h5>Preview</h5>

				<div class="content">
					<p>The content of your file is now available for preview.</p>
				</div>

				<div class="buttons">
					<div class="button primary ok">Preview</div>
				</div>
			</div>

            <div id="new-template-page-dialog" class="dialog">
                <h5>New Template Page</h5>

                <div class="content">

                    <div class="pages thumbnails">
                        <ul>
                        </ul>
                    </div>

                </div>

                <div class="buttons">
                    <div class="button primary ok">Create</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="component-dialog" class="dialog">

                <div class="content">

                    <div class="header">
                        <div class="btn">Install</div>
                        <div class="vote">
                            <div class="arrows">
                                <div class="arrow up"></div>
                                <div class="arrow down"></div>
                            </div>
                            <div class="count"></div>
                        </div>
                        <div class="component-name"></div>
                        <div class="author">
                            <div class="name"></div>
                            <div class="downloads"></div>
                        </div>
                    </div>

                    <div class="scroll-container">
                        <div class="preview"></div>

                        <div class="description"></div>

                        <div class="stats">
                            <span class="publish-date"></span><span class="framework-version"></span><span class="installation-count">
                        </div>

                        <div class="comments">

                            <div class="comment-list"></div>

                            <div class="comment-form">
                                <div class="photo"></div>
                                <div class="text-holder">
                                    <textarea placeholder="Write your comment here"></textarea>
                                    <div class="button primary submit disable">Submit</div>
                                    <div class="error-message"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="loading">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>

                <div class="error">
                    <div class="message">Sorry, can't display this component right now.</div>
                </div>

                <div class="buttons">
                    <div class="button cancel">Close</div>
                </div>
            </div>

            <div id="profile-dialog" class="dialog">

                <div class="content">

                    <div class="header">
                        <div class="author">
                            <div class="photo"></div>
                            <div class="mid">
                                <div class="name"></div>
                                <div class="secondary"></div>
                            </div>
                        </div>
                        <div class="downloads"></div>
                    </div>

                    <div class="scroll-container">
                        <div class="components-list"></div>
                        <div class="no-components-message"></div>
                    </div>

                </div>

                <div class="loading">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>

                <div class="error">
                    <div class="message">Sorry, can't display this profile right now.</div>
                </div>

                <div class="buttons">
                    <div class="button cancel">Close</div>
                </div>
            </div>

            <div id="component-to-package-dialog" class="dialog">

                <h5>Create New Component</h5>

                <div class="content">

                    <input type="text" placeholder="Component Name" id="package-name-input" />

                    <div class="left-col">

                        <p>Images</p>
                        <div class="image-list list"></div>
                        <div class="message no-images-message">No images available.</div>

                        <p>Stylesheets</p>
                        <div class="stylesheet-list list"></div>
                        <div class="message no-stylesheet-message">No stylesheets available.</div>

                        <p>JavaScript</p>
                        <div class="js-list list"></div>
                        <div class="message no-js-message">No JavaScript available.</div>

                        <p>Fonts</p>
                        <div class="font-list list"></div>
                        <div class="message no-fonts-message">No fonts available.</div>

                    </div>

                    <div class="right-col">

                        <p>CSS</p>
                        <div class="css-list"></div>
                        <div class="message no-css-message">No custom CSS used.</div>

                    </div>

                </div>

                <div class="buttons">
                    <div class="button ok primary disable">Create</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="font-manager-dialog" class="dialog">

                <h5>Google Fonts</h5>

                <div class="content">

                    <input type="search" placeholder="Find font" />

                    <select class="sorting">
                        <option value="name">Sort by Name</option>
                        <option value="popularity">Sort by Popularity</option>
                    </select>

                    <div class="secondary">
                        <div class="number"></div>
                        <div class="filter">
                            <span class="category-filter">All Styles</span>
                            <span class="set-filter">All Sets</span>
                        </div>
                    </div>

                    <div class="google-font-list"></div>

                </div>

                <div class="buttons">
                    <div class="button ok primary disable">Save</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="resource-order-dialog" class="dialog">

                <h5>Page Include Order</h5>
                <p>Rearrange these files in the order you wish them to get included in the page.</p>

                <div class="content">
                    <div class="fixed-container"></div>
                    <div class="reorder-container"></div>
                </div>

                <div class="buttons">
                    <div class="button save primary">Save</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div id="copy-multiple-dialog" class="dialog">

                <h5>Copy Component To</h5>

                <div class="content">
                    <div class="page-list"></div>
                </div>

                <div class="buttons">

                    <div class="button ok primary">Copy</div>
                    <div class="button cancel">Cancel</div>

                    <label class="checkbox linked">
                        <b class="pretty-checkbox light"><input type="checkbox" class="linked" /><i></i></b> <span>Link copies</span>
                    </label>
                </div>
            </div>

            <div id="share-component-dialog" class="dialog">

                <h5>Share Component</h5>

                <div class="content">

                    <div class="component-holder">

                        <div class="left-col">

                            <label>
                                <span>Preview</span>
                                <div class="component-preview"></div>
                            </label>

                        </div>

                        <div class="right-col">

                            <label>
                                <span>Name</span>
                                <input type="text" placeholder="" class="component-name" />
                            </label>

                            <label>
                                <span>Description (optional)</span>
                                <textarea class="component-description"></textarea>
                            </label>

                        </div>

                    </div>

                </div>

                <div class="buttons">

                    <div class="author-card">
                        <span class="author-label">Sharing As</span>
                        <span class="author-image"></span>
                        <span class="author-name">Some Name</span>
                    </div>

                    <div class="error"></div>

                    <div class="button ok primary disable">Share</div>
                    <div class="button unshare aside">Unshare</div>
                    <div class="button cancel">Cancel</div>
                </div>

                <div class="loading">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            </div>

            <div id="edit-profile-dialog" class="dialog">

                <h5>Edit Your Profile</h5>

                <div class="content">

                    <div class="left-col">
                        <div class="photo"></div>
                    </div>

                    <div class="right-col">

                        <label>
                            <span>Name</span>
                            <input type="text" placeholder="" class="name" />
                        </label>

                        <label>
                            <span>Email (Private)</span>
                            <input type="email" placeholder="" class="gravatar-email" />
                            <i>Your photo is fetched from gravatar using this email.</i>
                        </label>

                    </div>
                </div>

                <div class="buttons">
                    <div class="error"></div>
                    <div class="button ok primary disable">Update</div>
                    <div class="button cancel">Cancel</div>
                </div>

                <div class="loading">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            </div>

            <div id="page-properties-dialog" class="properties-dialog dialog">

                <h5 class="separate">Page Properties<span></span></h5>

                <div class="content">
                    <div class="accordion">
                        <div class="accordion-item app-settings active" data-tab="app-settings">
                            <div class="list app-settings">
                                <div class="item main active" data-item="main">
                                    <i class="material-icons">settings_applications</i>Main
                                </div>
                                <div class="item meta-tags" data-item="meta-tags">
                                    <i class="material-icons">code</i>Meta Tags
                                </div>
                                <div class="item head-content" data-item="head-content">
                                    <i class="material-icons">short_text</i>Head Content
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="target main">
                        <label>
                            <span>Title</span>
                            <input type="text" placeholder="" class="title-input" />
                        </label>

                        <label>
                            <span>Description</span>
                            <input type="text" placeholder="" class="description-input" />
                        </label>
                    </div>

                    <div class="target meta-tags">
                        <div class="meta-tag-list"></div>

                        <div class="button aside add-meta">Add Meta</div>
                    </div>

                    <div class="target head-content">
                        <label>
                            <span>HTML/Code</span>
                            <textarea class="head-content-area"></textarea>
                        </label>
                        <label>
                            <span>Add to page</span>
                            <select class="head-content-order">
                                <option value="after-global">After the global head content</option>
                                <option value="before-global">Before the global head content</option>
                                <option value="replace-global">Replace the global head content</option>
                            </select>
                        </label>
                    </div>

                </div>

                <div class="buttons">
                    <div class="button ok primary">Save</div>
                    <div class="button cancel">Cancel</div>
                </div>
            </div>

            <div class="dialog-background"></div>
        </div>


        <!-- misc -->

        <div id="image-asset-tooltip">
            <div class="preview"></div>
            <p class="dimensions"></p>
        </div>

        <div id="color-picker">

            <div class="tabs">
                <div class="tab select active" data-tab="select">Select</div>
                <div class="tab design" data-tab="design">Design</div>
                <div class="tab favorites" data-tab="favorites">Favorites</div>
                <div class="tab library" data-tab="library">Library</div>
            </div>

            <div class="content">

                <div class="tab-target select active">

                    <div class="gradient">
                        <div class="selection"></div>
                        <div class="bg1"></div>
                        <div class="bg2"></div>
                    </div>
                    <div class="preview">
                        <i class="material-icons picker">colorize</i>
                        <span class="old-color"></span>
                        <span class="new-color"></span>
                    </div>
                    <div class="sliders">
                        <input type="range" class="hue" min="1" max="100" />
                        <input type="range" class="alpha" value="100" />
                    </div>
                </div>

                <div class="tab-target swatch"></div>

                <div class="color-value">
                    <select class="dark format">
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                    </select>
                    <input type="text" class="dark value" />
                    <i class="material-icons favorite">favorite</i>
                </div>
                <div class="buttons">
                    <a class="button darkblue select-button">Select</a>
                    <a class="button darkgray cancel-button">Cancel</a>
                </div>

            </div>

        </div>

        <div id="color-picker-overlay"></div>

        <div class="cloak"></div>

        <div id="freeze-ui"></div>

        <div id="dragbox">
            <div id="ghost">
                <div id="ghost-text"></div>
            </div>
        </div>

        <div id="style-drag"></div>

        <input id="focus-target" />

        <div id="notification-center"></div>

        <div id="context-menu"></div>
        
        <script>
            var ROOT = "../";
            var USERNAME = "";
            var ORG = "";
            var OPEN_FILE = "";
            var STANDARD_PODS = new Array();
			var PODS = new Array();
			var WHAT_NOTS = null;
			
            var newFile ="";
            var DOCUMENT_ROOT = "";
        </script>
        
        <script src="../assets/cogworks/js/jquery/jquery.min.js"></script>
        <script src="../assets/cogworks/js/jquery/jquery-ui.min.js"></script>
        <script src="../assets/cogworks/plugins/footable/footable.min.js"></script>
        <script src="../assets/cogworks/plugins/google-code-prettify/prettify.js"></script>
        <script src="../assets/cogworks/js/raphael.js"></script>
        <script src="../assets/cogworks/js/UIicons.js"></script>
        <script src="../assets/cogworks/js/CogIcon.js"></script>
        <script src="../assets/cogworks/js/electron.browser.js"></script>
        <script src="../assets/cogworks/js/cogworks.js"></script>
        <script src="../assets/cogworks/js/electron.mock.js"></script>
        <script src="../assets/cogworks/js/update.mock.js"></script>
        <script data-main="../assets/cogworks/js/config" src="../assets/cogworks/js/require.js"></script>
        <script src="../assets/cogworks/js/error.mock.js"></script>
    </body>
</html>
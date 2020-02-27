var electron = {};

(function(){

	// Preload the getting started guide

	var img = new Image()
	img.src = '../assets/cogworks/templates/json/getting-started.json';

	var browserWindow = null;
	var webContents = null;

	electron.os = ((window.navigator.appVersion).toLowerCase().search("mac") > 0) ? 'osx' : 'linux';

	electron.development = false;
	electron.homePath = '';
	electron.userDataPath = '';
	electron.version = '0.33.0';

	// Will use this to open files from the command line

	electron.commandLineArgs = [];

	electron.saveSetting = voidFunc;

	electron.readSetting = function(set, def){
		return def || null;
	};
    
    window.onbeforeunload = function(e) {
        var dialogText = 'Changes you made may not be save.';
        e.returnValue = dialogText;
        return dialogText;
    };
    // Prevent the app from triggering the unload dialog
	/*window.addEventListener('beforeunload', function(e){
		e.stopImmediatePropagation();
		e.stopPropagation();
	});*/

	// Misc

	electron.focusWindow = voidFunc;
	electron.reloadWindow = voidFunc;
	electron.toggleDevTools = voidFunc;
	electron.addToRecent = voidFunc;
	electron.quit = voidFunc;
	electron.setTitle = voidFunc;

	electron.readDataFile = function(){
		return Promise.resolve();
	};

	electron.writeDataFile = voidFunc;

	// Dialog functions

	function onlyInBstudio(){
		app.alertDialog.open({
			title: "Not Available at this time",
			message: 'This feature will be added in a future update.'
		});
	}

	function onlyInBstudioPromise(){
		onlyInBstudio();
		return new Promise();
	}

	function voidFunc(){}

	electron.takeScreenshot = function(){
		
		if(app.colorPicker.active){
			app.colorPicker.discard();
		}

		onlyInBstudio();
	}

	electron.screenshotHTML = function(html, cb){
		cb(false);
	}

	electron.showFileOpenDialog = onlyInBstudio;
	electron.showFileSaveDialog = onlyInBstudio;

	electron.pathExists = function(path){
		return fs.existsSync(path)
	}

	electron.readFile = onlyInBstudioPromise;

	electron.mkdirSync = function(path){
		return false;
	};

	electron.writeFile = onlyInBstudioPromise;

	// Binding to ports

	electron.previewPort = 12345;
	electron.ssePort = 12345;

	var httpServer, sseServer;

	electron.listenOnNetwork = onlyInBstudio;

	electron.stopListeningOnNetwork = voidFunc;

	// Event stream server

	electron.notifySSEClients = voidFunc;

	// Generic functions

	electron.getIPAddresses = function(){
		return ['0.0.0.0'];
	};

	electron.openBrowserWindow = voidFunc;

	// Application menu

	electron.setMenu = voidFunc;

	// Clipboard

	electron.clipboardGet = function(){
		return '';
	};
		
	electron.clipboardGetText = function(){
		//return '';
		return obj.txt;
	};

	electron.clipboardGetHTML = function(){
		//return '';
		return obj.html;
	};
    
    var obj = new Object();
	
	//electron.clipboardSet = onlyInBstudio;
	electron.clipboardSet = function(txtVal, htmlVal){
        obj.txt = txtVal;
        obj.html = htmlVal;
    };
	electron.clipboardSetText = onlyInBstudio;
	electron.clipboardSetHTML = onlyInBstudio;

})();
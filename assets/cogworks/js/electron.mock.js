
var electron = {};

(function(){

	// Preload the getting started guide

	var img = new Image()
	img.src = '../assets/cogworks/templates/json/getting-started.json';

	var browserWindow = null;
	var webContents = null;

	electron.os = 'linux';

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

	// Prevent the app from triggering the unload dialog

	window.addEventListener('beforeunload', function(e){
		e.stopImmediatePropagation();
		e.stopPropagation();
	});

	// Misc

	electron.setZoomFactor = voidFunc;
	electron.getZoomFactor = () => Promise.resolve(1);
	electron.focusWindow = voidFunc;
	electron.reloadWindow = voidFunc;
	electron.toggleDevTools = voidFunc;
	electron.addToRecent = voidFunc;
	electron.quit = voidFunc;
	electron.restart = voidFunc;
	electron.setTitle = voidFunc;
	electron.spawn = voidFunc;
	electron.compileSASS = onlyInBstudio;
	
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
		return false;
	}

	electron.getFileSize = function(path){
		return 0;
	}

	electron.readFile = onlyInBstudioPromise;

	electron.mkdirSync = function(path){
		return false;
	};

	electron.deleteFile = onlyInBstudioPromise;
	electron.writeFile = onlyInBstudioPromise;
	electron.writeFileChunked = onlyInBstudioPromise;

	// Binding to ports

	electron.previewPort = 12345;
	electron.ssePort = 12345;

	electron.listenOnNetwork = onlyInBstudio;
	electron.stopListeningOnNetwork = voidFunc;

	// Event stream server

	electron.notifySSEClients = voidFunc;

	// Generic functions

	electron.getIPAddresses = function(){
		return ['0.0.0.0'];
	};

	electron.openBrowserWindow = voidFunc;
	electron.openFileBrowser = voidFunc;
	
	// Application menu

	electron.setMenu = voidFunc;

	// Clipboard

	electron.clipboardGet = function(){
		return '';
	};
		
	electron.clipboardGetText = function(){
		return '';
	};

	electron.clipboardGetHTML = function(){
		return '';
	};
	
	electron.clipboardSet = onlyInBstudio;
	electron.clipboardSetText = onlyInBstudio;
	electron.clipboardSetHTML = onlyInBstudio;

})();
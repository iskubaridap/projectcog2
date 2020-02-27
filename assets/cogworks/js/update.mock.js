
'use strict';

(function(){

	function checkForUpdates(listener){
		
		listener('check-started');

		setTimeout(function(){
			listener('check-ready');
		}, 500)

		setTimeout(function(){
			listener('update-available', 'app');
		}, 600)

		setTimeout(function(){
			listener('update-ready', 'app');
		}, 3000)

	}

	function deactivateApp(){}

	window.UpdateSystem = {
		checkForUpdates, deactivateApp
	};

})();
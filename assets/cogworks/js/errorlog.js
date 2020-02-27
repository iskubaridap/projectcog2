(function(){

	window.onerror = function(message, file, line, column, error){
		console.error(message, file, line, column, error.stack);
	};

})();
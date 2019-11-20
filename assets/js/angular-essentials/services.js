var developers = function($rootScope, $http){
    var self = this;
    this.getActiveDevelopers = function(obj, config){
        return $http.post((root + "cogworks/developers/retrieve/active"))
        .then(function (response) {
            obj.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
            // console.log(obj.activeDevelopers);
          }, function (response) {
            obj.activeDevelopers = new Object();
            obj.activeDevelopers.error = 'serverError';
            obj.activeDevelopers.errorData = 'Developer';
            return null;
          });
    };
};

angular
    .module('mcafee')
    .service('developers', developers);
var developers = function($rootScope, $http){
    var self = this;
    this.getActiveDevelopers = function(obj, config){
        return $http.post((root + "developers/active"))
        .then(function (response) {
            obj.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
            $rootScope.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
          }, function (response) {
            return null;
          });
    };
};

angular
    .module('mcafee')
    .service('developers', developers);
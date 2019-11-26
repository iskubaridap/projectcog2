var cogDevelopers = function($rootScope, $http){
    var self = this;
    this.getActiveDevelopers = function(obj, config){
        return $http.post((root + "cogworks/developers/retrieve/active"))
        .then(function (response) {
            obj.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
          }, function (response) {
            obj.activeDevelopers = new Object();
            obj.activeDevelopers.error = 'serverError';
            obj.activeDevelopers.errorData = 'Developer';
            return null;
          });
    };
};
var cogFiles = function($rootScope, $http){
  var self = this;
  this.getActiveFiles = function(obj, config, callback){
      return $http.post((root + "cogworks/cog-files/retrieve/active"))
      .then(function (response) {
          obj.activeFiles = ((response.data).toString().length > 0) ? response.data : null;
          try
          {
            callback();
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.activeFiles = new Object();
          obj.activeFiles.error = 'serverError';
          obj.activeFiles.errorData = 'Developer';
          return null;
        });
  };
};
var cogProjects = function($rootScope, $http){
  var self = this;
  this.getActiveProjects = function(obj, config, callback){
      return $http.post((root + "cogworks/projects/retrieve/active"))
      .then(function (response) {
          obj.activeProjects = ((response.data).toString().length > 0) ? response.data : null;
          try
          {
            callback();
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.activeProjects = new Object();
          obj.activeProjects.error = 'serverError';
          obj.activeProjects.errorData = 'Developer';
          return null;
        });
  };
};

angular
    .module('mcafee')
    .service('cogDevelopers', cogDevelopers)
    .service('cogFiles', cogFiles)
    .service('cogProjects', cogProjects);
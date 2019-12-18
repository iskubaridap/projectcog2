var cogDevelopers = function($http){
    var self = this;
    this.getActiveDevelopers = function(obj, config, callback){
        return $http.post((root + "cogworks/developers/retrieve/active"))
        .then(function (response) {
            obj.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
            try
            {
              callback(response.data);
            }
            catch(err)
            {
              // no callback function
            }
          }, function (response) {
            obj.activeDevelopers = new Object();
            obj.activeDevelopers.error = 'serverError';
            obj.activeDevelopers.errorData = 'Developer';
            return null;
          });
    };
};
var cogFiles = function($http){
  var self = this;
  this.getActiveFiles = function(obj, config, callback){
      return $http.post((root + "cogworks/cog-files/retrieve/active"), config)
      .then(function (response) {
          obj.activeFiles = ((response.data).toString().length > 0) ? response.data : null;
          console.log(obj.activeFiles);
          try
          {
            callback(response.data);
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.activeFiles = new Object();
          obj.activeFiles.error = 'serverError';
          obj.activeFiles.errorData = 'Cog Files';
          return null;
        });
  };
};
var cogFilesDetails = function($http){
  var self = this;
  this.getDetails = function(obj, config, callback){
      return $http.post((root + "cogworks/cog-files/retrieve/details"), config)
      .then(function (response) {
          obj.details = ((response.data).toString().length > 0) ? response.data : null;
          console.log(response.data);
          try
          {
            callback(response.data);
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.details = new Object();
          obj.details.error = 'serverError';
          obj.details.errorData = 'Cog File Details';
          return null;
        });
  };
};
var cogProject = function($http){
  var self = this;
  this.getProject = function(obj, config, callback){
      return $http.post((root + "cogworks/projects/retrieve/single"), config)
      .then(function (response) {
          obj.project = ((response.data).toString().length > 0) ? response.data : null;
          console.log(response.data);
          try
          {
            callback(response.data);
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.project = new Object();
          obj.project.error = 'serverError';
          obj.project.errorData = 'Cog Projects';
          return null;
        });
  };
};
var cogProjects = function($http){
  var self = this;
  this.getActiveProjects = function(obj, config, callback){
      return $http.post((root + "cogworks/projects/retrieve/active"))
      .then(function (response) {
          obj.activeProjects = ((response.data).toString().length > 0) ? response.data : null;
          console.log(response.data);
          try
          {
            callback(response.data);
          }
          catch(err)
          {
            // no callback function
          }
        }, function (response) {
          obj.activeProjects = new Object();
          obj.activeProjects.error = 'serverError';
          obj.activeProjects.errorData = 'Cog Projects';
          return null;
        });
  };
};

angular
    .module('mcafee')
    .service('cogDevelopers', cogDevelopers)
    .service('cogFiles', cogFiles)
    .service('cogFilesDetails', cogFilesDetails)
    .service('cogProject', cogProject)
    .service('cogProjects', cogProjects);
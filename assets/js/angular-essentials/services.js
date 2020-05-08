var loginService = function ($state, $http) {
  var self = this;
  self.userLogged = function(data){
    $http.post("./login/logged-user")
    .then(function (response) {
      if(response.data == 'false' || (response.data).search("<script language='javascript'>") >= 0) {
        $state.go('login');
      } else {
        self.getLoggedUser(self, {}, function(data) {
          $$rootScope.user = data.user;
          $rootScope.firstname = (((data.firstname).trim()).length > 0) ? data.firstname : data.user;
          $rootScope.userID = parseInt(data.id);
          $rootScope.position = data.position;
          $rootScope.positionID = parseInt(data.position_id);
          $rootScope.organization = data.organization;
          $rootScope.organizationID = parseInt(data.organization_id);
      });
      }
    }, function (response) {
      $state.go('login');
    });
  };



  /* self.userLogged = function (data) {
    if (typeof data == 'string') {
      $state.go('login');
    }
  }; */

  this.getLoggedUser = function (obj, config, callback) {
    return $http.post("./users/logged-user")
      .then(function (response) {
        obj.loggedUser = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.loggedUser = new Object();
        obj.loggedUser.error = 'serverError';
        obj.loggedUser.errorData = 'Developer';
        return null;
      });
  }
};
var accountsService = function ($http) {
  var self = this;
  this.getAccountOrg = function (obj, config, callback) {
    return $http.post("./accounts/retrieve/org", config)
      .then(function (response) {
        obj.typesAllowedUsers = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.typesAllowedUsers = new Object();
        obj.typesAllowedUsers.error = 'serverError';
        obj.typesAllowedUsers.errorData = 'Organizations';
        return null;
      });
  };
  this.getTypesAllowedUsers = function (obj, config, callback) {
    return $http.post("./accounts/retrieve/types-allowed-users")
      .then(function (response) {
        obj.typesAllowedUsers = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.typesAllowedUsers = new Object();
        obj.typesAllowedUsers.error = 'serverError';
        obj.typesAllowedUsers.errorData = 'Organizations';
        return null;
      });
  };
};
var cogOrganizationsService = function ($http) {
  var self = this;
  this.getOrganizations = function (obj, config, callback) {
    return $http.post("./organizations/retrieve/cogworks/all")
      .then(function (response) {
        obj.organizations = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.organizations = new Object();
        obj.organizations.error = 'serverError';
        obj.organizations.errorData = 'Organizations';
        return null;
      });
  };
  this.getOrganization = function (obj, config, callback) {
    return $http.post("./organizations/retrieve/cogworks/single", config)
      .then(function (response) {
        obj.organization = ((response.data).toString().length > 0) ? response.data : null;
        console.log(obj.organization);
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.organization = new Object();
        obj.organization.error = 'serverError';
        obj.organization.errorData = 'Organizations';
        return null;
      });
  };
  this.getOrganizationInfo = function (obj, config, callback) {
    return $http.post("./organizations/info/cogworks", config)
      .then(function (response) {
        obj.organization = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.organization = new Object();
        obj.organization.error = 'serverError';
        obj.organization.errorData = 'Organizations';
        return null;
      });
  };
};
var cogUsers = function ($http) {
  var self = this;
  this.getUser = function (obj, config, callback) {
    return $http.post("./users/retrieve/single", config)
      .then(function (response) {
        obj.userObj = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.userObj = new Object();
        obj.userObj.error = 'serverError';
        obj.userObj.errorData = 'User';
        return null;
      });
  };
};
var tasks = function ($http) {
  var self = this;
  this.getTasks = function (obj, confing, callback) {
    return $http.post("./tasks/retrieve/active")
      .then(function (response) {
        obj.tasks = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.tasks = new Object();
        obj.tasks.error = 'serverError';
        obj.tasks.errorData = 'Tasks';
        return null;
      });
  };
  this.getTask = function (obj, confing, callback) {
    return $http.post("./tasks/retrieve/single")
      .then(function (response) {
        obj.task = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.task = new Object();
        obj.task.error = 'serverError';
        obj.task.errorData = 'Task';
        return null;
      });
  };
  this.getTodo = function (obj, confing, callback) {
    return $http.post("./tasks/retrieve/todo", {
        program: 3
      })
      .then(function (response) {
        obj.todo = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.todo = new Object();
        obj.todo.error = 'serverError';
        obj.todo.errorData = 'To-Do';
        return null;
      });
  };
};
var cogPositions = function ($http) {
  var self = this;
  this.getPositions = function (obj, config, callback) {
    return $http.post("./users/retrieve/positions")
      .then(function (response) {
        obj.positions = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.positions = new Object();
        obj.positions.error = 'serverError';
        obj.positions.errorData = 'Positions';
        return null;
      });
  };
};
var cogDevelopers = function ($http) {
  var self = this;
  this.getActiveDevelopers = function (obj, config, callback) {
    return $http.post("./cogworks/developers/retrieve/active", config)
      .then(function (response) {
        obj.activeDevelopers = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activeDevelopers = new Object();
        obj.activeDevelopers.error = 'serverError';
        obj.activeDevelopers.errorData = 'Developers';
        return null;
      });
  };
  this.getActiveOrgDevelopers = function (obj, config, callback) {
    return $http.post("./cogworks/developers/retrieve/org/active", config)
      .then(function (response) {
        obj.activeOrgDevelopers = ((response.data).toString().length > 0) ? response.data : null;
        console.log(obj.activeOrgDevelopers);
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activeOrgDevelopers = new Object();
        obj.activeOrgDevelopers.error = 'serverError';
        obj.activeOrgDevelopers.errorData = 'Developers';
        return null;
      });
  };
  this.getDeveloper = function (obj, config, callback) {
    return $http.post("./cogworks/developers/profile", config)
      .then(function (response) {
        obj.developer = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.developer = new Object();
        obj.developer.error = 'serverError';
        obj.developer.errorData = 'Developer Profile';
        return null;
      });
  };
};
var cogFiles = function ($http) {
  var self = this;
  this.getActiveFiles = function (obj, config, callback) {
    return $http.post("./cogworks/cog-files/retrieve/active", config)
      .then(function (response) {
        obj.activeFiles = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        console.log(obj.activeFiles);
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activeFiles = new Object();
        obj.activeFiles.error = 'serverError';
        obj.activeFiles.errorData = 'Cog Files';
        return null;
      });
  };
  this.getAvailableTemplates = function (obj, config, callback) {
    return $http.post("./cogworks/cog-files/retrieve/templates", config)
      .then(function (response) {
        obj.templates = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.templates = new Object();
        obj.templates.error = 'serverError';
        obj.templates.errorData = 'Cog Files';
        return null;
      });
  };
};
var cogFilesDetails = function ($http) {
  var self = this;
  this.getDetails = function (obj, config, callback) {
    return $http.post("./cogworks/cog-files/retrieve/details", config)
      .then(function (response) {
        obj.details = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
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
var cogProject = function ($http) {
  var self = this;
  this.getProject = function (obj, config, callback) {
    return $http.post("./cogworks/projects/retrieve/single", config)
      .then(function (response) {
        obj.project = ((response.data).toString().length > 0 && response.data != 'null') ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.project = new Object();
        obj.project.error = 'serverError';
        obj.project.errorData = 'Cog Project';
        return null;
      });
  };
};
var cogProjects = function ($http) {
  var self = this;
  this.getActiveProjects = function (obj, config, callback) {
    return $http.post("./cogworks/projects/retrieve/active", config)
      .then(function (response) {
        obj.activeProjects = ((response.data).toString().length > 0) ? response.data : null;
        try {
          callback(response.data);
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activeProjects = new Object();
        obj.activeProjects.error = 'serverError';
        obj.activeProjects.errorData = 'Cog Projects';
        return null;
      });
  };
  this.getActiveOrgProjects = function (obj, config, callback) {
    return $http.post("./cogworks/projects/retrieve/org/active", config)
      .then(function (response) {
        obj.activeProjects = ((response.data).toString().length > 0) ? response.data : null;
        console.log(obj.activeProjects);
        try {
          callback(response.data);
        } catch (err) {
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
var cogPodsWhatNots = function ($http) {
  var self = this;
  this.getActivePods = function (obj, config, callback) {
    return $http.post("./cogworks/pods/retrieve/active")
      .then(function (response) {
        var podObj = (response.data != 'false') ? response.data : null;
        obj.activePods = (podObj != null) ? JSON.parse(podObj.pod) : null;
        try {
          callback(JSON.parse(podObj.pod));
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activePods = new Object();
        obj.activePods.error = 'serverError';
        obj.activePods.errorData = 'Cog Pods';
        return null;
      });
  };
  this.getActiveWhatNots = function (obj, config, callback) {
    return $http.post("./cogworks/what-nots/retrieve/active")
      .then(function (response) {
        var whatNotsObj = (response.data != 'false') ? response.data : null;
        obj.activeWhatNots = (whatNotsObj != null) ? JSON.parse(whatNotsObj.what_not) : null;
        try {
          callback(JSON.parse(whatNotsObj.what_not));
        } catch (err) {
          // no callback function
        }
      }, function (response) {
        obj.activeWhatNots = new Object();
        obj.activeWhatNots.error = 'serverError';
        obj.activeWhatNots.errorData = 'Cog What Nots';
        return null;
      });
  };
};

angular
  .module('projectcog')
  .service('loginService', loginService)
  .service('accountsService', accountsService)
  .service('cogOrganizationsService', cogOrganizationsService)
  .service('tasks', tasks)
  .service('cogUsers', cogUsers)
  .service('cogPositions', cogPositions)
  .service('cogDevelopers', cogDevelopers)
  .service('cogFiles', cogFiles)
  .service('cogFilesDetails', cogFilesDetails)
  .service('cogProject', cogProject)
  .service('cogProjects', cogProjects)
  .service('cogPodsWhatNots', cogPodsWhatNots);
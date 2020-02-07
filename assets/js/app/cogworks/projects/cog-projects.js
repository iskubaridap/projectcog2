var cogProjectsModule = angular.module("cog-projects", []);
function cogProjectsCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogProjects, SweetAlert)
{
    var self = this;
    var cogProjPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.activeProjects = undefined;
    cogProjects.getActiveProjects(self, {page: cogProjPage}, function(data){
        loginService.userLogged(data);
    });

    var openProject = function(id)
    {
        $state.go('cog-projects.files', {project: id, page: cogProjPage});
    };
    var updateProject = function(id)
    {
        $state.go('cog-projects.update', {id: id});
    }
    var viewFile = function(id)
    {
        //console.log(id);
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeFile = function(id, files)
    {
        if(files > 0)
        {
            SweetAlert.swal({
                title: "Cannot Remove Project",
                text: "There are existing files in this Project. It's either you delete all remaining files or distribute them to other Projects. Then proceed on removing this."
            }, function(isConfirm){
                if(isConfirm)
                {}
            });
        }
        else
        {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "This Project will no longer be active.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    $http.post("./cogworks/projects/deactivate", {id: id})
                    .then(function (response) {
                        if(response.data == 'true')
                        {
                            cogProjects.getActiveProjects(self, {page: cogProjPage});
                            SweetAlert.swal("Deleted!", "Project is successfully removed", "success");
                        }
                        else
                        {
                            SweetAlert.swal("Failed!", "Project is not been removed. Try it again.", "error");
                        }
                    }, function (response) {
                        SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                    });
                    
                } else {
                    SweetAlert.swal("Cancelled", "You cancelled your action", "error");
                }
            });
        }
    };
    var restoreFile = function(id) {
        $http.post("./cogworks/projects/activate", {id: id})
        .then(function (response) {
            if(response.data == 'true')
            {
                cogProjects.getActiveProjects(self, {page: cogProjPage});
                SweetAlert.swal("Success!", "Project is successfully restored.", "success");
            }
            else
            {
                SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
            }
        }, function (response) {
            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
        });
    }
    self.viewByThumnail = function(event)
    {
        viewThumnail();
    };
    self.viewByList = function(event)
    {
        viewList();
    };
    self.orderByName = function(event)
    {
        self.activeProjects = self.activeProjects.sort(function(a, b){
            if (a.project < b.project)
                return -1;
            if (a.project > b.project)
                return 1;
            return 0;
        });
    };
    self.orderByUpdated = function(event)
    {
        self.activeProjects = self.activeProjects.sort(function(a, b){
            if (a.updated < b.updated)
                return -1;
            if (a.updated > b.updated)
                return 1;
            return 0;
        });
    };
    self.orderByCreated = function(event)
    {
        self.activeProjects = self.activeProjects.sort(function(a, b){
            if (a.created < b.created)
                return -1;
            if (a.created > b.created)
                return 1;
            return 0;
        });
    };
    self.view = function(event)
    {
        var elem = $(event.target);
        viewFile(elem.attr('data-id'));
    };
    self.open = function(event)
    {
        var elem = $(event.target);
        openProject(elem.attr('data-id'));
    };
    self.details = function(event)
    {
        // reserve
    };
    self.update = function(event)
    {
        var elem = $(event.target);
        updateProject(elem.attr('data-id'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeFile(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
    self.restore = function(event)
    {
        var elem = $(event.target);
        restoreFile(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
}

cogProjectsModule.controller('cogProjectsCtrl', cogProjectsCtrl);
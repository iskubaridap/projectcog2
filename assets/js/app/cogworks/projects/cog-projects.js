var cogProjectsModule = angular.module("cog-projects", []);
function cogProjectsCtrl($rootScope, $scope, $element, $state, $http, $timeout, cogProjects, SweetAlert)
{
    var self = this;
    self.activeProjects = undefined;
    cogProjects.getActiveProjects(self);

    var viewFile = function(id)
    {
        //console.log(id);
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeFile = function(id)
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
                $http.post((root + "cogworks/projects/deactivate"), {id: id})
                .then(function (response) {
                    if(response.data == 'true')
                    {
                        cogProjects.getActiveProjects(self);
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
    };
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
    self.details = function(event)
    {
        
    };
    self.update = function(event)
    {
        
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeFile(elem.attr('data-id'));
    };
}

cogProjectsModule.controller('cogProjectsCtrl', cogProjectsCtrl);
var cogDevelopers = angular.module("cog-developers", []);
function cogDevelopersCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogDevelopers, SweetAlert)
{
    var self = this;
    var cogDevPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.activeDevelopers = undefined;
    cogDevelopers.getActiveDevelopers(self, {page: cogDevPage}, function(data){
        loginService.userLogged(data);
    });

    var viewUser = function(id)
    {
        $state.go('cog-developers.profile', {'id': id});
    };
    var updateUser = function(userID, organizationID)
    {
        if(cogDevPage == 'manage') {
            $state.go('cog-admin.developers-update', {page: 'manage', orgID: organizationID, id: userID});
        } else {
            $state.go('cog-developers.update', {id: userID});
        }
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeUser = function(id)
    {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "This user will no longer be active.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post("./cogworks/developers/deactivate", {id: id})
                .then(function (response) {
                    if(response.data == 'true')
                    {
                        cogDevelopers.getActiveDevelopers(self, {page: cogDevPage});
                        SweetAlert.swal("Deleted!", "User is successfully removed", "success");
                    }
                    else
                    {
                        SweetAlert.swal("Failed!", "User is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    };
    var restoreFile = function(id) {
        $http.post("./cogworks/developers/activate", {id: id})
        .then(function (response) {
            if(response.data == 'true')
            {
                cogDevelopers.getActiveDevelopers(self, {page: cogDevPage});
                SweetAlert.swal("Success!", "User is successfully restored.", "success");
            }
            else
            {
                SweetAlert.swal("Failed!", "File is not been removed. Try it again.", "error");
            }
        }, function (response) {
            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
        });
    }

    self.orderByName = function(event)
    {
        self.activeDevelopers = self.activeDevelopers.sort(function(a, b){
            if (a.user < b.user)
                return -1;
            if (a.user > b.user)
                return 1;
            return 0;
        });
    };
    self.orderByPosition = function(event)
    {
        self.activeDevelopers = self.activeDevelopers.sort(function(a, b){
            if (a.position < b.position)
                return -1;
            if (a.position > b.position)
                return 1;
            return 0;
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
    self.view = function(event)
    {
        var elem = $(event.target);
        viewUser(elem.attr('data-id'));
    };
    self.update = function(event)
    {
        var elem = $(event.target);
        updateUser(elem.attr('data-id'), elem.attr('data-orgid'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeUser(elem.attr('data-id'));
    };
    self.restore = function(event)
    {
        var elem = $(event.target);
        restoreFile(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
}

cogDevelopers.controller('cogDevelopersCtrl', cogDevelopersCtrl);
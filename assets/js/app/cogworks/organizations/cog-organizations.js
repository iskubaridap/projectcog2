var cogOrganizations = angular.module("cog-organizations", []);
function cogOrganizationsCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogOrganizationsService, SweetAlert)
{
    var self = this;
    var cogOrgPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.organizations = undefined;
    cogOrganizationsService.getOrganizations(self, {}, function(data){
        loginService.userLogged(data);
    });

    var viewOrg = function(id)
    {
        // $state.go('cog-developers.profile', {'id': id});
    };
    var updateOrg = function(id)
    {
        //console.log(id);
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeOrg = function(id)
    {
        /* SweetAlert.swal({
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
        }); */
    };
    var restoreOrg = function(id) {
        /* $http.post("./cogworks/developers/activate", {id: id})
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
        }); */
    }

    /* self.orderByName = function(event)
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
    }; */
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
        viewOrg(elem.attr('data-id'));
    };
    self.update = function(event)
    {
        var elem = $(event.target);
        updateOrg(elem.attr('data-id'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeOrg(elem.attr('data-id'));
    };
    self.restore = function(event)
    {
        var elem = $(event.target);
        restoreOrg(elem.attr('data-id'), parseInt(elem.attr('data-files')));
    };
}

cogOrganizations.controller('cogOrganizationsCtrl', cogOrganizationsCtrl);
var cogOrganizations = angular.module("cog-organizations", []);
function cogOrganizationsCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogOrganizationsService, SweetAlert)
{
    var self = this;
    var cogOrgPage = ($state.params.page == undefined) ? '' : $state.params.page;
    self.organizations = undefined;
    cogOrganizationsService.getOrganizations(self, {}, function(data){
        loginService.userLogged(data);
    });

    var viewOrg = function(orgID)
    {
        $state.go('cog-admin.organizations-info', {id: orgID});
    };
    var updateOrg = function(orgID)
    {
        $state.go('cog-admin.organizations-update', {page: 'manage', id: orgID});
    };
    var viewThumnail = function()
    {};
    var viewList = function()
    {};
    var removeOrg = function(orgID)
    {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "This Organization will no longer be active together with it's Users.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
        function (isConfirm) {
            if (isConfirm) {
                $http.post("./organizations/info/cogworks/deactivate", {id: orgID})
                .then(function (response) {
                    if(response.data == 'true') {
                        cogOrganizationsService.getOrganizations(self, {}, function(data){});
                        SweetAlert.swal("Deleted!", "Organization is successfully removed", "success");
                    } else {
                        SweetAlert.swal("Failed!", "Organization is not been removed. Try it again.", "error");
                    }
                }, function (response) {
                    SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
                });
                
            } else {
                SweetAlert.swal("Cancelled", "You cancelled your action", "error");
            }
        });
    };
    var restoreOrg = function(orgID) {
        $http.post("./organizations/info/cogworks/activate", {id: orgID})
        .then(function (response) {
            if(response.data == 'true') {
                cogOrganizationsService.getOrganizations(self, {}, function(data){});
                SweetAlert.swal("Success!", "Organization is successfully restored.", "success");
            } else {
                SweetAlert.swal("Failed!", "Organization is still not Inactive. Try it again.", "error");
            }
        }, function (response) {
            SweetAlert.swal("Error", "Something went wrong. Try it again.", "error");
        });
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
var cogDevelopers = angular.module("cog-developers", []);
function cogDevelopersCtrl($rootScope, $scope, $element, $state, $http, $timeout, cogDevelopers, SweetAlert)
{
    var self = this;
    self.activeDevelopers = undefined;
    cogDevelopers.getActiveDevelopers(self);

    var viewUser = function(id)
    {
        //console.log(id);
    };
    var updateUser = function(id)
    {
        //console.log(id);
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
                        developers.getActiveDevelopers(self);
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
        updateUser(elem.attr('data-id'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeUser(elem.attr('data-id'));
    };
}

cogDevelopers.controller('cogDevelopersCtrl', cogDevelopersCtrl);
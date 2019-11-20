var developers = angular.module("developers", []);
function developersCtrl($rootScope, $scope, $element, $state, $http, $timeout, developers, SweetAlert)
{
    var self = this;
    self.activeDevelopers = undefined;
    developers.getActiveDevelopers(self);

    var viewUser = function(id)
    {
        //console.log(id);
    };
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
                $http.post((root + "developers/deactivate"), {id: id})
                .then(function (response) {
                    console.log(response.data);
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
    self.view = function(event)
    {
        var elem = $(event.target);
        viewUser(elem.attr('data-id'));
    };
    self.remove = function(event)
    {
        var elem = $(event.target);
        removeUser(elem.attr('data-id'));
    };
}

developers.controller('developersCtrl', developersCtrl);
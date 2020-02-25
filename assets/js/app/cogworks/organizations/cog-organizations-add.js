var cogOrganizationAdd = angular.module("cog-organizations-add", []);
function cogOrganizationAddCtrl($rootScope, $scope, $element, $state, $http, cogOrganizationsService, accountsService, SweetAlert)
{
    var self = this;
    var cogOrgID = ($state.params.id == undefined || (($state.params.id).trim()).length <= 0) ? 0 : $state.params.id;
    self.title = '';

    self.organization = {
        id: 0,
        organization: '',
        image: "assets/img/thumbnail/cog-project.svg",
        account_id: 0,
        status_id: 0,
        updated: null,
        created: null,
        imageValue: null
    };
    
    accountsService.getTypesAllowedUsers(self, {}, function(data) {
        if(data != 'null') {
            data.accountType.shift(); // this is to remove the Admin to be selected
            self.typeInitValue = data.accountType[1].id;
            self.allowedUsersInitValue = data.allowedUsers[1].id;
        } else {
            self.typeInitValue = null;
            self.allowedUsersInitValue = null;
        }
    });
    
    self.reset = function(event) {
        $state.go($state.current, {}, {reload: true});
    };
    self.submit = function(event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-organization-add-image').prop('files')[0];
        var cogOrgName = $element.find('#cog-organization-add-name').val();
        var acctType = $element.find('#cog-organization-type-option').val();
        var allowedUsers = $element.find('#cog-organization-allowed-users-option').val();
        var filename =  '';

        try {
            filename = fileData.name
        } catch(err) {
            filename = null;
        }

        if((cogOrgName.trim()).length <= 0) {
            SweetAlert.swal({
                title: "Something Missing",
                text: "Please provide a filename."
            }, function(isConfirm){
                if(isConfirm){}
            });
        } else {
            formData.append('id', cogOrgID);
            formData.append('file', fileData);
            formData.append('cogOrgName', cogOrgName);
            formData.append('acctType', acctType);
            formData.append('allowedUsers', allowedUsers);

            $http({
                url: ('./organizations/cogworks/add'),
                method: "POST",
                data: formData,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                SweetAlert.swal({
                    title: "Success",
                    text: "New Organization is been processed."
                }, function(isConfirm){
                    if(isConfirm){
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            }).error(function(error){
                SweetAlert.swal({
                    title: "Process Fail",
                    text: "Something went wrong. Please try it again."
                }, function(isConfirm){
                    if(isConfirm){}
                });
            });
        }
    };
}

cogOrganizationAdd.controller('cogOrganizationAddCtrl', cogOrganizationAddCtrl);
var cogOrganizationUpdate = angular.module("cog-organizations-update", []);

function cogOrganizationUpdateCtrl($rootScope, $scope, $element, $state, $http, cogOrganizationsService, accountsService, SweetAlert) {
    var self = this;
    var cogOrgID = ($state.params.id == undefined || (($state.params.id).trim()).length <= 0) ? 0 : $state.params.id;
    self.title = '';

    if (cogOrgID != 0) {
        cogOrganizationsService.getOrganization(self, {
            id: cogOrgID
        }, function (data) {
            if (data != 'null') {
                self.title = data.organization;
            } else {
                self.organization = null;
            }
        });
        accountsService.getAccountOrg(self, {
            id: cogOrgID
        }, function (data) {
            var index = 0;
            var acctObj = null;
            if (data != 'null') {
                acctObj = data.account;
                data.accountType.shift(); // this is to remove the Admin to be selected
                self.typeInitValue = data.accountType[(parseInt(acctObj.account_type_id) - 2)].id; // minus by 2 because "Admin" is been removed in the array
                self.allowedUsersInitValue = data.allowedUsers[(parseInt(acctObj.allowed_users_id) - 1)].id;
            } else {
                self.typeInitValue = null;
                self.allowedUsersInitValue = null;
            }
        });
    } else {
        self.organization = null;
    }

    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-organization-update-image').prop('files')[0];
        var cogOrgName = $element.find('#cog-organization-update-name').val();
        var acctType = $element.find('#cog-organization-type-option').val();
        var allowedUsers = $element.find('#cog-organization-allowed-users-option').val();
        var filename = '';

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((cogOrgName.trim()).length <= 0) {
            SweetAlert.swal({
                title: "Something Missing",
                text: "Please provide a filename."
            }, function (isConfirm) {
                if (isConfirm) {}
            });
        } else {
            formData.append('id', cogOrgID);
            formData.append('file', fileData);
            formData.append('cogOrgName', cogOrgName);
            formData.append('acctType', acctType);
            formData.append('allowedUsers', allowedUsers);

            $http({
                url: ('./organizations/cogworks/update'),
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                SweetAlert.swal({
                    title: "Success",
                    text: "Your update is been processed."
                }, function (isConfirm) {
                    if (isConfirm) {
                        $state.go($state.current, {}, {
                            reload: true
                        });
                    }
                });
            }).error(function (error) {
                SweetAlert.swal({
                    title: "Organization Update Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    };
}

cogOrganizationUpdate.controller('cogOrganizationUpdateCtrl', cogOrganizationUpdateCtrl);
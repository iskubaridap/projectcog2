var cogProjectAdd = angular.module("cog-projects-add", []);

function cogProjectCtrl($rootScope, $scope, $element, $state, $http, cogProject, cogOrganizationsService, cogDevelopers, SweetAlert) {
    var self = this;
    var cogProjID = 0; // initializing anonymous value
    var cogOrgID = ($state.params.orgID == undefined) ? 0 : $state.params.orgID; // initializing anonymous value
    var cogProjPage = ($state.params.page == undefined) ? '' : $state.params.page;
    var cogUser = 0;

    /* cogOrganizationsService.getOrganizations(self, {}, function(data) {
        // this is to avoid admin and developers to be shown
        // for now we disable the developers coz we're not sure too much about this for now
        self.positionsInitValue = data[2].id;
    }); */
    self.page = cogProjPage;
    self.title = 'New Project';

    // this is to make sure we don't get any weird anonymous value
    if (cogOrgID != 0 || cogProjPage == 'manage') {
        cogDevelopers.getActiveOrgDevelopers(self, {
            org: cogOrgID
        }, function (data) {
            if (data != null) {
                cogUser = data[0].id;
            }
        });
        cogOrganizationsService.getOrganization(self, {
            id: cogOrgID
        }, function (data) {
            if (data != 'null') {
                self.project = {
                    id: cogProjID,
                    project: '',
                    image: 'assets/img/thumbnail/cog-project.svg'
                };
            } else {
                self.project = null;
            }
        });
    } else {
        self.project = {
            id: cogProjID,
            project: '',
            image: 'assets/img/thumbnail/cog-project.svg'
        };
    }

    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-project-update-image').prop('files')[0];
        var cogProjectName = $element.find('#cog-project-update-name').val();
        var projectUsers = $element.find('#cog-new-project-users').val();
        cogUser = (projectUsers != undefined) ? projectUsers : ($rootScope.organizationID == 2) ? $rootScope.userID : 0;
        var filename = '';

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((cogProjectName.trim()).length <= 0) {
            SweetAlert.swal({
                title: "Project Update Fail",
                text: "Please provide a filename."
            }, function (isConfirm) {
                if (isConfirm) {}
            });
        } else {
            formData.append('id', cogProjID);
            formData.append('file', fileData);
            formData.append('cogUser', cogUser);
            formData.append('cogProjName', cogProjectName);
            formData.append('cogOrgID', cogOrgID);

            $http({
                url: './cogworks/projects/add',
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                console.log(response);
                SweetAlert.swal({
                    title: "Success",
                    text: "Process was successful."
                }, function (isConfirm) {
                    if (isConfirm) {
                        $state.go($state.current, {}, {
                            reload: true
                        });
                    }
                });
            }).error(function (error) {
                SweetAlert.swal({
                    title: "Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    };
}

cogProjectAdd.controller('cogProjectCtrl', cogProjectCtrl);
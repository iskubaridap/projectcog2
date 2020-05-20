var cogFilesUpdate = angular.module("cog-files-update", []);

function cogFilesUpdateCtrl($rootScope, $scope, $element, $state, $http, cogProjects, cogFilesDetails, SweetAlert) {
    var self = this;
    var cogID = $state.params.id;
    cogFilesDetails.getDetails(self, {id: cogID}, function(data) {
        console.log(data);
        cogProjects.getActiveOrgProjects(self, {
            org: data.orgID,
            user: data.userID
        }, function () {
            var obj = new Object();
            self.activeProjects = (self.activeProjects == null) ? new Array() : self.activeProjects;
            obj.id = '0';
            obj.project = '(Personal File)';
            self.activeProjects.unshift(obj);
        });
    });
    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-update-image').prop('files')[0];
        var cogName = $element.find('#cog-update-filename').val();
        var cogProject = $element.find('#cog-update-project').val();
        var filename = '';
        var fileUpdate = false;
        var cogNameUpdate = false;
        var cogProjectUpdate = false;

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((cogName.trim()).length <= 0) {
            SweetAlert.swal({
                title: "File Update Fail",
                text: "Please provide a filename."
            }, function (isConfirm) {
                if (isConfirm) {}
            });
        } else {
            formData.append('id', cogID);
            formData.append('file', fileData);
            formData.append('cogName', cogName);
            formData.append('cogProject', cogProject);

            $http({
                url: './cogworks/cog-files/update',
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                console.log(response);
                SweetAlert.swal({
                    title: "Success!",
                    text: "File is successfully Updated."
                }, function (isConfirm) {
                    if (isConfirm) {
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            }).error(function (error) {
                SweetAlert.swal({
                    title: "File Update Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    };
}

cogFilesUpdate.controller('cogFilesUpdateCtrl', cogFilesUpdateCtrl);
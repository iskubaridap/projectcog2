var cogFilesClone = angular.module("cog-files-clone", []);

function cogFilesCloneCtrl($rootScope, $scope, $element, $state, $http, cogProjects, cogFilesDetails, SweetAlert) {
    var self = this;
    var cogID = $state.params.id;
    cogProjects.getActiveProjects(self, {}, function () {
        var obj = new Object();
        obj.id = '0';
        obj.project = '(Personal File)';
        self.activeProjects.unshift(obj);
    });
    cogFilesDetails.getDetails(self, {
        id: cogID
    }, function (data) {
        if (data.cogfile.search('-copy') < 0) {
            self.details.cogfile = data.cogfile + '-copy';
        }
    });
    self.reset = function (event) {
        $state.go($state.current, {}, {
            reload: true
        });
    };
    self.submit = function (event) {
        var formData = new FormData();
        var fileData = $element.find('#cog-clone-image').prop('files')[0];
        var cogName = $element.find('#cog-clone-filename').val();
        var cogProject = $element.find('#cog-clone-project').val();
        var filename = '';
        var fileClone = false;
        var cogNameClone = false;
        var cogProjectClone = false;

        try {
            filename = fileData.name
        } catch (err) {
            filename = null;
        }

        if ((cogName.trim()).length <= 0) {
            SweetAlert.swal({
                title: "File Clone Fail",
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
                url: './cogworks/cog-files/clone',
                method: "POST",
                data: formData,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (response) {
                console.log(response);
                // $state.go($state.current, {}, {reload: true});
                SweetAlert.swal({
                    title: "Success!",
                    text: "File is successfully Cloned."
                }, function (isConfirm) {
                    if (isConfirm) {
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            }).error(function (error) {
                SweetAlert.swal({
                    title: "File Clone Fail",
                    text: "Something went wrong. Please try it again."
                }, function (isConfirm) {
                    if (isConfirm) {}
                });
            });
        }
    };
}

cogFilesClone.controller('cogFilesCloneCtrl', cogFilesCloneCtrl);
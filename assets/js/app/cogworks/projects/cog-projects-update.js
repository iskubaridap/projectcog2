var cogProjectUpdate = angular.module("cog-projects-update", []);
function cogProjectCtrl($rootScope, $scope, $element, $state, $http, cogProject, SweetAlert)
{
    var self = this;
    var cogProjID = $state.params.id;
    self.title = 'Update';
    cogProject.getProject(self, {id: cogProjID});
    
    self.reset = function(event)
    {
        $state.go($state.current, {}, {reload: true});
    };
    self.submit = function(event)
    {
        var formData = new FormData();
        var fileData = $element.find('#cog-project-update-image').prop('files')[0];
        var cogProjectName = $element.find('#cog-project-update-name').val();
        var filename =  '';

        try
        {
            filename = fileData.name
        }
        catch(err)
        {
            filename = null;
        }

        if((cogProjectName.trim()).length <= 0)
        {
            SweetAlert.swal({
                title: "Project Update Fail",
                text: "Please provide a filename."
            }, function(isConfirm){
                if(isConfirm)
                {}
            });
        }
        else
        {
            formData.append('id', cogProjID);
            formData.append('file', fileData);
            formData.append('cogProjName', cogProjectName);

            $http({
                url: ( root + 'cogworks/projects/update'),
                method: "POST",
                data: formData,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                $state.go($state.current, {}, {reload: true});
            }).error(function(error){
                SweetAlert.swal({
                    title: "Project Update Fail",
                    text: "Something went wrong. Please try it again."
                }, function(isConfirm){
                    if(isConfirm)
                    {}
                });
            });
        }
    };
}

cogProjectUpdate.controller('cogProjectCtrl', cogProjectCtrl);
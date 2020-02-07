var cogProjectAdd = angular.module("cog-projects-add", []);
function cogProjectCtrl($rootScope, $scope, $element, $state, $http, cogProject, organizationsService, SweetAlert)
{
    var self = this;
    var cogProjID = 0; // initializing anonymous value
    var cogOrgID = 0; // initializing anonymous value
    var cogProjPage = ($state.params.page == undefined) ? '' : $state.params.page;
    
    organizationsService.getOrganizations(self, {}, function(data) {
        // this is to avoid admin and developers to be shown
        // for now we disable the developers coz we're not sure too much about this for now
        self.positionsInitValue = data[2].id;
    });
    self.page = cogProjPage;
    self.title = 'New Project';
    self.project = {
        id: cogProjID,
        project: '',
        image: 'assets/img/thumbnail/cog-project.svg'
    };
    
    self.reset = function(event)
    {
        $state.go($state.current, {}, {reload: true});
    };
    self.submit = function(event)
    {
        var formData = new FormData();
        var fileData = $element.find('#cog-project-update-image').prop('files')[0];
        var cogProjectName = $element.find('#cog-project-update-name').val();
        var cogOrgID = $element.find('#cog-project-organization-option').val();
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
            formData.append('cogOrgID', cogOrgID);

            $http({
                url: ( root + 'cogworks/projects/add'),
                method: "POST",
                data: formData,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                console.log(response);
                SweetAlert.swal({
                    title: "Success",
                    text: "Process was successful."
                }, function(isConfirm){
                    if(isConfirm)
                    {
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            }).error(function(error){
                SweetAlert.swal({
                    title: "Fail",
                    text: "Something went wrong. Please try it again."
                }, function(isConfirm){
                    if(isConfirm)
                    {}
                });
            });
        }
    };
}

cogProjectAdd.controller('cogProjectCtrl', cogProjectCtrl);
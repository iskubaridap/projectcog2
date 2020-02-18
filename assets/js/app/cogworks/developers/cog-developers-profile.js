var cogDeveloperProfile = angular.module("cog-developers-profile", []);
function cogDeveloperProfileCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogDevelopers)
{
    var self = this;
    var userID = ($state.params.id == undefined || (($state.params.id).trim()).length <= 0) ? 0 : $state.params.id;
    if(userID != 0) {
        cogDevelopers.getDeveloper(self, {id: userID}, function(data){
            console.log(data);
        });
    } else {
        self.developer = null;
    }
}

cogDeveloperProfile.controller('cogDeveloperProfileCtrl', cogDeveloperProfileCtrl);
var cogDeveloperProfile = angular.module("cog-developers-profile", []);
function cogDeveloperProfileCtrl($rootScope, $scope, $element, $state, $http, $timeout, loginService, cogDevelopers)
{
    var self = this;
    cogDevelopers.getDeveloper(self, {id: $state.params.id}, function(data){
        console.log(data);
    });
}

cogDeveloperProfile.controller('cogDeveloperProfileCtrl', cogDeveloperProfileCtrl);
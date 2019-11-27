var cogFilesDetails = angular.module("cog-files-details", []);
function cogFilesDetailsCtrl($rootScope, $scope, $element, $state, $http, cogFilesDetails)
{
    var self = this;
    cogFilesDetails.getDetails(self, {id: $state.params.id});
}

cogFilesDetails.controller('cogFilesDetailsCtrl', cogFilesDetailsCtrl);
/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope, $http, $state, $scope, loginService) {
    var self = this;

    /* this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.'; */
    $rootScope.user = '';
    $rootScope.userID = '';
    $rootScope.firstname = '';
    $rootScope.position = '';
    $rootScope.positionID = '';
    $rootScope.organization = '';
    $rootScope.organizationID = '';

    // console.log($rootScope.main = self);
    $scope.date = new Date();

    self.logout = function(event)
    {
        $http.get('./logout')
        .then(function (response) {
            $state.go('login');
        });
    };
    loginService.getLoggedUser(self, {}, function(data) {
        loginService.userLogged(data);
        if(typeof data == 'object') {
            $rootScope.user = data.user;
            $rootScope.firstname = (((data.firstname).trim()).length > 0) ? data.firstname : data.user;
            $rootScope.userID = data.id;
            $rootScope.position = data.position;
            $rootScope.positionID = data.position_id;
            $rootScope.organization = data.organization;
            $rootScope.organizationID = data.organization_id;
        }
    });
};

/*
    Application Section
*/


angular
    .module('projectcog')
    .controller('MainCtrl', MainCtrl)
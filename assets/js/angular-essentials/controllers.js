/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($http, $state, $scope) {
    var self = this;

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    $scope.date = new Date();

    self.logout = function(event)
    {
        $http.get('./logout')
        .then(function (response) {
            $state.go('login');
        });
    };
};

/*
    Application Section
*/


angular
    .module('mcafee')
    .controller('MainCtrl', MainCtrl)
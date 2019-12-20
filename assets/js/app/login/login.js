var login = angular.module("login", []);
function loginCtrl($rootScope, $scope, $state, $element, $http, loggedUserinfo, SweetAlert)
{
    var self = this;
    
    self.submit = function(event)
    {
        var emailInput = ($scope.email).toLowerCase();
        var passwordInput = $scope.password;

        $http.post('./login/validate', {email: emailInput, password: passwordInput})
        .then(function (response) {
            
            if(response.data == 'true')
            {
                $state.go('cog-home.main');
            }
            else
            {
                SweetAlert.swal({
                    title: "Login Fail",
                    text: "Your Email or Password may be incorrect. Please provide your proper credentials and try it again."
                }, function(isConfirm){
                    if(isConfirm)
                    {
                        //$scope.email = '';
                        $scope.password = '';
                    }
                });
            }
        }, function (response) {
            SweetAlert.swal({
                title: "Login Fail",
                text: "Something went wrong please try it again. If problem persist inform the Admin regarding the issue."
            }, function(isConfirm){
                if(isConfirm)
                {
                    //$scope.email = '';
                    $scope.password = '';
                }
            });
        });
    }
}
login.controller('loginCtrl', loginCtrl);

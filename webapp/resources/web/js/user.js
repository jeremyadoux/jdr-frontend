/**
 * Created by jadoux on 01/07/2015.
 */

module.controller('UserController', function($scope, $window, userService, authenticationService) {
    $scope.createUserAction = function() {
        userService.createAccount(
            $scope.email,
            $scope.password,
            $scope.firstname,
            $scope.lastname,
            $scope.pseudo,
            {
                successCallback: function(data, status, headers, config) {

                }
            }
        )
    };

    $scope.loginAction = function() {
        userService.login(
            $scope.email,
            $scope.password,
            {
                successCallback: function(data, status, headers, config) {
                    authenticationService.setToken(data.token);
                    $window.location.href = "/MyBouffeFrontend/webapp/static/html/index.html";
                }
            }
        );
    }

    $scope.currentUser = authenticationService.getUserAuthenticated({
        successCallback: function(data, status, headers, config) {
            $scope.currentUser = data;
            console.log($scope.currentUser);
        }
    });
});
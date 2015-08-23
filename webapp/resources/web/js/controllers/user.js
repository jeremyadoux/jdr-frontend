/**
 * Created by jadoux on 01/07/2015.
 */

module.controller('UserController', ['$scope', 'AuthService',
    function($scope, AuthService) {
    $scope.user = {
        email: 'foo@bar.com',
        password: 'foobar'
    };

    $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
            .then(function() {
                console.log('plop');
                //$state.go('add-review');
            });
    };

    $scope.logout = function() {
        AuthService.logout()
            .then(function() {
                //$state.go('all-reviews');
            });
    };

    $scope.register = function() {
        AuthService.register($scope.user.email, $scope.user.password)
            .then(function() {
                //$state.transitionTo('sign-up-success');
            });
    };
}]);
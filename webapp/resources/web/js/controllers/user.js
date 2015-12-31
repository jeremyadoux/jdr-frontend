/**
 * Created by jadoux on 01/07/2015.
 */

module.controller('UserController', ['$rootScope', '$scope', '$state', 'AuthService', function($rootScope, $scope, $state, AuthService) {
    $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
            .then(function(response) {
                $rootScope.$broadcast('sendMessageInformation', 'Vous vous êtes connectés avec succès.', 'success');
                $state.go('home');
            });
    };

    $scope.logout = function() {
        AuthService.logout()
            .then(function() {
                $state.go('login');
            });
    };

    $scope.register = function() {
        AuthService.register($scope.user.email, $scope.user.password)
            .then(function() {
                //$state.transitionTo('sign-up-success');
            });
    };
}]);

module.controller('LogoutController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
    AuthService.logout()
        .then(function() {
            $state.go('login');
        });
}]);
module.factory('AuthService', ['Player', '$q', '$rootScope', function(User, $q,
                                                                      $rootScope) {
        function login(email, password) {
            return User
                .login({email: email, password: password})
                .$promise
                .then(function(response) {
                    $rootScope.currentUser = response;
                    $rootScope.$broadcast('profileHaveBeenUpdated', response);
                });
        }

        function logout() {
            return User
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                    $rootScope.$broadcast('profileHaveBeenUpdated', null);
                });
        }

        function register(email, password) {
            return User
                .create({
                    email: email,
                    password: password
                })
                .$promise;
        }

        return {
            login: login,
            logout: logout,
            register: register
        };
    }]);